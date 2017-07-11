<?php
if( !isset($via_ajax) ) {
	add_action( 'wp_enqueue_scripts', 'ajax_submit_enqueue_scripts' );
	function ajax_submit_enqueue_scripts() {
		wp_enqueue_script( 'ajax-submit', get_template_directory_uri().'/js/ajax.js' );
		wp_localize_script( 'ajax-submit', 'AjaxSubmit', array(
			'ajaxSubmitURL' => admin_url( 'admin-ajax.php' )
		));
	}
	get_header();
	?>

	<div id="react_page" class="container"></div>

<?php } ?>
