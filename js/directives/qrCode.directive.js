(function() {
    'use strict';

    angular.module('SmartQueueApp')
    .directive('qrCode', function() {
        return {
            restrict: 'E',
            scope: { text: '=' },
            template: '<div class="qrcode-wrapper" style="display:inline-block; padding:10px; background:#fff; border-radius:8px;"></div>',
            link: function(scope, element) {
                const container = element.find('div')[0];
                let qrcode = null;

                scope.$watch('text', function(newVal) {
                    container.innerHTML = '';
                    if (newVal && typeof QRCode !== 'undefined') {
                        qrcode = new QRCode(container, {
                            text: newVal,
                            width: 130,
                            height: 130,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    }
                });
            }
        };
    });
})();