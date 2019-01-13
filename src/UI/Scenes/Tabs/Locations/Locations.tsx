import React from 'react'
import {Platform, StatusBar, FlatList, Image, View} from 'react-native'
import request from '~/API/Request'
import LocationItem from '~/UI/Components/LocationItem'
import StyleSheet from '~/Utils/StyleSheet'
import Loading from '~/UI/Components/Loading'
import BaseScene from '~/UI/Scenes/BaseScene'
import { BaseProps } from '~/Models/PropTypes';
import { LocationState } from '~/Models/StateTypes';
import { LocationType } from '~/API/Models';
import { LocationStyleType } from '~/Models/StyleTypes';

export default class Locations extends BaseScene<BaseProps,LocationState> {

	state: Readonly<LocationState> = {
		locationItems: [],
		footerShouldLoad: true
	}

	pagenation = {
		page: 1,
		pageCount: 0
	}

	componentDidMount() {
		this.getLocations()
	}

	async getLocations() {
		try {
			let result = await request.getLocations(this.pagenation.page)
			if (result && result.locations) {
				this.setState(prevState => ({
					locationItems: prevState.locationItems.concat(result.locations.results),
				}))
				this.pagenation.page++
				this.pagenation.pageCount = result.locations.info && result.locations.info.pages
			}
		} catch(e) {
			console.log("err",e)
		}
	}

	onPressItem(itemData: LocationType): void {
		this.navigate.pushPage(this.props.componentId, 'detailLocations', itemData)
	}

	renderItem = ({item}: {item: LocationType}) => {
		return <LocationItem
					style={{marginBottom: 15}}
					subtitle={item.dimension}
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
		this.getLocations()
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
				style={{marginTop:15}}
				data={this.state.locationItems}
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

const style = StyleSheet<LocationStyleType>(base => ({
	container: {
		paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
		margin: 25,
		marginBottom: 105,
	},
	border: {
		height:2,
		backgroundColor: base.color.borderColor,
	},
	headerBackground: {
		height: 60,
		width:180,
		marginTop: 20,
		marginBottom: 23
	},
}))