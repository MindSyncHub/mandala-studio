import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ImagePlus } from "lucide-react";
import { getReport, upgradeToPro } from "@/api";
import type { ReportResponse } from "@/api/types";
import { toast } from "@/hooks/use-toast";
import ReportCard from "@/components/ReportCard";
import TherapistNotes from "@/components/TherapistNotes";

const Report = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  const fetchReport = useCallback(
    (version?: "lite" | "pro") => {
      if (!id) return;
      setLoading(true);
      getReport(id, version)
        .then(setReport)
        .catch(() => setError("无法加载报告，请稍后重试"))
        .finally(() => setLoading(false));
    },
    [id],
  );

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleUpgrade = async () => {
    if (!id) return;
    setUpgrading(true);
    try {
      await upgradeToPro(id);
      await getReport(id, "pro").then(setReport);
      toast({ title: "已升级到 Pro 版本" });
    } catch {
      toast({ title: "升级失败", description: "请稍后重试", variant: "destructive" });
    } finally {
      setUpgrading(false);
    }
  };

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

      <ReportCard report={report} upgrading={upgrading} onUpgrade={handleUpgrade} />

      {id && <TherapistNotes interpretationId={id} />}

      <div className="flex justify-center pt-2 pb-8">
        <Button size="lg" onClick={() => navigate("/interpret")} className="gap-2">
          <ImagePlus className="h-5 w-5" />
          再测一幅
        </Button>
      </div>
    </div>
  );
};

export default Report;
