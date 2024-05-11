export const getUid = (id = "id_u_") => {
  let uid = id + Math.random().toString(16).slice(2) + new Date().getTime();
  return uid;
};

export const getRandomValue = (minRange, maxRange) => {
  const min = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  const max = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomValue;
};

// Math.round() => 4.3 = 4 || 4.6 = 5
// Math.ceil() => 4.3 = 5
// Math.floor => 4.3 = 4
