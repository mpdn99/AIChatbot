import database from '@react-native-firebase/database';
const botAPI = (id, message, botSend) => {
  fetch('http://34.122.196.177/core/webhooks/rest/webhook', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: id,
      message: message,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      for (var i = 0; i < json.length; i++) {
        var item = json[i];
        botSend(item.text, item.buttons);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default botAPI;
