export const convertToTime = (date: string) => {
  const hours = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}`: `${new Date(date).getHours()}`;
  const minutes = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}`: `${new Date(date).getMinutes()}`;
  return `${hours}:${minutes}`
}