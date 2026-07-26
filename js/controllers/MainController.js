(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .controller('MainController', ['$scope', '$location', 'AuthService', 'StorageService', '$timeout', function($scope, $location, AuthService, StorageService, $timeout) {
        const vm = this;
        vm.currentPath = $location.path();
        vm.currentUser = AuthService.getUser();
        vm.isDarkTheme = StorageService.get(StorageService.KEYS.THEME, true);
        vm.toasts = [];

        vm.isLoggedIn = () => AuthService.isAuthenticated();
        vm.navigateTo = (path) => $location.path(path);

        vm.toggleTheme = () => {
            vm.isDarkTheme = !vm.isDarkTheme;
            StorageService.set(StorageService.KEYS.THEME, vm.isDarkTheme);
        };

        vm.logout = () => {
            AuthService.logout();
            vm.navigateTo('/login');
        };

        vm.getToastIcon = (type) => {
            const icons = {
                success: 'fa-check-circle',
                warning: 'fa-exclamation-triangle',
                error: 'fa-times-circle',
                info: 'fa-info-circle'
            };
            return icons[type] || icons.info;
        };

        vm.closeToast = (index) => vm.toasts.splice(index, 1);

        // Listen for internal broadcasts
        $scope.$on('$routeChangeSuccess', () => vm.currentPath = $location.path());
        $scope.$on('auth:stateChanged', (e, user) => vm.currentUser = user);
        $scope.$on('toast:show', (e, toast) => {
            vm.toasts.push(toast);
            $timeout(() => {
                const idx = vm.toasts.indexOf(toast);
                if (idx > -1) vm.toasts.splice(idx, 1);
            }, 4000);
        });

        // Keyboard accessibility bindings
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 't') {
                $scope.$apply(() => vm.toggleTheme());
            } else if (e.altKey && e.key === 'l' && vm.isLoggedIn()) {
                $scope.$apply(() => vm.logout());
            }
        });
    }]);
})();