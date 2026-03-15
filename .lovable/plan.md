

## 计划：补全主题列表 + 历史记录对接后端

### 1. 补全 THEME_OPTIONS（`src/components/InterpretForm.tsx`）

在现有 5 个主题基础上，增加关系类主题：

```ts
const THEME_OPTIONS = [
  { value: "general", label: "全面解读" },
  { value: "intimate_relationship", label: "亲密关系" },
  { value: "father_relationship", label: "父亲关系" },
  { value: "mother_relationship", label: "母亲关系" },
  { value: "parent_child_relationship", label: "亲子关系" },
  { value: "wealth_career", label: "财富事业" },
  { value: "health_wellness", label: "健康养生" },
  { value: "personal_growth", label: "个人成长" },
];
```

### 2. 历史记录对接后端

**`src/api/types.ts`** — 新增类型：

```ts
export interface InterpretationSummary {
  interpretation_id: string;
  title?: string;
  theme?: string;
  version: 'lite' | 'pro';
  created_at: string;
  thumbnail_url?: string;
}
```

**`src/api/interpretations.ts`** — 新增函数：

```ts
export function getUserInterpretations(
  userId: string,
): Promise<InterpretationSummary[]> {
  return apiClient.get<InterpretationSummary[]>(
    `/api/v2/users/${userId}/interpretations`,
  );
}
```

**`src/api/index.ts`** — 导出新函数。

**`src/pages/History.tsx`** — 改造：
- 删除 mock 数据，改用 `useEffect` 调用 `getUserInterpretations('therapist_demo')`
- 加载/错误/空状态处理
- 点击 Eye 按钮跳转 `/report/{interpretation_id}`
- 主题筛选 badge 从后端数据动态生成（去重）

### 改动文件

| 文件 | 操作 |
|------|------|
| `src/components/InterpretForm.tsx` | 补全 THEME_OPTIONS |
| `src/api/types.ts` | 新增 InterpretationSummary |
| `src/api/interpretations.ts` | 新增 getUserInterpretations |
| `src/api/index.ts` | 导出新函数 |
| `src/pages/History.tsx` | 对接后端 API，删除 mock |

