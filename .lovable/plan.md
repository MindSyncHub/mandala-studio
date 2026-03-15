

## 分析结果：所有要求已满足，无需修改

当前代码已完整实现你描述的结构：

### 1. 一级菜单「方案定制」 ✅
`AppSidebar.tsx` 第 93-120 行：使用 `Collapsible` 组件，图标为 `Layers`，标题「方案定制」，与工作台/日程管理等同级但作为折叠父项存在。

### 2. 子级结构 ✅
四个子项（个案方案、长程方案、沙龙定制、私教）通过 `SidebarMenuSub` 嵌套在折叠面板内，不与一级菜单并列。点击展开/收起，子项激活时自动展开。

### 3. 占位页与路由 ✅
- `App.tsx` 已注册 `/case-plan`、`/long-term-plan`、`/salon`、`/private-coach` 四条路由
- 四个页面组件（`CasePlan.tsx`、`LongTermPlan.tsx`、`Salon.tsx`、`PrivateCoach.tsx`）均已存在，内容为「该功能即将上线，敬请期待」

**结论：无需修改。**

