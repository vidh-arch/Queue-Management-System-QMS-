(function() {
    'use strict';

    angular.module('SmartQueueApp', ['ngRoute'])
    .config(['$compileProvider', function($compileProvider) {
        // Optimize performance for production demonstration
        $compileProvider.debugInfoEnabled(false);
    }])
    .run(['$rootScope', 'StorageService', function($rootScope, StorageService) {
        // Seed clean default queues into LocalStorage if empty
        StorageService.initializeDefaults();
        
        // Notice: We removed QueueService.startSimulation() here!
        // The system now runs on 100% real user actions.
    }]);
})(); 