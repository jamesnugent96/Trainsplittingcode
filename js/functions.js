;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		// Datepicker

		var dateToday = new Date(); 

		$( '.datepicker' ).datepicker({
			dateFormat: 'dd/mm/yy',
			showOn: 'both',
			firstDay: 1,
			buttonImage: 'css/images/calendar.png',
			buttonImageOnly: true,
			buttonText: 'Select date',
			minDate: dateToday,
			dafaultDate: dateToday

		});

		$('#field-outward').datepicker('setDate', dateToday);

		//  Autocomplete

		$('.field-autocomplete').autocomplete({
			source: function( request, response ) {
				$.ajax({
					url: 'ajax/search.json',
					dataType: 'json',
					data: {
						p: request.term
					},
					success: function( data ) {
						response( data );
					}
				});
			},
		    minLength: 2
		});

		// Time Counting 

		$('#field-departure-time').on('change', function() {
			var departureValue = $(this).find(':selected').val();
			var departureMoment = moment(departureValue, 'HH:mm');
			var minReturnMoment = departureMoment.add(6, 'hours').format('HH:mm');
			var returnMomentMins = moment.duration(minReturnMoment).asMinutes();

			var departureDate = $('#field-outward').datepicker('getDate', '+1d');
 			
 			$('#field-return').datepicker('setDate', departureDate);

			if ( returnMomentMins >= 0 && returnMomentMins <= 330 ) {
				returnMomentMins = 540;

				departureDate.setDate(departureDate.getDate()+1); 

				$('#field-return').datepicker('setDate', departureDate);
			} 

			$('#field-return-time option').each(function(){
				var returnValue = $(this).val()
				var returnValueMoment = moment.duration(returnValue).asMinutes()
				
				if (returnValueMoment == returnMomentMins) {
				   $(this).prop('selected', 'selected');
				}
			});

		});

	});
})(jQuery, window, document);
