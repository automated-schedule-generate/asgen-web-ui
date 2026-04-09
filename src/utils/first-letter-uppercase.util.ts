export function firstLetterUpperCase(text: string) {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}
