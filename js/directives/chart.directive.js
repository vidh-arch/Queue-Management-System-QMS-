(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .directive('analyticsChart', function() {
        return {
            restrict: 'A',
            scope: { chartData: '=', chartType: '@' },
            link: function(scope, element) {
                const ctx = element[0].getContext('2d');
                let chartInstance = null;

                const renderChart = (data) => {
                    if (chartInstance) chartInstance.destroy();
                    if (!data) return;

                    chartInstance = new Chart(ctx, {
                        type: scope.chartType || 'bar',
                        data: data,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { labels: { color: '#9ca3af' } }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: { color: 'rgba(255,255,255,0.05)' },
                                    ticks: { color: '#9ca3af' }
                                },
                                x: {
                                    grid: { display: false },
                                    ticks: { color: '#9ca3af' }
                                }
                            }
                        }
                    });
                };

                scope.$watch('chartData', function(newVal) {
                    renderChart(newVal);
                }, true);
            }
        };
    });
})();