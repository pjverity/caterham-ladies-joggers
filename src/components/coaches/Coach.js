import { h, render, Component } from 'preact'

export default class Coach extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render(props, state) {
		return (
			<div>
				<a href={this.props.coachInfo.url}>
					<img src={this.props.coachInfo.image} alt={this.props.coachInfo.name} width={100} /><br/>
					{this.props.coachInfo.name}
				</a>
			</div>
		);
	}

}