import { useRef } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterpretUploadProps {
  preview: string | null;
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const InterpretUpload = ({ preview, onDrop, onFileChange, onClear }: InterpretUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
      onClick={() => !preview && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={onFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="曼陀罗预览"
            className="max-h-64 rounded-xl shadow-soft mx-auto"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-3 py-8">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <p className="text-sm font-medium">上传曼陀罗作品</p>
          <p className="text-xs text-muted-foreground">
            支持 JPG、PNG 格式，AI将从色彩、构图、五行等多维度进行深度解读
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            选择图片上传
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterpretUpload;
