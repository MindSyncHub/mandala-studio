import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getReport } from "@/api";
import type { ReportResponse } from "@/api/types";

const Report = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getReport(id)
      .then(setReport)
      .catch(() => setError("无法加载报告，请稍后重试"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-fade-in">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">加载报告中…</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <p className="text-destructive">{error ?? "报告不存在"}</p>
        <Button variant="outline" onClick={() => navigate("/interpret")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回上传
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Button variant="ghost" size="sm" onClick={() => navigate("/interpret")}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        返回上传
      </Button>

      <Card className="card-gradient shadow-soft">
        <CardHeader>
          <CardTitle className="font-serif text-xl">
            {report.title ?? "解读报告"}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            版本：{report.version}
            {report.can_upgrade && report.upgrade_price != null && (
              <span className="ml-2">
                · 可升级至 Pro（¥{report.upgrade_price}）
              </span>
            )}
          </p>
        </CardHeader>
        <CardContent>
          {report.error ? (
            <p className="text-destructive text-sm">{report.error}</p>
          ) : (
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
              {report.report ?? "报告生成中，请稍后刷新查看。"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
