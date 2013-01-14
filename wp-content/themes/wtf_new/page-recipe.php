<?php
/*
Template Name: Recipe Landing Page
*/
?>
<?php get_header(); ?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<section class="visual visual-in">
		<div class="holder">
			<h1><?php echo get_field('group');?></h1>
			<div class="block">
				<div class="frame">
					<img src="<?php echo get_field('recipe_image');?>" alt="#">
					<div class="panel">
						<div class="box">
							<ul class="social">
								<li><a href="#">facebook</a></li>
								<li><a class="twitter" href="#">twitter</a></li>
								<li><a class="pin" href="#">Pin</a></li>
							</ul>
							<p><?php the_title(); ?> made by <a href="#"><?php the_author(); ?></a></p>
						</div>
					</div>
				</div>
			</div>
			<h2><?php the_title(); ?></h2>
			<ul class="add-nav">
				<li><a href="#ingredients">Ingredients</a></li>
				<li><a href="#preparation">Preparation</a></li>
			</ul>
		</div><!-- holder -->
	</section><!-- visual -->
	<section id="ingredients" class="title-block">
		<h1>Ingredients</h1>
		<img class="arrow" src="<?php echo get_bloginfo('template_directory').'/'; ?>images/arrow-01.png" width="69" height="29" alt="#">
	</section><!-- title-block -->
<section class="ingredients">
		<div class="holder">	
			
				<ul>
				<?php
				    foreach (get_field('ingredients') as $inner) {
				    	$vals = array_values($inner);
				    	$ingredient_text = $vals[0];
				    	echo "<li>$ingredient_text</li>";	
				    }  
				?>
				</ul>
			<span class="preparation-link"><a href="#preparation">Preparation</a></span>
		</div><!-- holder -->
	</section><!-- ingredients -->
<section id="preparation" class="title-block">
		<h1>Preparation</h1>
		<img class="arrow" src="<?php echo get_bloginfo('template_directory').'/'; ?>images/arrow-01.png" width="69" height="29" alt="#">
	</section><!-- title-block -->
	<section class="preparation">
		<div class="holder">
			<?php
				    echo get_field('prep');
				    
				?>
			<span class="ingredients-link"><a href="#ingredients">Ingredients</a></span>
		</div><!-- holder -->
	</section><!-- ingredients -->
	<section class="info-section info-3">
		<div class="holder">
			<div class="iphone">
				<div class="box">
					<img src="<?php echo get_bloginfo('template_directory').'/'; ?>images/img-03.jpg" alt="#">
				</div>
				<img src="<?php echo get_bloginfo('template_directory').'/'; ?>images/bg-iphone-2.png" alt="#" class="iphone-img">
			</div><!-- iphone -->
			<div class="block">
				<h3>Eat well and prosper.</h3>
				<p>Now is the time. Throw out those old, boring chicken recipes. Sample some our favorites.</p>
				<div class="links">
					 <?php
                        wp_nav_menu (array(
                            'theme_location' => 'chicken_menu',
                            'container_class' => 'links',
                            'menu_class' => '',
                            'menu_id' => 'nav',
                            'depth' => 1
                        ));
                    ?>
				</div>
				<div class="subscribe">
					<form action="#">
						<fieldset>
							<div class="row">
								<input type="text" class="text" value="Email Address...">
							</div>
							<a href="#appstore"><span class="submit"><input type="submit" value="GET ALL THE RECIPES"></span></a>
						</fieldset>
					</form>
				</div>
			</div>
		</div><!-- holder -->
	</section><!-- info-section -->
	<section class="info-section info-4">
		<div class="holder">
			<div class="iphone">
				<div class="box">
					<strong class="ttl">What the Food</strong>
					<a href="#" class="btn color-1"><span>DOWNLOAD NOW</span></a>
				</div>
				<img src="<?php echo get_bloginfo('template_directory').'/'; ?>images/bg-iphone-3.png" alt="#" class="iphone-img">
			</div><!-- iphone -->
			<div id="appstore" class="block">
				<h3>Buy What the Food now on the app store for iOS</h3>
				<p>With unique recipe matching technology and smart ingredient substitution your iOS device tells you what you should make for dinner, all in 90 seconds or less. Buy it now and see them all!</p>
				<a href="#" class="app-store">download on the app store</a>
			</div>
		</div><!-- holder -->
	</section><!-- info-section -->
	<?php endwhile; else: ?>
	<?php endif; ?>
<?php get_footer(); ?>