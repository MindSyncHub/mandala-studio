import { Button } from "@/components/ui/button";
import { Sparkles, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/mandala-hero.jpg";

const DashboardHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl animate-fade-in">
      <img
        src={heroImage}
        alt="曼陀罗"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative z-10 p-8 md:p-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            欢迎回来，疗愈师 ✨
          </h1>
          <p className="text-primary-foreground/80 mb-6">
            曼陀罗是通向内心世界的窗口。今天，让我们一起探索色彩与形状背后的心灵密语。
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/cases")}
              variant="secondary"
              size="lg"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              开始新个案
            </Button>
            <Button
              onClick={() => navigate("/interpret")}
              size="lg"
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI 解读
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
