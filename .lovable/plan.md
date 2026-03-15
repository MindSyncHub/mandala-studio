

## 计划：报告页默认请求 Pro 版本

### 改动文件

| 文件 | 改动 |
|------|------|
| `src/pages/Report.tsx` | `fetchReport()` 默认传 `'pro'`；移除 version 参数 |
| `src/components/ReportCard.tsx` | 标题改为「AI 解读报告（Pro）」；隐藏版本号显示；升级按钮仅在 `can_upgrade` 时展示（逻辑不变） |

### 详细改动

**Report.tsx**
- `fetchReport` 不再接受 version 参数，固定调用 `getReport(id, 'pro')`
- `useEffect` 中直接调用 `fetchReport()`（已无参数）
- `handleUpgrade` 中升级成功后同样用 `getReport(id, 'pro')`（已正确）

**ReportCard.tsx**
- `CardTitle` 改为 `AI 解读报告（Pro）`
- 移除 `版本：{report.version}` 显示
- 升级按钮和升级提示文案保留，仅在 `report.can_upgrade` 为 true 时展示（即当前仅有 Lite 报告需要升级的场景）

