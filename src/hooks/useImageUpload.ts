import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState<string | null>(null);

  const validateAndSetPending = useCallback((f: File) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      toast({ title: "格式不支持", description: "请上传 JPG 或 PNG 图片", variant: "destructive" });
      return false;
    }
    if (f.size > MAX_SIZE) {
      toast({ title: "文件过大", description: "图片不能超过 10MB", variant: "destructive" });
      return false;
    }
    setPendingFile(f);
    setPendingPreview(URL.createObjectURL(f));
    return true;
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) validateAndSetPending(f);
    },
    [validateAndSetPending],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) validateAndSetPending(f);
    },
    [validateAndSetPending],
  );

  const confirmPending = useCallback(() => {
    if (pendingFile && pendingPreview) {
      setFile(pendingFile);
      setPreview(pendingPreview);
      setPendingFile(null);
      setPendingPreview(null);
    }
  }, [pendingFile, pendingPreview]);

  const cancelPending = useCallback(() => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(null);
    setPendingPreview(null);
  }, [pendingPreview]);

  const clear = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  }, [preview]);

  return { file, preview, pendingFile, pendingPreview, onDrop, onFileChange, confirmPending, cancelPending, clear };
}
