import ServerActions from './Actions/ServerActions.jsx';
import DataStore from './Stores/DataStore.jsx';

let API = {
	make_tree(items, idAttr, parentAttr, childrenAttr) {
		if (!idAttr) idAttr = 'ID';
		if (!parentAttr) parentAttr = 'menu_item_parent';
		if (!childrenAttr) childrenAttr = 'children';
		var tree = [],
			lookup = {};
		Array.prototype.forEach.call(items, obj => {
			lookup[obj[idAttr]] = obj;
			obj[childrenAttr] = [];
		});
		Array.prototype.forEach.call(items, obj => {
			if (obj[parentAttr] != '0') {
				lookup[obj[parentAttr]][childrenAttr].push(obj);
			} else {
				tree.push(obj);
			}
		});
		return tree;
	},
	getFromBetween: {
		// getFromBetween.get(string, 'start' ,'end');
		results: [],
		string: "",
		getFromBetween:function (sub1,sub2) {
			if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
			var SP = this.string.indexOf(sub1)+sub1.length,
				string1 = this.string.substr(0,SP),
				string2 = this.string.substr(SP),
				TP = string1.length + string2.indexOf(sub2);
			return this.string.substring(SP,TP);
		},
		removeFromBetween:function (sub1,sub2) {
			if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
			var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
			this.string = this.string.replace(removal,"");
		},
		getAllResults:function (sub1,sub2) {
			// first check to see if we do have both substrings
			if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;
			// find one result
			var result = this.getFromBetween(sub1,sub2);
			// push it to the results array
			this.results.push(result);
			// remove the most recently found one from the string
			this.removeFromBetween(sub1,sub2);
			// if there's more substrings
			if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
				this.getAllResults(sub1,sub2);
			}
			else return;
		},
		get:function (string,sub1,sub2) {
			this.results = [];
			this.string = string;
			this.getAllResults(sub1,sub2);
			return this.results;
		}
	},
	set_menu_tree(items) {
		console.log('1. In API > set_menu_tree start');
		let _ = this;
		ServerActions.setMenuTree(_.make_tree(items));
		console.log('5. In API > set_menu_tree complete.');
	},
	get_params(string) {
		var params = {};
		if (string) string.split("&").forEach(item => {let [k,v] = item.split("="); v = v && decodeURIComponent(v); (params[k] = params[k] || []).push(v)});
		return params;
	},
	getParameter(paramName) {
		var searchString = window.location.search.substring(1),
			i,
			val,
			params = searchString.split("&");
		for (i=0;i<params.length;i++) {
			val = params[i].split("=");
			if (val[0] == paramName) {
				return val[1];
			} else {
				return false;
			}
		}
		return null;
	},
	deepDiffMapper: {
		VALUE_CREATED: 'created',
		VALUE_UPDATED: 'updated',
		VALUE_DELETED: 'deleted',
		VALUE_UNCHANGED: 'unchanged',
		map: function(obj1, obj2) {
			if (this.isFunction(obj1) || this.isFunction(obj2)) {
				throw 'Invalid argument. Function given, object expected.';
			}
			if (this.isValue(obj1) || this.isValue(obj2)) {
				return obj1 === undefined ? obj2 : obj1;
			}
			var diff = {};
			for (var key in obj1) {
				if (this.isFunction(obj1[key])) {
					continue;
				}
				var value2 = undefined;
				if ('undefined' != typeof(obj2[key])) {
					value2 = obj2[key];
				}
				diff[key] = this.map(obj1[key], value2);
			}
			for (var key in obj2) {
				if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
					continue;
				}
				diff[key] = this.map(undefined, obj2[key]);
			}
			return diff;
		},
		compareValues: function(value1, value2) {
			if (value1 === value2) {
				return this.VALUE_UNCHANGED;
			}
			if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
					return this.VALUE_UNCHANGED;
			}
			if ('undefined' == typeof(value1)) {
				return this.VALUE_CREATED;
			}
			if ('undefined' == typeof(value2)) {
				return this.VALUE_DELETED;
			}
			return this.VALUE_UPDATED;
		},
		isFunction: function(obj) {
			return {}.toString.apply(obj) === '[object Function]';
		},
		isArray: function(obj) {
			return {}.toString.apply(obj) === '[object Array]';
		},
		isObject: function(obj) {
			return {}.toString.apply(obj) === '[object Object]';
		},
		isDate: function(obj) {
			return {}.toString.apply(obj) === '[object Date]';
		},
		isValue: function(obj) {
			return !this.isObject(obj) && !this.isArray(obj);
		}
	},
	get_wp_vars() {
		ServerActions.getWpVars(window.app);
	},
	set_current_page_id(origin, pathname, id) {
		var _ = this;

		if(!id){
			if(_.getParameter('page_id')){
				ServerActions.setCurrentPageID(_.getParameter('page_id').toString());
			} else {

				var menu_items = window.app.constants.menu_items,
					findItem = function(item) { 
						return item.url === origin + pathname;
					},
					currItem = menu_items.find(findItem);

				if(typeof currItem != 'undefined'){
					ServerActions.setCurrentPageID(currItem.object_id);
				} else {
					// if requested page not in menu
					_.react_get_post_not_in_menu(window.AjaxSubmit.ajaxSubmitURL, 'react_get_post_not_in_menu', document.location.pathname);
				}

			}
		} else {
			ServerActions.setCurrentPageID(id);
		}
	},
	react_get_page(url, action, id, uri) {
		var _ = this,
			params = "action=" + action + '&page_id=' + id + '&uri=' + uri,
			req = new XMLHttpRequest(),
			parseReq = function(xhr) {
				var reqData;
				if (!xhr.responseType || xhr.responseType === "text") {
					reqData = xhr.responseText;
				} else if (xhr.responseType === "document") {
					reqData = xhr.responseXML;
				} else {
					reqData = xhr.response;
				}
				return reqData;
			},
			callInt = function() {
				req.open('POST', url);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				req.send(params);
			},
			reqListener = function() {
				console.log('AJAX_getPage complete: id = ' + id + ', uri = ' + uri);
			};

		req.timeout = 9999999;
		req.addEventListener("load", reqListener);
		req.ontimeout = function() {
			console.log("Timed out");
		};
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				var data = parseReq(req),
					parsed = JSON.parse(data);

				// extracts <js> tags from custom templates and run them as javascript
				parsed[parsed.last_page_id].js = [];
				parsed[parsed.last_page_id].js.push(_.getFromBetween.get(parsed[parsed.last_page_id].html, '<js>' ,'<\/js>'));
				ServerActions.setPageInCache(parsed);
			}
			if (req.readyState == 4 && req.status == 400) {
				console.log('error');
			}
		};
		callInt();
	},
	react_get_post_not_in_menu(url, action, uri) {
		var _ = this,
			params = "action=" + action + '&uri=' + uri,
			req = new XMLHttpRequest(),
			parseReq = function(xhr) {
				var reqData;
				if (!xhr.responseType || xhr.responseType === "text") {
					reqData = xhr.responseText;
				} else if (xhr.responseType === "document") {
					reqData = xhr.responseXML;
				} else {
					reqData = xhr.response;
				}
				return reqData;
			},
			callInt = function() {
				req.open('POST', url);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				req.send(params);
			},
			reqListener = function() {
				console.log('react_get_post_not_in_menu complete: uri = ' + uri);
			};

		req.timeout = 9999999;
		req.addEventListener("load", reqListener);
		req.ontimeout = function() {
			console.log("Timed out");
		};
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				var data = parseReq(req),
					parsed = JSON.parse(data);

				window.app.constants.menu_items.push(parsed);
				_.get_wp_vars();
				_.set_menu_tree(window.app.constants.menu_items);
				ServerActions.setCurrentPageID(parsed.ID);
			}
			if (req.readyState == 4 && req.status == 400) {
				console.log('error');
			}
		};
		callInt();
	},
	AJAX_getPage(id, uri){
		var _ = this;
		if (id != false ){
			if(DataStore.getCachedPage(id, true)){
				ServerActions.getPageFromCache(id);
			} else {
				_.react_get_page(window.AjaxSubmit.ajaxSubmitURL, 'react_get_page', false, uri);
			}
			return;
		}
		if (uri != false ){
			_.react_get_page(window.AjaxSubmit.ajaxSubmitURL, 'react_get_page', false, uri);
			return;
		}
	},
	stripSiteUrl(url, object_id){
		var app = DataStore.getWpVars(),
			{PATHINFO_BASENAME, siteurl, page_on_front} = app.constants,
			stripped = object_id.toString() != page_on_front ? '/'+PATHINFO_BASENAME+url.replace(siteurl, '') : '/'+PATHINFO_BASENAME+'/';
		return stripped;
	}
};

export default API;
