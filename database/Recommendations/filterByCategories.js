// const { getCurrentUserCategories } = require('../index.js');
const { getCategoryIds } = require('../../server/extractingInfo');

/*
  Mentors mentoring in specific topics {
    - Takes in all mentors as array
    
    - Create variable for filtered array
    - Iterate through the array
    - If topic matches topics user is interested in
      - Add score key and set equal to 0
      - Push current mentor into filtered array
    - Return filtered array
  }
  Mentors that are within a certain age {
    - Takes in array passed from above function
    - Takes in number to restrict age gap, defaults to 5
    
    - Filter array for mentors within same age range as current user
    - If absolute val of currentUser's age - currentMentor's age < 6
      - Multiply val by 5 and add to currentMentor's score
    - Else
      - Add 25 to currentMentor's score
    
    - Return filtered array
  }
  Mentors active around same time {
    - Takes in array passed from above function
    
    - Filter array for mentors that are active same time as user
    - Subtract currentUser's - currentMentor's avg active times
      - Add absolute value of subtraction to score
    
    - Return array
  }
  Mentors with same avg length of convos {
    - Takes in array passed from above function
    - Filter array for mentors with same avg length of convos
    - Subtract currentUser's - currentMentor's avg length of convos
      - Add absolute value of subtraction to score
    - Return array
  }
  Sort based on score {
    - Takes in array of users
    
    - Sort based on the lower score
    - Slice the first 10 if length is greater
    - Return array
  }
*/

let topicScore = (userTopics, mentorTopics) => {
  let score = 0;
  // Can refactor to a constant time userTopic by creating object
  userTopics.forEach((topic) => {
    if (mentorTopics.indexOf(topic) > -1) {
      score += 4;
    }
  });

  return score;
};

let scoreByTopic = (currentUserTopics, allMentors) => {
  let userTopics = currentUserTopics;
  // console.log('This is all mentors', allMentors)
  
  let filtered = allMentors.filter((mentor) => {
    let mentorId = mentor.id;
    // let mentorCategoryData = getCurrentUserCategories(mentorId, (data) => {
    //   let mentorCategories = getCategoryIds(data);

         
    // });
    let mentorScore = topicScore(userTopics, [4]);

    if (mentorScore !== 0) {
      mentor.score = mentorScore;

      return mentor;
    }
  });

  return filtered;
};

let scoreByAge = (currentUser, mentors, ageRestrict = 5) => {
  let userAge = currentUser.age;

  mentors.forEach((mentor) => {
    let minAge = userAge - ageRestrict;
    let maxAge = userAge + ageRestrict;
    
    if (mentor.age <= maxAge && mentor.age >= minAge) {
      mentor.score += 7;
    }
  });
};

let avgActiveTime = (currentUser, mentors) => {
  let userAvgActiveTime = currentUser.avgLoggedInTime;

  let activeTimeFiltered = mentors.filter((mentor) => {
    let mentorAvgActiveTime = mentor.avgLoggedInTime;
    let avgTimeDiff = Math.abs(userAvgActiveTime - mentorAvgActiveTime);
    let score = 0;
    
    if (avgTimeDiff <= 12) {
      score = 12 - avgTimeDiff;
    }

    mentor.score += score;

    return mentor;
  });

  return activeTimeFiltered;
};

let avgConvoTime = (currentUser, mentors) => {
  let userAvgConvoTime = currentUser.convoTime;

  mentors.forEach((mentor) => {
    let mentorAvgConvoTime = mentor.avgActiveTime;
    let avgConvoDiff = Math.abs(userAvgConvoTime - mentorAvgConvoTime);
    let score = 0;

    if (avgConvoDiff <= 60) {
      score = 60 - avgConvoDiff;
    }

    mentor.score += score;
  });
};

module.exports = {
  topicScore,
  scoreByTopic,
  scoreByAge,
  avgActiveTime,
  avgConvoTime
};