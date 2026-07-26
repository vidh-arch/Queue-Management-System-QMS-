(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .controller('AdminController', ['QueueService', 'StorageService', 'NotificationService', '$scope', function(QueueService, StorageService, NotificationService, $scope) {
        const vm = this;
        vm.activeTab = 'counters';
        vm.counters = QueueService.getCounters();
        vm.departments = QueueService.getQueues();
        vm.allTokens = QueueService.getAllTokens();
        vm.staffList = StorageService.get(StorageService.KEYS.STAFF, []);
        vm.searchStaff = '';
        vm.searchToken = '';
        vm.sortField = 'name';
        vm.sortReverse = false;

        // Safe math calculation helpers
        vm.getTotalServed = () => vm.departments.reduce((acc, curr) => acc + (curr.totalServed || 0), 0);
        vm.getTotalWaiting = () => vm.departments.reduce((acc, curr) => acc + (curr.activeCount || 0), 0);

        vm.callNext = (counter) => {
            QueueService.callNext(counter.id);
            vm.refreshData();
            
            if (counter.currentToken === 'Idle') {
                NotificationService.warning(`No customers are currently waiting for ${counter.name}.`);
            } else {
                NotificationService.success(`Called token ${counter.currentToken} (${counter.servingUser}) to ${counter.name}.`);
            }
        };

        vm.toggleCounterStatus = (counter) => {
            counter.status = counter.status === 'Active' ? 'Paused' : 'Active';
            if (counter.status === 'Paused') {
                counter.currentToken = 'Offline';
                counter.servingUser = 'Counter Paused';
            } else {
                counter.currentToken = 'Idle';
                counter.servingUser = 'None';
            }
            StorageService.set(StorageService.KEYS.COUNTERS, vm.counters);
            NotificationService.info(`${counter.name} status updated to ${counter.status}.`);
        };

        vm.resetSystem = () => {
            if (confirm("Are you sure? This will wipe all tokens and reset queues to 0.")) {
                QueueService.resetAllQueues();
                vm.refreshData();
                NotificationService.info('System data reset to clean state.');
            }
        };

        vm.sortBy = (field) => {
            if (vm.sortField === field) vm.sortReverse = !vm.sortReverse;
            else {
                vm.sortField = field;
                vm.sortReverse = false;
            }
        };

        vm.chartData = {
            labels: vm.departments.map(d => d.name),
            datasets: [{
                label: 'Total Served Customers',
                data: vm.departments.map(d => d.totalServed),
                backgroundColor: ['#f59e0b', '#d97706', '#10b981', '#3b82f6'],
                borderRadius: 6
            }]
        };

        vm.updateCharts = () => {
            vm.chartData = {
                labels: vm.departments.map(d => d.name),
                datasets: [{
                    label: 'Total Served Customers',
                    data: vm.departments.map(d => d.totalServed),
                    backgroundColor: ['#f59e0b', '#d97706', '#10b981', '#3b82f6'],
                    borderRadius: 6
                }]
            };
        };

        // Centralized refresh function to pull fresh data from the hard drive
        vm.refreshData = () => {
            vm.counters = QueueService.getCounters();
            vm.departments = QueueService.getQueues();
            vm.allTokens = QueueService.getAllTokens();
            vm.updateCharts();
        };

        // Realtime Event Listener: Fires when YOU act OR when ANOTHER tab acts!
        $scope.$on('queue:updated', () => {
            vm.refreshData();
            $scope.$applyAsync();
        });
    }]);
})();