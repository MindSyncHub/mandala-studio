

## UI 风格对齐原版 — 差异修复计划

通过对比原版仓库和当前项目，发现以下关键差异导致"感觉不对"：

### 1. CSS 变量差异（`src/index.css`）

原版和当前版本在多个色值上有细微但重要的差异：

| 变量 | 原版 | 当前 | 影响 |
|---|---|---|---|
| `--background` | `30 25% 97%` | `30 25% 96%` | 背景偏暗 |
| `--foreground` | `25 20% 15%` | `20 20% 15%` | 色相偏移 |
| `--card` | `30 20% 95%` | `30 20% 98%` | 卡片太白，缺乏暖感 |
| `--secondary-foreground` | `30 25% 97%` | `0 0% 100%` | 纯白 vs 暖白 |
| `--accent` | `35 40% 85%` | `38 60% 55%` | **差距最大**：原版是浅暖米色，当前是深金色 |
| `--warm-beige` | `35 40% 85%` | `30 25% 96%` | 原版更暖 |
| `--sidebar-accent` | `35 40% 85%` | `30 18% 93%` | 侧边栏高亮色不同 |
| `--shadow-soft` | `hsl(25 20% 15% / 0.08)` | `hsl(terracotta / 0.1)` | 原版阴影更柔和 |
| 缺失 `--terracotta-light` | `16 45% 70%` | 无 | 缺少浅陶土色 |
| 缺失 `--sage-light` | `140 18% 80%` | 无 | 缺少浅绿色 |

- 原版 body 显式设置 `font-family: 'Noto Sans SC'`
- 原版标题 `h1-h6` 全局应用 `Noto Serif SC`
- 原版 gradient/shadow 通过 CSS 自定义属性定义（`--gradient-mandala` 等），而当前版本在 utility 类里硬编码

暗色模式也有多处差异（hue 25 vs 20，accent 完全不同等）。

### 2. Tailwind 配置差异（`tailwind.config.ts`）

- 原版 `terracotta` 和 `sage` 有 `light` 子色：`terracotta.light`、`sage.light`，当前缺失
- 原版 `fade-in` 动画 `0.5s` 带 `forwards`，当前是 `0.4s` 无 `forwards`
- 原版 `spin-slow` 是 `20s`，当前是 `8s`

### 3. Dashboard Hero 区域

原版 Dashboard 有一张背景图片（`mandala-hero.jpg`），带 `relative overflow-hidden rounded-2xl`，图片做半透明覆盖效果。当前版本只是一个 `warm-gradient` 背景，缺乏视觉层次感。

原版 Hero 有两个 CTA 按钮（"开始新个案" + "AI解读"），当前只有一个。

### 4. StatCard 差异

原版 StatCard 支持 `variant` 属性（`default`/`primary`/`secondary`），可以让某些卡片有彩色背景突出显示。当前版本所有卡片样式统一，缺乏变化。

### 5. Schedule 页面

原版有完整的日历视图（月历 + 日期选择 + 预约列表 + 新建预约弹窗），当前只是占位文字。

### 6. Clients 页面

原版是卡片网格布局（`grid-cols-1 md:grid-cols-2`），每个卡片展示详细信息（年龄、邮箱、备注等），有点击弹窗。当前版本是简单列表布局，信息较少。

---

### 修改计划

#### 文件修改清单

| 文件 | 改动内容 |
|---|---|
| `src/index.css` | 对齐原版全部 CSS 变量值，增加 `--terracotta-light`/`--sage-light`，全局 h1-h6 serif 字体，gradient/shadow 用 CSS 变量 |
| `tailwind.config.ts` | `terracotta`/`sage` 改为对象（含 light），动画时间对齐原版 |
| `src/components/DashboardHero.tsx` | 添加 hero 背景图（用 Unsplash 占位曼陀罗图），双 CTA 按钮，半透明覆盖层 |
| `src/components/StatCard.tsx` | 增加 `variant` prop，支持 primary/secondary 彩色背景 |
| `src/pages/Dashboard.tsx` | 给部分 StatCard 传 variant |
| `src/pages/Schedule.tsx` | 实现完整日历视图（月历 + 预约列表 + 新建弹窗），对齐原版 ~200 行，拆子组件如有需要 |
| `src/pages/Clients.tsx` | 改为卡片网格布局，增加 age/email/notes 字段，增加详情弹窗 |

