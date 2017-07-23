<?php
/**
* Template Name: History
*/

include('inc/page-header.php');
if( isset($via_ajax) ) { ?>

<style type="text/css">
	ul#history_items {
		list-style: none;
		padding: 0;
	}
	li.history_item {
		padding: 20px;
		border-top: 1px solid #ccc;
		display: block;
		position: relative;
	}
	li.history_item p {
		margin: 0;
		line-height: 1.4;
	}
</style>

<div class="container">
	<h3><br />Custom React component JSX WordPress template</h3>
	<p>
		This is custom React component that shows the history of pages you visited retreived from the app cache:
		<br />
		<br />
	</p>
</div>

<?php } include('inc/page-footer.php'); ?>
