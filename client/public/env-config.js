// This file provides runtime-configurable environment values for the SPA.
// In production you can overwrite this file via a Kubernetes ConfigMap mount
// to change backend URLs without rebuilding the frontend.
(function (window) {
    window.__ENV = window.__ENV || {};

    window.__ENV.API_URL = window.__ENV.API_URL || 'http://localhost:3000/api';

    window.__ENV.SOCKET_URL =
        window.__ENV.SOCKET_URL ||
        (window.location.host.indexOf('localhost') >= 0
            ? 'http://127.0.0.1:3000'
            : window.location.host);
})(this);
