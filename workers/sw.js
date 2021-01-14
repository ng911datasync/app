define(["require", "exports"], function (require, exports) {
    "use strict";
    var CACHE_NAME = "ng911-data-sync-v2";
    function generateAssets() {
        var assets = [];
        generateAppResources(assets);
        generateRootResources(assets);
        return assets;
    }
    function generateAppResources(assets) {
        for (var _i = 0, _a = serviceWorkerOption.assets; _i < _a.length; _i++) {
            var asset = _a[_i];
            assets.push(asset);
        }
    }
    function generateRootResources(assets) {
        var root = self.location.pathname.replace(/\/sw\.js$/g, "");
        assets.push(root);
        // assets.push(`${root}/`);
        assets.push(root + "/index.html");
        // assets.push(`${root}/manifest.json`);
        assets.push(root + "/src/assets/ambulance.jpg");
        assets.push(root + "/src/assets/firetruck-csprings.jpg");
        assets.push(root + "/src/assets/firetruck.jpg");
        assets.push(root + "/src/assets/heli.jpg");
        assets.push(root + "/src/assets/motorcycle.jpg");
        assets.push(root + "/src/assets/sfpd.jpg");
    }
    var imageryDomain = "services.arcgisonline.com";
    self.addEventListener("install", function (event) {
        console.log("install");
        event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
            var assets = generateAssets();
            return cache.addAll(assets);
        }));
    });
    self.addEventListener("activate", function (event) { });
    self.addEventListener("fetch", function (event) {
        // Swivel imagery if needed to the one that we cached
        var re = /https:\/\/(server|services)\.arcgisonline\.com\/ArcGIS\/rest\/services\/World_Imagery\/MapServer/i;
        var req;
        if (imageryDomain && re.test(event.request.url)) {
            var url = event.request.url.replace(re, "https://" + imageryDomain + "/ArcGIS/rest/services/World_Imagery/MapServer");
            req = new Request(url, event.request);
        }
        else {
            req = event.request;
        }
        event.respondWith(caches.match(req, { ignoreVary: true }).then(function (response) {
            if (response) {
                return response;
            }
            var fetchRequest = req.clone();
            return fetch(fetchRequest).then(function (fetchResponse) {
                if (!fetchResponse ||
                    (fetchResponse.type !== "opaque" && fetchResponse.status !== 200) ||
                    fetchResponse.type === "error") {
                    return fetchResponse;
                }
                if (req.url.indexOf("chrome-extension:") === 0) {
                    return fetchResponse;
                }
                if (req.method === "POST" ||
                    req.url.indexOf("/FeatureServer/") ||
                    req.url.indexOf("/MapServer/")) {
                    return fetchResponse;
                }
                var responseToCache = fetchResponse.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(req, responseToCache);
                });
                return fetchResponse;
            });
        }));
    });
});
