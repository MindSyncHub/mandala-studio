import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
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
  onResult: (result: CircleDetectionResult) => void;
  onValuesChange: (inner: number, middle: number, outer: number, imgW: number, imgH: number) => void;
}

interface CircleValues {
  inner_radius: number;
  middle_radius: number;
  outer_radius: number;
}

const CircleDetection = ({ file, onResult, onValuesChange }: CircleDetectionProps) => {
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState(false);
  const [autoValues, setAutoValues] = useState<CircleValues | null>(null);
  const [editedValues, setEditedValues] = useState<CircleValues | null>(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  const emitResult = useCallback(
    (edited: CircleValues, auto: CircleValues) => {
      const isAdjusted =
        Math.abs(edited.inner_radius - auto.inner_radius) > 0.01 ||
        Math.abs(edited.middle_radius - auto.middle_radius) > 0.01;
      onResult({
        threeCircles: JSON.stringify(edited),
        autoDetect: JSON.stringify(auto),
        userAdjusted: isAdjusted,
      });
    },
    [onResult],
  );

  const runDetection = useCallback(async () => {
    setDetecting(true);
    setError(false);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("use_ai", "true");
      form.append("use_opencv", "true");
      const res: DetectCirclesResponse = await detectCircles(form);
      setImgSize({ w: res.image_width, h: res.image_height });

      if (res.circles.length >= 2) {
        const sorted = [...res.circles].sort((a, b) => a.radius - b.radius);
        const vals: CircleValues = {
          inner_radius: sorted[0].radius,
          middle_radius: sorted.length >= 3 ? sorted[1].radius : sorted[0].radius,
          outer_radius: sorted[sorted.length - 1].radius,
        };
        setAutoValues(vals);
        setEditedValues({ ...vals });
        onValuesChange(vals.inner_radius, vals.middle_radius, vals.outer_radius, res.image_width, res.image_height);
        emitResult(vals, vals);
      } else {
        setError(true);
        toast({ title: "未检测到足够圆圈", description: "请重试", variant: "destructive" });
      }
    } catch {
      setError(true);
      toast({ title: "圆圈检测失败", variant: "destructive" });
    } finally {
      setDetecting(false);
    }
  }, [file, onValuesChange, emitResult]);

  useEffect(() => {
    runDetection();
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateValue = useCallback(
    (key: "inner_radius" | "middle_radius", value: number) => {
      setEditedValues((prev) => {
        if (!prev || !autoValues) return prev;
        const next = { ...prev, [key]: value };
        onValuesChange(next.inner_radius, next.middle_radius, next.outer_radius, imgSize.w, imgSize.h);
        emitResult(next, autoValues);
        return next;
      });
    },
    [autoValues, imgSize, onValuesChange, emitResult],
  );

  const maxSlider = editedValues ? Math.round(editedValues.outer_radius * 1.2) : 500;

  if (detecting) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          AI 正在识别三圈边界...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center gap-3">
          <p className="text-sm text-destructive">检测失败，请重试</p>
          <Button variant="outline" size="sm" onClick={runDetection}>
            <RefreshCw className="h-4 w-4 mr-1" /> 重试
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!editedValues) return null;

  const labels: { key: "inner_radius" | "middle_radius"; label: string; color: string }[] = [
    { key: "inner_radius", label: "内中分界线", color: "text-green-600" },
    { key: "middle_radius", label: "中外分界线", color: "text-blue-600" },
  ];

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <p className="text-sm font-medium">调整三圈分界线</p>
        {labels.map(({ key, label, color }) => (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${color}`}>{label}</span>
              <span className="text-xs text-muted-foreground">{editedValues[key].toFixed(1)}</span>
            </div>
            <Slider
              min={0}
              max={maxSlider}
              step={0.5}
              value={[editedValues[key]]}
              onValueChange={([v]) => updateValue(key, v)}
            />
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          内/中比例：{(editedValues.inner_radius / editedValues.middle_radius).toFixed(2)} ｜
          中/外比例：{(editedValues.middle_radius / editedValues.outer_radius).toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
};

export default CircleDetection;
