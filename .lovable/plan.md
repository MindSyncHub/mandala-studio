

## 项目骨架搭建计划

API 层已完成且符合架构要求。现在需要补充路由骨架和布局组件。

### 新建文件

| 文件 | 作用 | 行数 |
|---|---|---|
| `src/components/Layout.tsx` | 通用布局壳：侧边栏导航 + `<Outlet />` 渲染子路由 | ~60 行 |
| `src/pages/Dashboard.tsx` | 占位首页，替换当前空白 Index 页 | ~20 行 |

### 修改文件

| 文件 | 改动 |
|---|---|
| `src/App.tsx` | 改为嵌套路由：`Layout` 包裹 `Dashboard` + `NotFound`，预留后续页面路由位置 |

### Layout 设计

- 左侧固定侧边栏，包含导航链接占位（Dashboard、曼陀罗解读、报告、设置）
- 右侧主内容区用 `<Outlet />`
- 使用 Tailwind 布局，不调用任何 API
- 通过 `NavLink` 高亮当前路由

### 路由结构

```text
/              → Layout > Dashboard
/interpret     → Layout > (占位，后续实现)
/reports       → Layout > (占位，后续实现)
/settings      → Layout > (占位，后续实现)
*              → NotFound
```

### 删除文件

- `src/pages/Index.tsx`（被 Dashboard 替代）

