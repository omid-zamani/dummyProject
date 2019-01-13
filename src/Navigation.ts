import Splash from '~/UI/Scenes/Splash'
import DetailLocations from '~/UI/Scenes/Tabs/Locations/Details/DetailLocations'
import DetailEpisodes from '~/UI/Scenes/Tabs/Episodes/Details/DetailEpisodes'
import Locations from '~/UI/Scenes/Tabs/Locations/Locations'
import Episodes from '~/UI/Scenes/Tabs/Episodes/Episodes'
import { Navigation as nav } from "react-native-navigation"


function reqisterPages() {
	nav.registerComponent(`splash`, () => Splash)
	nav.registerComponent(`detailLocations`, () => DetailLocations)
	nav.registerComponent(`detailEpisodes`, () => DetailEpisodes)
	nav.registerComponent(`locations`, () => Locations)
	nav.registerComponent(`episodes`, () => Episodes)
}

function startSplash() {
	nav.events().registerAppLaunchedListener(() => {
		nav.setRoot({
			root: {
				stack: {
					children: [{
						component: {
							name: "splash"
						}
					}],
					options: {
						topBar: {
							visible: false
						}
					}
				}
			}
		})
	})
}

function startTabBaseApp(id: string) {
	nav.push(id, {
		bottomTabs: {
			children: [{
				stack: {
					children: [{
						component: {
							name: 'locations',
							passProps: {
								text: 'This is tab 1'
							}
						}
					}],
					options: {
						topBar:{
							visible: false
						},
						bottomTab: {
							text: 'Locations',
							selectedIcon: require('../src/UI/Images/locationActive.png'),
							icon: require('../src/UI/Images/locationPassive.png'),
						}
					}
				}
			}
			,{
				stack: {
					children: [{
						component: {
							name: 'episodes',
							passProps: {
								text: 'This is tab 2'
							},
						},
					}],
					options: {
						topBar: {
							visible: false
						},
						bottomTab: {
							text: 'Episodes',
							icon: require('../src/UI/Images/episodePassive.png'),
							selectedIcon: require('../src/UI/Images/episodeActive.png'),
						}
					}
				}
			}]
		}
	})
}

function pushPage(id: string, pageName: string, props: any) {
	nav.push(id, {
		component: {
			name: pageName,
			passProps: {
				...props
			}
		}
	})
}

function popPage (id: string) {
	nav.pop(id)
}

export default {
	reqisterPages,
	startSplash,
	startTabBaseApp,
	pushPage,
	popPage,
}