import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  variant?: "default" | "primary" | "secondary";
}

const variantStyles = {
  default: {
    card: "card-gradient shadow-soft hover:shadow-warm",
    icon: "bg-primary/10",
    iconColor: "text-primary",
  },
  primary: {
    card: "bg-primary shadow-soft hover:shadow-warm",
    icon: "bg-primary-foreground/20",
    iconColor: "text-primary-foreground",
  },
  secondary: {
    card: "bg-secondary shadow-soft hover:shadow-warm",
    icon: "bg-secondary-foreground/20",
    iconColor: "text-secondary-foreground",
  },
};

const StatCard = ({ title, value, icon: Icon, description, trend, variant = "default" }: StatCardProps) => {
  const styles = variantStyles[variant];
  const isColored = variant !== "default";

  return (
    <Card className={cn("transition-shadow duration-300 border-0", styles.card)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className={cn("text-sm", isColored ? "text-primary-foreground/70" : "text-muted-foreground")}>{title}</p>
            <p className={cn("text-3xl font-serif font-bold", isColored ? "text-primary-foreground" : "text-foreground")}>{value}</p>
            {description && (
              <p className={cn("text-xs", isColored ? "text-primary-foreground/60" : "text-muted-foreground")}>{description}</p>
            )}
            {trend && (
              <p className={cn("text-xs font-medium", isColored ? "text-primary-foreground/80" : "text-secondary")}>{trend}</p>
            )}
          </div>
          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", styles.icon)}>
            <Icon className={cn("h-6 w-6", styles.iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
