/**
 * In-memory session state for onboarding coach marks.
 * Resets on page refresh — no persistence needed for the prototype.
 */

let homeCoachShown = false;
let playlistCoachShown = false;
let vaultToastShown = false;

export function hasSeenHomeCoach() {
  return homeCoachShown;
}
export function markHomeCoachSeen() {
  homeCoachShown = true;
}

export function hasSeenPlaylistCoach() {
  return playlistCoachShown;
}
export function markPlaylistCoachSeen() {
  playlistCoachShown = true;
}

export function hasSeenVaultToast() {
  return vaultToastShown;
}
export function markVaultToastSeen() {
  vaultToastShown = true;
}
