import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { CreateInterpretationResponse } from "@/api/types";

interface InterpretResultProps {
  result: CreateInterpretationResponse | null;
  loading: boolean;
}

const InterpretResult = ({ result, loading }: InterpretResultProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 animate-fade-in">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">AI 正在解读您的曼陀罗画作…</p>
      </div>
    );
  }

  if (!result) return null;

  if (result.error) {
    return (
      <Card className="border-destructive/30">
        <CardContent className="p-6 text-destructive text-sm">{result.error}</CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-gradient shadow-soft animate-scale-in">
      <CardHeader>
        <CardTitle className="font-serif text-xl">
          {result.title ?? "解读报告"}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          版本：{result.version} · 耗时 {result.elapsed_time.toFixed(1)}s
        </p>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
          {result.report ?? "报告生成中，请稍后查看完整报告。"}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterpretResult;
