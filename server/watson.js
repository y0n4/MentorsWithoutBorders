const watson = require('watson-developer-cloud');
const vcapServices = require('vcap_services');
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');


module.exports.speechToText = (app) => {
  const sttAuthService = new watson.AuthorizationV1(
    Object.assign(
      {
        username: process.env.SPEECH_TO_TEXT_USERNAME,
        password: process.env.SPEECH_TO_TEXT_PASSWORD,
      },
      vcapServices.getCredentials('speech_to_text'),
    ),
  );

  app.use('/api/speech-to-text/token', (req, res) => {
    sttAuthService.getToken(
      {
        url: watson.SpeechToTextV1.URL,
      },
      (err, token) => {
        if (err) {
          console.log('Error retrieving token: ', err);
          res.status(500).send('Error retrieving token');
          return;
        }
        res.send(token);
      },
    );
  });
};

module.exports.translate = (text, socket) => {
  let result = '';

  const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: process.env.IAM_APIKEY_NAME,
  });

  const parameters = {
    text,
    model_id: 'en-es',
  };

  languageTranslator.translate(
    parameters,
    (error, response) => {
      if (error) { console.log(error); }
      console.log(JSON.stringify(response, null, 2));
      result = JSON.stringify(response, null, 2);
      // console.log(socket);
      socket.emit('results', result);
    },
  );
};
