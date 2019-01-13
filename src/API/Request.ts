import { GraphQLClient } from 'graphql-request'
import { EpisodesType, LocationsType, CharactersDetailResponse, ResidentsDetailResponse } from './Models';

const detailItems = `{
	name
	gender
	image
	id
	status
	location { name }
}`
const pageCount = `info { pages }`

const endpoint = 'https://rickandmortyapi.com/graphql/'

const graphQLClient = new GraphQLClient(endpoint)

const getLocations = (page: number = 1): Promise<LocationsType> => {
	let q = `{
		locations(page:${page}) {
			${pageCount}
			results {
				name
				id
				type
				dimension
			}
		}
	}`;
	return graphQLClient.request(q)
}

const getEpisodes = (page:number = 1): Promise<EpisodesType> => {
	let q = `{
		episodes(page:${page}) {
			${pageCount}
			results {
				name
				id
				air_date
				episode
			}
		}
	}`;
	return graphQLClient.request(q)
}

const getResidences = (id: number): Promise<ResidentsDetailResponse> => {
	let q = `{
		location(id:${id}) {
			residents${detailItems}
		}
	}`
	return graphQLClient.request(q)
}

const getCharacters = (id: number): Promise<CharactersDetailResponse> => {
	let q = `{
		episode(id:${id}) {
			characters${detailItems}
		}
	}`
	return graphQLClient.request(q)
}


export default  {
	getCharacters,
	getEpisodes,
	getLocations,
	getResidences
} 