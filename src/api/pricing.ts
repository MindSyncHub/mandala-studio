import { apiClient } from './client';
import type { PricingResponse } from './types';

export function getPricing(): Promise<PricingResponse> {
  return apiClient.get<PricingResponse>('/api/v2/pricing');
}
