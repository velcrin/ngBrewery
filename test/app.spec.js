describe('Brewery', function() {

    beforeEach(angular.mock.module('Brewery'));

    describe('BreweryService', function() {

        var breweryService;

        beforeEach(inject(function(_breweryService_) {
            breweryService = _breweryService_;
        }));

        it('should return 6 beers', function() {
            expect(breweryService.getBeers().length).toBe(6);
        });

        it('should pour a given pint', function() {
            spyOn(window, 'alert');

            breweryService.getOnePint({
                name: 'Leffe'
            });

            expect(window.alert).toHaveBeenCalledWith('The pint of Leffe is almost ready !');
        });
    });


    describe('BreweryCtrl', function() {

        var $scope, beers = [{ name: 'Heinekken' }, { name: 'Leffe' }];

        beforeEach(inject(function($rootScope, breweryService, $controller) {
            $scope = $rootScope.$new();
            spyOn(breweryService, 'getBeers').and.returnValue(beers);
            $controller('BreweryCtrl', {
                $scope: $scope,
                breweryService: breweryService
            });
        }));

        it('should expose some beers to the scope', function() {
            expect($scope.beers).toEqual(beers);
        });
    });

    describe('noteFilter', function() {

        var noteFilter;

        beforeEach(inject(function($filter) {
            noteFilter = $filter('noteFilter');
        }));

        it('should add an heart when the note is greater than 3', function() {
            expect(noteFilter(4)).toBe('fa fa-heart');
        });

        it('should be empty when the note is lower or equal to 3', function() {
            expect(noteFilter(3)).toBe('');
        });
    });

    describe('beerItem', function() {

        var $scope, component, breweryService, beer = {
            name: 'Cuvée des Jonquilles',
            note: 4.5,
            description: 'La Brasserie Au Baron, propriété de la famille Bailleux est située à Gussignies dans le département du Nord.',
            img: 'images/cuvee-des-jonquilles.jpeg'
        };

        beforeEach(inject(function($rootScope, _breweryService_, $compile) {
            $scope = $rootScope.$new();
            $scope.beer = beer;
            breweryService = _breweryService_;
            component = $compile('<beer-item beer="beer"></beer-item>')($scope);
            $scope.$apply();
        }));

        it('should display beer\'s image', function() {
            expect(component.find('img').attr('src')).toBe(beer.img);
        });

        it('should display beer\'s name', function() {
            expect(component.find('.card-title').text()).toBe(beer.name);
        });

        it('should display beer\'s description', function() {
            expect(component.find('.card-content').text()).toBe(beer.description);
        });

        it('should display an heart', function() {
            expect(component.find('.fa-heart').length).toBe(1);
        });

        it('should pour a beer when requested', function() {
            spyOn(breweryService, 'getOnePint');

            component.find('button').click();

            expect(breweryService.getOnePint).toHaveBeenCalledWith(beer);
        });
    });
});