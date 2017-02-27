import { combineReducers, createStore, applyMiddleware } from 'redux';
import SearchFormReducer from './ducks/SearchForm';
import SearchResultsReducer from './ducks/SearchResults';
import thunk from 'redux-thunk';

let rootReducer = combineReducers({
	searchForm: SearchFormReducer,
	searchResults: SearchResultsReducer
});

export default createStore(
	rootReducer,
	applyMiddleware(thunk)
);
