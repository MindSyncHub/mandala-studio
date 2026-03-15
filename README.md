# 曼陀罗解读平台

## 技术栈

- Vite + React + TypeScript
- shadcn-ui + Tailwind CSS
- 后端 API 通过 `src/api` 层统一调用，base URL 由 `VITE_API_BASE_URL` 环境变量控制

## 本地开发

### 1. 启动后端（ai-mandala 项目）

在后端项目 `ai-mandala` 根目录执行：

```sh
uvicorn app.api.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 配置前端环境变量

在前端项目根目录创建 `.env`（可参考 `.env.example`）：

```
VITE_API_BASE_URL=http://localhost:8000
```

### 3. 启动前端

```sh
npm run dev
```

## 关键流程

1. **上传曼陀罗图片** — 在解读页上传图片
2. **三圈检测（可选）** — 系统自动检测三圈位置，可手动调整
3. **创建解读** — 填写主题、意图、感受等信息后提交
4. **查看报告** — 报告页展示 AI 解读结果与疗愈师参考
5. **再测一幅** — 报告页可点击「再测一幅」回到上传页

## 部署

在 [Lovable](https://lovable.dev) 中点击 Share → Publish 即可发布。
