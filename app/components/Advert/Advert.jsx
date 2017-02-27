import React from "react";

import "./_Advert.scss";

/**
*
*/
class Advert extends React.Component{

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
			<div className="advert">
				<div className="advert__header">
					<div className="advertHeader__name">
						{(this.props.homepage)
							? <a href={this.props.homepage} className="advertHeader__nameText advertHeader__nameText--link">{this.props.name}</a>
							: <h1 className="advertHeader__nameText">{this.props.name}</h1>
						}
						{(this.props.address) ?
							<ul className="advertHeader__address">
								{(this.props.address.streetName) ?
									<li>{this.props.address.streetName}</li>
								: undefined}
								{(this.props.address.postCode || this.props.address.postArea) ?
									<li>{this.props.address.postCode + " " + this.props.address.postArea}</li>
								: undefined}
							</ul>
						: undefined}
					</div>
					<div className="advertHeader__logoWrapper">
						<div className="advertHeader__logoEnvelope" style={{backgroundImage: "url('" + this.props.logo + "')"}}></div>
					</div>
				</div>
				<div className="advert__body">
					{(this.props.coverPhoto) ?
						<div
							className="advertBody__coverPhoto"
							style={{backgroundImage: "url('" + this.props.coverPhoto + "')"}}>
						</div>
					: undefined}
					<div className="advertBody__text">
						{(this.props.description) ?
							<p>{this.props.description.substring(0, 100) + "..."}</p>
						: undefined}
					</div>
				</div>
				<div className="advert__footer">
					{(this.props.phone) ?
						<p className="advert__phone">{"📞 " + this.props.phone}</p>
					: undefined}
				</div>
			</div>
		);
	}

}

/**
*
*/
Advert.propTypes = {
	phone: React.PropTypes.string,
	coverPhoto: React.PropTypes.string,
	description: React.PropTypes.string,
	logo: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	homepage: React.PropTypes.string,
	address: React.PropTypes.object	//TODO: make a shape out of it
};

/**
*
*/
Advert.defaultProps = {
	phone: undefined,
	coverPhoto: undefined,
	description: undefined,
	homepage: undefined,
	logo: undefined,
	address: undefined
};

/**
*
*/
export default Advert;
