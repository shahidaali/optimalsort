<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://devinvinson.com
 * @since             1.0.0
 * @package           Optimalsort
 *
 * @wordpress-plugin
 * Plugin Name:       Optimalsort
 * Plugin URI:        https://connectpx.com
 * Description:       This plugin provides optimal sort for cards in different categories
 * Version:           1.0.0
 * Author:            Shahid Hussain
 * Author URI:        https://connectpx.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       optimalsort
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define("OPTIMALSORT_PLUGIN_URL", plugin_dir_url( __FILE__ ));

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-optimalsort-activator.php
 */
function activate_optimalsort() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-optimalsort-activator.php';
	Optimalsort_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-optimalsort-deactivator.php
 */
function deactivate_optimalsort() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-optimalsort-deactivator.php';
	Optimalsort_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_optimalsort' );
register_deactivation_hook( __FILE__, 'deactivate_optimalsort' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-optimalsort.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_optimalsort() {

	$plugin = new Optimalsort();
	$plugin->run();

}
run_optimalsort();
