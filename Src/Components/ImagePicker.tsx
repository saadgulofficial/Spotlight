import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
class imagePicker {
    openCamera = () => {
        return new Promise((resolve, reject) => {
            var options: any = {}
            launchCamera(options, async (res: any) => {
                if(res.didCancel) {
                    console.log('User cancelled image picker');
                    reject('')
                } else if(res.error) {
                    console.log('ImagePicker Error: ', res.error);
                    reject('')
                } else {
                    const uri = res.assets[0].uri
                    resolve(uri)
                }
            });
        })
    }

    openLibaray = () => {
        return new Promise((resolve, reject) => {
            var options: any = {}
            launchImageLibrary(options, async (res: any) => {
                if(res.didCancel) {
                    console.log('User cancelled image picker');
                    reject('')
                } else if(res.error) {
                    console.log('ImagePicker Error: ', res.error);
                    reject('')
                } else {
                    const uri = res.assets[0].uri
                    resolve(uri)
                }
            });
        })
    }
}

const GImagePicker = new imagePicker()
export { GImagePicker }