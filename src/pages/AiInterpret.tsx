import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, X } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createInterpretation } from "@/api";
import type { CreateInterpretationResponse } from "@/api/types";
import InterpretUpload from "@/components/InterpretUpload";
import ImageConfirmDialog from "@/components/ImageConfirmDialog";
import ThreeCirclesPreview from "@/components/ThreeCirclesPreview";
import CircleDetection from "@/components/CircleDetection";
import type { CircleDetectionResult } from "@/components/CircleDetection";
import InterpretForm from "@/components/InterpretForm";
import FeatureCards from "@/components/FeatureCards";
import { toast } from "@/hooks/use-toast";

const AiInterpret = () => {
  const navigate = useNavigate();
  const { file, preview, pendingPreview, onDrop, onFileChange, confirmPending, cancelPending, clear } = useImageUpload();
  const [theme, setTheme] = useState("general");
  const [paintingIntention, setPaintingIntention] = useState("");
  const [paintingFeeling, setPaintingFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [circleResult, setCircleResult] = useState<CircleDetectionResult | undefined>(undefined);
  const [circleVis, setCircleVis] = useState({ inner: 0, middle: 0, outer: 0, imgW: 0, imgH: 0 });

  const [conflictOpen, setConflictOpen] = useState(false);
  const [existingResult, setExistingResult] = useState<CreateInterpretationResponse | null>(null);

  const handleCircleValues = useCallback((inner: number, middle: number, outer: number, imgW: number, imgH: number) => {
    setCircleVis({ inner, middle, outer, imgW, imgH });
  }, []);

  const handleClear = () => {
    clear();
    setCircleResult(undefined);
    setCircleVis({ inner: 0, middle: 0, outer: 0, imgW: 0, imgH: 0 });
  };

  const submit = async (forceNew = false) => {
    if (!file || !circleResult) {
      toast({ title: "请等待三圈检测完成", variant: "destructive" });
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
        three_circles: circleResult.threeCircles,
        three_circles_auto_detect: circleResult.autoDetect,
        three_circles_user_adjusted: circleResult.userAdjusted,
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI 曼陀罗解读
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          上传曼陀罗画作，AI 将从色彩、结构、心理等维度进行深度解读
        </p>
      </div>

      {!file ? (
        <InterpretUpload onDrop={onDrop} onFileChange={onFileChange} />
      ) : (
        <>
          <div className="relative">
            <ThreeCirclesPreview
              previewUrl={preview!}
              innerRadius={circleVis.inner}
              middleRadius={circleVis.middle}
              outerRadius={circleVis.outer}
              imageWidth={circleVis.imgW}
              imageHeight={circleVis.imgH}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CircleDetection file={file} onResult={setCircleResult} onValuesChange={handleCircleValues} />

          <InterpretForm
            theme={theme}
            onThemeChange={setTheme}
            paintingIntention={paintingIntention}
            onIntentionChange={setPaintingIntention}
            paintingFeeling={paintingFeeling}
            onFeelingChange={setPaintingFeeling}
            canSubmit={!!circleResult}
            loading={loading}
            onSubmit={() => submit()}
          />
        </>
      )}

      {!file && !loading && <FeatureCards />}

      <ImageConfirmDialog
        open={!!pendingPreview}
        previewUrl={pendingPreview}
        onConfirm={confirmPending}
        onCancel={cancelPending}
      />

      <AlertDialog open={conflictOpen} onOpenChange={setConflictOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>已存在解读报告</AlertDialogTitle>
            <AlertDialogDescription>
              该图片已有一份解读报告，你可以直接查看旧报告，或重新生成一份新的解读。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setConflictOpen(false); if (existingResult) navigate(`/report/${existingResult.interpretation_id}`); }}>
              使用旧报告
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => { setConflictOpen(false); submit(true); }}>
              重新生成
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AiInterpret;
