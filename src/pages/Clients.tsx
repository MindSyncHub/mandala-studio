import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Client {
  id: string;
  name: string;
  age: number;
  status: "进行中" | "待跟进" | "已完成";
  sessions: number;
  lastVisit: string;
  phone: string;
  email: string;
  quote: string;
  color: string;
}

const mockClients: Client[] = [
  { id: "1", name: "李明", age: 35, status: "进行中", sessions: 8, lastVisit: "2026-03-12", phone: "138****1234", email: "liming@example.com", quote: "焦虑情绪改善中", color: "hsl(35, 70%, 50%)" },
  { id: "2", name: "张华", age: 28, status: "待跟进", sessions: 3, lastVisit: "2026-03-10", phone: "139****5678", email: "zhanghua@example.com", quote: "首次来访，需建立信任", color: "hsl(25, 60%, 45%)" },
  { id: "3", name: "王芳", age: 42, status: "已完成", sessions: 12, lastVisit: "2026-03-08", phone: "137****9012", email: "wangfang@example.com", quote: "疗程已完成，效果良好", color: "hsl(80, 40%, 45%)" },
  { id: "4", name: "陈婷", age: 31, status: "进行中", sessions: 5, lastVisit: "2026-03-07", phone: "136****3456", email: "chenting@example.com", quote: "亲子关系议题探索中", color: "hsl(15, 65%, 50%)" },
  { id: "5", name: "刘洋", age: 26, status: "待跟进", sessions: 1, lastVisit: "2026-03-05", phone: "135****7890", email: "liuyang@example.com", quote: "职场压力，需要进一步评估", color: "hsl(45, 55%, 50%)" },
  { id: "6", name: "赵敏", age: 38, status: "进行中", sessions: 6, lastVisit: "2026-03-04", phone: "134****2345", email: "zhaomin@example.com", quote: "自我探索与成长", color: "hsl(0, 50%, 50%)" },
];

const statusVariant = (s: string) => {
  if (s === "进行中") return "default";
  if (s === "待跟进") return "secondary";
  return "outline";
};

const Clients = () => {
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.quote.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">客户管理</h1>
          <p className="text-sm text-muted-foreground mt-1">管理和查看所有客户信息</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          新增客户
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索客户姓名或备注…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <Card key={client.id} className="card-gradient shadow-soft hover:shadow-warm transition-shadow">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-full flex items-center justify-center text-base font-semibold text-white shrink-0"
                    style={{ backgroundColor: client.color }}
                  >
                    {client.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.age}岁</p>
                  </div>
                </div>
                <Badge variant={statusVariant(client.status) as "default" | "secondary" | "outline"}>
                  {client.status}
                </Badge>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{client.phone}</p>
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{client.email}</p>
              </div>

              <div className="pt-2 border-t border-border space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>已完成 {client.sessions} 次疗愈</span>
                  <span>{client.lastVisit}</span>
                </div>
                <p className="text-xs italic text-muted-foreground">"{client.quote}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;
