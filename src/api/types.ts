// ── Pricing ──────────────────────────────────────────

export interface PricingTier {
  price: number;
  currency: string;
  features: string[];
}

export interface PricingResponse {
  lite: PricingTier;
  pro: PricingTier;
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

export interface TherapistPhase {
  name: string;
  goals: string[];
  tasks: string[];
  dialogue_examples: string[];
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
