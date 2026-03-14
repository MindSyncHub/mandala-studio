import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, ChevronRight } from "lucide-react";

interface CaseItem {
  id: string;
  name: string;
  avatar: string;
  badge: string;
  date: string;
  description: string;
  colorTheme: string;
  emotionTag: string;
  progress: number;
  progressColor: string;
}

const mockCases: CaseItem[] = [
  {
    id: "1", name: "李明", avatar: "李", badge: "曼陀罗绘画疗愈",
    date: "2026-03-12",
    description: "来访者在本次疗程中选择了暖色调为主的曼陀罗图案，表现出对内在温暖和安全感的渴望。绘画过程中情绪逐渐放松，从最初的紧张转为平和。",
    colorTheme: "暖色系·红橙", emotionTag: "焦虑缓解",
    progress: 65, progressColor: "hsl(35, 70%, 50%)",
  },
  {
    id: "2", name: "张雪", avatar: "张", badge: "初次评估",
    date: "2026-03-10",
    description: "首次来访评估，来访者对曼陀罗绘画展现出浓厚兴趣。初步评估显示存在轻度焦虑症状，建议制定系统化的疗愈方案。",
    colorTheme: "冷色系·蓝绿", emotionTag: "轻度焦虑",
    progress: 20, progressColor: "hsl(180, 50%, 45%)",
  },
  {
    id: "3", name: "刘伟", avatar: "刘", badge: "深度疗愈",
    date: "2026-03-08",
    description: "经过多次疗程后，来访者的绘画风格明显变化，从碎片化图案转为更加整合的圆形结构，反映出内心整合过程的推进。",
    colorTheme: "多彩·对比", emotionTag: "积极转变",
    progress: 80, progressColor: "hsl(120, 45%, 45%)",
  },
  {
    id: "4", name: "陈静", avatar: "陈", badge: "曼陀罗绘画疗愈",
    date: "2026-03-05",
    description: "本次疗程聚焦亲子关系主题，来访者在绘画中呈现了家庭动力关系的象征图案。疗愈过程中有明显的情绪释放。",
    colorTheme: "暖色系·粉紫", emotionTag: "情绪释放",
    progress: 45, progressColor: "hsl(330, 50%, 50%)",
  },
];

const Cases = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif font-bold">个案记录</h1>
        <p className="text-sm text-muted-foreground mt-1">查看和管理所有疗愈个案</p>
      </div>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        新建记录
      </Button>
    </div>

    <div className="space-y-4">
      {mockCases.map((c) => (
        <Card key={c.id} className="card-gradient shadow-soft hover:shadow-warm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                    style={{ backgroundColor: c.progressColor }}
                  >
                    {c.avatar}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{c.name}</span>
                    <Badge variant="secondary">{c.badge}</Badge>
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{c.colorTheme}</Badge>
                  <Badge variant="outline" className="text-xs">{c.emotionTag}</Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">疗愈进度</span>
                    <span className="font-medium">{c.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${c.progress}%`, backgroundColor: c.progressColor }}
                    />
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="shrink-0 mt-2">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Cases;
