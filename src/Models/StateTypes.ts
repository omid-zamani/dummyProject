import { EpisodeType, LocationType, CharactersDetailResponse, itemsDetail } from "~/API/Models";
import { ViewStyle, TextStyle, ImageStyle, StyleProp } from "react-native";

export type BaseTabState ={
	footerShouldLoad: boolean
}

export type BaseDetailedPagesState = {
	locationItems: Array<itemsDetail>,
}

export interface EpisodeState extends BaseTabState {
	episodeItems: Array<EpisodeType>,
}

export interface LocationState extends BaseTabState {
	locationItems: Array<LocationType>,
}

export interface DetailEpisodesState extends BaseDetailedPagesState {}

export interface DetailLocationState extends BaseDetailedPagesState {}

export interface DetailedCardStyle {
	container: ViewStyle,
	itemsStyle: ViewStyle,
	textBaseStyle: TextStyle,
	textGrey: TextStyle,
	imageStyle: ImageStyle,
	titleStyle: TextStyle,
}