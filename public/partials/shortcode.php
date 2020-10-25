<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://devinvinson.com
 * @since      1.0.0
 *
 * @package    Optimalsort
 * @subpackage Optimalsort/public/partials
 */

$stepsData = [
   'steps' => [
      'welcome' => [

      ],
      'email' => [

      ],
      'cardsort' => [

      ],
      'after' => [

      ],
      'name' => [

      ],
      'email-copy' => [

      ],
      'completed' => [

      ],
   ],
   'activeStep' => $form_data['step']
];
?>

<div class="optimalsort-steps" data-steps='<?php echo esc_attr(json_encode($stepsData)); ?>' data-form='<?php echo esc_attr(json_encode($form_data)); ?>'>
   <?php 
   foreach ($stepsData['steps'] as $name => $step) {
      echo '<div class="optimalsort-step step-'.$name.'" id="step-'.$name.'" data-step="'.$name.'">';
      include_once( 'step-'.$name.'.php' );
      echo '</div>';
   }
   ?>
</div>
