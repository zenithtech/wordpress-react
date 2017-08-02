<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head></head>
    <body <?php body_class(); ?>>
        <script type="text/javascript">
            var app;
            !function(e) {
                e.constants = function() {
                    var t = {
                        'env': '<?php echo $GLOBALS['env']; ?>',
                        'server_request_time': <?php echo strtotime(date('Y-m-d G:i:s')); ?>,
                        'PATHINFO_BASENAME': '<?php echo pathinfo(get_wp_installation(), PATHINFO_BASENAME) ?>',
                        'siteurl': '<?php echo get_option('siteurl'); ?>',
                        'ajaxSubmitURL': '<?php echo get_option('siteurl'); ?>/wp-admin/admin-ajax.php',
                        'home': '<?php echo get_option('home'); ?>',
                        'blogname': '<?php echo get_option('blogname'); ?>',
                        'blogdescription': '<?php echo get_option('blogdescription'); ?>',
                        'pingback_url': '<?php echo get_bloginfo('pingback_url'); ?>',
                        'rss2_url': '<?php echo get_bloginfo('rss2_url'); ?>',
                        'version': '<?php echo get_bloginfo('version'); ?>',
                        'page_on_front': '<?php echo get_option('page_on_front'); ?>',
                        'page_for_posts': '<?php echo get_option('page_for_posts'); ?>',
                        'current_page_id': '<?php if(get_the_ID()) { echo get_the_ID(); } else { echo get_option('page_on_front'); } ?>',
                        'template_directory_uri': '<?php echo get_template_directory_uri(); ?>',
                        'timezone_string': '<?php echo get_option('timezone_string'); ?>',
                        'isMobile': (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())),
                        'menus': {
                            'Top Menu': <?php echo json_encode(wp_get_nav_menu_items('Top Menu')); ?>,
                            'Footer Menu': <?php echo json_encode(wp_get_nav_menu_items('Footer Menu')); ?>
                        },
                        'menu_items': <?php echo json_encode(wp_get_nav_menu_items('Top Menu')); ?>
                    };
                    return t;
                }();
            }(app || (app = {}));

            <?php
            echo file_get_contents(dirname(dirname(dirname(dirname(__FILE__)))).'/wp-includes/js/jquery/jquery.js');
            ?>
        </script>

        <style type="text/css">
            <?php
            echo file_get_contents(dirname(__FILE__).'/build/'.$GLOBALS['env'].'/'.$GLOBALS['asset_manifest']['main.css']).
                file_get_contents(dirname(__FILE__).'/style.css');
            ?>
        </style>

        <!-- START #page -->
        <div id="page" class="clearfix">
            <div id="react_header" class="clearfix"></div>
            <!-- START #content -->
            <div id="content" class="clearfix">
