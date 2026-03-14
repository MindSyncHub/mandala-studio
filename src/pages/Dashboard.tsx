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
          title="客户总数"
          value={28}
          icon={Users}
          description="本月新增 3 位"
          trend="↑ 12%"
          variant="primary"
        />
        <StatCard
          title="个案记录"
          value={64}
          icon={FileText}
          description="本周 5 条"
        />
        <StatCard
          title="疗愈方案"
          value={15}
          icon={ClipboardList}
          description="进行中 8 个"
          variant="secondary"
        />
        <StatCard
          title="AI 解读"
          value={42}
          icon={Sparkles}
          description="本月 12 次"
          trend="↑ 25%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentClients />
        <TodaySchedule />
      </div>
    </div>
  );
};

export default Dashboard;
