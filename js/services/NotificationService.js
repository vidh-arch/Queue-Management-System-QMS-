(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .factory('NotificationService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
        const notify = (message, type = 'info') => {
            const toast = { message, type, id: Date.now() };
            $rootScope.$broadcast('toast:show', toast);
        };

        return {
            success: (msg) => notify(msg, 'success'),
            error: (msg) => notify(msg, 'error'),
            warning: (msg) => notify(msg, 'warning'),
            info: (msg) => notify(msg, 'info')
        };
    }]);
})();