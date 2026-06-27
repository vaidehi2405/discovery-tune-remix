// Tracks whether the user has performed any client-side navigation in this
// session. On a fresh page load (or refresh), this resets to false, which
// lets non-index routes redirect back to the homepage.
let hasNavigated = false;

export function markNavigated() {
  hasNavigated = true;
}

export function hasClientNavigated() {
  return hasNavigated;
}