

## 串联页面流程

### 现状

代码已基本串通：
- `/interpret` 上传成功后 `navigate('/report/${id}')` 跳转报告页
- `/report/:id` 顶部有「返回上传」按钮（ghost 样式）
- 所有请求均通过 `src/api` 层，`apiClient` 使用 `VITE_API_BASE_URL`
- 路由已注册：`/interpret`、`/report/:id`

### 需要调整

1. **默认路由 `/` 指向上传页** — 当前 `/` 指向 Dashboard，改为重定向到 `/interpret`，让用户进入即开始核心流程。

2. **报告页底部增加「再测一幅」按钮** — 当前只有顶部的 ghost 返回按钮，在报告内容和疗愈师参考之后，增加一个醒目的底部按钮「再测一幅」，点击跳转 `/interpret`。

3. **确认 `.env.example`** — 已有 `VITE_API_BASE_URL=http://localhost:8000`，无需改动。

### 改动文件

| 文件 | 改动 |
|------|------|
| `src/App.tsx` | 将 `/` 路由从 `<Dashboard />` 改为 `<Navigate to="/interpret" replace />`（保留 Dashboard 在 `/dashboard` 路由） |
| `src/pages/Report.tsx` | 在疗愈师参考 Collapsible 之后，增加一个居中的「再测一幅」Button，`onClick={() => navigate('/interpret')}` |

### 不改动
- `src/api/*` — 已完备
- `src/pages/AiInterpret.tsx` — 流程已正确
- `.env.example` — 已有正确配置

