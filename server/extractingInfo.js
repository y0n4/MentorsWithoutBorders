const getCategoryIds = (data) => {
  return data.reduce((userCategories, userCategory) => {
    userCategories.push(userCategory.dataValues.categoryId);
    return userCategories
  }, []);
};

module.exports = {
  getCategoryIds
};