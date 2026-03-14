import { CalendarDays } from "lucide-react";

const Schedule = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
      <CalendarDays className="h-6 w-6 text-primary" />
      日程管理
    </h1>
    <p className="mt-2 text-muted-foreground">日程管理功能即将上线，敬请期待。</p>
  </div>
);

export default Schedule;
