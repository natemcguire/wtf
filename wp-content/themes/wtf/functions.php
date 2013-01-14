<?php
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );
add_image_size( 'home_preview', 1024, 457, true );
add_image_size( 'single', 550, 9999, true );
add_action( 'init', 'register_my_menu' );
function register_my_menu() {
	register_nav_menu( 'main_menu', __( 'Main Menu' ) );
	
}



function cw_init_scripts() {
    if (!is_admin()) {
       wp_deregister_script( 'jquery' );
       wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
       wp_enqueue_script( 'jquery' );

       wp_enqueue_script('modernizr', get_bloginfo('template_directory').'/js/libs/modernizr-2.5.3.min.js', array('jquery'), '1.0.0');
       wp_enqueue_script('autoscale', get_bloginfo('template_directory').'/js/autoscaling-menu.js', array('jquery'), '1.0.0');
       wp_enqueue_script('plugins', get_bloginfo('template_directory').'/js/plugins.js', array('jquery'), '1.0.0',true);
       wp_enqueue_script('script', get_bloginfo('template_directory').'/js/script.js', array('jquery'), '1.0.0',true);



    }
}   
add_action('init', 'cw_init_scripts'); 

remove_action('wp_head', 'rel_canonical'); 
remove_action('wp_head', 'rsd_link'); 
remove_action('wp_head', 'wp_generator'); 
remove_action('wp_head', 'feed_links', 2); 
remove_action('wp_head', 'index_rel_link'); 
remove_action('wp_head', 'wlwmanifest_link'); 
remove_action('wp_head', 'feed_links_extra', 3); 
remove_action('wp_head', 'start_post_rel_link', 10, 0); 
remove_action('wp_head', 'parent_post_rel_link', 10, 0); 
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0); 

?>