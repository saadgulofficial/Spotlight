import messaging from '@react-native-firebase/messaging';
const GToken = () => {
    return new Promise(async (resolve, reject) => {
        messaging()
            .getToken()
            .then(token => resolve(token))
            .catch(err => {
                console.log('Error while getting device token =>', err)
                reject()
            })
    })
}
export { GToken }