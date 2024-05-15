export const formatNumber = (num, fixed = 2) => {
  let formattedNum = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fixed,
    maximumFractionDigits: fixed,
  }).format(num);
  return formattedNum;
};
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
