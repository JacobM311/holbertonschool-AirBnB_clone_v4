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
  
    // Make a POST request to the places_search endpoint
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: '{}',
      success: function (data) {
        // Loop through the results and create an article tag for each place
        $.each(data, function (index, place) {
          const article = $('<article></article>');
          const titleBox = $('<div class="title_box"></div>');
          const information = $('<div class="information"></div>');
          const description = $('<div class="description"></div>');
  
          titleBox.append(`<h2>${place.name}</h2>`);
          titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
  
          information.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>`);
          information.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
          information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);
  
          description.html(place.description);
  
          article.append(titleBox);
          article.append(information);
          article.append(description);
  
          $('section.places').append(article);
        });
      }
    });
  });
