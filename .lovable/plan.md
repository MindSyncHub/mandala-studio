

## 现状分析

经过上一轮重构，两个页面文件**已经满足 200 行限制**：

- `AiInterpret.tsx` — 123 行，已拆出 `InterpretUpload`、`CircleDetection`、`InterpretForm`、`FeatureCards`
- `Report.tsx` — 91 行，已拆出 `ReportCard`、`TherapistNotes`

页面主文件只负责组合子组件和调用 api 层，不含大段 JSX 或逻辑。**无需再拆分。**

### 唯一需要改动：README 补充说明

当前 README 缺少后端项目名称（ai-mandala）和关键流程描述。

**改动文件：`README.md`**

在「本地开发」部分补充：
- 后端项目名为 `ai-mandala`，需在其根目录执行 uvicorn 命令
- 前端 `.env` 或 `.env.example` 中配置 `VITE_API_BASE_URL=http://localhost:8000`
- 关键流程说明：上传 → 三圈检测（可选）→ 创建解读 → 报告页；报告页有「再测一幅」回到上传页

不涉及任何代码逻辑改动。

