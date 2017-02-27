//actions
const SET_INPUT_VALUE = "apiary/SearchForm/SET_INPUT_VALUE";

//default state
const DEFAULT_STATE = {
	inputValue: ""
};

//reducer
export default function reducer(state, action){
	if(!state) state = DEFAULT_STATE;
	switch(action.type){
		case SET_INPUT_VALUE:
			return {
				...state,
				inputValue: action.value
			};
		default:
			return state;
	}
};

//action creators

/**
*	Becuase I need to be able to set the input value of the form
*	@param {String} value
*	@return {Object}
*/
export function setInputValue(value){
	return {type: SET_INPUT_VALUE, value};
}
