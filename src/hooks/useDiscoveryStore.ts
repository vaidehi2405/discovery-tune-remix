import { useSyncExternalStore } from "react";
import type { DiscoveryLevel, Track } from "@/types/discovery";

type State = {
  level: DiscoveryLevel;
  hasGenerated: boolean;
  vault: string[];
  weeklyPreference: string;
  generatedTracks: Track[] | null;
};

const DEFAULT_STATE: State = {
  level: "balanced",
  hasGenerated: false,
  vault: [],
  weeklyPreference: "",
  generatedTracks: null,
};

let state: State = DEFAULT_STATE;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem("discovery-state-v1");
  } catch {
    /* ignore */
  }
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => state;
const getServerSnapshot = () => DEFAULT_STATE;

export function setDiscoveryLevel(level: DiscoveryLevel) {
  state = { ...state, level };
  emit();
}

export function setWeeklyPreference(weeklyPreference: string) {
  state = { ...state, weeklyPreference };
  emit();
}

export function setGeneratedTracks(tracks: Track[] | null) {
  state = { ...state, generatedTracks: tracks };
  emit();
}

export function markGenerated() {
  if (state.hasGenerated) return;
  state = { ...state, hasGenerated: true };
  emit();
}

export function toggleVault(trackId: string): boolean {
  const has = state.vault.includes(trackId);
  state = {
    ...state,
    vault: has ? state.vault.filter((id) => id !== trackId) : [...state.vault, trackId],
  };
  emit();
  return !has;
}

export function useDiscoveryState(): State {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useDiscoveryLevel(): DiscoveryLevel {
  return useDiscoveryState().level;
}

export function useHasGenerated(): boolean {
  return useDiscoveryState().hasGenerated;
}

export function useVault(): string[] {
  return useDiscoveryState().vault;
}

export function useGeneratedTracks(): Track[] | null {
  return useDiscoveryState().generatedTracks;
}
