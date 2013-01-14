<?php
/*
Template Name: Thanks
*/
?>
<?php get_header(thanks); ?>
            
            <div id="thankyou" style="text-align:center;">
            	<h1>Thank You!</h1>
                <p style="text-align:left;">Go check out some of our delicious recipes and be sure to tell your friends!</p>
                <div>
                	<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://wtfisfordinner.com" data-text="nom nom nom! do you have your invite?" data-via="wtfisfordinner" data-size="large" data-count="none">Tweet</a>
				</div>
				<br>
				<div class="thanksimg">
					<a href="<?php bloginfo('url'); ?>/food">
						<?php
						$thumbnails = get_posts('numberposts=1&orderby=rand');
						foreach ($thumbnails as $thumbnail) {
						if ( has_post_thumbnail($thumbnail->ID)) {
						echo get_the_post_thumbnail($thumbnail->ID, 'medium');
						}
					}
					?>
					</a>
					<a href="<?php bloginfo('url'); ?>/food" style="color:#ffffff;text-decoration:underline;"><h1>Show me deliciousness!</h1></a>
				</div>
			</div>
  </div><!-- / main -->
<?php get_footer(); ?>