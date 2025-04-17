export function formatDate(ioString) {
  const date = new Date(ioString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
