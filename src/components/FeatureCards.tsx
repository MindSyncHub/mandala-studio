import { Card, CardContent } from "@/components/ui/card";
import { Palette, Target, Brain, Heart } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "五行色彩分析",
    desc: "解析曼陀罗中的色彩运用与五行能量对应关系",
  },
  {
    icon: Target,
    title: "三圈结构解读",
    desc: "内圈、中圈、外圈的象征意义与心理映射",
  },
  {
    icon: Brain,
    title: "心理映射",
    desc: "从构图与用色中解读潜意识信息与情绪状态",
  },
  {
    icon: Heart,
    title: "疗愈建议",
    desc: "基于解读结果生成个性化的疗愈方向与建议",
  },
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((f) => (
        <Card key={f.title} className="card-gradient shadow-soft hover:shadow-warm transition-shadow">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
