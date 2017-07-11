import React, { Component } from 'react';
import update from 'immutability-helper';
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
        _.evalScripts = _.evalScripts.bind(_);
    }
    evalScripts(){
        var _ = this,
            current_page = {},
            wp_head = '',
            jq = window.jQuery;

        if(_.props.current_page){
            current_page = _.props.current_page;
            wp_head = current_page.wp_head;
            jq('head').html(wp_head);
            jq('head > script').each(function(){
                eval(jq(this).text());
            });
            jq(window).trigger('load');
            jq(window).trigger('resize');
            jq(document).trigger('ready');
        }
    }
    onMenuTreeUpdate() {
        let _ = this;
        console.log('4. In View > react_page > onMenuTreeUpdate');
        _.setState({ menu_items: DataStore.getMenuTree() });
    }
    componentDidUpdate(prevProps, prevState) {
        let _ = this

        if( typeof _.props.current_page != 'undefined' ) {
            if(typeof prevProps.current_page == 'undefined'){
                _.evalScripts();
                return;
            }
            if(typeof prevProps.current_page.page_id != 'undefined' && prevProps.current_page.page_id != _.props.current_page.page_id){
                _.evalScripts();
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
            blogdescription = '',
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
            blogdescription = _.props.wp_vars.constants.blogdescription;
        }

        if(_.props.current_page){
            current_page = _.props.current_page;
            wp_head = current_page.wp_head;
            // console.log(wp_head);
        }

        return (
            <nav id="site-navigation" className="container">
                <p>{blogdescription}</p>
                <ul id="top-menu" className="menu">
                    {nodes}
                </ul>
            </nav>
        );
    }
}

class Child extends Component {
    constructor(props){
        super(props);
        let _ = this;
        _.setCurrentPageID = _.setCurrentPageID.bind(_);
    }
    setCurrentPageID(){
        let _ = this,
            item = _.props.node,
            { object_id, url } = item,
            CurrentPageID = DataStore.getCurrentPageID();

        if( !API.getParameter('page_id') && CurrentPageID != object_id ){
            let { PATHINFO_BASENAME, siteurl } = _.props.wp_vars.constants,
                toUrl = '/'+PATHINFO_BASENAME+url.replace(siteurl, '');
            if( _.props.location.pathname == toUrl ){
                API.set_current_page_id(document.location.origin, document.location.pathname, false);
                return;
            }
        }
        if( API.getParameter('page_id').toString() == object_id && CurrentPageID != object_id ) {
            API.set_current_page_id(false, false, API.getParameter('page_id').toString());
            return;
        }
    }
    componentDidUpdate(){
        this.setCurrentPageID();
    }
    render() {
        let _ = this,
            {PATHINFO_BASENAME, siteurl, page_on_front} = _.props.wp_vars.constants,
            item = _.props.node,
            { object_id, title, ID, url, not_in_menu } = item,
            toUrl = '',
            childnodes = null,
            isActive = '',
            hasChildren = '',
            urlString = '';

        toUrl = API.stripSiteUrl(url, object_id);

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
                        var value = mappedParams[currentValue][0] == undefined ? '' : '='+mappedParams[currentValue][0];
                        urlString += currentValue + value;
                        if( index+1 != array.length ){
                            urlString += '&';
                        }
                        return urlString;
                    });

            // Plain permalinks
            if( (_.props.location.search != '' && toUrl.match(/\?./)) ){
                toUrl = '?' + urlString;
            }

            // Other permalinks
            if( (_.props.location.search != '' && !toUrl.match(/\?./))){
                toUrl += '?' + urlString;
            }

        }

        return (
            not_in_menu ? false :
            <li key={ID}
                id={'menu-item-'+ID.toString()}
                className = {'page_item page-item-'+object_id.toString() + ' menu-item-' + ID.toString() + isActive + hasChildren}>
                <NavLink to={toUrl}>{title}</NavLink>
                { childnodes.length > 0 ? <ul className="sub-menu">{childnodes}</ul> : '' }
            </li>
        );
    }
}

export default Menu;
