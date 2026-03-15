

## P0 + P1 改动计划

### P0-1: 修复 TherapistPhase 类型与渲染

**`src/api/types.ts`** — 替换 `TherapistPhase`：
```ts
export interface DialogueExample {
  场景?: string;
  话术?: string;
}

export interface TherapistPhase {
  name: string;
  duration: string;
  goal: string;              // 单字符串，非数组
  therapist_tasks: string[];
  key_points: string[];
  dialogue_examples: DialogueExample[];  // 对象数组
}
```

**`src/pages/Report.tsx`** 疗愈阶段渲染部分：
- `phase.goals` → `phase.goal`（单行文本）
- `phase.tasks` → `phase.therapist_tasks`
- 新增 `phase.key_points` 列表
- `phase.dialogue_examples` 改为渲染 `d.场景` 和 `d.话术`（而非直接 `{d}`）

### P0-2: 修复 PricingResponse 类型

**`src/api/types.ts`** — 替换 Pricing 部分：
```ts
export interface PricingResponse {
  lite: number;
  pro: number;
  upgrade_diff: number;
}
```
删除 `PricingTier` 接口。检查 `Plans.tsx` — 当前未使用定价数据，无需改。

### P1: 拆分大文件（≤200 行）

**Report.tsx（270 行）→ 拆分：**
- `src/components/ReportCard.tsx` — 报告卡片 + 升级按钮（接收 report, onUpgrade, upgrading props）
- `src/components/TherapistNotes.tsx` — 疗愈师参考折叠区块（接收 id prop，内部管理 lazy fetch 状态）
- `src/pages/Report.tsx` — 精简为组合这两个子组件 + 加载/错误状态

**AiInterpret.tsx（265 行）→ 拆分：**
- `src/components/CircleDetection.tsx` — 三圈检测卡片（接收 file, onResult props）
- `src/components/InterpretForm.tsx` — 主题选择 + 意图/感受输入 + 提交按钮
- `src/pages/AiInterpret.tsx` — 精简为组合子组件

### P1: README 补充

在 README 开头添加本地开发说明：
```
## 本地开发
1. 启动后端：uvicorn app.api.main:app --reload --host 0.0.0.0 --port 8000
2. 启动前端：VITE_API_BASE_URL=http://localhost:8000 npm run dev
```

### 改动文件汇总

| 文件 | 操作 |
|------|------|
| `src/api/types.ts` | 修改 TherapistPhase、删除 PricingTier、修改 PricingResponse |
| `src/components/ReportCard.tsx` | 新建 |
| `src/components/TherapistNotes.tsx` | 新建 |
| `src/pages/Report.tsx` | 重写（组合子组件，≤80 行） |
| `src/components/CircleDetection.tsx` | 新建 |
| `src/components/InterpretForm.tsx` | 新建 |
| `src/pages/AiInterpret.tsx` | 重写（组合子组件，≤100 行） |
| `README.md` | 补充本地开发说明 |

