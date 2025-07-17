export const getStorage = () => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("user-store");
    if (raw) return JSON.parse(raw);
  }
  return null;
};