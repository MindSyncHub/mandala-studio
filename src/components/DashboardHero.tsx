import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHero = () => {
  const navigate = useNavigate();

  return (
    <div className="warm-gradient rounded-2xl p-8 border border-border animate-fade-in">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
          欢迎回来，疗愈师 ✨
        </h1>
        <p className="text-muted-foreground mb-6">
          曼陀罗是通向内心世界的窗口。今天，让我们一起探索色彩与形状背后的心灵密语。
        </p>
        <Button
          onClick={() => navigate("/interpret")}
          className="gap-2"
          size="lg"
        >
          <Sparkles className="h-4 w-4" />
          开始 AI 解读
        </Button>
      </div>
    </div>
  );
};

export default DashboardHero;
