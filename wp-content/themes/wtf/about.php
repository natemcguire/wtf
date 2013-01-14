<?php get_header(); ?>
<?php while(have_posts()) : the_post(); ?>

<?php if(has_post_thumbnail()): ?>
 <div class="visual">
 	<?php the_post_thumbnail('single'); ?>
</div><!-- / visual -->
<?php endif; ?>
<article class="info">
    <?php the_content(); ?>
</article><!-- / info -->
<?php endwhile; ?>
<?php get_footer(); ?>
