# 曼陀罗解读平台

## 本地开发

1. 启动后端：
```sh
uvicorn app.api.main:app --reload --host 0.0.0.0 --port 8000
```

2. 启动前端：
```sh
VITE_API_BASE_URL=http://localhost:8000 npm run dev
```

## 技术栈

- Vite + React + TypeScript
- shadcn-ui + Tailwind CSS
- 后端 API 通过 `src/api` 层统一调用，base URL 由 `VITE_API_BASE_URL` 环境变量控制

## 部署

在 [Lovable](https://lovable.dev) 中点击 Share → Publish 即可发布。
