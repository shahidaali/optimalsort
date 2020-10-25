<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://devinvinson.com
 * @since      1.0.0
 *
 * @package    Optimalsort
 * @subpackage Optimalsort/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Optimalsort
 * @subpackage Optimalsort/public
 * @author     Devin Vinson <devinvinson@gmail.com>
 */
class Optimalsort_Public {

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		Optimalsort_Utill::start_session();

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		wp_register_style( 'optimalsort-styles', plugin_dir_url( __FILE__ ) . 'css/optimalsort-public.css', array(), $this->version, 'all' );
		wp_register_style( 'optimalsort-global', plugin_dir_url( __FILE__ ) . 'css/optimalsort-global.css', array(), $this->version, 'all' );
		wp_register_style( 'optimalsort', plugin_dir_url( __FILE__ ) . 'css/optimalsort-public-responsive.css', array('optimalsort-global', 'optimalsort-styles'), $this->version, 'all' );

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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
		wp_register_script( 'optimalsort-global', plugin_dir_url( __FILE__ ) . 'js/optimalsort-global.js', array(), $this->version, false );
		wp_register_script( 'optimalsort', plugin_dir_url( __FILE__ ) . 'js/optimalsort-public.js', array( 'optimalsort-global' ), $this->version, false );
		wp_localize_script( 'optimalsort', 'optimalsortOptions',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' )) );

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function body_class($classes) {

		global $post;

	    if( isset($post->post_content) && has_shortcode( $post->post_content, 'optimalsort' ) ) {
	        $classes[] = 'optimalsort-page surveys ';
	    }
	    return $classes;

	}


	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Optimalsort_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	public function register_post_type() {
		register_post_type( 'optimalsort_cards', array(
			'labels' => array(
				'name' => __( 'Optimal Sort Cards', 'optimalsort' ),
				'singular_name' => __( 'Optimal Sort Card', 'optimalsort' ),
			),
			'rewrite' => false,
			'query_var' => true,
			'public' => true,
			'capability_type' => 'post',
			'supports' => ['title', 'editor', 'thumbnail', 'excerpt']
		) );

		$labels = array(
		    'name' => _x( 'Card Categories', 'taxonomy general name' ),
		    'singular_name' => _x( 'Card Category', 'taxonomy singular name' ),
		    'search_items' =>  __( 'Search Categories' ),
		    'all_items' => __( 'All Categories' ),
		    'parent_item' => __( 'Parent Category' ),
		    'parent_item_colon' => __( 'Parent Category:' ),
		    'edit_item' => __( 'Edit Category' ), 
		    'update_item' => __( 'Update Category' ),
		    'add_new_item' => __( 'Add New Category' ),
		    'new_item_name' => __( 'New Category' ),
		    'menu_name' => __( 'Categories' ),
		);    
		 
		register_taxonomy('optimalsort_cats', array('optimalsort_cards'), array(
		    'hierarchical' => true,
		    'labels' => $labels,
		    'show_ui' => true,
		    'show_in_rest' => true,
		    'show_admin_column' => true,
		    'query_var' => true,
		    'rewrite' => array( 'slug' => 'optimalsort_category' ),
		));
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function shortcode($atts) {
		wp_enqueue_script('optimalsort');
		wp_enqueue_style('optimalsort');

		$atts = shortcode_atts([

		], $atts);

		extract($atts);

		$args = array(
		    'post_type' => 'optimalsort_cards',
		    'posts_per_page' => -1,
		    'post_status' => 'publish',
		    'orderby' => 'menu_order', 
		    'order' => 'DESC',
		);
		$arr_posts = new WP_Query($args);

		$cards = [];
		if ($arr_posts->have_posts()) : 

			$counter = 0;
			while ($arr_posts->have_posts()) : $arr_posts->the_post();

				$post_id = get_the_ID();
				$thumbnail = get_the_post_thumbnail_url(get_the_ID(), 'full');

				$thumbnail_name = "";
				if($thumbnail) {
					$thumbnail_parts = explode("/", $thumbnail);
					$thumbnail_name = end($thumbnail_parts);
				}

				$cards[] = [
					'id' => $post_id,
					'survey_id' => 1,
					'label' => get_the_title(),
					'description' => esc_attr(get_the_excerpt()),
					'image_url' => $thumbnail,
					'uploaded_image_thumbnail_url' => $thumbnail,
					'uploaded_image' => $thumbnail_name,
					'position' => $counter,
					'migrating' => false,
				];
			endwhile;
			wp_reset_postdata();
		endif;

		$terms = get_terms( array(
		    'taxonomy' => 'optimalsort_cats',
		    'hide_empty' => false,
		) );

		$categories = [];
		$counter = 0;
		foreach ($terms as $key => $term) {
			$categories[] = [
				'id' => $term->term_id,
				'label' => $term->name,
				'position' => $counter,
				'description' => '',
				'card_limit' => NULL,
			];
		}

		$cards_data = [
			'type' => 'closed',
			'cards' => $cards,
			'categories' => $categories,
			'require_cards_sorted' => true,
			'require_categories_named' => true,
			'cards_with_positions' => true,
			'cards_with_descriptions' => true,
			'cards_with_images' => true,
			'categories_with_descriptions' => false,
			'hide_labels' => false,
			'skip_instructions' => false,
			'display_unsorted_cards_progress' => true,
			'categories_with_card_limits' => false,
			'custom_color' => '',
			'panel_participant' => NULL,
		];
		//Optimalsort_Utill::set_session('step', 'welcome');

		$form_data = [
			'email' => Optimalsort_Utill::get_session('email', ''),
			'name' => Optimalsort_Utill::get_session('name', ''),
			'financial' => Optimalsort_Utill::get_session('financial', ''),
			'email_copy' => Optimalsort_Utill::get_session('email_copy', ''),
			'comment' => Optimalsort_Utill::get_session('comment', ''),
			'sorted_cards' => Optimalsort_Utill::get_session('sorted_cards', []),
			'step' => Optimalsort_Utill::get_session('step', 'welcome'),
		];

		print_r($form_data);

		ob_start();
		include_once 'partials/shortcode.php';
		$html = ob_get_clean();

		return $html;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function optimalsort_ajax() {
		$json_data = [
			'status' => 'error',
			'message' => 'Nothing to process',
			'data' => []
		];

		$request_type = !empty($_REQUEST['request_type']) ? $_REQUEST['request_type'] : "";
		if($request_type == "save_cards") {
			$cards_json = !empty($_REQUEST['card_sort_json']) ? json_decode(str_replace("\\", "", $_REQUEST['card_sort_json']), true) : null;

			$sorted_cards = [];

			if(!empty($cards_json['cardsort'])) {
				foreach ($cards_json['cardsort'] as $key => $value) {
					if(strpos($key, 'category') !== false) {
						$category = str_replace("category-", "", $key);
						$sorted_cards[$category] = $value;
					}
				}
			}
			Optimalsort_Utill::set_session('sorted_cards', $sorted_cards);

			$json_data = [
				'status' => 'success',
				'message' => 'Categories saved',
				'data' => [
					'sorted_cards' => $sorted_cards,
				]
			];

			if(!empty($cards_json['comment'])) {
				Optimalsort_Utill::set_session('comment', $cards_json['comment']);
				$json_data['data']['comment'] = $cards_json['comment'];
			}
			else {
				Optimalsort_Utill::set_session('comment', '');
			}

			if(!empty($_REQUEST['final']) && $_REQUEST['final'] == 1) {
				Optimalsort_Utill::set_session('step', 'after');
			}
			else {
				Optimalsort_Utill::set_session('step', 'cardsort');
			}
		}

		if($request_type == "save_data") {
			$form_data = !empty($_REQUEST['form_data']) ? $_REQUEST['form_data'] : [];

			foreach ($form_data as $key => $value) {
				Optimalsort_Utill::set_session($key, $value);
			}

			if(!empty($form_data['completed']) && $form_data['completed']) {
				Optimalsort_Utill::reset_session();
			}

			$json_data = [
				'status' => 'success',
				'message' => 'Data saved',
				'data' => [
					'form_data' => $form_data,
				]
			];
		}

		$json_data['data']['request'] = $_REQUEST;

		header('Content-Type: application/json');
		echo json_encode($json_data);
		exit();
	}

}
