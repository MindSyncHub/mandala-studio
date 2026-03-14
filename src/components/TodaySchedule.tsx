import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";

const mockSchedule = [
  { id: "1", client: "李明", type: "曼陀罗解读", time: "10:00" },
  { id: "2", client: "张华", type: "疗愈方案跟进", time: "14:00" },
  { id: "3", client: "新客户", type: "首次咨询", time: "16:30" },
];

const TodaySchedule = () => {
  return (
    <Card className="card-gradient shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-serif flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          今日日程
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockSchedule.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[60px]">
                <Clock className="h-3.5 w-3.5" />
                {item.time}
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-sm font-medium">{item.client}</p>
                <p className="text-xs text-muted-foreground">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;
