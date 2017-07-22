import React, { Component } from 'react';
import API from '../API.jsx';
import * as JSX from '../../../';

class Page extends Component {
	constructor(props){
		super(props);
		let _ = this;
	}
	render() {
		let _ = this,
			blogdescription = '',
			current_page_id = '',
			html = '<div class="loading"></div>',
			page_template_camelize = '',
			JSX_comp = false;
			// JSX_objects = [],
			// JSX_objects_names = [],
			// JSX_objects_map = [];

		if( typeof _.props.current_page != 'undefined' && 
			typeof _.props.current_page_id != 'undefined' && 
			_.props.current_page_id == _.props.current_page.page_id
			){

			if( _.props.current_page_id.length > 0) {
				current_page_id = _.props.current_page_id;
			}

			if( typeof _.props.current_page.html != 'undefined' ) {
				let { page_template } = _.props.current_page;

				if(page_template && page_template != 'default'){
					page_template_camelize = API.camelize(page_template);
				    JSX_comp = JSX[page_template_camelize];
				}

				html = 'current_page_id: ' + current_page_id + _.props.current_page.html;
			}

			// JSX_objects_map = Object
			//     .keys(JSX)
			//     .map( (currentValue, index, array) => {
			// 		if(currentValue == page_template_camelize) {
			// 	        JSX_objects.push(currentValue);
			// 	        JSX_objects_names.push(JSX[currentValue].name);
			//         }
			//     });

		}

		return (
				JSX_comp ?
				<JSX_comp {..._.props} {..._.state} />
				:
				<article dangerouslySetInnerHTML={{__html: html}}></article>

		);
	}
}

export default Page;
