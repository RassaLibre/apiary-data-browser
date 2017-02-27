//actions
const STORE_SEARCH_RESULTS = "apiary/SearchResults/STORE_SEARCH_RESULTS";
const SET_IS_LOADING_FLAG = "apiary/SearchResults/SET_IS_LOADING_FLAG";

//default state
const DEFAULT_STATE = {
	isLoading: false,
	results: null,
	keyword: null
};

//default values for advert
const ADVERT_PROTO = {
	id: null,
	phone: null,
	coverPhoto: null,
	description: null,
	logo: null,
	name: null,
	homepage: null,
	address: null
};

/**
*	Because I want to parse out only the important information from the adverts
*	returned from the server. It is not very professional to do it inside of
*	a component. One should create least variables possible in the render
*	function of components. You do not want to do this on every render.
*	@param {Object} advert
*	@param {Object} prototype... default values
*/
const _parseAdvert = (advert, proto) => {
	let parsedAdvert = { ...proto };
	parsedAdvert.id = advert.id;
	parsedAdvert.name = advert.companyInfo.companyName;
	parsedAdvert.address = advert.address;
	let companyURL = advert.products.find(product => product.name === "homepage");
	if(companyURL) companyURL = companyURL.productAttribute.label;
	parsedAdvert.homepage = companyURL;
	let logo = advert.products.find(product => product.name === "logo");
	if(logo) logo = logo.productAttribute.file.image;
	parsedAdvert.logo = logo;
	let desc = advert.products.find(product => product.name === "company_description");
	if(desc && desc.productAttribute.mixedText[0])
		desc = desc.productAttribute.mixedText[0].text;
	parsedAdvert.description = desc;
	let coverPhoto = advert.products.find(product => product.name === "cover_photo");
	if(coverPhoto && coverPhoto.images.find( photo => photo.key === "mobile"))
		coverPhoto = coverPhoto.images.find( photo => photo.key === "mobile").image;
	parsedAdvert.coverPhoto = coverPhoto;
	let phone = advert.phoneNumbers;
	if(phone && phone[0])
		phone = phone[0].phoneNumber;
	if(!Array.isArray(phone))
		parsedAdvert.phone = phone;
	return parsedAdvert;
};

//reducer
export default function reducer(state, action){
	if(!state) state = DEFAULT_STATE;
	switch(action.type){
		case STORE_SEARCH_RESULTS:
			return {
				...state,
				results: {
					...action.searchResults,
					adverts: action.searchResults.adverts.map( add => _parseAdvert(add, ADVERT_PROTO) )
				},
				keyword: action.keyword,
				isLoading: false
			};
		case SET_IS_LOADING_FLAG:
			return {
				...state,
				isLoading: action.value
			}
		default:
			return state;
	}
};

/**
*	Because I need to be able to store the search results from the server.
*	@param {Array} searchResults
*	@return {Object}
*/
export function storeSearchResults(searchResults, keyword){
	return {type: STORE_SEARCH_RESULTS, searchResults, keyword};
};

/**
*	Because we want to be able to set the flag, so the UI can react.
*	@param {Boolean} value
*	@return {Object}
*/
export function setIsLoadingFlag(value){
	return {type: SET_IS_LOADING_FLAG, value};
}
