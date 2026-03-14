import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const validateAndSet = useCallback((f: File) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      toast({ title: "格式不支持", description: "请上传 JPG 或 PNG 图片", variant: "destructive" });
      return false;
    }
    if (f.size > MAX_SIZE) {
      toast({ title: "文件过大", description: "图片不能超过 10MB", variant: "destructive" });
      return false;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    return true;
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) validateAndSet(f);
    },
    [validateAndSet],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) validateAndSet(f);
    },
    [validateAndSet],
  );

  const clear = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  }, [preview]);

  return { file, preview, onDrop, onFileChange, clear };
}
