import React from 'react'
import {View, ActivityIndicator, StyleProp, ViewProps, ViewStyle} from 'react-native'
import StyleSheet from '~/Utils/StyleSheet';
import { LoadingProps } from '~/Models/PropTypes';
import { LoadingStyle } from '~/Models/StyleTypes';


const defualtProps: LoadingProps ={
	style: {}
}

const Loading: React.StatelessComponent<LoadingProps> = (props) => {
	return (
		<View 
		style={[style.loading, props.style]}>
			<ActivityIndicator color="black" animating size="large" />
		</View>
	);
}


const style = StyleSheet<LoadingStyle>(base => ({
	loading: {
		paddingVertical: 5
	}
}));
Loading.defaultProps = defualtProps
export default Loading
