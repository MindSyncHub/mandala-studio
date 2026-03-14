import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockClients = [
  { id: "1", name: "李明", status: "进行中", lastVisit: "2026-03-12" },
  { id: "2", name: "张华", status: "待跟进", lastVisit: "2026-03-10" },
  { id: "3", name: "王芳", status: "已完成", lastVisit: "2026-03-08" },
  { id: "4", name: "陈婷", status: "进行中", lastVisit: "2026-03-07" },
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
    <Card className="card-gradient shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-serif">近期客户</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
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
                  <p className="text-sm font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">
                    最近访问：{client.lastVisit}
                  </p>
                </div>
              </div>
              <Badge variant={statusVariant(client.status) as "default" | "secondary" | "outline"}>
                {client.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentClients;
