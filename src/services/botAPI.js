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
      // console.log(json);
      for (var i = 0; i < json.length; i++) {
        var item = json[i];
        // var button = {
        //   title: item.buttons,
        //   value: item.buttons,
        // }
        botSend(item.text, item.buttons);
        // for (var n = 0; i < item.buttons.length; i++) {
        //   console.log(item[i].buttons[n].payload);
        // }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default botAPI;
