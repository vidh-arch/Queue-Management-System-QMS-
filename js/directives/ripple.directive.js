(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .directive('ripple', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function(e) {
                    const rect = element[0].getBoundingClientRect();
                    const ripple = document.createElement('span');
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    ripple.classList.add('ripple-effect');

                    element[0].appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
            }
        };
    });
})();