import React, { Component } from 'react';
import API from '../API.jsx';

class Page extends Component {
	constructor(props){
		super(props);
		let _ = this;
	}
	render() {
		let _ = this,
			blogdescription = '',
			current_page_id = '',
			html = '<div class="loading"></div>';

		if( typeof _.props.current_page != 'undefined' && 
			typeof _.props.current_page_id != 'undefined' && 
			_.props.current_page_id == _.props.current_page.page_id ) {

			if( _.props.current_page_id.length > 0) {
				current_page_id = _.props.current_page_id;
			}

			if( typeof _.props.current_page.html != 'undefined' ) {
				html = 'current_page_id: ' + current_page_id + _.props.current_page.html;
			}

		}

		return (
			<article dangerouslySetInnerHTML={{__html: html}}></article>
		);
	}
}

export default Page;
