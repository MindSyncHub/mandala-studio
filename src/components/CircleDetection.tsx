import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle, Loader2, Check, Pencil } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { detectCircles } from "@/api";
import type { DetectCirclesResponse } from "@/api/types";
import { toast } from "@/hooks/use-toast";

export interface CircleDetectionResult {
  threeCircles: string;
  autoDetect: string;
  userAdjusted: boolean;
}

interface CircleDetectionProps {
  file: File;
  onResult: (result: CircleDetectionResult | undefined) => void;
}

interface CircleValues {
  inner_radius: number;
  middle_radius: number;
  outer_radius: number;
}

const CircleDetection = ({ file, onResult }: CircleDetectionProps) => {
  const [detecting, setDetecting] = useState(false);
  const [autoValues, setAutoValues] = useState<CircleValues | null>(null);
  const [editedValues, setEditedValues] = useState<CircleValues | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleDetect = async () => {
    setDetecting(true);
    setConfirmed(false);
    onResult(undefined);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("use_ai", "true");
      form.append("use_opencv", "true");
      const res: DetectCirclesResponse = await detectCircles(form);

      if (res.circles.length >= 2) {
        const sorted = [...res.circles].sort((a, b) => a.radius - b.radius);
        const vals: CircleValues = {
          inner_radius: sorted[0].radius,
          middle_radius: sorted.length >= 3 ? sorted[1].radius : sorted[sorted.length - 1].radius,
          outer_radius: sorted[sorted.length - 1].radius,
        };
        setAutoValues(vals);
        setEditedValues({ ...vals });
        toast({ title: "三圈检测完成", description: `检测到 ${res.circles.length} 个圆，请确认或调整参数` });
      } else {
        setAutoValues(null);
        setEditedValues(null);
        toast({ title: "未检测到足够圆圈", description: "请重新上传或手动输入", variant: "destructive" });
      }
    } catch {
      toast({ title: "圆圈检测失败", variant: "destructive" });
    } finally {
      setDetecting(false);
    }
  };

  const updateValue = useCallback((key: keyof CircleValues, value: number) => {
    setEditedValues((prev) => prev ? { ...prev, [key]: value } : prev);
    setConfirmed(false);
    onResult(undefined);
  }, [onResult]);

  const handleConfirm = () => {
    if (!editedValues || !autoValues) return;
    const isAdjusted =
      Math.abs(editedValues.inner_radius - autoValues.inner_radius) > 0.01 ||
      Math.abs(editedValues.middle_radius - autoValues.middle_radius) > 0.01 ||
      Math.abs(editedValues.outer_radius - autoValues.outer_radius) > 0.01;

    const result: CircleDetectionResult = {
      threeCircles: JSON.stringify(editedValues),
      autoDetect: JSON.stringify(autoValues),
      userAdjusted: isAdjusted,
    };
    setConfirmed(true);
    onResult(result);
    toast({ title: "三圈参数已确认" });
  };

  const handleEdit = () => {
    setConfirmed(false);
    onResult(undefined);
  };

  const maxRadius = editedValues
    ? Math.max(editedValues.inner_radius, editedValues.middle_radius, editedValues.outer_radius) * 1.5
    : 500;

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium flex items-center gap-2">
            <Circle className="h-4 w-4 text-primary" />
            三圈检测（必须）
          </p>
          <Button variant="outline" size="sm" onClick={handleDetect} disabled={detecting}>
            {detecting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
            {detecting ? "检测中…" : autoValues ? "重新检测" : "检测圆圈"}
          </Button>
        </div>

        {editedValues && (
          <div className="space-y-4">
            {(["inner_radius", "middle_radius", "outer_radius"] as const).map((key) => {
              const labels: Record<string, string> = {
                inner_radius: "内圈半径",
                middle_radius: "中圈半径",
                outer_radius: "外圈半径",
              };
              return (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">{labels[key]}</label>
                    <Input
                      type="number"
                      className="w-24 h-8 text-sm"
                      value={editedValues[key].toFixed(1)}
                      disabled={confirmed}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v) && v >= 0) updateValue(key, v);
                      }}
                    />
                  </div>
                  <Slider
                    min={0}
                    max={Math.round(maxRadius)}
                    step={0.5}
                    value={[editedValues[key]]}
                    disabled={confirmed}
                    onValueChange={([v]) => updateValue(key, v)}
                  />
                </div>
              );
            })}

            <div className="text-xs text-muted-foreground">
              内/中比例：{(editedValues.inner_radius / editedValues.middle_radius).toFixed(2)} ｜
              中/外比例：{(editedValues.middle_radius / editedValues.outer_radius).toFixed(2)}
            </div>

            <div className="flex gap-2">
              {!confirmed ? (
                <Button size="sm" onClick={handleConfirm}>
                  <Check className="h-4 w-4 mr-1" />
                  确认三圈参数
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-1" />
                  重新编辑
                </Button>
              )}
            </div>

            {confirmed && (
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">✓ 三圈参数已确认，可以提交解读</p>
            )}
          </div>
        )}

        {!editedValues && !detecting && (
          <p className="text-xs text-muted-foreground">请点击「检测圆圈」完成三圈检测后才能提交解读</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CircleDetection;
