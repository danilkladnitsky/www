export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-EN", { year: "numeric", month: "short", day: "numeric" }).format(new Date(date));
}