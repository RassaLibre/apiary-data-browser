import React from 'react';
import { connect } from 'react-redux';
import SearchForm from './SearchForm/SearchForm';
import Advert from './Advert/Advert';
import Pagination from './Pagination/Pagination';
import { setInputValue } from '../ducks/SearchForm';
import { storeSearchResults, setIsLoadingFlag } from '../ducks/SearchResults';

const REST_API_URL = "https://private-5e77a-testingapi69.apiary-mock.com/questions";

/**
*	Because I need to be able to fetch the data from the server
*	@param {String} phrase
*	@return {Promise}
*/
const fetchSearchResults = (phrase, from, to) => {
	return (dispatch) => {
		dispatch(setIsLoadingFlag(true));
		let url = REST_API_URL + "&search_word=" + encodeURIComponent(phrase);
		if(from) url += "&from_list=" + from;
		if(to) url += "&to_list=" + to;
		return fetch(url)
			.then((response)=>{
				if(!response.ok) throw Error(response.statusText);
				return response;
			})
			.then(response => response.json())
			.then((response)=>{
				dispatch(storeSearchResults(response, phrase));
			})
			.catch((error)=>{
				console.log("There has been an error: ", error, " and there are better ways how to handle it");
			})
	};
};

/**
*
*/
class App extends React.Component{

	/**
	*
	*/
	constructor(args){
		super(args);
		this.state = {};
	}

	/**
	*
	*/
	render(){
		return(
			<div className="page">
				<div className="header">
					<SearchForm
						isSubmitButtonDisabled={(this.props.searchForm.inputValue.length > 1) ? false : true}
						inputValue={this.props.searchForm.inputValue}
						onSubmitButtonClick={this.props.loadSearchResults}
						onInputValueChange={this.props.setInputValue}/>
				</div>
				<div className="body">
					{(this.props.searchResults.results) ?
						<div>
						<div className="resultsContainer">
						{(this.props.searchResults.isLoading) ?
							<div className="resultsContainer__curtain"></div>
						: undefined}
						{this.props.searchResults.results.adverts.map((advert)=>{
							return (
								<Advert
									phone={advert.phone}
									coverPhoto={advert.coverPhoto}
									description={advert.description}
									logo={advert.logo}
									address={advert.address}
									homepage={advert.homepage}
									name={advert.name}
									key={advert.id}/>
							);
						})}
						</div>
							<p className="body__smallLegend">
								<i>{"I found " + this.props.searchResults.results.totalHits + " results for the phrase '" + this.props.searchResults.keyword + "'"}</i>
							</p>
						</div>
					: undefined}
				</div>
				{(this.props.searchResults.results && this.props.searchResults.results.adverts.length) ?
					<Pagination
						onButtonClick={(from, to)=> this.props.loadSearchResults(this.props.searchResults.keyword, from, to) }
						currentIndex={this.props.searchResults.results.startIndex}
						itemsPerPage={this.props.searchResults.results.itemsPerPage}
						totalHits={this.props.searchResults.results.totalHits}/>
				: undefined}
			</div>
		);
	}
}

/**
*
*/
App.defaultProps = {};

/**
*
*/
App.propTypes = {};

/**
*
*/
const mapStateToProps = (state) => {
	return {
		...state
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadSearchResults: (phrase, from, to) => dispatch(fetchSearchResults(phrase, from, to)),
		setInputValue: (value) => dispatch(setInputValue(value))
	};
};

/**
*
*/
export default connect(mapStateToProps, mapDispatchToProps)(App);
