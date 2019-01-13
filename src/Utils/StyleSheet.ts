import { StyleSheet, Dimensions, StyleProp } from 'react-native';
import color from '~/UI/Styles/Colors'

let window = Dimensions.get('window');

export const Base: any = {
	window,
	color,
}

export default <T>(callback:(base:any)=> T) => StyleSheet.create<T>(callback(Base))