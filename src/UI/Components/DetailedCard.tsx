import React from 'react'
import { View , Text as _text, Image, StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native'
import StyleSheet from '~/Utils/StyleSheet'
import { DetailedCardProps, TextComponentProp } from '~/Models/PropTypes';
import { DetailedCardStyle } from '~/Models/StateTypes';

const defaultProps: DetailedCardProps = {
	style: {},
	image: '',
	title: '',
	locationName: '',
	gender: '',
	status: '',
}

const DetailedCard:React.StatelessComponent<DetailedCardProps> = (props) => {
	return (
		<View style={[style.container, props.style]}>
			<Image
				style={style.imageStyle}
				source={{uri: props.image}}
			/>
			<View style={{flex:1, justifyContent: 'center'}}>
				<Text style={style.titleStyle}>
					{props.title}
				</Text>
				<View style={style.itemsStyle}>
					<Text style={style.textGrey}>Status</Text>
					<Text>{props.status}</Text>
				</View>
				<View style={style.itemsStyle}>
					<Text style={style.textGrey}>Gender</Text>
					<Text>{props.gender}</Text>
				</View>
				<View style={style.itemsStyle}>
					<Text style={style.textGrey}>Location Name</Text>
					<Text>{props.locationName}</Text>
				</View>
			</View>
		</View>
	)
}



const defaultTextProps: TextComponentProp = {
	style: {}
} 

const Text:React.StatelessComponent<TextComponentProp> = (props) => {
	return <_text 
			{...props}
			style={[style.textBaseStyle, props.style]}>
				{props.children}
			</_text>
}
Text.defaultProps = defaultTextProps

const style = StyleSheet<DetailedCardStyle>(base => ({
	container: {
		flexDirection:'row',
		height: 115,
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 22,
		paddingBottom: 12,
		backgroundColor: base.color.locationDetailCardBackground,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#fff',
	},
	itemsStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
	},
	textBaseStyle: {
		fontSize: 12,
		color: base.color.textBlackColor,
	},
	textGrey: {
		color: base.color.textGreyColor,
	},
	imageStyle: {
		height:50,
		width: 50,
		borderRadius:10,
		marginEnd: 13
	},
	titleStyle: {
		fontSize:20,
		fontWeight: 'bold'
	},
}))
DetailedCard.defaultProps = defaultProps
export default DetailedCard