import { EpisodeType, LocationType } from "~/API/Models";
import { StyleProp, ViewStyle, ViewProps, TextStyle, ImageStyle } from "react-native";

export type BaseProps = {
	componentId: string
}

export interface DetailEpisodeProps extends BaseProps, EpisodeType {}
export interface DetailLocationProps extends BaseProps, LocationType {}

export type DetailedCardProps = {
	style: StyleProp<ViewStyle>,
	image: string,
	title: string,
	locationName: string,
	gender: string,
	status: string,
} 

export type LoadingProps = {
	style?: StyleProp<ViewProps>
}

export type TextComponentProp ={
	style?: StyleProp<TextStyle>
}

export type LocationItemProps = {
	title: string,
	subtitle: string,
	style?: StyleProp<ViewStyle>,
	arrowStyle?: StyleProp<ImageStyle>,
	titleStyle?: StyleProp<TextStyle>,
	subtitleStyle?: StyleProp<TextStyle>,
	onPress: () => void
}