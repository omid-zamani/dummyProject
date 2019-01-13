export interface infoType {
	pages: number
}
export interface EpisodeType {
	name: string,
	id: number,
	air_date: string,
	episode: string
}

export interface LocationType {
	name: string,
	id: number,
	type: string,
	dimension: string
}

export interface EpisodesType {
	episodes:{
		info: infoType,
		results: Array<EpisodeType>
	}
}

export interface LocationsType {
	locations:{
		info: infoType,
		results: Array<LocationType>
	}
}


export type itemsDetail = {
	name: string
	gender: string
	image: string
	id: string
	status: string
	location: {
		name:string
	}
}

export type CharactersDetailResponse = {
	episode: {
		characters: Array<itemsDetail>
	}
}
export type ResidentsDetailResponse = {
	location: {
		residents: Array<itemsDetail>
	}
}