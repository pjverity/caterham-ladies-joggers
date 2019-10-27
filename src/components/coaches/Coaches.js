import { h, render, Component } from 'preact'

import Coach from "./Coach";

export default class Coaches extends Component {

	constructor(props) {
		super(props);
		this.state = {
			coaches: [
				{
					image: 'images/coaches/denise.png',
					name: 'Denise',
					url: 'pages/coaches/denise.html'
				},
				{
					image: 'images/coaches/clare.png',
					name: 'Clare',
					url: '/pages/coaches/clare.html'
				},
				{
					image: 'images/coaches/keata.png',
					name: 'Keata',
					url: 'pages/coaches/keata.html'
				},
				{
					image: 'images/coaches/lucie.png',
					name: 'Lucie',
					url: 'pages/coaches/lucie.html'
				},
				{
					image: 'images/coaches/wendy.png',
					name: 'Wendy',
					url: 'pages/coaches/wendy.html'
				},
				{
					image: 'images/coaches/cat.png',
					name: 'Cat',
					url: 'pages/coaches/cat.html'
				}
				]
		}
	}

	render(props, state) {
		return (
				<div className={'row pt-3'}>
					<div className={'col'}>
						<Coach coachInfo={this.state.coaches[0]}/>
					</div>
					<div className={'col'}>
						<Coach coachInfo={this.state.coaches[1]}/>
					</div>
					<div className={'col'}>
						<Coach coachInfo={this.state.coaches[2]}/>
					</div>
					<div className={'col'}>
						<Coach coachInfo={this.state.coaches[3]}/>
					</div>
					<div className={'col'}>
						<Coach coachInfo={this.state.coaches[4]}/>
					</div>
					<div className={'col'}>
						<Coach coachInfo={this.state.coaches[5]}/>
					</div>
				</div>
		);
	}

}