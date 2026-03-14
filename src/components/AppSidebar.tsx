import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  ClipboardList,
  Sparkles,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "工作台", url: "/", icon: LayoutDashboard },
  { title: "日程管理", url: "/schedule", icon: CalendarDays },
  { title: "客户管理", url: "/clients", icon: Users },
  { title: "个案记录", url: "/cases", icon: FileText },
  { title: "疗愈方案", url: "/plans", icon: ClipboardList },
  { title: "AI解读", url: "/interpret", icon: Sparkles },
  { title: "解读历史", url: "/history", icon: History },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo & Title */}
        <div className="p-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🪷</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-base font-serif font-bold text-foreground leading-tight">曼陀罗疗愈</h2>
                <p className="text-xs text-muted-foreground">工作管理平台</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                R
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-medium text-foreground">RanRan</p>
                  <p className="text-xs text-muted-foreground">专业版</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
