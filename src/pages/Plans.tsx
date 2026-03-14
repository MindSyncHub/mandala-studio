import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Check, Circle } from "lucide-react";

interface PlanItem {
  id: string;
  name: string;
  status: string;
  client: string;
  weeks: number;
  progress: number;
  progressColor: string;
  checklist: { label: string; done: boolean }[];
}

const mockPlans: PlanItem[] = [
  {
    id: "1", name: "焦虑缓解疗愈方案", status: "执行中",
    client: "李明", weeks: 8, progress: 50, progressColor: "hsl(35, 70%, 50%)",
    checklist: [
      { label: "初始心理评估", done: true },
      { label: "曼陀罗绘画基础训练", done: true },
      { label: "情绪识别与表达练习", done: true },
      { label: "深度色彩疗愈", done: false },
      { label: "自我调节技巧学习", done: false },
      { label: "疗愈成果评估", done: false },
    ],
  },
  {
    id: "2", name: "自我探索成长方案", status: "执行中",
    client: "陈婷", weeks: 12, progress: 40, progressColor: "hsl(180, 50%, 45%)",
    checklist: [
      { label: "自我认知评估", done: true },
      { label: "内在小孩探索", done: true },
      { label: "潜意识图像解析", done: false },
      { label: "生命叙事整合", done: false },
      { label: "个人成长计划制定", done: false },
    ],
  },
  {
    id: "3", name: "压力释放方案", status: "执行中",
    client: "赵敏", weeks: 6, progress: 83, progressColor: "hsl(120, 45%, 45%)",
    checklist: [
      { label: "压力源识别", done: true },
      { label: "放松技巧训练", done: true },
      { label: "曼陀罗冥想练习", done: true },
      { label: "正念呼吸法", done: true },
      { label: "压力管理策略", done: true },
      { label: "长期维护计划", done: false },
    ],
  },
];

const Plans = () => (
  <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif font-bold">疗愈方案</h1>
        <p className="text-sm text-muted-foreground mt-1">制定和跟踪个性化疗愈方案</p>
      </div>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        创建方案
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockPlans.map((plan) => (
        <Card key={plan.id} className="card-gradient shadow-soft hover:shadow-warm transition-shadow">
          <CardContent className="p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm">{plan.name}</h3>
                <Badge variant="default">{plan.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{plan.client} · {plan.weeks} 周</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">完成进度</span>
                <span className="font-medium">{plan.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${plan.progress}%`, backgroundColor: plan.progressColor }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {plan.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {item.done ? (
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                  )}
                  <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full">
              查看详情 →
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Plans;
