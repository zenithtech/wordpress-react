import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';
import API from '../API.jsx';
import DataStore from '../Stores/DataStore.jsx';

class Menu extends Component {
    constructor(props){
        super(props);
        let _ = this;
        _.state = {
            menu_items: null
        };
        _.onMenuTreeUpdate = _.onMenuTreeUpdate.bind(_);
    }
    onMenuTreeUpdate() {
        let _ = this;

        console.log('4. In View > react_page > onMenuTreeUpdate');
        _.setState({ menu_items: DataStore.getMenuTree(_.props.menu_name) });
    }
    componentDidUpdate(prevProps, prevState) {
        let _ = this

        if( typeof _.props.current_page != 'undefined' ) {
            if(typeof prevProps.current_page == 'undefined'){
                API.evalScripts(_.props.current_page);
                return;
            }
            if(typeof prevProps.current_page.page_id != 'undefined' && prevProps.current_page.page_id != _.props.current_page.page_id){
                API.evalScripts(_.props.current_page);
                return;
            }
        }
    }
    componentWillMount() {
        let _ = this;
        DataStore.on('onMenuTreeUpdate', _.onMenuTreeUpdate);
    }
    componentWillUnmount(){
        let _ = this;
        DataStore.removeListener('onMenuTreeUpdate', _.onMenuTreeUpdate);
    }
    render() {
        let _ = this,
            nodes = '',
            wp_vars = '',
            constants = {},
            current_page = {},
            wp_head = '';

        if( _.state.menu_items != null && typeof _.props.wp_vars != 'undefined' ) {
            wp_vars = _.props.wp_vars;
            constants = wp_vars.constants;
            nodes = _.state.menu_items.map(function(item) {
                return (
                    <Child key={item.ID}
                        node={item}
                        children={item.children}
                        location = {_.props.location}
                        wp_vars = {_.props.wp_vars}
                    />
                );
            });
        }

        if(_.props.current_page){
            current_page = _.props.current_page;
            wp_head = current_page.wp_head;
        }

        return (
            <nav id={_.props.id} className="site-navigation">
                <ul>{nodes}</ul>
            </nav>
        );
    }
}

class Child extends Component {
    constructor(props){
        super(props);
        let _ = this;
        _.callSetCurrentPageID = _.callSetCurrentPageID.bind(_);
    }
    callSetCurrentPageID(){
        let _ = this,
            item = _.props.node,
            { object_id, url } = item;

        API.transitionToCurrentPage(object_id, url);
    }
    componentDidUpdate(prevProps) {
        let _ = this;
        if (_.props.location !== prevProps.location) {
            _.callSetCurrentPageID();
        }
    }
    render() {
        let _ = this,
            { object_id, title, ID, url, not_in_menu } = _.props.node,
            toUrl = API.stripSiteUrl(url, object_id),
            childnodes = null,
            isActive = '',
            hasChildren = '',
            urlString = '';

        if( (_.props.location.pathname == toUrl && !API.getParameter('page_id') ) ||
            API.getParameter('page_id').toString() == object_id ){
            isActive = ' current_page_item';
        }

        if(_.props.children) {
            childnodes = _.props.children.map(function(childnode) {
                return (
                    <Child key = {childnode.ID}
                        node = {childnode}
                        children = {childnode.children}
                        location = {_.props.location}
                        wp_vars = {_.props.wp_vars}
                    />
                );
            });
        }

        hasChildren = childnodes.length > 0 ? ' menu-item-has-children' : '';

        // Preserve query params throughout
        if(
            // Plain permalinks
            (_.props.location.search != '' && toUrl.match(/\?./)) ||
            // Other permalinks
            (_.props.location.search != '' && !toUrl.match(/\?./))
            ) {

            var searchParams = API.get_params(_.props.location.search.substr(1)),
                toUrlParams = API.get_params(toUrl.split('?')[1]),
                mappedParams = API.deepDiffMapper.map(toUrlParams, searchParams),
                paramsString = Object
                    .keys(mappedParams)
                    .map( (currentValue, index, array) => {
                        if( currentValue != 'page_id' ){
                            var value = mappedParams[currentValue][0] == undefined ? '' : '='+mappedParams[currentValue][0];
                            urlString += currentValue + value;

                            if( index+1 != array.length ){
                                urlString += '&';
                            }
                        }
                    });

            // Plain permalinks
            if( (_.props.location.search != '' && toUrl.match(/\?./)) ){
                if( toUrl.match(/page_id/) ){
                    toUrl += '&' + urlString;
                } else {
                    toUrl = '?' + urlString;
                }
            }

            // Other permalinks
            if( (_.props.location.search != '' && !toUrl.match(/\?./))){
                toUrl += '?' + urlString;
            }

        }

        return (
            not_in_menu ? false :
            <li key={ID}
                className = {'page_item page-item-'+object_id.toString() + ' menu-item-' + ID.toString() + isActive + hasChildren}>
                <NavLink to={toUrl}>{title}</NavLink>
                { childnodes.length > 0 ? <ul className="sub-menu">{childnodes}</ul> : '' }
            </li>
        );
    }
}

export default Menu;
