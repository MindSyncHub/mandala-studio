import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { History, Search, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserInterpretations } from "@/api";
import type { InterpretationSummary } from "@/api/types";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTheme, setActiveTheme] = useState("全部");
  const [items, setItems] = useState<InterpretationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserInterpretations("therapist_demo")
      .then(setItems)
      .catch((e) => setError(e.message ?? "加载失败"))
      .finally(() => setLoading(false));
  }, []);

  const themes = useMemo(() => {
    const set = new Set(items.map((i) => i.theme).filter(Boolean) as string[]);
    return ["全部", ...Array.from(set)];
  }, [items]);

  const filtered = items.filter((item) => {
    const matchesSearch = (item.title ?? "").toLowerCase().includes(search.toLowerCase());
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
        <p className="text-sm text-muted-foreground mt-1">查看所有曼陀罗解读记录</p>
      </div>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索解读记录…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {themes.map((t) => (
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

      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && <p className="text-center text-destructive py-12">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">暂无匹配记录</p>
          )}
          {filtered.map((item) => (
            <Card key={item.interpretation_id} className="card-gradient shadow-soft hover:shadow-warm transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                    🎨
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.title ?? "未命名"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.theme && <Badge variant="secondary" className="text-xs">{item.theme}</Badge>}
                      <Badge variant={item.version === "pro" ? "default" : "outline"} className="text-xs">
                        {item.version.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => navigate(`/report/${item.interpretation_id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
