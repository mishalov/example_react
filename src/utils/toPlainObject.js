export default arr => {
  let obj = {};
  arr.forEach(el => {
    obj[el] = true;
  });
  return obj;
};
