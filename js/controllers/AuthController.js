(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .controller('AuthController', ['AuthService', '$location', 'NotificationService', function(AuthService, $location, NotificationService) {
        const vm = this;
        vm.portalMode = 'user'; // 'user' or 'admin'
        vm.isLoginMode = true;
        vm.loginData = { email: '', password: '' };
        vm.regData = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

        vm.setPortal = (mode) => {
            vm.portalMode = mode;
            vm.isLoginMode = true; // Always default to login when switching
            vm.loginData = mode === 'admin' ? { email: 'admin@gmail.com', password: '' } : { email: '', password: '' };
        };

        vm.submitLogin = () => {
            if (!vm.loginData.email || !vm.loginData.password) {
                NotificationService.warning('Please complete all login fields.');
                return;
            }
            const res = AuthService.login(vm.loginData.email, vm.loginData.password);
            if (res.success) {
                NotificationService.success(`Welcome to the ${res.user.role === 'admin' ? 'Admin Console' : 'Customer Portal'}!`);
                $location.path(res.user.role === 'admin' ? '/admin' : '/user');
            } else {
                NotificationService.error(res.message);
            }
        };

        vm.submitRegister = () => {
            if (vm.regData.password !== vm.regData.confirmPassword) {
                NotificationService.error('Passwords do not match!');
                return;
            }
            const res = AuthService.register(vm.regData.name, vm.regData.email, vm.regData.phone, vm.regData.password);
            if (res.success) {
                NotificationService.success('Registration successful!');
                $location.path('/user');
            } else {
                NotificationService.error(res.message);
            }
        };
    }]);
})();