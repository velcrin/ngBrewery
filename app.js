var module = angular.module('Brewery', []);
module.factory('breweryService', function() {
    return {
        getBeers: function() {
            return [
                {
                    name: 'Heinekken',
                    note: 0,
                    description: 'Heineken est un groupe brassicole d’origine néerlandaise fondé en 1873. 3e brasseur au niveau mondial, avec une part de marché de 8,8 %.',
                    img: 'images/heinekken.jpg'
                },
                {
                    name: 'Leffe',
                    note: 2.5,
                    description: 'La Leffe (ou Abbaye de Leffe) est une bière belge d\'Abbaye reconnue.',
                    img: 'images/leffe.jpg'
                },
                {
                    name: 'Chouffe',
                    note: 4,
                    description: 'La Chouffe est une bière blonde belge. Elle est produite par la brasserie d\'Achouffe, en province de Luxembourg. Elle fait partie des « blondes des Ardennes ».',
                    img: 'images/chouffe.jpg'
                },
                {
                    name: 'Cuvée des Jonquilles',
                    note: 4.5,
                    description: 'La Brasserie Au Baron, propriété de la famille Bailleux est située à Gussignies dans le département du Nord.',
                    img: 'images/cuvee-des-jonquilles.jpeg'
                },
                {
                    name: 'Moinette',
                    note: 4,
                    description: 'La Brasserie Dupont est une entreprise belge établie à Tourpes dans la commune de Leuze-en-Hainaut, au centre du Hainaut occidental.',
                    img: 'images/moinette.jpg'
                },
                {
                    name: 'Saint Feuillien',
                    note: 4,
                    description: 'La St Feuillien est une bière belge d\'Abbaye reconnue produite au Rœulx dans la brasserie St-Feuillien appelée aussi brasserie Friart.',
                    img: 'images/saint-feuillien.jpg'
                }
            ];
        },

        getOnePint: function(beer) {
            alert('The pint of ' + beer.name + ' is almost ready !');
        }
    }
});
module.controller('BreweryCtrl', ['$scope', 'breweryService', function($scope, breweryService) {
    $scope.beers = breweryService.getBeers();
}]);
module.filter('noteFilter', function() {
    return function(value) {
        return value > 3 ? 'fa fa-heart' : '';
    };
});
module.directive('beerItem', ['breweryService', function(breweryService) {
    return {
        restrict: 'E',
        scope: {
            beer: '='
        },
        template: '<div class="col m4">' +
        '<div class="card medium">' +
        '<div class="card-image">' +
        '<img src="{{ beer.img }}">' +
        '<span class="card-title"><i ng-class="beer.note | noteFilter"></i>{{beer.name}}</span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>{{beer.description}}</p>' +
        '</div>' +
        '<div class="card-action">' +
        '<button ng-click="selectBeer()" class="btn btn-primary">Give me a pinte !</button>' +
        '</div>' +
        '</div>' +
        '</div>',
        controller: ['$scope', function($scope) {
            $scope.selectBeer = function() {
                breweryService.getOnePint($scope.beer);
            };
        }]
    };
}]);