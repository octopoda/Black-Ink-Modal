/* Very Simple Modal Plugin for JQUERY */


(function($){
	$.fn.modal = function (options) {
		var defaults =  {
			style: 'message',
			text: '',
			url: '',
			cancel: '',
			reportError: false,
			reportURL: '',
		}
		
		
		
		var options = $.extend(defaults, options);
		var $object = $(this)
		
		$object.before('<div id="mask"><div>');
		
	//Load Modal based on Style
		if (defaults.style == 'error') {
			$object.html('<p class="text">'+ defaults.text +'</p>'); //Add Text tag to Modal
			modalError(); //Load Modal as an Error
		} else if (defaults.style == 'message') {
			$object.html('<p class="text">'+ defaults.text +'</p>'); //Add Text tag to Modal
			modalMessage(); //Load Modal as an Message
		} else if (defaults.style == 'html') {
			$object.html('<div class="text">'+ defaults.text +'</div>'); //Add HTML wrapper for AJAX
			modalHTML(); //Load Modal as HTML
		}
		
		
		
	//Modal Errors
		function modalError() {
			//Add and remove Classes to call CSS
			$object.removeClass()
			$object.addClass('error');
			$object.addClass('modal');
			
			//If Default option to report Error is true print report error button
			if (defaults.reportError == true) {
				$object.children('.text').after('<a class="reportError button" href="'+ defaults.reportURL +'">Report Error</a>');
			}
			modal(); //Show Modal
		}
	
	
	//Modal Messages
		function modalMessage($text) {
			//Add and remove Classes to call CSS
			$object.removeClass()
			$object.addClass('message');
			$object.addClass('modal');
			
			modal(); //Load Modal
		}
		
		
	//Modal AJAX
		function modalHTML() {
			//Add and remove Classes to call CSS
			$object.removeClass()
			$object.addClass('message');
			$object.addClass('modal');
			
			//AJAX Load the URL 
			$.ajax({
				type: 'POST',
				url: defaults.url,
				success: function (data) {
					$object.children('.text').html(data);
					modal();
				},
				//If failed load the Error Modal
				error: function(xhr, textStatus, errThrown) {
					$object.html('<ul class="errors"><li>Something went wrong with out System, please alert our admin with this id: AJ198473</li></ul>');
					modal();
				}
			});
		}
		
	//Function to load modal and display it.
		function modal () {

			//Get the screen height and width
		    var maskHeight = $(document).height();
		    var maskWidth = $(window).width();

		    //Set height and width to mask to fill up the whole screen
		    $('#mask').css({'width':maskWidth,'height':maskHeight});

		        //transition effect    
		        $('#mask').fadeIn(1000);   
		        $('#mask').fadeTo("slow",0.6);

		        //Get the window height and width
		        var winH = $(window).height();
		        var winW = $(window).width();

		        //Set the popup window to center
		        $object.css('top',  winH/2-$object.height()/2);
		        $object.css('left', winW/2-$object.width()/2);

		        $object.children('.text').before('<a class="close"></a>');
				$object.addClass('modal');


		        //transition effect
		        $object.fadeIn(2000); 
		}
		
		//Click of the close button.  Clear modal and run callback function
		$('.modal .close').live('click', function () {
		 	clearModal();
        	defaults.cancel.call(this);
		});
	
		//Click of the background.  Clear Modal and run callback function
		$('#mask').live('click', function() {
        	clearModal();
        	defaults.cancel;
		});
		
		//Clear the modal and remove all classes
		function clearModal() {
			$object.hide();
			$object.html('');
			$object.removeClass();
			$('#mask').remove();	
		}
		
		
	};
})(jQuery);













	
		
	
	
	
	
	
	
	
	 
	
	