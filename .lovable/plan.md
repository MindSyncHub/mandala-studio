

## AI 解读页对齐 2C 交互改造

### 改动概览

需要重写/新建 5 个文件，修改 2 个文件，涉及 5 项交互变化。

### 1. 全屏图片确认弹层（新建 `src/components/ImageConfirmDialog.tsx`）

- 全屏 Dialog（`Dialog` + full-screen content），展示上传图片的大图预览
- 支持滚轮缩放（transform scale）和拖拽平移（mousedown/mousemove）
- 底部「确认使用」/「重新选择」两个按钮
- 用户在 `InterpretUpload` 选图后不直接确认，而是先打开此弹层；确认后才设置 file/preview 并触发自动检测

### 2. 自动三圈检测（改造 `src/components/CircleDetection.tsx`）

- 移除手动「检测圆圈」按钮，改为 `useEffect` 监听 `file` 变化自动调用 `detectCircles`
- 检测中展示 "AI 正在识别三圈边界..." + Loader 动画
- 失败时展示错误提示 + 「重试」按钮
- 滑块从三个改为两个：「内中分界线」（inner_radius）和「中外分界线」（middle_radius），outer_radius 取自检测结果的最大圈或图片尺寸，不可调
- 移除「确认三圈参数」手动确认步骤——滑块值变化即实时更新 `onResult`，自动检测完成也立即调用 `onResult`

### 3. 图上 SVG 叠加层（新建 `src/components/ThreeCirclesPreview.tsx`）

- 在曼陀罗图片上叠加 SVG，绘制两个同心圆环（内中分界 = 绿色，中外分界 = 蓝色）
- 圆心取图片中心，半径按比例缩放到预览尺寸
- 接收 `innerRadius`、`middleRadius`、`outerRadius`、`imageWidth`、`imageHeight` 作为 props，实时响应滑块变化

### 4. 主题选择胶囊化（改造 `src/components/InterpretForm.tsx`）

- 移除 `Select` 下拉框，改为横向 flex-wrap 布局的胶囊按钮组
- 每个主题一个 `button`，选中态加 `bg-primary text-white`，未选中 `bg-muted`
- THEME_OPTIONS 数组不变

### 5. 页面编排（改造 `src/pages/AiInterpret.tsx`）

上传前：显示 InterpretUpload（拖拽区）
上传后页面布局变为：
1. 顶部：ThreeCirclesPreview（图片 + SVG 叠加）+ 右上角 X 清除
2. 中部：CircleDetection（两个滑块，自动检测状态）
3. 下部：InterpretForm（胶囊主题 + 意图/感受 + 提交按钮）

`circleResult` 不再需要手动确认，检测完成或滑块变化即自动设置。

### 6. 上传 hook 改造（改造 `src/hooks/useImageUpload.ts`）

- 新增 `pendingFile` / `pendingPreview` 状态：选图后先存到 pending
- `confirmPending()` 方法将 pending 提升为正式 file/preview
- `cancelPending()` 清除 pending
- 原有 `file`/`preview` 仅在确认后才有值

### 文件清单

| 文件 | 操作 | 行数预估 |
|------|------|----------|
| `src/components/ImageConfirmDialog.tsx` | 新建 | ~120 |
| `src/components/ThreeCirclesPreview.tsx` | 新建 | ~80 |
| `src/components/CircleDetection.tsx` | 重写 | ~130 |
| `src/components/InterpretUpload.tsx` | 改造 | ~70 |
| `src/components/InterpretForm.tsx` | 改造 | ~90 |
| `src/pages/AiInterpret.tsx` | 改造 | ~130 |
| `src/hooks/useImageUpload.ts` | 改造 | ~60 |

所有文件 ≤200 行，API 调用继续使用 `src/api` 层。

