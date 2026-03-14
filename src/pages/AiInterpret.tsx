import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createInterpretation } from "@/api";
import type { CreateInterpretationResponse } from "@/api/types";
import InterpretUpload from "@/components/InterpretUpload";
import InterpretResult from "@/components/InterpretResult";
import FeatureCards from "@/components/FeatureCards";
import { toast } from "@/hooks/use-toast";

const themes = ["全面解读", "财富", "情感", "健康", "事业", "性格"];

const AiInterpret = () => {
  const { file, preview, onDrop, onFileChange, clear } = useImageUpload();
  const [theme, setTheme] = useState("全面解读");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreateInterpretationResponse | null>(null);

  const handleInterpret = async () => {
    if (!file) {
      toast({ title: "请先上传图片", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await createInterpretation({
        image: file,
        user_id: "therapist-demo",
        theme: theme === "全面解读" ? undefined : theme,
      });
      setResult(res);
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

      <InterpretUpload
        preview={preview}
        onDrop={onDrop}
        onFileChange={onFileChange}
        onClear={clear}
      />

      <div>
        <p className="text-sm font-medium mb-2">选择解读主题</p>
        <div className="flex flex-wrap gap-2">
          {themes.map((t) => (
            <Badge
              key={t}
              variant={theme === t ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setTheme(t)}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        onClick={handleInterpret}
        disabled={!file || loading}
        className="w-full gap-2"
        size="lg"
      >
        <Sparkles className="h-4 w-4" />
        {loading ? "解读中…" : "开始解读"}
      </Button>

      <InterpretResult result={result} loading={loading} />

      {!result && !loading && <FeatureCards />}
    </div>
  );
};

export default AiInterpret;
