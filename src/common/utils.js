export const buildCategory = ( categories ) => {
  var options = [];
  if (categories == null) {
    return options;
  }

  for (var parent of categories) {
    var parentCategory = {
      "categoryNo": parent["parentCategoryNo"],
      "categoryName": parent["parentCategoryName"],
      "isParent": true
      };
      options.push(parentCategory);
  
      if (parent["subCategories"].length !== 0) {
        var sub = parent["subCategories"].map((c, i) => {
          return {
            "categoryNo": c["categoryNo"],
            "categoryName": c["name"],
            "isParent": false,
          };
        });
        options.push(...sub);
      }
  }
  return options;
}

export const convertDateToString = ( date ) => {
  console.log("Convert date " + date + "; day " + date.getDay() + "; month " + date.getMonth())
  const dayDate = date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString();
  const monthDate = date.getMonth() > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString();
  return date.getFullYear().toString() + "-" + monthDate + "-" + dayDate;
}