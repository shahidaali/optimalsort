(function( $ ) {
	'use strict';
	// console.log(optimalsortOptions);

	var Global_Response_Handler = {
	  response : null,
	  init : function( response ) {
	    this.response = response;
	    return this;
	  },
	  is_success : function() {
	    return this.response.status == 'success';
	  },
	  is_error : function() {
	    return this.response.status == 'error';
	  },
	  message : function() {
	    return this.response.message;
	  },
	  status : function() {
	    return this.response.status;
	  },
	  data : function() {
	    return ( this.response.data !== undefined ) 
	      ? this.response.data
	      : {};
	  },
	  get_data : function(key, default_value) {
	    return ( this.response.data[ key ] !== undefined ) 
	      ? this.response.data[ key ]
	      : default_value;
	  },
	  get_request : function(key, default_value) {
	    return ( this.response.request[ key ] !== undefined ) 
	      ? this.response.request[ key ]
	      : default_value;
	  }
	};

	var OptimalSortPlugin = {
		wrapper: $('.optimalsort-steps'),
		stepItem: '.optimalsort-step',
		steps: $('.optimalsort-steps').data('steps'),
		stepsData: {
			activeStep: "welcome",
		},
		formData: function(){
			var _this = this;

			return {
				email: $('.questionnaire-input--login-entry').val(),
				name: $('.questionnaire-name').val(),
				financial: $('.questionnaire-financial').val(),
				email_copy: $('.questionnaire-email-copy:checked').val(),
				step: _this.stepsData.activeStep
			}
		},
		init: function() {
			var _this = this;

			_this.stepsData.activeStep = _this.steps.activeStep;

			_this.doActiveStep();

			$(document).on('click', '.btn-next', function(e){
				var nextStep = $('.step-'+_this.stepsData.activeStep).next(_this.stepItem).data('step');
				_this.doNextStep(nextStep);
			});

			$(document).on('click', '.btn-back', function(e){
				var prevStep = $('.step-'+_this.stepsData.activeStep).prev(_this.stepItem).data('step');
				_this.doActiveStep(prevStep);
			});

			if(_this.stepsData.activeStep != "cardsort") {
				setTimeout(function(){
					$('#instructionsModal').modal('hide')
				}, 500);
			}
		},
		doNextStep: function(nextStep) {
			var _this = this;
			var step = _this.stepsData.activeStep;
			var formData = _this.formData();
			var ajaxData = {
				doNextStep: true,
				doRedirect: false,
				nextStep: nextStep,
				form_data: formData,
			};

			if(step == "email") {
				if(!_this.validateEmail(formData.email)) {
					$('#emailError').show();
					return false;
				}
				else {
					$('#emailError').hide();
				}
			}
			else if(step == "name") {
				if(formData.name == "") {
					$('#nameError').show();
					return false;
				}
				else {
					$('#nameError').hide();
				}
			}
			else if(step == "email-copy") {
				if(formData.email_copy == "") {
					$('#emailCopyError').show();
					return false;
				}
				else {
					$('#emailCopyError').hide();
				}
				ajaxData.form_data.completed = 1;
			}

			_this.saveData(ajaxData);
		},
		doActiveStep: function(step) {
			var _this = this;

			if(step === undefined) {
				step = _this.stepsData.activeStep;
			}

			$(_this.stepItem).hide();
			$('.step-'+step).show();

			if(step == "cardsort") {
				$('#instructionsModal').modal('show');
				setTimeout(function(){
					$('.cs-grid').packery('layout');
				}, 500);
			}

			_this.stepsData.activeStep = step;
		},
		saveData: function(data) {
			var _this = this;

			$.ajax({
				type : "post",
				dataType : "json",
				url : optimalsortOptions.ajax_url,
				data : {
                    action: 'optimalsort_ajax',
                    request_type: 'save_data',
                    form_data: data.form_data,
                },
				success: function(response) {
					var res = Global_Response_Handler.init(response);
					if( res.is_success() ) {
						if(data.doNextStep) {
							_this.doActiveStep(data.nextStep);
						}
						if(data.doRedirect) {
							location.reload();
						}
					} else {
						alert(res.message());
					}
				},
				error: function() {
					alert("Error processing request. Please contact support.");
				}
			}) 
		},
		validateEmail: function(mail) {
		 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
		  {
		    return (true)
		  }
		    
		  return (false)
		}
	};

	OptimalSortPlugin.init();
})( jQuery );
