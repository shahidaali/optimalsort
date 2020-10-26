<div class="wrap">
	<h1><?php _e('Optimal Sort Settings'); ?></h1>

	<?php if( !empty($messages) ): ?>
		<div id="setting-error-settings_updated" class="notice notice-<?php echo $messages['status']; ?> settings-error is-dismissible"> 
			<p><strong><?php echo $messages['message']; ?></strong></p>
			<button type="button" class="notice-dismiss"><span class="screen-reader-text"><?php _e('Dismiss this notice.') ?></span></button>
		</div>
	<?php endif; ?>

	<form action="" method="post">
		<div class="os-tabs">
			<ul>
				<li class="active"><a href="#tab-general">General</a></li>
				<li><a href="#tab-step-email">Email Settings</a></li>
			</ul>
		</div>
		<div class="os-tab-content active" id="tab-general">
			<table class="form-table" role="presentation">
				<tbody>
					<tr>
						<th scope="row"><?php _e('Show Links in Excerpts'); ?></th>
						<td><label for="show_in_excerpt">
						<input name="show_in_excerpt" type="checkbox" id="show_in_excerpt" value="1" <?php echo Optimalsort_Utill::is_checked( Optimalsort_Utill::get_option('show_in_excerpt', 1), 1 ); ?>><?php _e('Uncheck this checkbox to disable links for excerpts.') ?></label></td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Header Text'); ?></th>
						<td>
							<?php 
							wp_editor( Optimalsort_Utill::get_option('header_text', ""), 'header_text', array( 
								    'textarea_name' => 'optimalsort[header_text]',
								    'media_buttons' => false,
								    'textarea_rows' => 5,
								    'media_buttons' => true
							) );
							?>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Welcome Text'); ?></th>
						<td>
							<?php 
							wp_editor( Optimalsort_Utill::get_option('welcome_text', ""), 'welcome_text', array( 
								    'textarea_name' => 'optimalsort[welcome_text]',
								    'media_buttons' => false,
								    'textarea_rows' => 5,
								    'media_buttons' => true
							) );
							?>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Instructios Text'); ?></th>
						<td>
							<?php 
							wp_editor( Optimalsort_Utill::get_option('instructions_text', ""), 'instructions_text', array( 
								    'textarea_name' => 'optimalsort[instructions_text]',
								    'media_buttons' => false,
								    'textarea_rows' => 5,
								    'media_buttons' => true
							) );
							?>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Thank You Text'); ?></th>
						<td>
							<?php 
							wp_editor( Optimalsort_Utill::get_option('thankyou_text', ""), 'thankyou_text', array( 
								    'textarea_name' => 'optimalsort[thankyou_text]',
								    'media_buttons' => false,
								    'textarea_rows' => 5,
								    'media_buttons' => true
							) );
							?>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Financial Label'); ?></th>
						<td>
						<input name="optimalsort[financial_label]" type="text"  value="<?php echo Optimalsort_Utill::get_option('financial_label', ''); ?>" size="50" placeholder=""></td>
					</tr>
				</tbody>
			</table>
		</div>
	
		<div class="os-tab-content" id="tab-step-email">
			<table class="form-table" role="presentation">
				<tbody>
					<tr>
						<th scope="row"><?php _e('Customer Support Email'); ?></th>
						<td>
						<input name="optimalsort[customer_support_email]" type="email"  value="<?php echo Optimalsort_Utill::get_option('customer_support_email', ''); ?>" size="50" placeholder="mail@example.com"></td>
					</tr>
					
					<tr>
						<th colspan="2"><hr></th>
					</tr>
					<tr>
						<th colspan="2"><h2>Client Email</h2></th>
					</tr>
					<tr>
						<th scope="row"><?php _e('Client Emails CC (Comma separated)'); ?></th>
						<td>
						<input name="optimalsort[client_cc_emails]" type="email"  value="<?php echo Optimalsort_Utill::get_option('client_cc_emails', ''); ?>" size="50" placeholder="mail@example.com, mail@example.com"></td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Subject'); ?></th>
						<td>
						<input name="optimalsort[client_email_subject]" type="text"  value="<?php echo Optimalsort_Utill::get_option('client_email_subject', ''); ?>" size="50" placeholder="Goal Setting"></td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Clinet Email Template'); ?></th>
						<td>
							<?php 
							wp_editor( Optimalsort_Utill::get_option('client_email_template', ""), 'client_email_template', array( 
								    'textarea_name' => 'optimalsort[client_email_template]',
								    'media_buttons' => false,
								    'textarea_rows' => 8,
								    'media_buttons' => true
							) );
							?>
						</td>
					</tr>
					<tr>
						<th colspan="2"><hr></th>
					</tr>
					<tr>
						<th colspan="2"><h2>Admin Email</h2></th>
					</tr>
					<tr>
						<th scope="row"><?php _e('Admin Email'); ?></th>
						<td>
						<input name="optimalsort[admin_email]" type="email"  value="<?php echo Optimalsort_Utill::get_option('admin_email', ''); ?>" size="50" placeholder="mail@example.com"></td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Subject'); ?></th>
						<td>
						<input name="optimalsort[admin_email_subject]" type="text"  value="<?php echo Optimalsort_Utill::get_option('admin_email_subject', ''); ?>" size="50" placeholder="Goals"></td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Admin Email Template'); ?></th>
						<td>
							<?php 
							wp_editor( Optimalsort_Utill::get_option('admin_email_template', ""), 'admin_email_template', array( 
								    'textarea_name' => 'optimalsort[admin_email_template]',
								    'media_buttons' => false,
								    'textarea_rows' => 8,
								    'media_buttons' => true
							) );
							?>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p class="submit">
	    	<input type="hidden" name="optimalsort_options" value="1" />
	    	<input type="submit" class="button-primary" value="<?php _e('Submit'); ?>"/>
		</p>
	</form>
</div>
