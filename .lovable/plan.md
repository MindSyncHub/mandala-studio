

## 分析与计划

### 文件行数现状

| 文件 | 行数 | 子组件 |
|------|------|--------|
| `AiInterpret.tsx` | 126 行 | 已拆分：`InterpretUpload`、`CircleDetection`、`InterpretForm`、`FeatureCards` |
| `Report.tsx` | 88 行 | 已拆分：`ReportCard`、`TherapistNotes` |

两个文件均已低于 200 行且逻辑清晰，无需进一步拆分。

唯一可做的微优化：将 `AiInterpret.tsx` 中的 existing 冲突弹窗（AlertDialog，约 18 行）提取为 `ExistingConflictDialog` 组件，以及将 submit 逻辑提取为 `useInterpretSubmit` hook。但收益有限，当前结构已符合指南。

### 实际改动：README 更新

更新 `README.md` 的「关键流程」部分，将三圈检测标注为**必做**步骤，并明确报告默认为 Pro 版本：

```
## 关键流程

1. **上传曼陀罗图片** — 在解读页上传图片
2. **三圈检测（必做）** — 系统自动检测三圈位置，疗愈师可手动调整后确认
3. **创建解读** — 填写主题、意图、感受等信息后提交
4. **查看报告** — 报告页展示 AI 解读结果（Pro）与疗愈师参考
5. **再测一幅** — 报告页可点击「再测一幅」回到上传页
```

其余 README 内容（后端启动、环境变量）已在之前更新中覆盖，无需重复修改。

