

## 计划：将四个占位项合并为可折叠的「方案定制」子菜单

### 改动文件

`src/components/AppSidebar.tsx` — 唯一需要修改的文件

### 具体实现

1. 从 `items` 数组中移除「个案方案、长程方案、沙龙定制、私教」四项
2. 在「疗愈方案」与「AI解读」之间，插入一个使用 `Collapsible` 包裹的菜单项「方案定制」（图标用 `Layers`）
3. 子菜单使用 sidebar 已有的 `SidebarMenuSub` + `SidebarMenuSubItem` + `SidebarMenuSubButton` 渲染四个子项
4. 当任一子项路由激活时，`Collapsible` 的 `defaultOpen` 设为 `true`，自动展开
5. 折叠模式下仅显示父级图标

路由和占位页已存在，无需改动。

