const GPush = (token: any, _data: { title: string, body: string, data: any }) => {
    let data = {
        "to": token,
        "notification": {
            "title": _data.title,
            "body": _data.body,
            "sound": "default",
        },
        "priority": 'high',
        "data": { "data": _data.data },
    }
    return fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAARj_UYek:APA91bFgZcI7rsOu8bLLjjxARv05SIXCLRZuzxViQJqFbGOVJFGznYQs5Cc26FXbiq8AFgGrIONIBOTKyFM760wZzBtA1x2S_hmX30k-GDIJ73j4Wc_bEZbXf1UerDJQF-rW1f48Nac4'
        },
        body: JSON.stringify(data),
    })
        .then((res) => { })
        .catch((err) => { console.log("push send err", err); });

}
export default GPush