import { useState } from "react";
import { CalendarDays, Plus, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";

interface Appointment {
  id: string;
  clientName: string;
  time: string;
  type: string;
  status: "已确认" | "待确认" | "已取消";
}

const mockAppointments: Appointment[] = [
  { id: "1", clientName: "李明", time: "09:00", type: "曼陀罗绘画", status: "已确认" },
  { id: "2", clientName: "张华", time: "10:30", type: "色彩疗愈", status: "待确认" },
  { id: "3", clientName: "王芳", time: "14:00", type: "个案咨询", status: "已确认" },
  { id: "4", clientName: "陈婷", time: "16:00", type: "团体疗愈", status: "已取消" },
];

const statusVariant = (s: string) => {
  if (s === "已确认") return "default";
  if (s === "待确认") return "secondary";
  return "outline";
};

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            日程管理
          </h1>
          <p className="text-sm text-muted-foreground mt-1">管理您的预约与日程安排</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          新建预约
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-gradient shadow-soft lg:col-span-1">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card className="card-gradient shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {date ? `${date.getMonth() + 1}月${date.getDate()}日 预约` : "今日预约"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{apt.time} — {apt.clientName}</p>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant(apt.status) as "default" | "secondary" | "outline"}>
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
