import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle, Loader2 } from "lucide-react";
import { detectCircles } from "@/api";
import type { DetectCirclesResponse } from "@/api/types";
import { toast } from "@/hooks/use-toast";

interface CircleDetectionProps {
  file: File;
  onResult: (json: string | undefined) => void;
}

const CircleDetection = ({ file, onResult }: CircleDetectionProps) => {
  const [detecting, setDetecting] = useState(false);
  const [circlesData, setCirclesData] = useState<DetectCirclesResponse | null>(null);

  const handleDetect = async () => {
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
        onResult(JSON.stringify(payload));
        toast({ title: "三圈检测完成", description: `检测到 ${res.circles.length} 个圆` });
      } else {
        onResult(undefined);
        toast({ title: "未检测到足够圆圈", description: "将不传入三圈数据", variant: "destructive" });
      }
    } catch {
      toast({ title: "圆圈检测失败", variant: "destructive" });
    } finally {
      setDetecting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium flex items-center gap-2">
            <Circle className="h-4 w-4 text-primary" />
            三圈检测（可选）
          </p>
          <Button variant="outline" size="sm" onClick={handleDetect} disabled={detecting}>
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
  );
};

export default CircleDetection;
