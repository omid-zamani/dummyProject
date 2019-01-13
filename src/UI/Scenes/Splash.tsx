import React from 'react'
import { View, ImageBackground} from 'react-native'
import BaseScene from './BaseScene'
import { BaseProps } from '~/Models/PropTypes';

export default class Splash extends BaseScene<BaseProps> {

	componentDidMount() {
		setTimeout(() => {
			//this means taking time for initializing packages, custom bridges, or auth requests
			this.navigate.startTabBaseApp(this.props.componentId)
		},2000)
	}

	render() {
		return (
			<View style={{flex:1}}>
				<ImageBackground
					style={{flex:1}}
					source={require('../Images/bitmap.png')}/>
			</View>
		)
	}
}