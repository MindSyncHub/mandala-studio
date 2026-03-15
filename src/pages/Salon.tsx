import { Palette } from "lucide-react";

const Salon = () => (
  <div className="animate-fade-in">
    <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
      <Palette className="h-6 w-6 text-primary" />
      沙龙定制
    </h1>
    <p className="mt-2 text-muted-foreground">该功能即将上线，敬请期待。</p>
  </div>
);

export default Salon;
