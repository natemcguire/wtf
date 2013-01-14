    </div><!-- / main -->
</div><!-- / wrapper -->
<footer>
    <?php
        wp_nav_menu (array(
            'theme_location' => 'main_menu',
            'container_class' => 'holder',
            'menu_class' => '',
            'menu_id' => 'nav',
            'depth' => 1
        ));
    ?>
    
</footer><!-- / footer -->

<?php wp_footer(); ?>
</body>
</html>