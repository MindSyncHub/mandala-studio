import { apiClient } from './client';
import type {
  CreateInterpretationParams,
  CreateInterpretationResponse,
  InterpretationSummary,
  ReportResponse,
  ReportVersion,
  TherapistNotesResponse,
  UpgradeResponse,
} from './types';

export function createInterpretation(
  params: CreateInterpretationParams,
): Promise<CreateInterpretationResponse> {
  const form = new FormData();
  form.append('image', params.image);
  form.append('user_id', params.user_id);
  if (params.theme) form.append('theme', params.theme);
  if (params.painting_intention) form.append('painting_intention', params.painting_intention);
  if (params.painting_feeling) form.append('painting_feeling', params.painting_feeling);
  if (params.force_new !== undefined) form.append('force_new', String(params.force_new));
  if (params.three_circles) form.append('three_circles', params.three_circles);

  return apiClient.postForm<CreateInterpretationResponse>('/api/v2/interpretations', form);
}

export function getReport(
  interpretationId: string,
  version?: ReportVersion,
): Promise<ReportResponse> {
  const params: Record<string, string> = {};
  if (version) params.version = version;
  return apiClient.get<ReportResponse>(
    `/api/v2/interpretations/${interpretationId}/report`,
    params,
  );
}

export function getTherapistNotes(
  interpretationId: string,
): Promise<TherapistNotesResponse> {
  return apiClient.get<TherapistNotesResponse>(
    `/api/v2/interpretations/${interpretationId}/therapist-notes`,
  );
}

export function upgradeToPro(
  interpretationId: string,
): Promise<UpgradeResponse> {
  return apiClient.post<UpgradeResponse>(
    `/api/v2/interpretations/${interpretationId}/upgrade`,
    { model: 'kimi' },
  );
}
