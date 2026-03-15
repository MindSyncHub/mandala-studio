

## 现状：几乎全部已修复

经检查，之前的重构**已经完成了绝大部分 P0 修改**：

| 项目 | 现状 |
|------|------|
| `TherapistPhase.goal` (string) | ✅ 已正确 |
| `TherapistPhase.therapist_tasks` (string[]) | ✅ 已正确 |
| `TherapistPhase.key_points` (string[]) | ✅ 已正确 |
| `TherapistPhase.dialogue_examples` (对象数组) | ✅ 已正确，渲染 `d.场景` / `d.话术` |
| `PricingResponse` (三个数字字段) | ✅ 已正确 |
| `TherapistNotes.tsx` 渲染逻辑 | ✅ 已正确 |

### 唯一遗漏：`imbalance_type` 字段

用户提到后端 `TherapistNotesResponse` 包含 `imbalance_type` 字段，当前类型定义中缺失。

**改动：`src/api/types.ts` 第 77-86 行**

在 `TherapistNotesResponse` 中增加 `imbalance_type?: string` 字段。无需额外 UI 改动（可在后续需求中展示）。

