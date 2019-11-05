import {h, render, Component} from 'preact'

import {postJSON} from '../ajaxutils'

let REGISTRATION_URL = '/registration/register/';

export default class Registration extends Component
{
	constructor(props)
	{
		super(props);

		// This binding is necessary to make `this` work in the callback
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount()
	{
		this.setState(
			{
				$enquiryForm: $('#enquiry-form'),
				$formSuccess: $('#form-success'),
				$formErrors: $('#form-errors'),
				$confirmEmail: $('#confirm-email'),
				$submitButton: $("button[type=submit]")
			})
	}

	render(props, state)
	{
		return (
			<div class="row m-4 pt-4 pb-4 align-items-center">


				<div class="col-md-6 col-sm-12">
					<h4 class="text-center text-md-right">Simply register your details here to get more information</h4>
					<p class="font-weight-light text-center text-md-right border-left border-right pl-2 pr-2 border-warning" style={{'fontSize': '.75em'}}>If you haven't got a mail in your <strong>Inbox</strong> in the next minute or two, it's probably sitting
						in your Junk/Spam folder. Open it and click <strong> Not Junk</strong> to avoid missing out!</p>
				</div>


				<div class="col-md-6 col-sm-12">
					<form id="enquiry-form">

						<div class="row form-group">
							<div class="col-12 col-md-6">
								<input type="text" class="form-control" name="firstName" autoComplete="home firstName" placeholder="First name" required/>
							</div>


							<div class="col-12 mt-3 col-md-6 mt-md-0">
								<input type="text" class="form-control" name="lastName" autoComplete="home lastName" placeholder="Last name" required/>
							</div>
						</div>


						<div class="row form-group">
							<div class="col">
								<div class="input-group">
									<div class="input-group-prepend">
										<span class="input-group-text"><i class="fa fa-fw fa-phone"/></span>
									</div>
									<input type="tel" class="form-control" name="phone" autoComplete="home phone" placeholder="Phone number (optional)"/>
								</div>
							</div>
						</div>


						<div class="row form-group">
							<div class="col">
								<div class="input-group">
									<div class="input-group-prepend">
										<span class="input-group-text"><i class="fa fa-fw fa-envelope"/></span>
									</div>
									<input type="email" id="email" name="email" autoComplete="home email" class="form-control" placeholder="me@home.com" required/>
									<div class="input-group-append">
										<button type="submit" onClick={this.onClick} class="btn btn-info"><i class="fa fa-fw fa-send" style={{'WebkitFilter': 'blur(0)'}}/></button>
									</div>
								</div>
							</div>
						</div>

					</form>
					<div class="row justify-content-center">
						<div class="col">
							<div id="form-errors" class="alert alert-danger d-none" role="alert">
								<ul class="list-unstyled mb-0"/>
							</div>

							<div id="form-success" class="card border-0 text-center d-none" role="alert">
								<div class="card-body">
									<h4><i class="text-success align-middle fa fa-fw fa-2x fa-check-circle"/> Thanks for Registering!</h4>
									<small class="text-muted">Confirmation has been sent to: <span id="confirm-email" class="text-info"/><br/>
										(Please note the information regarding Junk/Spam)
									</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}

	onClick(event)
	{
		event.preventDefault();

		this.startProgress();

		this.state.$enquiryForm.toggleClass('d-none', false);
		this.state.$formSuccess.toggleClass('d-none', true);
		this.state.$formErrors.toggleClass('d-none', true);
		this.state.$formErrors.find('ul').empty();

		const email = this.state.$enquiryForm.find("input[name='email']").val();
		const firstName = this.state.$enquiryForm.find("input[name='firstName']").val();
		const lastName = this.state.$enquiryForm.find("input[name='lastName']").val();
		const phone = this.state.$enquiryForm.find("input[name='phone']").val();

		postJSON(REGISTRATION_URL + email, {
			firstName: firstName,
			lastName: lastName,
			phone: phone
		}).done((response) => {
			this.setSuccessState(email);
		}).fail((jqxhr, textStatus, error) => {
			console.error(jqxhr.responseJSON);

			if (jqxhr.status === 500) {

				if (jqxhr.responseJSON.message === undefined) {
					this.setErrorState(jqxhr.responseJSON);
				} else {
					const list = this.state.$formErrors.find('ul');
					list.append('<li>Oops! Due to a technical issue we were unable to process your request at this time. Please try again later or contact us using the details at the top of the page while we work to resolve it.</li>');
					list.append(`<li>&nbsp;</li>`);
					list.append(`<li class="font-weight-light text-muted">${jqxhr.responseJSON.message}</li>`);
					this.state.$formErrors.toggleClass('d-none', false);
				}
			}
		}).always(() => this.stopProgress());

	}

	startProgress()
	{
		this.state.$submitButton.toggleClass('disabled', true).prop('disabled', true);
		this.state.$submitButton.find('i').removeClass('fa-send').addClass('fa-circle-o-notch fa-spin');

		$('input').toggleClass('is-invalid', false);
	}

	stopProgress()
	{
		this.state.$submitButton.toggleClass('disabled', false).prop('disabled', false);

		this.state.$submitButton.find('i').addClass('fa-send').removeClass('fa-circle-o-notch fa-spin');
	}

	setSuccessState(email)
	{
		this.state.$enquiryForm.toggleClass('d-none', true);
		this.state.$formSuccess.toggleClass('d-none', false);
		this.state.$confirmEmail.text(email);
	}

	setErrorState(response)
	{
		console.error(response);

		this.state.$enquiryForm.toggleClass('d-none', false);
		this.state.$formSuccess.toggleClass('d-none', true);
		this.state.$formErrors.toggleClass('d-none', false);

		const list = this.state.$formErrors.find('ul');

		const items = response.map(function (element) {
			return `<li>${element.errorMessage}</li>`;
		});

		list.append(items);

		response.forEach(function (element) {
			const input = $("input[name='" + element.fieldName + "']");
			input.toggleClass('is-invalid', true);
		})
	}

}