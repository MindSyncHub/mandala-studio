import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Client {
  id: string;
  name: string;
  status: "进行中" | "待跟进" | "已完成";
  sessions: number;
  lastVisit: string;
  phone: string;
}

const mockClients: Client[] = [
  { id: "1", name: "李明", status: "进行中", sessions: 8, lastVisit: "2026-03-12", phone: "138****1234" },
  { id: "2", name: "张华", status: "待跟进", sessions: 3, lastVisit: "2026-03-10", phone: "139****5678" },
  { id: "3", name: "王芳", status: "已完成", sessions: 12, lastVisit: "2026-03-08", phone: "137****9012" },
  { id: "4", name: "陈婷", status: "进行中", sessions: 5, lastVisit: "2026-03-07", phone: "136****3456" },
  { id: "5", name: "刘洋", status: "待跟进", sessions: 1, lastVisit: "2026-03-05", phone: "135****7890" },
];

const statusVariant = (s: string) => {
  if (s === "进行中") return "default";
  if (s === "待跟进") return "secondary";
  return "outline";
};

const Clients = () => {
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            客户管理
          </h1>
          <p className="text-sm text-muted-foreground mt-1">管理您的客户信息与疗愈进度</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          新建客户
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索客户…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((client) => (
          <Card key={client.id} className="card-gradient shadow-soft hover:shadow-warm transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-base font-semibold text-primary">
                  {client.name[0]}
                </div>
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {client.phone} · {client.sessions} 次疗程 · 最近 {client.lastVisit}
                  </p>
                </div>
              </div>
              <Badge variant={statusVariant(client.status) as "default" | "secondary" | "outline"}>
                {client.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;
