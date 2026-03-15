import { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw } from "lucide-react";

interface ImageConfirmDialogProps {
  open: boolean;
  previewUrl: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ImageConfirmDialog = ({ open, previewUrl, onConfirm, onCancel }: ImageConfirmDialogProps) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.max(0.5, Math.min(5, s - e.deltaY * 0.001)));
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

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] flex flex-col p-0 gap-0">
        <div
          className="flex-1 overflow-hidden bg-black/90 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {previewUrl && (
            <img
              src={previewUrl}
              alt="预览"
              className="max-w-full max-h-full select-none pointer-events-none"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transition: dragging.current ? "none" : "transform 0.1s ease-out",
              }}
              draggable={false}
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-4 p-4 bg-background border-t">
          <Button variant="outline" onClick={() => { resetView(); onCancel(); }}>
            重新选择
          </Button>
          <Button variant="outline" size="icon" onClick={resetView} title="重置视图">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button onClick={() => { resetView(); onConfirm(); }} className="gap-2">
            <Check className="h-4 w-4" />
            确认使用
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageConfirmDialog;
