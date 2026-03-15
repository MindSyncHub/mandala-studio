import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
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
import { useImageUpload } from "@/hooks/useImageUpload";
import { createInterpretation } from "@/api";
import type { CreateInterpretationResponse } from "@/api/types";
import InterpretUpload from "@/components/InterpretUpload";
import InterpretForm from "@/components/InterpretForm";
import CircleDetection from "@/components/CircleDetection";
import FeatureCards from "@/components/FeatureCards";
import { toast } from "@/hooks/use-toast";

const AiInterpret = () => {
  const navigate = useNavigate();
  const { file, preview, onDrop, onFileChange, clear } = useImageUpload();
  const [theme, setTheme] = useState("general");
  const [paintingIntention, setPaintingIntention] = useState("");
  const [paintingFeeling, setPaintingFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [threeCirclesJson, setThreeCirclesJson] = useState<string | undefined>(undefined);

  const [conflictOpen, setConflictOpen] = useState(false);
  const [existingResult, setExistingResult] = useState<CreateInterpretationResponse | null>(null);

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

  const handleClear = () => {
    clear();
    setThreeCirclesJson(undefined);
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

      <InterpretUpload preview={preview} onDrop={onDrop} onFileChange={onFileChange} onClear={handleClear} />

      {file && <CircleDetection file={file} onResult={setThreeCirclesJson} />}

      <InterpretForm
        theme={theme}
        onThemeChange={setTheme}
        paintingIntention={paintingIntention}
        onIntentionChange={setPaintingIntention}
        paintingFeeling={paintingFeeling}
        onFeelingChange={setPaintingFeeling}
        canSubmit={!!file}
        loading={loading}
        onSubmit={() => submit()}
      />

      {!loading && <FeatureCards />}

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
