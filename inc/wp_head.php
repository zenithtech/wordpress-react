<?php
function wp_head_hooks() {
?>

    <title><?php echo get_bloginfo(), " &#8211; ", the_title(); ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <link rel="canonical" href="<?php echo wp_get_canonical_url(); ?>" />
    <link rel="shortlink" href="<?php echo wp_get_shortlink(); ?>" />
    <link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo(), " &#8211; ", the_title(); ?>" href="<?php echo wp_get_canonical_url(); ?>feed/" />
    <link rel="alternate" type="application/json+oembed" href="<?php echo get_option('siteurl'); ?>/wp-json/oembed/1.0/embed?url=<?php echo urlencode(wp_get_canonical_url()); ?>" />
    <link rel="alternate" type="text/xml+oembed" href="<?php echo get_option('siteurl'); ?>/wp-json/oembed/1.0/embed?url=<?php echo urlencode(wp_get_canonical_url()); ?>&#038;format=xml" />

<?php
}
add_action('wp_head', 'wp_head_hooks');

remove_action( 'wp_head', '_wp_render_title_tag', 1 );
do_action('wp_head');
?>
