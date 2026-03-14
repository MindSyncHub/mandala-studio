import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockClients = [
  { id: "1", name: "李明", sessions: "已完成 4 次疗愈", status: "进行中", lastVisit: "2026-02-28" },
  { id: "2", name: "张雪", sessions: "已完成 2 次疗愈", status: "待跟进", lastVisit: "2026-02-27" },
  { id: "3", name: "王芳", sessions: "已完成 8 次疗愈", status: "已完成", lastVisit: "2026-02-25" },
  { id: "4", name: "陈静", sessions: "已完成 3 次疗愈", status: "进行中", lastVisit: "2026-02-24" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "进行中": return "default";
    case "待跟进": return "secondary";
    case "已完成": return "outline";
    default: return "default";
  }
};

const RecentClients = () => {
  return (
    <Card className="card-gradient shadow-soft border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-serif">近期客户</CardTitle>
        <Button variant="link" className="text-primary text-sm p-0 h-auto">查看全部</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {mockClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                  {client.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.sessions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant(client.status) as "default" | "secondary" | "outline"}>
                  {client.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{client.lastVisit}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentClients;
