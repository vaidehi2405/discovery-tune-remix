export type DiscoveryLevel = "familiar" | "balanced" | "exploratory";

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverGradient: string;
  album?: string;
  image?: string;
  reason?: string;
}

export interface DiscoveryLevelConfig {
  id: DiscoveryLevel;
  label: string;
  description: string;
  familiarPercent: number;
  newPercent: number;
  gradient: string;
  preview: Track[];
}

export type FeedbackReason =
  | "not_my_taste"
  | "too_repetitive"
  | "too_mainstream"
  | "wrong_mood"
  | "already_know"
  | "too_different"
  | "other";

export interface FeedbackPayload {
  trackId: string;
  reason: FeedbackReason;
  details?: string;
}
