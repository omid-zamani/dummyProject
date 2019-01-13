import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type BaseTabPageStyles = {
	container: ViewStyle,
	border: ViewStyle,
	headerBackground: ImageStyle,
}

export type BaseDetailPageStyles = {
	container: ViewStyle,
	header: ViewStyle,
	headerSubTitle: TextStyle,
	headerTitle: TextStyle,
	title: TextStyle,
}

export interface EpisodeStyleType extends BaseTabPageStyles {
	card: ViewStyle,
	itemTitle: TextStyle,
	itemSubtitle: TextStyle,
	arrow: ImageStyle,
}

export interface LocationStyleType extends BaseTabPageStyles {}

export interface DetailEpisodesStyle extends BaseDetailPageStyles {
	image: ImageStyle,
	cardItem: ViewStyle,
}

export interface DetailLocationStyle extends BaseDetailPageStyles {}

export type LoadingStyle = {
	loading: ViewStyle
}

export type LocationItemStyle = {
	container: ViewStyle,
	title: TextStyle,
	subTitle: TextStyle,
	arrow: ImageStyle,
	imageContainer: ViewStyle,
}