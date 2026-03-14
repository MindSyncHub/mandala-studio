import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Circle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createInterpretation, detectCircles } from "@/api";
import type { CreateInterpretationResponse, DetectCirclesResponse } from "@/api/types";
import InterpretUpload from "@/components/InterpretUpload";
import FeatureCards from "@/components/FeatureCards";
import { toast } from "@/hooks/use-toast";

const THEME_OPTIONS = [
  { value: "general", label: "全面解读" },
  { value: "intimate_relationship", label: "亲密关系" },
  { value: "wealth_career", label: "财富事业" },
  { value: "health_wellness", label: "健康养生" },
  { value: "personal_growth", label: "个人成长" },
];

const AiInterpret = () => {
  const navigate = useNavigate();
  const { file, preview, onDrop, onFileChange, clear } = useImageUpload();
  const [theme, setTheme] = useState("general");
  const [paintingIntention, setPaintingIntention] = useState("");
  const [paintingFeeling, setPaintingFeeling] = useState("");
  const [loading, setLoading] = useState(false);

  // detect circles
  const [detecting, setDetecting] = useState(false);
  const [circlesData, setCirclesData] = useState<DetectCirclesResponse | null>(null);
  const [threeCirclesJson, setThreeCirclesJson] = useState<string | undefined>(undefined);

  // existing-conflict dialog
  const [conflictOpen, setConflictOpen] = useState(false);
  const [existingResult, setExistingResult] = useState<CreateInterpretationResponse | null>(null);

  const handleDetectCircles = async () => {
    if (!file) return;
    setDetecting(true);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("use_ai", "true");
      form.append("use_opencv", "true");
      const res = await detectCircles(form);
      setCirclesData(res);

      if (res.circles.length >= 2) {
        const sorted = [...res.circles].sort((a, b) => a.radius - b.radius);
        const payload = {
          inner_radius: sorted[0].radius,
          middle_radius: sorted.length >= 3 ? sorted[1].radius : sorted[sorted.length - 1].radius,
          outer_radius: sorted[sorted.length - 1].radius,
        };
        setThreeCirclesJson(JSON.stringify(payload));
        toast({ title: "三圈检测完成", description: `检测到 ${res.circles.length} 个圆` });
      } else {
        setThreeCirclesJson(undefined);
        toast({ title: "未检测到足够圆圈", description: "将不传入三圈数据", variant: "destructive" });
      }
    } catch {
      toast({ title: "圆圈检测失败", variant: "destructive" });
    } finally {
      setDetecting(false);
    }
  };

  const submit = async (forceNew = false) => {
    if (!file) {
      toast({ title: "请先上传图片", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await createInterpretation({
        image: file,
        user_id: "therapist_demo",
        theme: theme === "general" ? undefined : theme,
        painting_intention: paintingIntention || undefined,
        painting_feeling: paintingFeeling || undefined,
        force_new: forceNew || undefined,
        three_circles: threeCirclesJson,
      });

      if (res.existing && !forceNew) {
        setExistingResult(res);
        setConflictOpen(true);
        return;
      }

      navigate(`/report/${res.interpretation_id}`);
    } catch {
      toast({ title: "解读失败", description: "请稍后重试", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUseExisting = () => {
    setConflictOpen(false);
    if (existingResult) navigate(`/report/${existingResult.interpretation_id}`);
  };

  const handleRegenerate = () => {
    setConflictOpen(false);
    submit(true);
  };

  const handleClear = () => {
    clear();
    setCirclesData(null);
    setThreeCirclesJson(undefined);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-bold">AI 曼陀罗解读</h1>
        <p className="text-sm text-muted-foreground mt-1">
          上传曼陀罗绘画作品，获取基于五行色彩体系的AI辅助解读
        </p>
      </div>

      <InterpretUpload
        preview={preview}
        onDrop={onDrop}
        onFileChange={onFileChange}
        onClear={handleClear}
      />

      {/* Detect circles step */}
      {file && (
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium flex items-center gap-2">
                <Circle className="h-4 w-4 text-primary" />
                三圈检测（可选）
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDetectCircles}
                disabled={detecting}
              >
                {detecting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                {detecting ? "检测中…" : circlesData ? "重新检测" : "检测圆圈"}
              </Button>
            </div>
            {circlesData && circlesData.circles.length >= 2 && (
              <div className="text-sm text-muted-foreground space-y-1">
                {(() => {
                  const sorted = [...circlesData.circles].sort((a, b) => a.radius - b.radius);
                  const inner = sorted[0].radius;
                  const middle = sorted.length >= 3 ? sorted[1].radius : sorted[sorted.length - 1].radius;
                  return (
                    <>
                      <p>内圈半径：{inner.toFixed(1)}px</p>
                      <p>中圈半径：{middle.toFixed(1)}px</p>
                      <p>内/中比例：{(inner / middle).toFixed(2)}</p>
                    </>
                  );
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Theme select */}
      <div>
        <p className="text-sm font-medium mb-2">选择解读主题</p>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="选择主题" />
          </SelectTrigger>
          <SelectContent>
            {THEME_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Optional inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium mb-2">绘画意图（可选）</p>
          <Textarea
            placeholder="创作这幅画时，你想表达什么？"
            value={paintingIntention}
            onChange={(e) => setPaintingIntention(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">绘画感受（可选）</p>
          <Textarea
            placeholder="画完之后，你有什么感受？"
            value={paintingFeeling}
            onChange={(e) => setPaintingFeeling(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <Button
        onClick={() => submit()}
        disabled={!file || loading}
        className="w-full gap-2"
        size="lg"
      >
        <Sparkles className="h-4 w-4" />
        {loading ? "解读中…" : "开始解读"}
      </Button>

      {!loading && <FeatureCards />}

      {/* Existing interpretation conflict dialog */}
      <AlertDialog open={conflictOpen} onOpenChange={setConflictOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>已存在解读报告</AlertDialogTitle>
            <AlertDialogDescription>
              该图片已有一份解读报告，你可以直接查看旧报告，或重新生成一份新的解读。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleUseExisting}>
              使用旧报告
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRegenerate}>
              重新生成
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AiInterpret;
