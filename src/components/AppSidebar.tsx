import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  ClipboardList,
  Layers,
  FileCog,
  CalendarRange,
  Palette,
  GraduationCap,
  Sparkles,
  History,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const items = [
  { title: "工作台", url: "/dashboard", icon: LayoutDashboard },
  { title: "日程管理", url: "/schedule", icon: CalendarDays },
  { title: "客户管理", url: "/clients", icon: Users },
  { title: "个案记录", url: "/cases", icon: FileText },
  { title: "疗愈方案", url: "/plans", icon: ClipboardList },
];

const customSubItems = [
  { title: "个案方案", url: "/case-plan", icon: FileCog },
  { title: "长程方案", url: "/long-term-plan", icon: CalendarRange },
  { title: "沙龙定制", url: "/salon", icon: Palette },
  { title: "私教", url: "/private-coach", icon: GraduationCap },
];

const bottomItems = [
  { title: "AI解读", url: "/interpret", icon: Sparkles },
  { title: "解读历史", url: "/history", icon: History },
  { title: "设置", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  const isCustomActive = customSubItems.some((item) => isActive(item.url));

  const renderItem = (item: (typeof items)[0]) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
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
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-serif text-primary">
            疗愈师工作站
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(renderItem)}

              {/* 方案定制 - 可折叠子菜单 */}
              <Collapsible defaultOpen={isCustomActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`hover:bg-muted/50 transition-colors ${isCustomActive ? "bg-primary/10 text-primary font-medium" : ""}`}
                    >
                      <Layers className="mr-2 h-4 w-4" />
                      {!collapsed && <span>方案定制</span>}
                      {!collapsed && (
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {customSubItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink
                              to={item.url}
                              className="hover:bg-muted/50 transition-colors"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              <item.icon className="mr-2 h-3 w-3" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {bottomItems.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}