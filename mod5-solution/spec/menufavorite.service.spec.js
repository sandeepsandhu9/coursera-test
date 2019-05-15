describe('menucategories', function () {

  var menuFavorite;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuFavorite = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('This returns your favorite menu item', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/' + 'A3' + '.json')
      .respond({id: 3, short_name: "A3"});

    menuFavorite.getFavoriteItem("A3")
      .then(function(response) {
        expect(response)
          .toEqual({id: 3, short_name: "A3"});
      }
    );
    $httpBackend.flush();
  });
});
