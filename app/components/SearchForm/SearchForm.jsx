import React from "react";

import "./_SearchForm.scss";

/**
*
*/
class SearchForm extends React.Component{

	/**
	*
	*/
	constructor(args){
		super(args);
		this.state = {};
		this.handleInputValueChange = this.handleInputValueChange.bind(this);
		this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
	}

	/**
	*
	*/
	handleInputValueChange(event){
		if(this.props.onInputValueChange)
			this.props.onInputValueChange(event.target.value);
	}

	/**
	*
	*/
	handleSubmitButtonClick(event){
		event.preventDefault();
		if(this.props.onSubmitButtonClick)
			this.props.onSubmitButtonClick(this.props.inputValue);
	}

	/**
	*
	*/
	render(){
		return(
			<div className="searchForm">
				<div className="searchForm__logoWrapper">
				</div>
				<div className="searchForm__inputWrapper">
					<form className="searchForm__element">
						<input
							placeholder="Sök vad som helst"
							className="searchForm__textField"
							type="text"
							value={this.props.inputValue}
							onChange={this.handleInputValueChange}/>
						<button
							disabled={this.props.isSubmitButtonDisabled}
							type="submit"
							className="searchForm__submitButton"
							onClick={this.handleSubmitButtonClick}>🔍</button>
					</form>
				</div>
			</div>
		);
	}

}

/**
*
*/
SearchForm.defaultProps = {
	inputValue: "",
	onInputValueChange: undefined,
	onSubmitButtonClick: undefined,
	isSubmitButtonDisabled: false
};

/**
*
*/
SearchForm.propTypes = {
	inputValue: React.PropTypes.string,
	onInputValueChange: React.PropTypes.func,
	onSubmitButtonClick: React.PropTypes.func,
	isSubmitButtonDisabled: React.PropTypes.bool
};

/**
*
*/
export default SearchForm;
