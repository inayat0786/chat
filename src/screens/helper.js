export const sendNotification = token => {
  const url = `https://fcm.googleapis.com/fcm/send`;
  let bodyInfo = {
    to: token,
    notification: {
      sound: 'default',
      body: 'Some is calling please Check',
      title: 'calling',
      content_available: true,
      priority: 'high',
    },
    data: {
      // sound: "default",
      // body: "inayat",
      // content_available: true,
      // priority: "high",

      priority: 'high', // Android required for background Notification
      uuid: '0',
      name: 'RNVoip',
      type: 'call', // to identify reciving call Notification
    },
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyInfo),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer AAAAloyLcsw:APA91bFY6lJjJYuJikJPDjLSTUggEqJpibtO3cylyet5KsDMfzIk6jj5o7Y3Cixw34Vn-ft03Fs49c7BBQe3VKMZ6_Iu5DflB4F2T2m45l9WtN8fb808RfxnKPICRPSu_pz-M7yZv3Ed`,
    },
  })
    .then(res => {
      return res.json();
    })
    .then(response => {
    //   console.log('response gettinhg-=-----', response,token);
    })
    .catch(error => {
    //   console.log('error gettinggg=========', error);
    });
};

export function sendPushNotification() {
  console.log('not send--------');
  return dispatch => {
    dispatch({type: Send_Notification_Request});
    axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=' +
          'AAAAloyLcsw:APA91bFY6lJjJYuJikJPDjLSTUggEqJpibtO3cylyet5KsDMfzIk6jj5o7Y3Cixw34Vn-ft03Fs49c7BBQe3VKMZ6_Iu5DflB4F2T2m45l9WtN8fb808RfxnKPICRPSu_pz-M7yZv3Ed',
      },
      data: {
        to: '/topics/F881',
        data: {
          title: 'Just send a message',
          message: 'dvdfvbfg',
        },
        notification: {
          title: 'dcvdfvdfbfgfgb',
          text: 'This is the notification message.',
        },
      },
    })
      .then(res => {
        dispatch({type: Send_Notification_Successfill});
        if (res.status === 200) {
          console.log('---res.data---->', res.data);
        }
      })
      .catch(ERROR => {
        console.log('----sendNotification-ERROR-->', ERROR);
        dispatch({type: Send_Notification_Failure});
      });
  };
}
