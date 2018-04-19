import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import 'whatwg-fetch'
import queryString from 'query-string'
import Loading from './Loading'

class Landing extends Component {
	constructor(props) {
		super(props)
		this.getTotalComing = this.getTotalComing.bind(this)
		this.state = {
			data: [],
			loading: true
		}
	}

	getTotalComing() {
		let coming = 0,
		notComing = 0
		this.state.data.forEach(function(doc, i) {
			if(doc.answer === 'coming') {
				coming ++
			} else if(doc.answer === 'not-coming') {
				notComing ++
			}
		})
		this.setState({
			coming: coming,
			notComing: notComing
		})
	}

	componentDidMount() {
		fetch('/api/users/grab')
			.then(res => res.json())
				.then(data => {
					this.setState({
						data: data.docs,
						loading: false
					})
					this.getTotalComing()
				})
	}

	render() {
		return (
			<div className="full-page">
				{ this.state.loading && <Loading /> }
				<div className="row">
					<h1>Total responses: {this.state.data.length}</h1>
				</div>
				<div className="row">
					<div className="col">
						<h1>Coming ({this.state.coming})</h1>
						{
							this.state.data.map(function(doc, i) {
								if(doc.answer === 'coming') {
									return (
										<div className={doc.answer + ' tile'} key={i}>
											<p>{doc.name}</p>
										</div>
									)
								}
							})
						}
					</div>
					<div className="col">
						<h1>Not Coming ({this.state.notComing})</h1>
						{
							this.state.data.map(function(doc, i) {
								if(doc.answer === 'not-coming') {
									return (
										<div className={doc.answer + ' tile'} key={i}>
											<p>{doc.name}</p>
										</div>
									)
								}
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Landing
