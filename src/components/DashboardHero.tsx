import { Button } from "@/components/ui/button";
import { Sparkles, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl animate-fade-in bg-accent">
      <div className="relative z-10 p-8 md:p-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            欢迎回来，疗愈师 ✨
          </h1>
          <p className="text-muted-foreground mb-6">
            每一幅曼陀罗都是内心的映射，让我们一起开启今天的疗愈之旅。
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/cases")}
              variant="default"
              size="lg"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              开始新个案
            </Button>
            <Button
              onClick={() => navigate("/interpret")}
              variant="outline"
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
