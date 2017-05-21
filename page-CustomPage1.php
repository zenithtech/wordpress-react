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
	The time is: <?php echo date('Y-m-d G:i:s'); ?>
	</p>

	<?php echo do_shortcode( '[contact-form-7 id="1736" title="Contact form 1"]' ); ?>

</div>

<js>
	jQuery('#CustomPage1').css('background-color', '#000');
	// alert('This is an alert JS run from custom template.');
	console.log('This is a console log JS run from custom template.');
</js>
