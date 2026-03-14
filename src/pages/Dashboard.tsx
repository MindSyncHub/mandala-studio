import { Users, FileText, ClipboardList, Sparkles } from "lucide-react";
import StatCard from "@/components/StatCard";
import DashboardHero from "@/components/DashboardHero";
import RecentClients from "@/components/RecentClients";
import TodaySchedule from "@/components/TodaySchedule";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHero />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="活跃客户"
          value={24}
          icon={Users}
          description="本月新增 3 位"
          variant="primary"
        />
        <StatCard
          title="个案记录"
          value={156}
          icon={FileText}
          description="本周 8 次"
        />
        <StatCard
          title="疗愈方案"
          value={18}
          icon={ClipboardList}
          description="进行中 6 个"
          variant="secondary"
        />
        <StatCard
          title="AI解读"
          value={42}
          icon={Sparkles}
          description="本月使用次数"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentClients />
        </div>
        <TodaySchedule />
      </div>
    </div>
  );
};

export default Dashboard;
