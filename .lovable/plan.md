

## 分析结果：所有要求已满足

经过逐文件核查，当前代码已完全符合你列出的全部 P0 要求：

### 1. 类型定义 (`src/api/types.ts`) ✅ 已正确
- `TherapistPhase`：`goal: string`、`therapist_tasks: string[]`、`key_points: string[]`、`dialogue_examples: DialogueExample[]`（对象数组，含 `场景?` 和 `话术?`）
- `TherapistNotesResponse`：已包含 `imbalance_type?: string`
- `PricingResponse`：`{ lite: number; pro: number; upgrade_diff: number }`

### 2. 疗愈师参考渲染 (`src/components/TherapistNotes.tsx`) ✅ 已正确
- 使用 `phase.goal`（非 goals）
- 使用 `phase.therapist_tasks`（非 tasks）
- 已展示 `phase.key_points`
- `dialogue_examples` 按「场景：xxx」「话术：xxx」渲染

### 3. 定价类型 ✅ 已正确
- `PricingResponse` 为 `{ lite: number; pro: number; upgrade_diff: number }`

### 4. 定价展示
- `ReportCard.tsx` 使用 `report.upgrade_price` 展示升级差价
- `getPricing` API 已定义但尚未在任何页面调用展示 lite/pro/upgrade_diff

### 结论

**无需修改。** 所有类型定义、渲染逻辑均已与后端一致。如果你希望在某个页面（如解读上传页）展示完整定价信息（Lite 版 ¥xx / Pro 版 ¥xx / 升级差价 ¥xx），可以告诉我具体放在哪里。

