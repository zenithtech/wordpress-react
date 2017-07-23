import AppDispatcher from '../AppDispatcher.jsx';
import AjaxDispatcher from '../AjaxDispatcher.jsx';
import { ActionTypes } from '../Constants.jsx';

let ServerActions = {

	// AppDispatcher
	setMenuTree(items){
		if(!AppDispatcher.isDispatching()) {
			console.log('2. In ServerActions > setMenuTree');
			AppDispatcher.dispatch({
				actionType: ActionTypes.SET_MENU_TREE,
				items
			});
		}
	},
	getWpVars(data) {
		if(!AppDispatcher.isDispatching()) {
			AppDispatcher.dispatch({
				actionType: ActionTypes.GET_WP_VARS,
				data
			});
		}
	},
	setCurrentPageID(id) {
		if(!AppDispatcher.isDispatching()) {
			AppDispatcher.dispatch({
				actionType: ActionTypes.SET_CURRENT_PAGE_ID,
				id
			});
		}
	},
	cacheUpdated() {
		if(!AppDispatcher.isDispatching()) {
			AppDispatcher.dispatch({
				actionType: ActionTypes.CACHE_UPDATED
			});
		}
	},

	// AjaxDispatcher
	getPageFromCache(id) {
		if(!AjaxDispatcher.isDispatching()) {
			AjaxDispatcher.dispatch({
				actionType: ActionTypes.GET_PAGE_FROM_CACHE
			});
		}
	},
	setPageInCache(id) {
		if(!AjaxDispatcher.isDispatching()) {
			AjaxDispatcher.dispatch({
				actionType: ActionTypes.SET_PAGE_IN_CACHE,
				id
			});
		}
	}

};

export default ServerActions;
