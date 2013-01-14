<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp_wtfisfordinner');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'makemoney$');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'uYi$c;w[`0fvL`_|CU<y22*W]+-A^M=|rq,z>iy#{nYf-Y0^3%IH~H3J|E]/$q_0');
define('SECURE_AUTH_KEY',  'G#)^!5-`+uiJM&~?pdXZHQEzVia&1Co9l=-8Bo;rnvcD1KN9<[:0euMD`r~JP(I%');
define('LOGGED_IN_KEY',    'DA~Q/ROAHKFbhU,~[v~oUHG%fW}LwloFW1L|QmcZ5t&-bv$zAy-1&NqTz{ox74&[');
define('NONCE_KEY',        '{GD:;o~I_]D1{3MnmW!O>#:&r_cJH(_;nN!h+P8@$eFHk*w`Tqf1$HS &53226Gh');
define('AUTH_SALT',        '`/g?lfQ0WySk.~I8-C<n~UYOCN|QVXrfPUy]3|z;~?;H,czu#&;0M]9-O.%)YqDV');
define('SECURE_AUTH_SALT', 'ZZr:+V|r[>fu:R&m$NGMkp+qsPGM=X*y)(O=:4^x-~(oEJ7~D,|.3j<_`2-lE8vl');
define('LOGGED_IN_SALT',   '-q+8BLb{CcHTym>Qhf~_o>=rl3nhDN4l<-t/pH!=%+5b-Q,e$X$h3U Ofp}QTJU+');
define('NONCE_SALT',       'G6eZ_q_A0+Ttk~ERq]&FIRSdz?l6w7o+_iZOI:6WA|K;lSE;d*u@_-T^}[)O.IYX');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
