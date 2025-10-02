export const formatedDate = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function formatMongoTimeToHHMM(dateInput: Date | string): string {
  const date = new Date(dateInput)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}
