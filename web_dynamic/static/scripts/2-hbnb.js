$(function () {
    const amenityIds = {};
  
    $('.amenities input[type=checkbox]').change(function () {
      if (this.checked) {
        amenityIds[$(this).data('name')] = $(this).data('id');
      } else {
        delete amenityIds[$(this).data('name')];
      }
  
      $('.amenities h4').text(Object.keys(amenityIds).join(', '));
    });
  
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success') {
        if (data.status === 'OK') {
          $('div#api_status').addClass('available');
        } else {
          $('div#api_status').removeClass('available');
        }
      }
    });
});
