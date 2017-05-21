<?php

$GLOBALS['env'] = isset($_GET['dev']) ? 'dev' : 'production';

if (file_exists(dirname(__FILE__) . '/build/' . $env . '/asset-manifest.json')) {
    $GLOBALS['asset_manifest'] = json_decode(file_get_contents(dirname(__FILE__) . '/build/' . $env . '/asset-manifest.json'), true);
}

if ( ! function_exists( 'wpReact_setup' ) ) {

	function wpReact_setup() {

		add_theme_support( 'title-tag' );

		add_theme_support( 'menus' );

		register_nav_menus( array(
			'top' => __( 'Top Menu', 'react-theme-menu' )
		) );

		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		add_theme_support( 'post-formats', array(
			'aside',
			'image',
			'video',
			'quote',
			'link',
			'gallery',
			'status',
			'audio',
			'chat',
		) );

	}

}

add_action( 'after_setup_theme', 'wpReact_setup' );

function get_wp_installation(){
    $full_path = getcwd();
    $ar = explode("wp-", $full_path);
    return $ar[0];
}

function build_menu_tree( array &$elements, $parentId = 0 ){
    $branch = array();
    foreach ( $elements as &$element )
    {
        if ( $element['menu_item_parent'] == $parentId )
        {
            $children = build_menu_tree( $elements, $element['ID'] );
            if ( $children )
            {
                $element['children'] = $children;
            }
            $branch[$element['ID']] = $element;
            unset( $element );
        }
    }
    return $branch;
}

function get_menu_tree( $menu_id ){
    $items = wp_get_nav_menu_items( $menu_id );

    if( ! $items )
        return;

    $tmp = [];
    foreach( $items as $key => $item )
        $tmp[$item->ID] = [ 
            'ID'        => $item->ID, 
            'menu_item_parent' => $item->menu_item_parent, 
            'title'     => $item->title 
        ];

    return build_menu_tree( $tmp, 0 );
}

add_action( 'wp_ajax_nopriv_get_page_by_id', 'get_page_by_id' );
add_action( 'wp_ajax_get_page_by_id', 'get_page_by_id' );
function get_page_by_id() {
    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {

        $html = '';
        $post_id = $_POST['page_id'];
        $page_template = get_post_meta($post_id, '_wp_page_template', true);

        if($page_template == 'default'){
            ob_start();
            // global $post;
            $post = get_post($post_id);
            // setup_postdata($post);
            $content = $post->post_content;
            $content = apply_filters('the_content', $content);
            $html = str_replace(']]>', ']]&gt;', $content);
            // wp_reset_postdata($post);
            ob_end_flush();
        } else {
            ob_start();
            include $page_template;
            $html = ob_get_clean();
            ob_end_flush();
        }

        $page_array = [
            'last_page_id' => (int)$post_id,
            $post_id => [
                'page_id' => $post_id,
                'html' => $html,
                'server_request_time' => strtotime(date('Y-m-d G:i:s')),
                'page_template' => $page_template
            ]
        ];

        echo json_encode($page_array);

    }

    die();

}
