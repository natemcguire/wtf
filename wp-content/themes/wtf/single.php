<?php get_header(inner); ?>
<?php while(have_posts()) : the_post(); ?>

<?php if(has_post_thumbnail()): ?>
 <div class="visual">
 	<?php the_post_thumbnail('single'); ?>
</div><!-- / visual -->
<?php endif; ?>
<article class="info">
    <h1><?php the_title(); ?></h1>
    <?php the_content(); ?>
</article><!-- / info -->
<?php endwhile; ?>
<?php get_footer(); ?>