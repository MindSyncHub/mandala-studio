import { Settings } from "lucide-react";

const SettingsPage = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
      <Settings className="h-6 w-6 text-primary" />
      设置
    </h1>
    <p className="mt-2 text-muted-foreground">系统设置功能即将上线，敬请期待。</p>
  </div>
);

export default SettingsPage;
