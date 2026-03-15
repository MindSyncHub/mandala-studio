

## 计划：侧栏预留四个占位入口

### 改动

| 文件 | 改动 |
|------|------|
| `src/pages/CasePlan.tsx` | 新建占位页「个案方案」 |
| `src/pages/LongTermPlan.tsx` | 新建占位页「长程方案」 |
| `src/pages/Salon.tsx` | 新建占位页「沙龙定制」 |
| `src/pages/PrivateCoach.tsx` | 新建占位页「私教」 |
| `src/components/AppSidebar.tsx` | 侧栏 items 增加四项（用合适的 lucide 图标） |
| `src/App.tsx` | 增加四条路由 `/case-plan`, `/long-term-plan`, `/salon`, `/private-coach` |

四个占位页结构与现有 `Cases.tsx`、`Plans.tsx` 一致：图标 + 标题 + 「该功能即将上线，敬请期待。」

侧栏新增项放在「疗愈方案」之后、「AI解读」之前，顺序为：个案方案、长程方案、沙龙定制、私教。

