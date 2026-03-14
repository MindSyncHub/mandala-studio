

## API 层实现计划

### 新建文件

| 文件 | 内容 |
|---|---|
| `src/api/client.ts` | 通用 fetch 封装，baseURL 从 `import.meta.env.VITE_API_BASE_URL` 读取，支持 JSON 和 FormData 请求 |
| `src/api/types.ts` | 所有请求/响应的 TypeScript 类型定义 |
| `src/api/interpretations.ts` | `createInterpretation`, `getReport`, `getTherapistNotes` |
| `src/api/pricing.ts` | `getPricing` |
| `src/api/detect.ts` | `detectCircles`（可选） |
| `src/api/index.ts` | 统一导出 |
| `.env.example` | `VITE_API_BASE_URL=http://localhost:8000` |

### client.ts 设计

- `get<T>(path)` — GET JSON
- `post<T>(path, body)` — POST JSON
- `postForm<T>(path, formData)` — POST FormData（不设 Content-Type，让浏览器自动处理 boundary）
- 统一错误处理：非 2xx 抛出包含 status 和 body 的错误

### types.ts 关键类型

```ts
// Pricing
PricingResponse { lite, pro, upgrade_diff }

// Interpretation
CreateInterpretationParams { image, user_id, theme?, painting_intention?, painting_feeling?, force_new? }
CreateInterpretationResponse { success, interpretation_id, version, title?, report?, can_upgrade, upgrade_price, elapsed_time, existing?, error? }

// Report
ReportResponse { interpretation_id, version, title?, report?, ai_qa_context?, can_upgrade, upgrade_price?, error? }

// Therapist Notes
TherapistNotesResponse { phases, observation_checklist, contraindications, ... }

// Detect Circles
DetectCirclesResponse { ... }
```

### 约束

- 不引入 axios，用原生 fetch
- 每个文件 < 200 行
- 不写任何 UI 代码

