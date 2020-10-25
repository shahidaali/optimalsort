<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://devinvinson.com
 * @since      1.0.0
 *
 * @package    Optimalsort
 * @subpackage Optimalsort/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Optimalsort
 * @subpackage Optimalsort/admin
 * @author     Devin Vinson <devinvinson@gmail.com>
 */
class Optimalsort_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Optimalsort_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Optimalsort_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/optimalsort-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Optimalsort_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Optimalsort_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/optimalsort-admin.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Register admin menu for plugin
	 *
	 * @since    1.0.0
	 */
	function admin_menu() {
		global $_wp_last_object_menu;
		$_wp_last_object_menu++;

		$slug = 'optimalsort';

		add_menu_page( 
	        __( 'Optimal Sort', 'optimalsort' ),
	        __( 'Optimal Sort', 'optimalsort' ),
	        'manage_options',
	        $slug,
	        array( $this, 'settings_page' ),
	        'dashicons-admin-settings',
	        6
	    ); 

		add_submenu_page( $slug,
			__( 'Settings', 'optimalsort' ),
			__( 'Setting', 'optimalsort' ),
			'optimalsort_manage_settings', 
			'optimalsort-settings',
			array( $this, 'settings_page' ) 
		);
	}

	/**
	 * Register settings page
	 *
	 * @since    1.0.0
	 */
	function settings_page() {
		// Check for permission
		if ( ! current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		// Save submitted form
	    $messages = $this->settings_page_save();

	    include_once 'partials/settings.php';
	}

	/**
	 * Register settings page
	 *
	 * @since    1.0.0
	 */
	function settings_page_save() {
		// Check for permission
		if ( !current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		if ( ! isset( $_POST['optimalsort_options'] ) ) {
	        return;
	    }

	    $plugin_enabled = isset($_POST['plugin_enabled']) ? $_POST['plugin_enabled'] : 0;
	    $show_in_excerpt = isset($_POST['show_in_excerpt']) ? $_POST['show_in_excerpt'] : 0;

	    // Create option array to save
	    $options = [
	    	'plugin_enabled' => $plugin_enabled,
	    	'show_in_excerpt' => $show_in_excerpt
	    ];

	    // Update options
	    update_option( 'optimalsort_options',  $options );

	    return [
	    	'status' => 'success',
	    	'message' => __( 'Settings saved' )
	    ];
	}
}
