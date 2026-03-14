

## 上传曼陀罗页面改造计划

当前 `/interpret` 页面已有基础上传和解读功能，但缺少：绘画意图/感受输入、API 对齐的主题下拉（英文 value）、`existing=true` 冲突弹窗、成功后跳转报告页。

### 改动清单

#### 1. 改造 `src/pages/AiInterpret.tsx`
- 主题从 Badge 切换改为 `Select` 下拉，选项用英文 value + 中文 label：`general`、`intimate_relationship`、`wealth_career`、`health_wellness`、`personal_growth`
- 增加两个可选 `Textarea`：绘画意图、绘画感受
- 调用 `createInterpretation` 时传入 `painting_intention`、`painting_feeling`
- 收到响应后若 `existing === true`，打开 AlertDialog 让用户选择「使用旧报告」或「重新生成」（重新调用时 `force_new=true`）
- 成功后用 `useNavigate` 跳转到 `/report/:id`

#### 2. 新建 `src/pages/Report.tsx`（~80 行）
- 路由 `/report/:id`，从 URL 取 `interpretationId`
- 调用 `getReport(id)` 获取报告数据
- 复用 `InterpretResult` 思路展示报告内容（title、version、report markdown）
- 显示加载态和错误态

#### 3. 更新 `src/App.tsx`
- 添加 `/report/:id` 路由指向 `Report` 页面

#### 4. 不改动的文件
- `src/api/interpretations.ts`、`src/api/types.ts` — API 层已完备，无需修改
- `src/hooks/useImageUpload.ts`、`src/components/InterpretUpload.tsx` — 上传逻辑复用

