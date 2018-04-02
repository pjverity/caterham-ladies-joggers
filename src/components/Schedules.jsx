import { h, render, Component } from 'preact';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

export default class Schedules extends Component {
	render(props, state) {
		return (
			<div>

				<div class="row m-4 justify-content-center">
					<div class="col">
						<hr class="d-none d-sm-block"/>
					</div>
					<div class="h4">Upcoming Courses</div>
					<div class="col">
						<hr class="d-none d-sm-block"/>
					</div>
				</div>

				<div class="row mb-4 justify-content-center">
					<div class="col">
						<table class="table table-sm table-striped">
							<thead>
							<tr>
								<th scope="col">Day</th>
								<th scope="col">Time</th>
								<th scope="col">Group</th>
								<th scope="col">Meeting Place</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<th scope="row">Monday 16th April to Monday 21st May</th>
								<td>19:30</td>
								<td>Caterham Beginner Course</td>
								<td>Queen’s Park, Caterham</td>
							</tr>
							<tr>
								<th scope="row">Monday 16th April to Monday 21st May</th>
								<td>19:30</td>
								<td>Caterham Improvers Course</td>
								<td>Queen’s Park, Caterham</td>
							</tr>
							<tr>
								<th scope="row">Monday 16th April to Monday 21st May</th>
								<td>19:30</td>
								<td>Caterham Intermediate Runners</td>
								<td>Queen’s Park, Caterham</td>
							</tr>
							<tr>
								<th scope="row">Thursday 19th April to Thursday 24th May</th>
								<td>09:00</td>
								<td>Caterham Beginner Course</td>
								<td>Queen’s Park, Caterham</td>
							</tr>
							<tr>
								<th scope="row">Thursday 19th April to Thursday 24th</th>
								<td>09:00</td>
								<td>Caterham Gentle Joggers</td>
								<td>Queen’s Park, Caterham</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}



