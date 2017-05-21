import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  IndexRedirect,
  IndexRoute
} from 'react-router-dom';
import API from './js/API.jsx';
import DataStore from './js/Stores/DataStore.jsx';
import Header from './js/Components/Header.jsx';
import Page from './js/Components/Page.jsx';
import '../node_modules/font-awesome/less/font-awesome.less';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

if(document.getElementById('react_header')){
	class react_header extends Component {
		constructor(props){
			super(props);
			let _ = this;
			_.state = {};
			_.onChange = _.onChange.bind(_);
		}
		onChange() {
			let _ = this,
				appState = update(_.state, {
					$merge: { wp_vars: DataStore.getWpVars() }
				});
			_.setState(appState);
		}
		componentWillMount() {
			let _ = this;
			DataStore.on('change', _.onChange);
		}
		componentWillUnmount(){
			let _ = this;
			DataStore.removeListener('change', _.onChange);
		}
		render() {
			let _ = this;
			return (
				<header className="clearfix">
					<div className="navigation-top" className="clearfix">
						<Header {..._.props} {..._.state} />
					</div>
				</header>
			);
		}
	}

	ReactDOM.render((
		<Router history={browserHistory}>
			<Route path='/' component={react_header} />
		</Router>
		), document.getElementById('react_header')
	);

}

if(document.getElementById('react_page')){
	class react_page extends Component {
		constructor(props){
			super(props);
			let _ = this;
			_.state = {};
			_.onChange = _.onChange.bind(_);
			_.onPageChange = _.onPageChange.bind(_);
			_.onGetPageByID = _.onGetPageByID.bind(_);
		}
		onChange() {
			let _ = this,
				appState = update(_.state, {
					$merge: { wp_vars: DataStore.getWpVars() }
				});
			_.setState(appState);
		}
		onPageChange() {
			let _ = this;
			_.setState({ current_page_id: DataStore.getCurrentPageID() });
			API.AJAX_getPageByID(DataStore.getCurrentPageID());
		}
		onGetPageByID() {
			let _ = this,
				appState = update(_.state, {
					$merge: {
						current_page: DataStore.getCachedPage(DataStore.getCurrentPageID())
					}
				});
			_.setState(appState);
		}
		componentWillMount() {
			let _ = this;
			DataStore.on('change', _.onChange);
			DataStore.on('onPageChange', _.onPageChange);
			DataStore.on('onGetPageByID', _.onGetPageByID);
		}
		componentWillUnmount(){
			let _ = this;
			DataStore.removeListener('change', _.onChange);
			DataStore.removeListener('onPageChange', _.onPageChange);
			DataStore.removeListener('onGetPageByID', _.onGetPageByID);
		}
		render() {
			let _ = this;
			return (
				<Page {..._.props} {..._.state} />
			);
		}
	}

	ReactDOM.render((
		<Router history={browserHistory}>
			<Route path='/' component={react_page} />
		</Router>
		), document.getElementById('react_page')
	);

}

API.get_wp_vars();
API.set_current_page_id(document.location.origin + document.location.pathname);
API.set_menu_tree(window.app.constants.menu_items);