export const convertToTime = (date: string) => {
  const hours = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}`: `${new Date(date).getHours()}`;
  const minutes = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}`: `${new Date(date).getMinutes()}`;
  return `${hours}:${minutes}`
}

export const getAge = (birthDate: string) => {
  const birhday = new Date(birthDate).getTime();
  const diff_ms = Date.now() - birhday;
  const age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}