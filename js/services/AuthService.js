(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .factory('AuthService', ['StorageService', '$rootScope', function(StorageService, $rootScope) {
        let currentUser = StorageService.get('sq_current_user', null);

        const login = (email, password) => {
            // Strict Admin Credentials Check
            if (email === 'admin@gmail.com' && password === '123admin') {
                currentUser = { id: 'ADM-01', name: 'System Administrator', email: email, role: 'admin' };
                StorageService.set('sq_current_user', currentUser);
                $rootScope.$broadcast('auth:stateChanged', currentUser);
                return { success: true, user: currentUser };
            }

            const users = StorageService.get(StorageService.KEYS.USERS, []);
            const found = users.find(u => u.email === email && u.password === password);

            if (found) {
                currentUser = { id: found.id, name: found.name, email: found.email, role: 'user', phone: found.phone };
                StorageService.set('sq_current_user', currentUser);
                $rootScope.$broadcast('auth:stateChanged', currentUser);
                return { success: true, user: currentUser };
            }
            return { success: false, message: 'Invalid credentials. Please try again.' };
        };

        const register = (name, email, phone, password) => {
            if (email === 'admin@gmail.com') {
                return { success: false, message: 'Cannot register with restricted system email!' };
            }
            const users = StorageService.get(StorageService.KEYS.USERS, []);
            if (users.some(u => u.email === email)) {
                return { success: false, message: 'Email address already registered!' };
            }
            const newUser = { id: 'USR-' + Date.now(), name, email, phone, password, role: 'user' };
            users.push(newUser);
            StorageService.set(StorageService.KEYS.USERS, users);
            return login(email, password);
        };

        const logout = () => {
            currentUser = null;
            StorageService.set('sq_current_user', null);
            $rootScope.$broadcast('auth:stateChanged', null);
        };

        return {
            login,
            register,
            logout,
            getUser: () => currentUser,
            isAuthenticated: () => !!currentUser,
            isAdmin: () => currentUser && currentUser.role === 'admin'
        };
    }]);
})();