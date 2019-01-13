import React from 'react'
import {Platform, StatusBar, FlatList, Image, View, ViewStyle, ImageStyle, TextStyle} from 'react-native'
import request from '~/API/Request'
import LocationItem from '~/UI/Components/LocationItem'
import StyleSheet from '~/Utils/StyleSheet'
import Loading from '~/UI/Components/Loading'
import BaseScene from '~/UI/Scenes/BaseScene'
import { EpisodeType } from '~/API/Models';
import { BaseProps } from '~/Models/PropTypes';
import { EpisodeState } from '~/Models/StateTypes';
import { EpisodeStyleType } from '~/Models/StyleTypes';

export default class Episodes extends BaseScene<BaseProps, EpisodeState> {

	state: Readonly<EpisodeState> = {
		episodeItems: [],
		footerShouldLoad: false
	}

	pagenation = {
		page: 1,
		pageCount: 0
	}
	
	componentDidMount(){
		this.getEpisodes()
	}

	async getEpisodes() {
		try {
			let result = await request.getEpisodes(this.pagenation.page)
			if (result && result.episodes) {
				this.setState(prevState => ({
					episodeItems: prevState.episodeItems.concat(result.episodes.results)
				}))
				this.pagenation.page++
				this.pagenation.pageCount = result.episodes.info && result.episodes.info.pages
			}
		} catch (e) {
			console.log("error in episodes => ", e)
		}
	}

	onPressItem(itemData: EpisodeType): void {
		this.navigate.pushPage(this.props.componentId, 'detailEpisodes', itemData)
	}

	renderItem = ({item}:{item: EpisodeType}) => {
		return <LocationItem
					style={style.card}
					arrowStyle={style.arrow}
					titleStyle={style.itemTitle}
					subtitleStyle={style.itemSubtitle}
					subtitle={item.episode.concat(' - ').concat(item.air_date)}
					title={item.name}
					onPress={() => this.onPressItem(item)}
				/>
	}

	onLoadMore = () => {
		if (this.pagenation.page > this.pagenation.pageCount) {
			this.setState({
				footerShouldLoad: false
			})
			return
		}
		this.getEpisodes()
	}

	renderFooter = () => {
		if (this.state.footerShouldLoad) {
			return <Loading/>
		}
		return null
	}

	render() {
		return (
		<View style={style.container}>
			<Image style={style.headerBackground} source={require('../../../Images/logo.png')}/>
			<View style={style.border}/>
			<FlatList
				data={this.state.episodeItems}
				renderItem={this.renderItem}
				keyExtractor={item => item.id.toString()}
				onEndReached={this.onLoadMore}
				onEndReachedThreshold={0.1}
				ListFooterComponent={this.renderFooter}
			/>
		</View>
		)
	}
}



const style = StyleSheet<EpisodeStyleType>(base => ({
	container: {
		paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
		margin: 25,
		marginBottom: 105,
	},
	card: {
		marginBottom: 15,
		backgroundColor: base.color.episodesCardBackground,
	},
	border: {
		height:2,
		backgroundColor: base.color.borderColor,
	},
	arrow: {
		tintColor: base.color.episodesCardItemsColor,
	},
	itemTitle: {
		color: base.color.episodesCardItemsColor,
	},
	itemSubtitle: {
		color: base.color.textGreyColor,
	},
	headerBackground: {
		height: 60,
		width:180,
		marginTop: 20,
		marginBottom: 23
	},
}))