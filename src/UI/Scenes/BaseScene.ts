import React from 'react'
import Navigation from '~/Navigation'

export default class BaseScene<P = {}, S= {}> extends React.Component<P, S> {
	navigate?:any = null
	constructor(props: any) {
		super(props)
		this.navigate = Navigation
	}
}