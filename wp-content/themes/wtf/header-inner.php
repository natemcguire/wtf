<!DOCTYPE html 
     PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><?php wp_title('', true, 'right'); ?> <?php bloginfo('name'); ?></title>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
	<?php wp_head(); ?>

    <!--[if lte IE 9]><link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo('template_directory');?>/css/ie.css" /><![endif]-->
    <script type="text/javascript">

    jQuery(document).ready(function() {

        jQuery.fn.cleardefault = function() {
        return this.focus(function() {
            if( this.value == this.defaultValue ) {
                this.value = "";
            }
        }).blur(function() {
            if( !this.value.length ) {
                this.value = this.defaultValue;
            }
        });
    };
    jQuery(".clearit input, .clearit textarea").cleardefault();

    });

    </script>
</head>
<body<?php if(is_front_page()) {echo ' class="inner-page"';} ?>>
    <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
    
    <div class="wrapper">
        <header>
            <div class="holder">
                <strong class="ipad-icon"><a href="http://angel.co/wtf">Coming soon to iPad and iPhone</a></strong>
                <strong class="logo"><a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></strong>
            </div>
        </header><!-- / header -->
        <div id="main">
