const wsClient = require('websocket').client;
const fs = require('fs');
const streamBuffers = require('stream-buffers');

const host = 'wss://dev.microsofttranslator.com';
const path = '/speech/translate';
const params = '?api-version=1.0&from=en-US&to=it-IT&features=texttospeech&voice=it-IT-Elsa';
const uri = host + path + params;

/* The input .wav file is in PCM 16bit, 16kHz, mono format.
You can obtain such a .wav file using the Translator Text Speak API. See:
http://docs.microsofttranslator.com/text-translate.html#!/default/get_Speak
*/
const input_path = 'speak.wav';

const output_path = 'speak2.wav';

function receive(message) {
  console.log(`Received message of type: ${message.type }.`);

  if (message.type == 'utf8') {
    const result = JSON.parse(message.utf8Data);
    console.log(`Response type: ${result.type}.`);
    console.log(`Recognized input as: ${result.recognition}`);
    console.log(`Translation: ${result.translation}`);
  } else if (message.type == 'binary') {
    /* This is needed to make sure message.binaryData is defined. See:
    https://stackoverflow.com/questions/17546953/cant-access-object-property-even-though-it-exists-returns-undefined
    */
    const binary_data = JSON.parse(JSON.stringify(message.binaryData));

    if (binary_data.type == 'Buffer') {
      /* Put the binary data in a Buffer - do not write it directly to the file. */
      const buffer = new Buffer(binary_data.data, 'binary');
      /* Write the contents of the Buffer to the file. */
      fs.writeFile(output_path, buffer, 'binary', (error) => {
        /* fs.writeFile calls the error-handling function even if there is no error, in which case error === null. See:
        https://stackoverflow.com/questions/44473868/node-js-fs-writefile-err-returns-null
        */
        if (error !== null) {
          console.log(`Error: ${  error}`);
        }
      });
    }
  }
}

function send(connection, filename) {
  const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 100,
    chunkSize: 32000,
  });

  /* Make sure the audio file is followed by silence.
  This lets the service know that the audio input is finished. */
  myReadableStreamBuffer.put(fs.readFileSync(filename));
  myReadableStreamBuffer.put(new Buffer(3200000));
  myReadableStreamBuffer.stop();

  myReadableStreamBuffer.on('data', (data) => {
    connection.sendBytes(data);
  });

  myReadableStreamBuffer.on('end', () => {
    console.log('Closing connection.');
    connection.close(1000);
  });
}

function connect() {
  const ws = new wsClient();

  ws.on('connectFailed', (error) => {
    console.log(`Connection error: ${error.toString()}`);
  });

  ws.on('connect', (connection) => {
    console.log('Connected.');

    connection.on('message', receive);

    connection.on('close', (reasonCode, description) => {
      console.log(`Connection closed: ${  reasonCode}`);
    });

    connection.on('error', (error) => {
      console.log(`Connection error: ${  error.toString()}`);
    });

    send(connection, input_path);
  });

  ws.connect(uri, null, null, {
    'Ocp-Apim-Subscription-Key': process.env.MS_TRANSLATOR_KEY,
  });
}

connect();
