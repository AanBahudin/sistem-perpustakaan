export const formatedDate = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};