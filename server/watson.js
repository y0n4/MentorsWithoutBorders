const watson = require('watson-developer-cloud');
const vcapServices = require('vcap_services');

module.exports = (app) => {
  const sttAuthService = new watson.AuthorizationV1(
    Object.assign(
      {
        username: process.env.SPEECH_TO_TEXT_USERNAME,
        password: process.env.SPEECH_TO_TEXT_PASSWORD,
      },
      vcapServices.getCredentials('speech_to_text'),
    ),
  );

  // app.use('/api/speech-to-text/token', (req, res) => {
  //   sttAuthService.getToken(
  //     {
  //       url: watson.SpeechToTextV1.URL,
  //     },
  //     (err, token) => {
  //       if (err) {
  //         console.log('Error retrieving token: ', err);
  //         res.status(500).send('Error retrieving token');
  //         return;
  //       }
  //       res.send(token);
  //     },
  //   );
  // });
};
