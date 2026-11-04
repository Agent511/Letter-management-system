export const generateReference = (type: 'IN' | 'OUT'): string => {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `${type}-${year}-${rand}`;
};