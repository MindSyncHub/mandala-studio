// ── Pricing ──────────────────────────────────────────

export interface PricingResponse {
  lite: number;
  pro: number;
  upgrade_diff: number;
}

// ── Interpretation ───────────────────────────────────

export interface CreateInterpretationParams {
  image: File;
  user_id: string;
  theme?: string;
  painting_intention?: string;
  painting_feeling?: string;
  force_new?: boolean;
  three_circles?: string;
}

export interface CreateInterpretationResponse {
  success: boolean;
  interpretation_id: string;
  version: 'lite' | 'pro';
  title?: string;
  report?: string;
  can_upgrade: boolean;
  upgrade_price: number;
  elapsed_time: number;
  existing?: boolean;
  error?: string;
}

// ── Report ───────────────────────────────────────────

export type ReportVersion = 'lite' | 'pro';

export interface ReportResponse {
  interpretation_id: string;
  version: ReportVersion;
  title?: string;
  report?: string;
  ai_qa_context?: string;
  can_upgrade: boolean;
  upgrade_price?: number;
  error?: string;
}

// ── Upgrade ─────────────────────────────────────────

export interface UpgradeRequest {
  model: string;
}

export interface UpgradeResponse {
  success: boolean;
  interpretation_id: string;
  error?: string;
}

// ── Therapist Notes ──────────────────────────────────

export interface DialogueExample {
  场景?: string;
  话术?: string;
}

export interface TherapistPhase {
  name: string;
  duration: string;
  goal: string;
  therapist_tasks: string[];
  key_points: string[];
  dialogue_examples: DialogueExample[];
}

export interface TherapistNotesResponse {
  interpretation_id: string;
  program_name: string;
  description: string;
  painting_focus: string;
  core_intervention: string;
  phases: TherapistPhase[];
  observation_checklist: string[];
  contraindications: string[];
}

// ── History / User Interpretations ───────────────────

export interface InterpretationSummary {
  interpretation_id: string;
  title?: string;
  theme?: string;
  version: 'lite' | 'pro';
  created_at: string;
  thumbnail_url?: string;
}

// ── Detect Circles ───────────────────────────────────

export interface DetectedCircle {
  x: number;
  y: number;
  radius: number;
  confidence: number;
}

export interface DetectCirclesResponse {
  circles: DetectedCircle[];
  image_width: number;
  image_height: number;
}
