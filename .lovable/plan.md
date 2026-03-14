

## 参考旧版实现功能和 UI 风格 — 实施计划

通过分析旧版仓库 `MindSyncHub/mandala-mind-studio`，提取以下关键设计元素和功能模块，迁移到当前项目。

---

### 一、设计系统迁移（主题色 + 字体 + 动画）

旧版采用暖色调东方疗愈风格，需要迁移：

**`src/index.css`** — 替换全部 CSS 变量：
- 暖色主题：terracotta 主色 (`16 45% 50%`)、sage 绿 (`140 18% 45%`)、golden (`38 60% 55%`)、warm-beige 背景
- Google Fonts 引入 Noto Serif SC + Noto Sans SC
- 自定义 utility 类：`mandala-gradient`、`warm-gradient`、`card-gradient`、`shadow-soft`、`shadow-warm`
- 暗色模式变量

**`tailwind.config.ts`** — 扩展配置：
- `fontFamily`：serif / sans 映射到 Noto 字体
- 自定义颜色：`terracotta`、`sage`、`golden`、`warm-beige`、`deep-earth`
- 动画：`fade-in`、`scale-in`、`spin-slow`

---

### 二、侧边栏导航更新

**`src/components/AppSidebar.tsx`** — 更新导航项对齐旧版：

| 图标 | 标题 | 路由 |
|---|---|---|
| LayoutDashboard | 工作台 | `/` |
| CalendarDays | 日程管理 | `/schedule` |
| Users | 客户管理 | `/clients` |
| FileText | 个案记录 | `/cases` |
| ClipboardList | 疗愈方案 | `/plans` |
| Sparkles | AI解读 | `/interpret` |
| History | 解读历史 | `/history` |

---

### 三、页面实现（按优先级）

#### 1. Dashboard 工作台（~180 行，拆子组件）
- Hero banner 区（欢迎语 + CTA 按钮）
- 4 个 StatCard 统计卡片（客户数、个案数、方案数、AI解读数）
- 近期客户列表（mock 数据）
- 今日日程列表（mock 数据）
- 新建 `src/components/StatCard.tsx` 可复用统计卡片组件

#### 2. AI 解读页 `/interpret`（~180 行，拆 hook）
- 图片上传区（拖拽 + 点击，10MB 限制，JPG/PNG）
- 解读主题选择（全面解读、财富、情感、健康、事业、性格）
- 调用 `createInterpretation` API
- 4 个特色功能卡片（五行色彩分析、三圈结构解读、心理映射、疗愈建议）
- 解读结果展示区（Markdown 渲染）
- 提取上传逻辑到 `src/hooks/useImageUpload.ts`

#### 3. 解读历史页 `/history`（~150 行）
- 列表展示历史解读记录（调用 API 或 mock）
- 支持查看详情、删除
- 主题标签筛选

#### 4. 客户管理页 `/clients`（~130 行）
- 搜索 + 客户列表（mock 数据）
- 客户状态标签（进行中/待跟进/已完成）
- 客户详情侧面板

#### 5. 占位页面
- `/schedule`、`/cases`、`/plans`、`/settings` 各创建简单占位页

---

### 四、路由注册

**`src/App.tsx`** — 在 Layout 下注册所有新路由。

---

### 五、文件清单

| 操作 | 文件 | 行数 |
|---|---|---|
| 改 | `src/index.css` | ~140 |
| 改 | `tailwind.config.ts` | ~115 |
| 改 | `src/components/AppSidebar.tsx` | ~65 |
| 改 | `src/App.tsx` | ~40 |
| 改 | `src/pages/Dashboard.tsx` | ~120 |
| 新建 | `src/components/StatCard.tsx` | ~45 |
| 新建 | `src/components/DashboardHero.tsx` | ~35 |
| 新建 | `src/components/RecentClients.tsx` | ~55 |
| 新建 | `src/components/TodaySchedule.tsx` | ~50 |
| 新建 | `src/pages/AiInterpret.tsx` | ~120 |
| 新建 | `src/hooks/useImageUpload.ts` | ~60 |
| 新建 | `src/components/InterpretUpload.tsx` | ~80 |
| 新建 | `src/components/InterpretResult.tsx` | ~60 |
| 新建 | `src/components/FeatureCards.tsx` | ~45 |
| 新建 | `src/pages/History.tsx` | ~150 |
| 新建 | `src/pages/Clients.tsx` | ~130 |
| 新建 | `src/pages/Schedule.tsx` | ~20 |
| 新建 | `src/pages/Cases.tsx` | ~20 |
| 新建 | `src/pages/Plans.tsx` | ~20 |
| 新建 | `src/pages/Settings.tsx` | ~20 |
| 删 | `src/App.css` | - |

### 约束遵守

- 所有页面通过 `src/api` 调接口，不写 fetch
- 组件通过 props 接收数据，不直接调后端
- 单文件不超过 200 行，复杂页面拆子组件 + hook
- TypeScript 严格类型，无 any

