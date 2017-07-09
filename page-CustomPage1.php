<?php
/**
* Template Name: CustomPage1
*/
?>

<style type="text/css">
	#CustomPage1 {
		background-color: #fff7ae;
	}
</style>

<div id="CustomPage1" class="col-md-12">
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
	jQuery('#CustomPage1').css('background-color', '#2effbc');
</script>

<script>
	alert('Multiple script tags. Another alert in another script tag.');
</script>
