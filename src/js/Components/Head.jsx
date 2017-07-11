import React, { Component } from 'react';

class WPHeadHooks extends Component {
	constructor(props){
		super(props);
		let _ = this;
		_.evalScripts = _.evalScripts.bind(_);
	}
	evalScripts(){
		var jq = window.jQuery;
		jq('#wp-footer-hooks > script').each(function(){
			eval(jq(this).text());
			jq(window).trigger('load');
			jq(window).trigger('resize');
			jq(document).trigger('ready');
			console.log('asd //////////////');
		});
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
	render() {
		let _ = this;

		if(typeof _.props.current_page != 'undefined' ){
			let { current_page } = _.props;
			var wp_head_scripts = current_page.wp_head;
		}

		return (
			<head id="wp-head-hooks" dangerouslySetInnerHTML={{__html: wp_head_scripts}}></head>
		);
	}
}

class Head extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let _ = this;
		return (
			<WPHeadHooks {..._.props} />
		);
	}
}

export default Head;
