export function isFieldEmpty(val) {
  if (val === null || val === undefined) return true;
  if (typeof val !== "string") return false;
  const trimmed = val.trim();
  const upper = trimmed.toUpperCase();
  if (
    trimmed === "" ||
    upper === "N/A" ||
    trimmed === "-" ||
    upper.startsWith("N/A") ||
    upper === "GET LATEST PRICE"
  ) {
    return true;
  }
  return false;
}
