/**
 * Centralized walkthrough state that persists across route changes.
 * Uses the same useSyncExternalStore pattern as useDiscoveryStore.
 * In-memory only — resets on page refresh.
 */
import { useSyncExternalStore } from "react";

export type WalkthroughStep = 0 | 1 | 2 | 3 | 4; // 0 = not started / finished

type WalkthroughState = {
  active: boolean;
  step: WalkthroughStep;
  completed: boolean;
};

const DEFAULT: WalkthroughState = { active: true, step: 1, completed: false };

let state: WalkthroughState = { ...DEFAULT };
const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };
const getSnapshot = () => state;
const getServerSnapshot = () => DEFAULT;

export function useWalkthrough() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function walkthroughNext() {
  if (!state.active) return;
  const next = (state.step + 1) as WalkthroughStep;
  if (next > 4) {
    state = { ...state, active: false, step: 0 as WalkthroughStep, completed: true };
  } else {
    state = { ...state, step: next };
  }
  emit();
}

export function walkthroughBack() {
  if (!state.active || state.step <= 1) return;
  state = { ...state, step: (state.step - 1) as WalkthroughStep };
  emit();
}

export function walkthroughSkip() {
  state = { active: false, step: 0 as WalkthroughStep, completed: true };
  emit();
}

export function walkthroughFinish() {
  state = { active: false, step: 0 as WalkthroughStep, completed: true };
  emit();
}
