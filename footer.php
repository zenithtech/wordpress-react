
			</div><!-- #content -->
			<div id="footer" class="container">
				footer content
			</div>
		</div><!-- #page -->

		<?php wp_footer(); ?>

		<!-- START main.js -->
		<script type='text/javascript'>
			<?php echo file_get_contents(dirname(__FILE__).'/build/' . $GLOBALS['env'] . '/' . $GLOBALS['asset_manifest']['main.js']); ?>
		</script>
		<!-- END main.js -->

	</body>
</html>
