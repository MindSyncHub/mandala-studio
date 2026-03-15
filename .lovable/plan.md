

## 计划：三圈检测必做 + 可编辑 + 提交记录修改

### 改动概览

| 文件 | 改动 |
|------|------|
| `src/api/types.ts` | `CreateInterpretationParams` 增加 `three_circles_auto_detect` 和 `three_circles_user_adjusted` 字段 |
| `src/api/interpretations.ts` | FormData 构建中追加两个新字段 |
| `src/components/CircleDetection.tsx` | 重写：检测后展示可编辑的内/中/外圈滑块+数值输入；回调改为传出结构化数据（confirmed values + auto-detect raw + adjusted flag） |
| `src/pages/AiInterpret.tsx` | 状态管理改为结构化三圈数据；提交按钮 `canSubmit` 条件加上三圈已确认；submit 传入三个字段 |

### 详细设计

**1. 类型变更 (`src/api/types.ts`)**

```ts
export interface CreateInterpretationParams {
  // ...existing fields
  three_circles?: string;
  three_circles_auto_detect?: string;
  three_circles_user_adjusted?: boolean;
}
```

**2. API 层 (`src/api/interpretations.ts`)**

在 FormData 构建中增加：
```ts
if (params.three_circles_auto_detect) form.append('three_circles_auto_detect', params.three_circles_auto_detect);
if (params.three_circles_user_adjusted !== undefined) form.append('three_circles_user_adjusted', String(params.three_circles_user_adjusted));
```

**3. CircleDetection 组件重写**

- 标题改为「三圈检测（必须）」
- 检测成功后（≥2 圆），从 auto-detect 结果计算 inner/middle/outer radius，存为 `autoValues` 和可编辑的 `editedValues`
- 展示三组滑块（或 Input type=number）：内圈、中圈、外圈半径，疗愈师可调整
- 增加「确认三圈参数」按钮，点击后锁定并回调父组件
- 回调接口改为：
  ```ts
  interface CircleDetectionResult {
    threeCircles: string;        // 最终确认值 JSON
    autoDetect: string;          // 原始检测值 JSON
    userAdjusted: boolean;       // 是否修改过
  }
  onResult: (result: CircleDetectionResult | undefined) => void;
  ```
- 确认后仍可点「重新编辑」解锁调整

**4. AiInterpret 页面**

- 状态从 `threeCirclesJson: string | undefined` 改为 `circleResult: CircleDetectionResult | null`
- `canSubmit` 条件：`!!file && !!circleResult`（三圈必须已确认）
- submit 时传入三个字段：
  ```ts
  three_circles: circleResult.threeCircles,
  three_circles_auto_detect: circleResult.autoDetect,
  three_circles_user_adjusted: circleResult.userAdjusted,
  ```
- handleClear 时清空 circleResult

**5. InterpretForm**

`canSubmit` prop 已由父组件控制，无需改动。按钮在三圈未确认时自动 disabled。

