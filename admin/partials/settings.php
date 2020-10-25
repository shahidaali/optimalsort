<div class="wrap">
	<h1><?php _e('Optimal Sort Settings'); ?></h1>

	<?php if( !empty($messages) ): ?>
		<div id="setting-error-settings_updated" class="notice notice-<?php echo $messages['status']; ?> settings-error is-dismissible"> 
			<p><strong><?php echo $messages['message']; ?></strong></p>
			<button type="button" class="notice-dismiss"><span class="screen-reader-text"><?php _e('Dismiss this notice.') ?></span></button>
		</div>
	<?php endif; ?>

	<form action="" method="post">
		<table class="form-table" role="presentation">
			<tbody>
				<tr>
					<th scope="row"><?php _e('Show Links in Excerpts'); ?></th>
					<td><label for="show_in_excerpt">
					<input name="show_in_excerpt" type="checkbox" id="show_in_excerpt" value="1" <?php echo Optimalsort_Utill::is_checked( Optimalsort_Utill::get_option('show_in_excerpt', 1), 1 ); ?>><?php _e('Uncheck this checkbox to disable links for excerpts.') ?></label></td>
				</tr>
			</tbody>
		</table>
		<p class="submit">
	    	<input type="hidden" name="optimalsort_options" value="1" />
	    	<input type="submit" class="button-primary" value="<?php _e('Submit'); ?>"/>
		</p>
	</form>
</div>
