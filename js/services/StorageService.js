(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .factory('StorageService', ['$window', function($window) {
        const KEYS = {
            USERS: 'sq_users',
            QUEUES: 'sq_queues',
            COUNTERS: 'sq_counters',
            STAFF: 'sq_staff',
            ACTIVE_TOKEN: 'sq_active_token',
            THEME: 'sq_theme'
        };

        const get = (key, fallback = null) => {
            const data = $window.localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        };

        const set = (key, value) => {
            $window.localStorage.setItem(key, JSON.stringify(value));
        };

        const initializeDefaults = () => {
            // Only seed departments if they don't exist
            if (!get(KEYS.QUEUES)) {
                set(KEYS.QUEUES, [
                    { id: 'GEN', name: 'General Enquiries', prefix: 'G', avgWait: 5, activeCount: 0, totalServed: 0 },
                    { id: 'BILL', name: 'Billing & Payments', prefix: 'B', avgWait: 8, activeCount: 0, totalServed: 0 },
                    { id: 'TECH', name: 'Technical Support', prefix: 'T', avgWait: 15, activeCount: 0, totalServed: 0 },
                    { id: 'VIP', name: 'VIP & Express', prefix: 'V', avgWait: 3, activeCount: 0, totalServed: 0 }
                ]);
            }
            // Start all counters as clean and IDLE (No fake tokens!)
            if (!get(KEYS.COUNTERS)) {
                set(KEYS.COUNTERS, [
                    { id: 1, name: 'Counter 1', status: 'Active', currentToken: 'Idle', currentUserName: 'No customer serving', staff: 'Alice Smith', dept: 'GEN' },
                    { id: 2, name: 'Counter 2', status: 'Active', currentToken: 'Idle', currentUserName: 'No customer serving', staff: 'Robert Jones', dept: 'BILL' },
                    { id: 3, name: 'Counter 3', status: 'Paused', currentToken: 'Idle', currentUserName: 'Counter Offline', staff: 'Emily Clark', dept: 'TECH' },
                    { id: 4, name: 'Counter 4', status: 'Active', currentToken: 'Idle', currentUserName: 'No customer serving', staff: 'Michael Brown', dept: 'VIP' }
                ]);
            }
            if (!get(KEYS.STAFF)) {
                set(KEYS.STAFF, [
                    { id: 101, name: 'Alice Smith', role: 'Agent', email: 'alice@smartqueue.com', status: 'Online' },
                    { id: 102, name: 'Robert Jones', role: 'Senior Agent', email: 'robert@smartqueue.com', status: 'Online' },
                    { id: 103, name: 'Emily Clark', role: 'Technical Specialist', email: 'emily@smartqueue.com', status: 'Away' }
                ]);
            }
            if (!get('sq_all_tokens')) {
                set('sq_all_tokens', []);
            }
        };

        return { get, set, KEYS, initializeDefaults };
    }]);
})();