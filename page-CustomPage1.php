<?php
/**
* Template Name: CustomPage1
*/

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
<?php } else { ?>

<style type="text/css">
	body {
		background-color: #222;
		color: #fff;
	}
	#react_header {
		background-color: #0275d8;
	}
	#footer {
		background-color: #0275d8;
	}
</style>

<div id="react_page" class="container">
	<p>
	Custom template <b>page-CustomPage1.php</b>
	</p>
	<p>
	This is custom template, you can include shortcodes, custom CSS, JS, and PHP.
	</p>

	<p>
	Time via PHP within custom template: <?php echo date('Y-m-d G:i:s'); ?>
	</p>
</div>

<script>
	alert('This is an alert from the custom template page-CustomPage1.php.');
</script>

<script>
	alert('Multiple script tags. Another alert in another script tag.');
</script>

<?php } ?>


<?php
if( !isset($via_ajax) || $via_ajax != true ) {
	get_footer();
}
?>
