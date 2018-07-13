
require('dotenv').config({ path: '../.env' });
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const personality_insights = new PersonalityInsightsV3({
  username: process.env.PERSONALITY_INSIGHTS_USERNAME,
  password: process.env.PERSONALITY_INSIGHTS_PASSWORD,
  version_date: '2017-10-13',
});
const PersonalityTextSummaries = require('personality-text-summary');

const v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });

const getPersonality = tweets => new Promise((resolve, reject) => {
  // console.log(tweets, '👀👀👀👀👀👀👀');
  const params = {
    // Content items are tweets.
    content_items: tweets,
    consumption_preferences: true,
    raw_scores: true,
    headers: {
      'accept-language': 'en',
      accept: 'application/json',
    },
  };
  personality_insights.profile(params, (error, personalityProfile) => {
    if (error && error.code === 400) {
      reject(Error('Ouch! You either do not have sufficient tweets, or your language is not supported. Sorry.'));
    } else { resolve(personalityProfile, null, 2); }
  });
});

// const getTextSummary = personalityProfile => new Promise((resolve, reject) => {
//   const textSummary = v3EnglishTextSummaries.getSummary(personalityProfile);
//   if (typeof (textSummary) !== 'string') {
//     reject(Error('Could not get summary.'));
//   } else {
//     resolve(textSummary);
//   }
// });

module.exports = {
  getPersonality,
  // getTextSummary,
};
