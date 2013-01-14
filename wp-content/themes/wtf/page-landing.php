<?php
/*
Template Name: Landing
*/
?>
<?php get_header(landing); ?>
            <div id="marketing">
                <p style="width:420px;margin:auto auto;padding-bottom:40px;"> What the Food is an iOS food app that tells you what the f*** to eat for dinner. We give you tantilizing recipes you can actually make with the ingredients you already have. Through an intelligent ingredient learning system, we know what you can make for dinner before you do!
                <br>
                <br>

                All of the recipes are delicious and handwritten by us, the foodies behind the apron. Simplify dinner.</p>
            </div>
            <div id="phone">
            <img src="../img/phone.png">Coming Soon</img>
            </div>
            <div id="signup">
                Sign up to be a Tester
            </div>
            <div>
                <?php gravity_form(1, false, false, false, '', false); ?>
            </div>
            <div id="appstore">
                <img src="../img/appstore.png">Coming Soon</img>
            </div>
        </div><!-- / main -->
<?php get_footer(); ?>