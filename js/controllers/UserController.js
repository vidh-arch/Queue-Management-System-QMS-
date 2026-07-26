(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .controller('UserController', ['QueueService', 'AuthService', 'NotificationService', '$scope', '$window', function(QueueService, AuthService, NotificationService, $scope, $window) {
        const vm = this;
        vm.user = AuthService.getUser();
        vm.departments = QueueService.getQueues();
        vm.activeToken = QueueService.getActiveToken();
        vm.selectedDept = null;
        vm.searchQuery = '';

        vm.selectDepartment = (dept) => vm.selectedDept = dept;

        vm.joinQueue = () => {
            if (!vm.selectedDept) {
                NotificationService.warning('Please select a department.');
                return;
            }
            if (vm.activeToken && vm.activeToken.status === 'waiting') {
                NotificationService.error('You already have an active token in the queue!');
                return;
            }
            vm.activeToken = QueueService.generateToken(vm.selectedDept.id, vm.user);
            NotificationService.success(`Token ${vm.activeToken.id} generated successfully!`);
            vm.selectedDept = null;
        };

        vm.cancelToken = () => {
            if (vm.activeToken) {
                QueueService.cancelToken(vm.activeToken.id);
                NotificationService.info('Queue token has been cancelled.');
                vm.activeToken = null;
                vm.departments = QueueService.getQueues();
            }
        };

        vm.printToken = () => {
            $window.print();
        };

        // Realtime Event Listener: Updates screen when Admin calls next token in another tab!
        $scope.$on('queue:updated', () => {
            vm.departments = QueueService.getQueues();
            vm.activeToken = QueueService.getActiveToken();
            $scope.$applyAsync();
        });
    }]);
})();