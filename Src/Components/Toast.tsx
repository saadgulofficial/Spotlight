import Toast from 'react-native-simple-toast';

class ToastClass {
    shortTop = (message: any) => Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
    longTop = (message: any) => Toast.showWithGravity(message, Toast.LONG, Toast.TOP);
    shortCenter = (message: any) => Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
    longCenter = (message: any) => Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
    shortBottom = (message: any) => Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
    longBottom = (message: any) => Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
}

const GToast = new ToastClass();
export { GToast }