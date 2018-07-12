const axios = require('axios');
const { 
  // topicScore, 
  // scoreByTopic, 
  scoreByAge,
  avgActiveTime,
  avgConvoTime
} = require('./filterByCategories');

const {
  userWordCounts,
  wordCountScore
} = require('./wordCount');

const recommendationSystem = (callback) => {
  let filtered;

  axios.get('/recommendation')
  .then((res) => {
    let currentUser = res.data.currentUser;
    let age = currentUser.age || null;
    let allMentors = res.data.allMentors;
    let userCategories = res.data.userCategories;

    console.log('This is all mentors', allMentors)
    // Get only the mentors that mentor in topics the 
    // current user is interested in
 
    // Score the mentors based on if they are within a certain
    // age range of the current user
    if (age) {
      scoreByAge(currentUser, allMentors);
    }
    // Score the mentors based on if they are active within
    // the same avg time as current user
    avgActiveTime(currentUser, allMentors);
    // Score the mentors based on if they have around the 
    // same avg convo time as the current user
    avgConvoTime(currentUser, allMentors);
    // Create a score based on matching text input between
    // the current user and mentors
    if (currentUser.wordCount) {
      wordCountScore(currentUser, allMentors);
    }
    
    allMentors.sort((a, b) => {
      return b.mentorScore - a.mentorScore;
    });

    // allMentors = (allMentors.length > 5) ? allMentors.slice(0, 5) : allMentors;

    filtered = allMentors;
  }).then(() => {
    callback(filtered);
  });
};

module.exports = {
  recommendationSystem
};
