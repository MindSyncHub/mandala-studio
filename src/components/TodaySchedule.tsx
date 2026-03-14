import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const mockSchedule = [
  { id: "1", client: "李明", type: "曼陀罗绘画", time: "09:30" },
  { id: "2", client: "张雪", type: "解读回访", time: "11:00" },
  { id: "3", client: "新客户", type: "初次评估", time: "14:30" },
  { id: "4", client: "陈静", type: "方案调整", time: "16:00" },
];

const TodaySchedule = () => {
  return (
    <Card className="card-gradient shadow-soft border-0">
      <CardHeader>
        <CardTitle className="text-lg font-serif">今日日程</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSchedule.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{item.time}</p>
                <p className="text-sm font-semibold text-foreground">{item.client}</p>
                <p className="text-xs text-muted-foreground">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
          <CalendarDays className="h-4 w-4" />
          今日共 {mockSchedule.length} 个预约
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;
