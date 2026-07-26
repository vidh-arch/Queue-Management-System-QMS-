(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .factory('QueueService', ['StorageService', '$rootScope', '$window', function(StorageService, $rootScope, $window) {
        
        // --- MULTI-TAB REALTIME SYNC BRIDGE ---
        // This listens for LocalStorage changes happening in OTHER browser tabs/windows!
        $window.addEventListener('storage', function(e) {
            if (e.key && e.key.startsWith('sq_')) {
                $rootScope.$applyAsync(() => {
                    $rootScope.$broadcast('queue:updated');
                });
            }
        });

        // Helper: Mathematically sync waiting and served counts
        const syncDepartmentStats = () => {
            let tokens = StorageService.get(StorageService.KEYS.ALL_TOKENS, []);
            let queues = StorageService.get(StorageService.KEYS.QUEUES, []);

            queues.forEach(q => {
                q.activeCount = tokens.filter(t => t.deptId === q.id && t.status === 'waiting').length;
                q.totalServed = tokens.filter(t => t.deptId === q.id && t.status === 'completed').length;
            });

            StorageService.set(StorageService.KEYS.QUEUES, queues);
            return queues;
        };

        const generateToken = (deptId, user) => {
            let tokens = StorageService.get(StorageService.KEYS.ALL_TOKENS, []);
            const queues = StorageService.get(StorageService.KEYS.QUEUES, []);
            const dept = queues.find(q => q.id === deptId);
            if (!dept) return null;

            const waitingCount = tokens.filter(t => t.deptId === deptId && t.status === 'waiting').length;
            const seqNumber = Math.floor(100 + Math.random() * 900);
            const tokenStr = `${dept.prefix}-${seqNumber}`;
            
            const newToken = {
                id: tokenStr,
                deptId: dept.id,
                deptName: dept.name,
                userId: user.id,
                userName: user.name,
                status: 'waiting',
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
                position: waitingCount + 1,
                estWait: (waitingCount + 1) * dept.avgWait
            };

            tokens.unshift(newToken);
            StorageService.set(StorageService.KEYS.ALL_TOKENS, tokens);
            StorageService.set(StorageService.KEYS.ACTIVE_TOKEN, newToken);
            
            syncDepartmentStats();
            $rootScope.$broadcast('queue:updated');
            return newToken;
        };

        const getActiveToken = () => StorageService.get(StorageService.KEYS.ACTIVE_TOKEN, null);

        const cancelToken = (tokenStr) => {
            let active = getActiveToken();
            let tokens = StorageService.get(StorageService.KEYS.ALL_TOKENS, []);
            
            if (active && active.id === tokenStr) {
                active.status = 'cancelled';
                StorageService.set(StorageService.KEYS.ACTIVE_TOKEN, null);
            }

            let ledgerToken = tokens.find(t => t.id === tokenStr);
            if (ledgerToken) ledgerToken.status = 'cancelled';
            
            StorageService.set(StorageService.KEYS.ALL_TOKENS, tokens);
            syncDepartmentStats();
            $rootScope.$broadcast('queue:updated');
        };

        const callNext = (counterId) => {
            const counters = StorageService.get(StorageService.KEYS.COUNTERS, []);
            const counter = counters.find(c => c.id === counterId);
            if (!counter) return;

            let tokens = StorageService.get(StorageService.KEYS.ALL_TOKENS, []);
            
            // Mark the previous person as completed
            if (counter.currentToken && counter.currentToken !== 'Idle' && counter.currentToken !== 'Offline') {
                let prevToken = tokens.find(t => t.id === counter.currentToken && t.status === 'serving');
                if (prevToken) prevToken.status = 'completed';
            }

            // Grab the oldest waiting token (FIFO)
            let nextToken = tokens.slice().reverse().find(t => t.deptId === counter.dept && t.status === 'waiting');
            
            if (nextToken) {
                nextToken.status = 'serving';
                counter.currentToken = nextToken.id;
                counter.servingUser = nextToken.userName;
                
                let active = getActiveToken();
                if (active && active.id === nextToken.id) {
                    active.status = 'serving';
                    active.position = 0;
                    active.estWait = 0;
                    StorageService.set(StorageService.KEYS.ACTIVE_TOKEN, active);
                }
            } else {
                counter.currentToken = 'Idle';
                counter.servingUser = 'No Users Waiting';
            }

            StorageService.set(StorageService.KEYS.ALL_TOKENS, tokens);
            StorageService.set(StorageService.KEYS.COUNTERS, counters);
            syncDepartmentStats();
            $rootScope.$broadcast('queue:updated');
        };

        const resetAllQueues = () => {
            StorageService.clearAllSystemData();
            $rootScope.$broadcast('queue:updated');
        };

        return {
            generateToken,
            getActiveToken,
            cancelToken,
            callNext,
            resetAllQueues,
            getQueues: () => syncDepartmentStats(),
            getCounters: () => StorageService.get(StorageService.KEYS.COUNTERS, []),
            getAllTokens: () => StorageService.get(StorageService.KEYS.ALL_TOKENS, [])
        };
    }]);
})();