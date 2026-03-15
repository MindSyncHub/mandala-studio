import { useRef } from "react";
import { Upload } from "lucide-react";

interface InterpretUploadProps {
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InterpretUpload = ({ onDrop, onFileChange }: InterpretUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={onFileChange}
        className="hidden"
      />
      <div className="space-y-3 py-8">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Upload className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm font-medium">拖拽曼陀罗画作到此处</p>
        <p className="text-xs text-muted-foreground">
          或点击上传 · 支持 JPG / PNG · 最大 10MB
        </p>
      </div>
    </div>
  );
};

export default InterpretUpload;
