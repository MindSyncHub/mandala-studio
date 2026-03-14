

## 报告页改造计划

### 需要做的事

1. **安装 `react-markdown`** — 用于将 `report` 字段的 Markdown 渲染为 HTML。

2. **更新 `src/api/types.ts`** — `TherapistNotesResponse` 和 `TherapistPhase` 类型与用户描述的 API 字段不匹配，需要更新：
   - 顶层增加：`program_name`、`description`、`painting_focus`、`core_intervention`
   - `TherapistPhase` 增加：`goals`、`tasks`、`dialogue_examples`（替代当前的 `techniques`/`duration`）

3. **改造 `src/pages/Report.tsx`**（~180 行）：
   - 报告内容区：用 `ReactMarkdown` 渲染 `report` 字段
   - 新增「疗愈师参考」可折叠区块（使用 Collapsible 组件），点击按钮后懒加载调用 `getTherapistNotes`
   - 展示字段：`program_name`、`description`、`painting_focus`、`core_intervention`、`phases`（每阶段用 Accordion 展示 name/goals/tasks/dialogue_examples）、`observation_checklist`（列表）、`contraindications`（列表）
   - 若接口 404（`ApiError.status === 404`），显示「暂无该解读的疗愈师方案」
   - 加载中显示 spinner

4. **不改动的文件**：`src/api/interpretations.ts`（已有 `getTherapistNotes` 函数）、`src/api/index.ts`（已导出）、`src/App.tsx`（路由已存在）

### 技术细节

- 疗愈师笔记采用懒加载：只在用户点击展开时才请求，避免不必要的 API 调用
- 用 `ApiError` 类的 `status` 属性判断 404，其他错误显示通用提示
- Collapsible 作为外层折叠容器，内部各 phase 用 Accordion 逐个展开

