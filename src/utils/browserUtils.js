function getWindow() {
  if (typeof window !== 'undefined') {
    return window;
  } else {
    return null;
  }
}

export function performBrowserTask() {
  const win = getWindow();
  if (win) {
    // Perform operations that require window
    console.log(win.location.href);
  } else {
    console.log('Window object is not available in this environment.');
  }
}
