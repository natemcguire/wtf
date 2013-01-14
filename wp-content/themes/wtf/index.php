<?php get_header(); ?>
<ul class="gallery">
<?php if(have_posts()) : while(have_posts()) : the_post();

$previewimage = get_field('preview_image');
$delicious = get_field('delicious');

 ?>
	<li>
	    <a href="<?php the_permalink(); ?>" class="image">
	    	<?php echo wp_get_attachment_image($previewimage,'home_preview'); ?>

	    	<?php if($delicious) {

	    		echo '<span class="inf">It\'s delicious!</span>';

	    	} ?>
	        
	    </a>
	    <h2><span><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></span></h2>
	</li>
<?php endwhile; endif; ?>
</ul><!-- / gallery -->
<?php get_footer(); ?>