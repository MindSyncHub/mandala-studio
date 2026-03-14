import { apiClient } from './client';
import type { DetectCirclesResponse } from './types';

export function detectCircles(form: FormData): Promise<DetectCirclesResponse> {
  return apiClient.postForm<DetectCirclesResponse>('/api/v2/detect-circles', form);
}
