// as seen here: http://habiamobile-com.factorepreview.ca/
// credit goes to marc kelsey (whiny-nil) for this one


APP.features.selector = {
  init: function (options) {
    $fauxSelect = $('.faux-select');
    $select = $('.select-box select');

    $fauxSelect.on('click', '.click', function () {
      $fauxSelect.find('ul.options').slideToggle(100);
    });

    $fauxSelect.on('click', '.value', function () {
      $fauxSelect.find('ul.options').slideToggle(100);
    });

    $fauxSelect.on('click', '.option', function () {
      $select.val($(this).attr('data')).trigger('change');
      $fauxSelect.find('.value').html($(this).html());
      $fauxSelect.find('ul.options').slideUp(100);
    });
  }
};