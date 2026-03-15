

## AI 解读页对齐 2C：全屏选择框改造

### 现状分析

Items 2-5 已实现：
- ✅ 自动三圈检测（CircleDetection useEffect 自动触发）
- ✅ 两个滑块（内中/中外分界线）
- ✅ 图上 SVG 分界线叠加（ThreeCirclesPreview）
- ✅ 横向胶囊主题选择（InterpretForm）

**唯一需要改造的是 `ImageConfirmDialog.tsx`**——当前是简单的全屏图片预览 + 缩放平移，需改为 2C 版的「圆形镂空 + 十字标记 + 圆心锚定缩放」交互。

### 改造内容：重写 `src/components/ImageConfirmDialog.tsx`

#### 视觉结构
- 全屏 Dialog，背景纯黑
- 中央圆形镂空区域：尺寸 `min(84vw, 68vh)`，圆内显示画作，圆外用 `box-shadow: 0 0 0 9999px rgba(0,0,0,0.78)` 遮黑
- 圆心红色十字标记：两条 1.5px 线、26×26px、颜色 `rgba(255, 64, 64, 0.95)`，固定在圆形几何中心不随画作移动

#### 两步提示语
- 顶部显示：「第一步：请将画作的圆心与十字标记对齐。」「第二步：请调节画作到合适的大小。」

#### 底部控制栏
- `−` 按钮 / 当前比例百分比 / `+` 按钮 / 重置按钮
- 「重新选择」「确认使用」按钮

#### 圆心锚定缩放算法
- 缩放时同步调整 offset：`newOffset = { x: prev.x * (newScale / oldScale), y: prev.y * (newScale / oldScale) }`
- 滚轮缩放和按钮缩放均使用此算法
- 拖拽平移保持现有逻辑不变

#### 交互
- 画作在圆形区域内可拖拽平移
- 滚轮或 ±按钮 缩放（0.3x ~ 5x）
- 重置按钮恢复 scale=1, offset=(0,0)

### 文件清单

| 文件 | 操作 | 预估行数 |
|------|------|----------|
| `src/components/ImageConfirmDialog.tsx` | 重写 | ~180 |

其余文件无需修改。

