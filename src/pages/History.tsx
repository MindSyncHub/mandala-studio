import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Eye, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  id: string;
  title: string;
  theme: string;
  status: string;
  date: string;
  preview: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1", title: "春日曼陀罗", theme: "情感分析", status: "已分享",
    date: "2026-03-13",
    preview: "该曼陀罗以暖色调为主，大量运用红色与橙色，反映出创作者内心对温暖与归属的渴望。三圈结构中内圈紧密，外圈舒展，暗示…",
  },
  {
    id: "2", title: "内在平衡", theme: "全面解读", status: "",
    date: "2026-03-12",
    preview: "色彩分布均匀，蓝绿色系占主导地位。构图对称工整，体现出创作者对秩序和平衡的追求。五行属性以水木为主…",
  },
  {
    id: "3", title: "财富之轮", theme: "财富事业", status: "已分享",
    date: "2026-03-10",
    preview: "黄色和金色的大量运用与五行中的土金元素相呼应。中圈饱满且向外扩展，象征着对物质丰盛的积极期待…",
  },
  {
    id: "4", title: "心灵花园", theme: "健康状态", status: "",
    date: "2026-03-08",
    preview: "以绿色系为主调，辅以少量粉色点缀。图案呈现花朵绽放的形态，反映创作者对自我疗愈和成长的美好愿景…",
  },
  {
    id: "5", title: "职业罗盘", theme: "事业发展", status: "",
    date: "2026-03-05",
    preview: "构图呈明确的方向性，以蓝紫色为核心向外辐射。结构严谨有力，体现出创作者对职业道路的清晰规划…",
  },
];

const HistoryPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          解读历史
        </h1>
        <p className="text-sm text-muted-foreground mt-1">回顾和对比过往的AI曼陀罗解读记录</p>
      </div>

      <div className="space-y-4">
        {mockHistory.map((item) => (
          <Card key={item.id} className="card-gradient shadow-soft hover:shadow-warm transition-shadow">
            <CardContent className="p-4 flex gap-4">
              <div className="h-24 w-24 rounded-xl bg-accent shrink-0 flex items-center justify-center text-2xl">
                🎨
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <Badge variant="secondary" className="text-xs">{item.theme}</Badge>
                  {item.status && <Badge variant="outline" className="text-xs">{item.status}</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{item.date}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.preview}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                    <Eye className="h-3.5 w-3.5" />
                    查看详情
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
