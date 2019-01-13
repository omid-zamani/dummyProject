import React from 'react'
import {Image, TouchableOpacity, Text, FlatList, View} from 'react-native'
import request from '~/API/Request'
import ErrorHandler from '~/Utils/ErrorHandler'
import DetailedCard from '~/UI/Components/DetailedCard'
import StyleSheet from '~/Utils/StyleSheet'
import BaseScene from '~/UI/Scenes/BaseScene'
import { DetailLocationProps } from '~/Models/PropTypes';
import { DetailLocationState } from '~/Models/StateTypes';
import { itemsDetail } from '~/API/Models';
import { DetailLocationStyle } from '~/Models/StyleTypes';

export default class DetailLocation extends BaseScene<DetailLocationProps, DetailLocationState> {

	state: Readonly<DetailLocationState> = {
		locationItems:[]
	}

	componentDidMount() {
		this.getResidences()
	}

	async getResidences() {
		try {
			let result = await request.getResidences(this.props.id)
			this.setState({
				locationItems: result.location.residents
			})
		} catch (e) {
			ErrorHandler(undefined, this.onBackPress)
		}
	}

	onBackPress = (): void => {
		this.navigate.popPage(this.props.componentId)
	}

	renderItem = ({item}: {item: itemsDetail}) => {
		return <DetailedCard
					style={{marginBottom: 15}}
					title={item.name}
					status={item.status}
					locationName={item.location && item.location.name}
					gender={item.gender}
					image={item.image}
				/>
	}

	render() {
		return (
			<View>
				<View style={style.header}>
					<TouchableOpacity onPress={this.onBackPress}>
						<Image source={require('../../../../Images/backIcon.png')}/>
					</TouchableOpacity>
					<View>
						<Text style={[style.headerTitle]}>{this.props.name}</Text>
						<Text style={style.headerSubTitle}>{this.props.type}</Text>
						<Text style={style.headerSubTitle}>{this.props.dimension}</Text>
					</View>
				</View>
				<View style={style.container}>
					<Text style={style.title}>
						Residents
					</Text>
					<FlatList
						data={this.state.locationItems}
						renderItem={this.renderItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				</View>
			</View>
		)
	}
}

const style = StyleSheet<DetailLocationStyle>(base => ({
	container: {
		margin: 25,
	},
	header: {
		height: 250,
		borderBottomStartRadius: 30,
		borderBottomEndRadius: 30,
		backgroundColor: base.color.locationCardBackground,
		paddingStart: 25,
		paddingTop: 80,
		paddingBottom: 40,
		justifyContent: 'space-between',
	},
	headerSubTitle: {
		fontSize: 12,
		color: base.color.textWhiteColor,
	},
	headerTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		color: base.color.textWhiteColor,
	},
	title: {
		fontSize: 23,
		fontWeight: 'bold',
		color: base.color.textBlackColor,
		marginTop: 14,
		marginBottom: 21,
	},
}))
