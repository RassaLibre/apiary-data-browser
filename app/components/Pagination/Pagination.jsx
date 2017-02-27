import React from "react";

import "./_Pagination.scss";

/**
*	Max items per page
*/
const MAX_ITEMS_PER_PAGE = 25;

/**
*
*/
class Pagination extends React.Component{

	/**
	*
	*/
	constructor(args){
		super(args);
		this.state = {};
		this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
		this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
	}

	/**
	*
	*/
	handleLeftArrowClick(){
		if(this.props.onButtonClick)
			this.props.onButtonClick(
					this.props.currentIndex - MAX_ITEMS_PER_PAGE,
					this.props.currentIndex - 1
				);
	}

	/**
	*
	*/
	handleRightArrowClick(){
		if(this.props.onButtonClick)
			this.props.onButtonClick(
					(Math.ceil(this.props.currentIndex / MAX_ITEMS_PER_PAGE) * MAX_ITEMS_PER_PAGE) + 1,
					(Math.ceil(this.props.currentIndex / MAX_ITEMS_PER_PAGE) + 1) * MAX_ITEMS_PER_PAGE
				);
	}

	/**
	*
	*/
	render(){
		let currentPage = Math.ceil(this.props.currentIndex / MAX_ITEMS_PER_PAGE);
		let lastPage = Math.ceil(this.props.totalHits / MAX_ITEMS_PER_PAGE);
		return(
			<div className="pagination">
				<div className="pagination__arrow">
					{(currentPage > 1) ?
						<button className="pagination__button" onClick={this.handleLeftArrowClick}>&#9664;</button>
					: undefined}
				</div>
				<div className="pagination__info">
					<p>{currentPage}</p>
				</div>
				<div className="pagination__arrow">
					{(currentPage < lastPage) ?
						<button className="pagination__button" onClick={this.handleRightArrowClick}>&#9658;</button>
					: undefined}
				</div>
			</div>
		);
	}
}

/**
*
*/
Pagination.defaultProps = {
	currentIndex: 0,
	itemsPerPage: 0,
	totalHits: 0,
	onButtonClick: undefined
};

/**
*
*/
Pagination.propTypes = {
	onButtonClick: React.PropTypes.func,
	currentIndex: React.PropTypes.number,
	itemsPerPage: React.PropTypes.number,
	totalHits: React.PropTypes.number
};

/**
*
*/
export default Pagination;
