const getUserPreferedTheme = () => {
  if (typeof window === "undefined") return "dark";

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLightMode = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  if (isDarkMode) return "dark";
  if (isLightMode) return "light";
  return "dark";
};

const getUserStorageTheme = () => {
  if (typeof window === "undefined") return "dark";

  const theme = window.localStorage.getItem("thec-editor-theme");
  if (theme) return theme;
  return "dark";
};

export { getUserPreferedTheme, getUserStorageTheme };
