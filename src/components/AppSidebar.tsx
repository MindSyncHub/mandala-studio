import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  ClipboardList,
  FileCog,
  CalendarRange,
  Palette,
  GraduationCap,
  Sparkles,
  History,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "工作台", url: "/dashboard", icon: LayoutDashboard },
  { title: "日程管理", url: "/schedule", icon: CalendarDays },
  { title: "客户管理", url: "/clients", icon: Users },
  { title: "个案记录", url: "/cases", icon: FileText },
  { title: "疗愈方案", url: "/plans", icon: ClipboardList },
  { title: "个案方案", url: "/case-plan", icon: FileCog },
  { title: "长程方案", url: "/long-term-plan", icon: CalendarRange },
  { title: "沙龙定制", url: "/salon", icon: Palette },
  { title: "私教", url: "/private-coach", icon: GraduationCap },
  { title: "AI解读", url: "/interpret", icon: Sparkles },
  { title: "解读历史", url: "/history", icon: History },
  { title: "设置", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-serif text-primary">
            疗愈师工作站
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
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
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center text-muted-foreground hover:text-foreground"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4 mr-2" />
              <span>收起</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
