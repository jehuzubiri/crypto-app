export const groupDataBySameKeyVal = (arr = [], key: string): Object => {
  const _ = require("lodash");
  let finalData = {};
  try {
    _.mapValues((finalData = _.groupBy(arr, key)), (listArr = []) =>
      listArr.map((categ) => _.omit(categ, key))
    );
  } catch (error) {}
  return finalData;
};
