import { Alert } from 'react-native'
const defaultmsg = "bir hata olustu lutfen data sonra tekrar deneyiniz"
export default function errorHandler (message:string = defaultmsg, onPress:()=> void = () => {}) {
	Alert.alert("Uyary", message, [
		{ text: "OK", onPress: () => {
			onPress && onPress()
		}}
	])
}