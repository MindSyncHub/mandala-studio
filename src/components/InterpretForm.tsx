import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

const THEME_OPTIONS = [
  { value: "general", label: "全面解读" },
  { value: "intimate_relationship", label: "亲密关系" },
  { value: "father_relationship", label: "父亲关系" },
  { value: "mother_relationship", label: "母亲关系" },
  { value: "parent_child_relationship", label: "亲子关系" },
  { value: "wealth_career", label: "财富事业" },
  { value: "health_wellness", label: "健康养生" },
  { value: "personal_growth", label: "个人成长" },
];

interface InterpretFormProps {
  theme: string;
  onThemeChange: (v: string) => void;
  paintingIntention: string;
  onIntentionChange: (v: string) => void;
  paintingFeeling: string;
  onFeelingChange: (v: string) => void;
  canSubmit: boolean;
  loading: boolean;
  onSubmit: () => void;
}

const InterpretForm = ({
  theme,
  onThemeChange,
  paintingIntention,
  onIntentionChange,
  paintingFeeling,
  onFeelingChange,
  canSubmit,
  loading,
  onSubmit,
}: InterpretFormProps) => (
  <>
    <div>
      <p className="text-sm font-medium mb-3">选择解读主题</p>
      <div className="flex flex-wrap gap-2">
        {THEME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onThemeChange(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              theme === opt.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-sm font-medium mb-2">绘画意图（可选）</p>
        <Textarea
          placeholder="创作这幅画时，你想表达什么？"
          value={paintingIntention}
          onChange={(e) => onIntentionChange(e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">绘画感受（可选）</p>
        <Textarea
          placeholder="画完之后，你有什么感受？"
          value={paintingFeeling}
          onChange={(e) => onFeelingChange(e.target.value)}
          rows={3}
        />
      </div>
    </div>

    <Button onClick={onSubmit} disabled={!canSubmit || loading} className="w-full gap-2" size="lg">
      <Sparkles className="h-4 w-4" />
      {loading ? "解读中…" : "开始解读"}
    </Button>
  </>
);

export default InterpretForm;
