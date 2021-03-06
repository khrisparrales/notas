(function(){
	var NotaController = function($scope,$rootScope, $routeParams,$location, NotaService, PaginateFactory) {	

		$rootScope.action = {};
		$rootScope.hide_form = false;

		$scope.creat_note = function(){
			NotaService.creat_note({nota:$scope.nota}, function(data) {
				if(data){
					$rootScope.hide_form = true;
					$location.path('/nota/'+data.nota._id);
					$scope.nota = data.nota;
					console.log($scope.nota);
				}
			});
		}

		$scope.getAll = function(){
			NotaService
				.getAll(function(notas){				
					$scope.all_notes = notas;					
					$scope.notas = $scope.all_notes.slice(0,10)
					$scope.pagina=1;
					$rootScope.action.create="Crear nota";
				});
		};

		$scope.getNote = function() {
			NotaService
				.getNote($routeParams.id,function(nota){
					$scope.nota=nota;
					$rootScope.action.create="Crear nota";
					$rootScope.action.view="Ver notas";
					if($routeParams.id){
						$rootScope.action.edit=true;
					}
				});
		};


		$scope.update_note = function(){
			$scope.nota.id = $routeParams.id;
			NotaService.updateNote($scope.nota,function(nota){});
		};

		$scope.delete = function(id) {
			if(confirm("¿Esta Seguro que desea eliminar esta nota?")){
				NotaService.delete(id);
			}
		};

		$scope.clear_model= function(){
			$scope.nota = null;
		};

		$scope.paginate= function(pagina){
			PaginateFactory.paginate($scope, pagina);
		};

	};

	angular
		.module('notas.controller',[])
		.controller('NotaController',['$scope','$rootScope','$routeParams','$location','NotaService','PaginateFactory',NotaController]);
}())