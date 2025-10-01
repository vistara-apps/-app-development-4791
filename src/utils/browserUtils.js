export function isBrowser() { return typeof window !== 'undefined'; }

export function doSomething() {
  if (isBrowser()) {
    // Browser-specific code
    console.log(window.location.href);
  } else {
    // Fallback or server-side logic
    console.log('Not in a browser environment');
  }
}