import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataStore from './src/js/Stores/DataStore.jsx';
import API from './src/js/API.jsx';

class History extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let _ = this,
			blogdescription = '',
			current_page_id = '',
			html = '<div class="loading"></div>',
			pages_cache = DataStore.data.pages_cache,
			pages_cache_html = false;

		if( typeof _.props.current_page != 'undefined' && 
			typeof _.props.current_page_id != 'undefined' && 
			_.props.current_page_id == _.props.current_page.page_id
			){

			if( _.props.current_page_id.length > 0) {
				current_page_id = _.props.current_page_id;
			}

			if( typeof _.props.current_page.html != 'undefined' ) {
				html = 'current_page_id: ' + current_page_id + _.props.current_page.html;
			}

		}

		pages_cache_html = Object
		    .keys(pages_cache)
		    .map( (currentValue, index, array) => {
		    	if(currentValue != 'last_page_id'){
			    	return pages_cache[currentValue];
				}
			})
		    .map( (currentValue, index, array) => {
		    	if(typeof currentValue != 'undefined'){
					var h = '',
						date = API.timeConvert(currentValue.server_request_time),
		            	dateSplit = date.split(/[- :]/),
						dateArr = new Date(dateSplit[0], dateSplit[1], dateSplit[2], dateSplit[3], dateSplit[4], dateSplit[5]),
						date_formatted = dateArr.toLocaleString('en-us', { month: "long" }) + ' ' + dateArr.getDate() + ', ' + dateArr.getFullYear() + ', ' + dateArr.getHours() + ':' + dateArr.getMinutes() + ':' + dateArr.getSeconds();

					h += '<div class="history_item">\
						<p>Page title: ' + currentValue.the_title + '</p>\
						<p>Page ID: ' + currentValue.page_id + '</p>\
						<p>Page URL: <a href="' + currentValue.url + '" target="_self">' + currentValue.url + '</a></p>\
						<p>Request time: ' + date_formatted + '</p>\
					</div>';

					return h;
				}

		    });

		return (
			<div className="clearfix">
				<div dangerouslySetInnerHTML={{__html: html + pages_cache_html.join('') }}></div>
			</div>
		);
	}
}

export default History;
