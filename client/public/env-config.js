// This file provides runtime-configurable environment values for the SPA.
// In production you can overwrite this file via a Kubernetes ConfigMap mount
// to change backend URLs without rebuilding the frontend.
(function (window) {
    window.__ENV = window.__ENV || {};

    // Automatic mapping from frontend host -> backend endpoints.
    // This lets the SPA pick the correct backend without rebuilding.
    const host = (window.location && window.location.host) || '';

    const MAPPINGS = [
        {
            // dev frontend host (branch: dev)
            match: 'frontend-route-demo-app-dev',
            api: 'http://backend-route-demo-app-dev.apps.okd-test.home.lab/api',
            socket: 'http://backend-route-demo-app-dev.apps.okd-test.home.lab'
        },
        {
            // prod frontend host (branch: main)
            match: 'frontend-route-demo-app',
            api: 'http://backend-route-demo-app.apps.okd-test.home.lab/api',
            socket: 'http://backend-route-demo-app.apps.okd-test.home.lab'
        }
    ];

    const found = MAPPINGS.find(m => host.indexOf(m.match) >= 0);

    // allow an explicit override (e.g., mounted ConfigMap) via window.__ENV
    if (!window.__ENV.API_URL) {
        window.__ENV.API_URL = found ? found.api : 'http://localhost:3000/api';
    }

    if (!window.__ENV.SOCKET_URL) {
        window.__ENV.SOCKET_URL =
            found
                ? found.socket
                : host.indexOf('localhost') >= 0
                    ? 'http://127.0.0.1:3000'
                    : window.location.host;
    }
})(this);
