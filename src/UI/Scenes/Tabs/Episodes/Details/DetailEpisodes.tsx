import React from 'react'
import {Image, TouchableOpacity, Text, FlatList, View, ViewStyle, ImageStyle, TextStyle} from 'react-native'
import request from '~/API/Request'
import ErrorHandler from '~/Utils/ErrorHandler'
import DetailedCard from '~/UI/Components/DetailedCard'
import StyleSheet from '~/Utils/StyleSheet'
import BaseScene from '~/UI/Scenes/BaseScene'
import { DetailEpisodeProps } from '~/Models/PropTypes';
import { DetailEpisodesState } from '~/Models/StateTypes';
import { itemsDetail } from '~/API/Models';
import { DetailEpisodesStyle } from '~/Models/StyleTypes';

export default class DetailEpisodes extends BaseScene<DetailEpisodeProps, DetailEpisodesState> {

	state: Readonly<DetailEpisodesState> = {
		locationItems:[]
	}

	componentDidMount() {
		
		this.getCharacters()
	}

	async getCharacters() {
		try {
			let result = await request.getCharacters(this.props.id)
			this.setState({
				locationItems: result.episode.characters
			})
		} catch (e) {
			ErrorHandler(undefined, this.onBackPress)
		}
	}

	onBackPress = () => {
		this.navigate.popPage(this.props.componentId)
	}

	renderItem = ({item}:{item: itemsDetail}) => {
		return <DetailedCard
					style={style.cardItem}
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
						<Image 
							source={require('../../../../Images/backIcon.png')}
							style={style.image}/>
					</TouchableOpacity>
					<View>
						<Text style={[style.headerTitle]}>{this.props.name}</Text>
						<Text style={style.headerSubTitle}>{this.props.episode}</Text>
						<Text style={style.headerSubTitle}>{this.props.air_date}</Text>
					</View>
				</View>
				<View style={style.container}>
					<Text style={style.title}>
						Residents
					</Text>
					<FlatList
						data={this.state.locationItems}
						renderItem={this.renderItem}
						keyExtractor={(item, index) => item.id.toString()}
					/>
				</View>
			</View>
		)
	}
}



const style = StyleSheet<DetailEpisodesStyle>(base => ({
	container: {
		margin: 25,
	},
	header: {
		height: 250,
		borderBottomStartRadius: 30,
		borderBottomEndRadius: 30,
		backgroundColor: base.color.episodesCardBackground,
		paddingStart: 25,
		paddingTop: 80,
		paddingBottom: 40,
		justifyContent: 'space-between',
	},
	image: {
		tintColor : base.color.episodesCardItemsColor,
	},
	headerSubTitle: {
		fontSize: 12,
		marginVertical: 2.5,
		color: base.color.episodesCardItemsColor,
	},
	headerTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		color: base.color.episodesCardItemsColor,
	},
	title: {
		fontSize: 23,
		fontWeight: 'bold',
		color: base.color.episodesCardItemsColor,
		marginTop: 14,
		marginBottom: 21,
	},
	cardItem: {
		marginBottom: 15,
		backgroundColor: base.color.episodeDetailCardBackground,
	},
}))
