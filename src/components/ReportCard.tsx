import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpCircle } from "lucide-react";
import type { ReportResponse } from "@/api/types";

interface ReportCardProps {
  report: ReportResponse;
  upgrading: boolean;
  onUpgrade: () => void;
}

const ReportCard = ({ report, upgrading, onUpgrade }: ReportCardProps) => (
  <Card className="card-gradient shadow-soft">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="font-serif text-xl">
            {report.title ?? "解读报告"}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            版本：{report.version}
            {report.can_upgrade && report.upgrade_price != null && (
              <span className="ml-2">· 可升级至 Pro（¥{report.upgrade_price}）</span>
            )}
          </p>
        </div>
        {report.can_upgrade && (
          <Button
            size="sm"
            onClick={onUpgrade}
            disabled={upgrading}
            className="gap-1.5 shrink-0"
          >
            {upgrading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUpCircle className="h-4 w-4" />
            )}
            升级到 Pro
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      {report.error ? (
        <p className="text-destructive text-sm">{report.error}</p>
      ) : report.report ? (
        <div className="prose prose-sm max-w-none text-foreground">
          <ReactMarkdown>{report.report}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">报告生成中，请稍后刷新查看。</p>
      )}
    </CardContent>
  </Card>
);

export default ReportCard;
