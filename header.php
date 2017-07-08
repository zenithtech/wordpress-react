<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <?php if (isset($_SERVER['HTTP_USER_AGENT']) && (false !== strpos( $_SERVER['HTTP_USER_AGENT'], 'MSIE'))) { ?>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <?php } ?>
        <title><?php wp_title(); ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

        <?php wp_head(); ?>

        <script type="text/javascript">
            var app;
            !function(e) {
                e.constants = function() {
                    var t = {
                        env: '<?php echo $GLOBALS['env']; ?>',
                        server_request_time: <?php echo strtotime(date('Y-m-d G:i:s')); ?>,
                        PATHINFO_BASENAME: '<?php echo pathinfo(get_wp_installation(), PATHINFO_BASENAME) ?>',
                        siteurl: '<?php echo get_option('siteurl'); ?>',
                        home: '<?php echo get_option('home'); ?>',
                        blogname: '<?php echo get_option('blogname'); ?>',
                        blogdescription: '<?php echo get_option('blogdescription'); ?>',
                        page_on_front: '<?php echo get_option('page_on_front'); ?>',
                        page_for_posts: '<?php echo get_option('page_for_posts'); ?>',
                        template_directory_uri: '<?php echo get_template_directory_uri(); ?>',
                        menu_items: <?php echo json_encode(wp_get_nav_menu_items('Top Menu')); ?>,
                        timezone_string: '<?php echo get_option('timezone_string'); ?>',
                        current_page_id: '<?php echo get_the_ID(); ?>',
                        isMobile: (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
                    };
                    return t;
                }();
            }(app || (app = {}));
        </script>


        <style type="text/css">
            <?php
                echo file_get_contents(dirname(__FILE__).'/build/'.$GLOBALS['env'].'/'.$GLOBALS['asset_manifest']['main.css']).
                file_get_contents(dirname(__FILE__).'/style.css'); ?>
        </style>

    </head>
    <body <?php body_class(); ?>>
        <div id="page" class="clearfix">
            <div id="react_header" class="clearfix"></div>
            <div id="content" class="clearfix">
