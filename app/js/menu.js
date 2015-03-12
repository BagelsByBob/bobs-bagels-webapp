var menu = (function (module) {

  module.renderMenu = function(data){
    var template = Handlebars.compile($('#menu-info').html());
      $('#menu').html(template({
    products: data
  }));
  };

  return module;

})(menu || {});
