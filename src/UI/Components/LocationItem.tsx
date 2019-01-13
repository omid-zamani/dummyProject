import React from 'react'
import { View , TouchableOpacity, Text, Image, StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native'
import StyleSheet from '~/Utils/StyleSheet'
import { LocationItemStyle } from '~/Models/StyleTypes';
import { LocationItemProps } from '~/Models/PropTypes';

const defaultProps: LocationItemProps = {
	title: '',
	subtitle: '',
	style: {},
	arrowStyle: {},
	titleStyle: {},
	subtitleStyle: {},
	onPress: () => {}
}

const LocationItem: React.StatelessComponent<LocationItemProps> = (props) => {
		return (
			<TouchableOpacity style={[style.container, props.style]} onPress={props.onPress}>
				<View >
					<Text numberOfLines={1} ellipsizeMode="tail" style={[style.title, props.titleStyle]}>
						{props.title}
					</Text>
					<Text style={[style.subTitle, props.subtitleStyle]}>
						{props.subtitle}
					</Text>
				</View>
				<View  style={style.imageContainer}>
					<Image source={require('../Images/right-arrow.png')} style={[style.arrow, props.arrowStyle]}/>
				</View>
			</TouchableOpacity>
		)
}

const style = StyleSheet<LocationItemStyle>(base => ({
	container: {
		flexDirection: 'row',
		height: 77,
		paddingHorizontal: 25,
		paddingVertical: 14,
		backgroundColor: base.color.locationCardBackground,
		borderRadius: 22,
		borderWidth: 1,
		borderColor: base.color.textWhiteColor,
		justifyContent: 'space-between',
	},
	imageContainer: {
		alignSelf:'center',
		alignContent:'flex-end'
	},
	title: {
		color: base.color.textWhiteColor,
		fontSize: 20,
		fontWeight: 'bold',
	},
	subTitle: {
		color: base.color.textWhiteColor,
		fontSize: 12,
		marginTop: 5,
	},
	arrow: {
		alignSelf: 'center',
	},
}))

LocationItem.defaultProps = defaultProps
export default LocationItem