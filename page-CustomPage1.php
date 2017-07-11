<?php
/**
* Template Name: CustomPage1
*/

include('inc/page-header.php');

if( isset($via_ajax) ) {
?>

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

<?php
}

include('inc/page-footer.php');
?>
