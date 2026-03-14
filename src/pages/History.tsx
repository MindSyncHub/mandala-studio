import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { History, Search, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  id: string;
  title: string;
  theme: string;
  version: "lite" | "pro";
  date: string;
  thumbnail?: string;
}

const mockHistory: HistoryItem[] = [
  { id: "1", title: "春日曼陀罗", theme: "情感", version: "pro", date: "2026-03-13" },
  { id: "2", title: "内在平衡", theme: "全面解读", version: "lite", date: "2026-03-12" },
  { id: "3", title: "财富之轮", theme: "财富", version: "pro", date: "2026-03-10" },
  { id: "4", title: "心灵花园", theme: "健康", version: "lite", date: "2026-03-08" },
  { id: "5", title: "职业罗盘", theme: "事业", version: "pro", date: "2026-03-05" },
];

const allThemes = ["全部", "全面解读", "财富", "情感", "健康", "事业", "性格"];

const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [activeTheme, setActiveTheme] = useState("全部");

  const filtered = mockHistory.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesTheme = activeTheme === "全部" || item.theme === activeTheme;
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          解读历史
        </h1>
        <p className="text-sm text-muted-foreground mt-1">查看和管理所有曼陀罗解读记录</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索解读记录…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allThemes.map((t) => (
          <Badge
            key={t}
            variant={activeTheme === t ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveTheme(t)}
          >
            {t}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">暂无匹配记录</p>
        )}
        {filtered.map((item) => (
          <Card key={item.id} className="card-gradient shadow-soft hover:shadow-warm transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                  🎨
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{item.theme}</Badge>
                    <Badge variant={item.version === "pro" ? "default" : "outline"} className="text-xs">
                      {item.version.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
