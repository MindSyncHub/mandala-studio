import { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Minus, Plus, RotateCcw } from "lucide-react";

interface ImageConfirmDialogProps {
  open: boolean;
  previewUrl: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const MIN_SCALE = 0.3;
const MAX_SCALE = 5;
const SCALE_STEP = 0.1;

const ImageConfirmDialog = ({ open, previewUrl, onConfirm, onCancel }: ImageConfirmDialogProps) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const applyScaleWithCenterLock = useCallback((newScale: number) => {
    setScale((oldScale) => {
      const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      const ratio = clamped / oldScale;
      setOffset((prev) => ({ x: prev.x * ratio, y: prev.y * ratio }));
      return clamped;
    });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((old) => {
      const newS = Math.max(MIN_SCALE, Math.min(MAX_SCALE, old - e.deltaY * 0.002));
      const ratio = newS / old;
      setOffset((prev) => ({ x: prev.x * ratio, y: prev.y * ratio }));
      return newS;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    setOffset((prev) => ({
      x: prev.x + e.clientX - lastPos.current.x,
      y: prev.y + e.clientY - lastPos.current.y,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      dragging.current = true;
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setOffset((prev) => ({
      x: prev.x + touch.clientX - lastPos.current.x,
      y: prev.y + touch.clientY - lastPos.current.y,
    }));
    lastPos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) onCancel();
  };

  const scalePercent = Math.round(scale * 100);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[100vw] w-[100vw] h-[100vh] flex flex-col p-0 gap-0 border-none rounded-none bg-black [&>button]:hidden">
        {/* Instructions */}
        <div className="text-center py-3 px-4 space-y-0.5 z-10">
          <p className="text-sm text-white/80">第一步：请将画作的圆心与十字标记对齐。</p>
          <p className="text-sm text-white/80">第二步：请调节画作到合适的大小。</p>
        </div>

        {/* Main area with circular cutout */}
        <div
          className="flex-1 flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Circular viewport */}
          <div
            className="relative rounded-full overflow-hidden"
            style={{ width: "min(84vw, 68vh)", height: "min(84vw, 68vh)", boxShadow: "0 0 0 9999px rgba(0,0,0,0.78)" }}
          >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="预览"
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
                  transformOrigin: "center center",
                  maxWidth: "none",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                draggable={false}
              />
            )}

            {/* Red crosshair - fixed at center */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
              <div className="relative" style={{ width: 26, height: 26 }}>
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                  style={{ width: 1.5, height: 26, background: "rgba(255, 64, 64, 0.95)" }}
                />
                <div
                  className="absolute top-1/2 left-0 -translate-y-1/2"
                  style={{ width: 26, height: 1.5, background: "rgba(255, 64, 64, 0.95)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex flex-col items-center gap-3 p-4 bg-black/90 border-t border-white/10">
          {/* Zoom controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => applyScaleWithCenterLock(scale - SCALE_STEP)}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="text-white text-sm font-mono w-12 text-center">{scalePercent}%</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => applyScaleWithCenterLock(scale + SCALE_STEP)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={resetView}
              title="重置"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => { resetView(); onCancel(); }}
            >
              重新选择
            </Button>
            <Button
              onClick={() => { resetView(); onConfirm(); }}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              确认使用
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageConfirmDialog;
