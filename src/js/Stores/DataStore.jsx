import AppDispatcher from '../AppDispatcher.jsx';
import AjaxDispatcher from '../AjaxDispatcher.jsx';
import { ActionTypes } from '../Constants.jsx';
import { EventEmitter } from 'events';

class DataStore extends EventEmitter {
	constructor(props){
		super(props);
		let _ = this;
		_.data = {
			wp_vars: [],
			current_page_id: null,
			'menu_tree': [],
			'pages_cache': [],
			'wp_footer_hooks': '',
			'isCachedPage': 0
		};
		AppDispatcher.register(action => {
			switch(action.actionType){
				case ActionTypes.GET_WP_VARS:
					_.data.wp_vars = action.data;
					_.emit('change');
					break;
				case ActionTypes.SET_CURRENT_PAGE_ID:
					_.data.current_page_id = action.id;
					_.emit('onPageChange');
					break;
				case ActionTypes.SET_MENU_TREE:
					console.log('3. In Store -> SET_MENU_TREE');
					_.data.menu_tree = action.items;
					_.emit('onMenuTreeUpdate');
					break;
				case ActionTypes.CACHE_UPDATED:
					_.emit('cacheUpdated');
					break;
				default:
			}
		});
		AjaxDispatcher.register(action => {
			switch(action.actionType){
				case ActionTypes.SET_PAGE_IN_CACHE:
					Object.assign(_.data.pages_cache, action.id)
					_.emit('onGetPage');
					break;
				case ActionTypes.GET_PAGE_FROM_CACHE:
					_.emit('onGetPage');
					_.emit('onPageChange');
					break;
				default:
			}
		});
	}
	getData(val){
		return this.data[val];
	}
	isCachedPage(){
		return this.data.isCachedPage;
	}
	setIsCachedPage(val){
		return this.data.isCachedPage = val;
	}
	getWpVars(val){
		var _ = this;
		if( val &&
			typeof _.data.wp_vars.constants != 'undefined' &&
			typeof _.data.wp_vars.constants[val] != 'undefined'
			){
			return _.data.wp_vars.constants[val];
		}
		return _.data.wp_vars;
	}
	getCurrentPageID(){
		return this.data.current_page_id;
	}
	getCurrentPageURL(){
		var _ = this,
			findItem = function(item) { 
				return item.object_id == _.data.current_page_id;
            },
            currItem = false,
            menus = _.data.wp_vars.constants.menus,
            items = Object
                .keys(menus)
                .map( (currentValue) => {
                    if(menus[currentValue].find(findItem)){
                        currItem = menus[currentValue].find(findItem);
                        return;
                    }
                });

		if(currItem == false){
			return false;
		} else {
			return currItem.url;
		}
	}
	getMenuTree(menu_name){
		return this.data.menu_tree[menu_name];
	}
	getCachedPage(id, bool){
		let _ = this;
		if(typeof _.data.pages_cache !== 'undefined' && typeof _.data.pages_cache[id] !== 'undefined'){
			if(bool){
				return true;
			}
			return _.data.pages_cache[id];
		} else {
			return false;
		}
	}
}

export default new DataStore();