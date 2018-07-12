const getCategoryIds = (data) => {
  return data.reduce((userCategories, userCategory) => {
    userCategories.push(userCategory.dataValues.categoryId);
    return userCategories
  }, []);
};

const getMentorInfo = (mentors) => {
  return mentors.reduce((mentorInfo, mentor) => {
    mentorInfo.push(mentor.dataValues);
    return mentorInfo;
  }, []);
}

module.exports = {
  getCategoryIds,
  getMentorInfo
};