<?php

if( !isset($via_ajax) || $via_ajax != true ) {
	add_action( 'wp_enqueue_scripts', 'ajax_submit_enqueue_scripts' );
	function ajax_submit_enqueue_scripts() {
		wp_enqueue_script( 'ajax-submit', get_template_directory_uri().'/js/ajax.js' );
		wp_localize_script( 'ajax-submit', 'AjaxSubmit', array(
			'ajaxSubmitURL' => admin_url( 'admin-ajax.php' )
		));
	}

	get_header();
}
?>

<?php if( !isset($via_ajax) || $via_ajax != true ) { ?>
<div id="react_page" class="container"></div>
<?php } ?>

<?php
if( !isset($via_ajax) || $via_ajax != true ) {
	get_footer();
}
?>