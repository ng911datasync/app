(function(){(this||window).webpackJsonp.registerAbsMids({"esri/portal/support/layersCreator":395,"esri/portal/support/portalLayers":1018,"esri/layers/support/lazyLayerLoader":1127,"esri/portal/support/portalItemUtils":1209,"esri/portal/support/featureCollectionUtils":1524})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[23,76],{1018:function(e,r,t){var n,a;n=[t.dj.c(e.i),r,t(5),t(8),t(9),t(31),t(20),t(10),t(4),t(1127),t(109),t(1209)],void 0===(a=function(e,r,t,n,a,i,u,o,c,l,y,s){function p(e){switch(e.type){case"Map Service":return function(e){return f(e).then((function(e){return e?{className:"TileLayer"}:{className:"MapImageLayer"}}))}(e);case"Feature Service":return function(e){return d(e).then((function(e){if("object"==typeof e){var r={};return null!=e.id&&(r.layerId=e.id),{className:"FeatureLayer",properties:r}}return{className:"GroupLayer"}}))}(e);case"Feature Collection":return function(e){return a(this,void 0,void 0,(function(){var r;return n(this,(function(t){switch(t.label){case 0:return[4,e.load()];case 1:return t.sent(),s.hasTypeKeyword(e,"Map Notes")?[2,{className:"MapNotesLayer"}]:s.hasTypeKeyword(e,"Route Layer")?[2,{className:"RouteLayer"}]:[4,e.fetchData()];case 2:return(r=t.sent())&&Array.isArray(r.layers)&&1===r.layers.length?[2,{className:"FeatureLayer"}]:[2,{className:"GroupLayer"}]}}))}))}(e);case"Scene Service":return function(e){return d(e).then((function(r){if("object"==typeof r){var t={},n=void 0;if(null!=r.id?(t.layerId=r.id,n=e.url+"/layers/"+r.id):n=e.url,Array.isArray(e.typeKeywords)&&e.typeKeywords.length>0)for(var a={IntegratedMesh:"IntegratedMeshLayer","3DObject":"SceneLayer",Point:"SceneLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"},i=0,u=Object.keys(a);i<u.length;i++){var o=u[i];if(-1!==e.typeKeywords.indexOf(o))return{className:a[o]}}return h(n).then((function(e){var r="SceneLayer",n={Point:"SceneLayer","3DObject":"SceneLayer",IntegratedMesh:"IntegratedMeshLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};return e&&e.layerType&&n[e.layerType]&&(r=n[e.layerType]),{className:r,properties:t}}))}return{className:"GroupLayer"}}))}(e);case"Image Service":return function(e){return f(e).then((function(r){var t=new u(e.typeKeywords);return r?t.find((function(e){return"elevation 3d layer"===e.toLowerCase()}))?{className:"ElevationLayer"}:{className:"TileLayer"}:{className:"ImageryLayer"}}))}(e);case"Stream Service":return{className:"StreamLayer"};case"Vector Tile Service":return{className:"VectorTileLayer"};case"KML":return{className:"KMLLayer"};case"WMTS":return{className:"WMTSLayer"};case"WMS":return{className:"WMSLayer"};default:return c.reject(new o("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type}))}}function L(e){return(0,l.layerLookupMap[e.className])().then((function(r){return{constructor:r,properties:e.properties}}))}function f(e){return h(e.url).then((function(e){return e.tileInfo}))}function d(e){return!e.url||e.url.match(/\/\d+$/)?c.resolve({}):e.load().then((function(){return e.fetchData()})).then((function(r){return r&&Array.isArray(r.layers)?1===r.layers.length&&{id:r.layers[0].id}:h(e.url).then((function(e){return e&&Array.isArray(e.layers)?1===e.layers.length&&{id:e.layers[0].id}:{}}))}))}function h(e){return i(e,{responseType:"json",query:{f:"json"}}).then((function(e){return e.data}))}Object.defineProperty(r,"__esModule",{value:!0}),r.fromItem=function(e){return!e.portalItem||e.portalItem instanceof y||e.portalItem.constructor&&e.portalItem.constructor._meta||(e=t({},e,{portalItem:new y(e.portalItem)})),(r=e.portalItem,r.load().then(p).then(L)).then((function(r){var n=t({portalItem:e.portalItem},r.properties),a=r.constructor;return c.resolve(new a(n))}));var r},r.selectLayerClassPath=p}.apply(null,n))||(e.exports=a)},1127:function(e,r,t){var n,a;n=[t.dj.c(e.i),r,t(4)],void 0===(a=function(e,r,n){Object.defineProperty(r,"__esModule",{value:!0}),r.layerLookupMap={BingMapsLayer:function(){return n.create((function(e){return t.e(9).then(function(){var r=[t(211)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},BuildingSceneLayer:function(){return n.create((function(e){return t.e(18).then(function(){var r=[t(1009)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},CSVLayer:function(){return n.create((function(e){return t.e(26).then(function(){var r=[t(1010)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},ElevationLayer:function(){return n.create((function(e){return t.e(11).then(function(){var r=[t(350)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},FeatureLayer:function(){return n.create((function(e){return Promise.resolve().then(function(){var r=[t(199)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},GroupLayer:function(){return n.create((function(e){return t.e(14).then(function(){var r=[t(1005)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},GeoRSSLayer:function(){return n.create((function(e){return t.e(33).then(function(){var r=[t(1011)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},ImageryLayer:function(){return n.create((function(e){return Promise.all([t.e(8),t.e(21)]).then(function(){var r=[t(1006)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},IntegratedMeshLayer:function(){return n.create((function(e){return t.e(27).then(function(){var r=[t(1012)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},KMLLayer:function(){return n.create((function(e){return t.e(28).then(function(){var r=[t(1013)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},MapImageLayer:function(){return n.create((function(e){return Promise.all([t.e(6),t.e(13)]).then(function(){var r=[t(1004)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},MapNotesLayer:function(){return n.create((function(e){return t.e(85).then(function(){var r=[t(1239)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},OpenStreetMapLayer:function(){return n.create((function(e){return t.e(29).then(function(){var r=[t(1014)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},PointCloudLayer:function(){return n.create((function(e){return t.e(17).then(function(){var r=[t(1015)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},RouteLayer:function(){return n.create((function(e){return t.e(86).then(function(){var r=[t(1240)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},SceneLayer:function(){return n.create((function(e){return t.e(22).then(function(){var r=[t(1007)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},StreamLayer:function(){return n.create((function(e){return t.e(31).then(function(){var r=[t(1008)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},TileImageryLayer:function(){return n.create((function(e){return Promise.all([t.e(8),t.e(47)]).then(function(){var r=[t(1241)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},TileLayer:function(){return n.create((function(e){return Promise.all([t.e(6),t.e(12)]).then(function(){var r=[t(351)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},UnknownLayer:function(){return n.create((function(e){return t.e(87).then(function(){var r=[t(1244)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},UnsupportedLayer:function(){return n.create((function(e){return t.e(88).then(function(){var r=[t(1245)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},VectorTileLayer:function(){return n.create((function(e){return t.e(19).then(function(){var r=[t(1016)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},WebTileLayer:function(){return n.create((function(e){return t.e(32).then(function(){var r=[t(1003)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},WMSLayer:function(){return n.create((function(e){return t.e(24).then(function(){var r=[t(1017)];e.apply(null,r)}.bind(this)).catch(t.oe)}))},WMTSLayer:function(){return n.create((function(e){return t.e(68).then(function(){var r=[t(1246)];e.apply(null,r)}.bind(this)).catch(t.oe)}))}}}.apply(null,n))||(e.exports=a)},1209:function(e,r,t){var n,a;n=[t.dj.c(e.i),r],void 0===(a=function(e,r){function t(e,r){return!!e.typeKeywords&&e.typeKeywords.indexOf(r)>-1}Object.defineProperty(r,"__esModule",{value:!0}),r.addTypeKeyword=function(e,r){if(!t(e,r)){var n=e.typeKeywords;n?n.push(r):e.typeKeywords=[r]}},r.hasTypeKeyword=t,r.removeTypeKeyword=function(e,r){var t=e.typeKeywords;if(t){var n=t.indexOf(r);n>-1&&t.splice(n,1)}}}.apply(null,n))||(e.exports=a)},1524:function(e,r,t){var n,a;n=[t.dj.c(e.i),r,t(8),t(9),t(109),t(1209)],void 0===(a=function(e,r,t,n,a,i){function u(e,r,u,o){return n(this,void 0,void 0,(function(){var n;return t(this,(function(t){switch(t.label){case 0:return e.layerType&&"ArcGISFeatureLayer"===e.layerType?e.url?[2,!1]:e.featureCollectionType&&e.featureCollectionType===u?[2,!0]:e.itemId?[4,(n=new a({id:e.itemId,portal:r})).load()]:[3,2]:[2,!1];case 1:return t.sent(),[2,"Feature Collection"===n.type&&i.hasTypeKeyword(n,o)];case 2:return[2,!1]}}))}))}Object.defineProperty(r,"__esModule",{value:!0}),r.isMapNotesLayer=function(e,r){return u(e,r,"notes","Map Notes")},r.isRouteLayer=function(e,r){return u(e,r,"route","Route Layer")}}.apply(null,n))||(e.exports=a)},395:function(e,r,t){var n,a;n=[t.dj.c(e.i),r,t(8),t(9),t(20),t(15),t(4),t(1127),t(109),t(1524),t(1018),t(356)],void 0===(a=function(e,r,t,n,a,i,u,o,c,l,y,s){Object.defineProperty(r,"__esModule",{value:!0});var p=i("dojo-debug-messages"),L={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"TileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer"},f={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},d={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",DefaultTileLayer:"TileLayer"},h={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"UnsupportedLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"TileLayer",ArcGISTiledMapServiceLayer:"TileLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",GeoRSS:"GeoRSSLayer",KML:"KMLLayer",WFS:"UnsupportedLayer",WMS:"WMSLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",DefaultTileLayer:"TileLayer"},v={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"UnsupportedLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"TileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"};function S(e,r,a){return n(this,void 0,void 0,(function(){var n;return t(this,(function(t){switch(t.label){case 0:return(n=new e).read(r,a.context),"group"===n.type&&I(r)?[4,g(n,r,a.context)]:[3,2];case 1:t.sent(),t.label=2;case 2:return[4,s.loadStyleRenderer(n,a.context)];case 3:return t.sent(),[2,n]}}))}))}function M(e,r){return n(this,void 0,void 0,(function(){return t(this,(function(t){switch(t.label){case 0:return[4,m(e,r)];case 1:return[2,S(t.sent(),e,r)]}}))}))}function m(e,r){return n(this,void 0,void 0,(function(){var n,a,i,u,s,p,S,M,m;return t(this,(function(t){switch(t.label){case 0:return n=r.context,a=function(e){var r;switch(e.origin){case"web-scene":switch(e.layerContainerType){case"basemap":r=d;break;case"ground":r=f;break;default:r=L}break;default:switch(e.layerContainerType){case"basemap":r=v;break;default:r=h}}return r}(n),!(i=e.layerType||e.type)&&r&&r.defaultLayerType&&(i=r.defaultLayerType),u=a[i],s=u?o.layerLookupMap[u]:o.layerLookupMap.UnknownLayer,p=n&&n.portal,T(e)?e.itemId?[4,(S=new c({id:e.itemId,portal:p})).load()]:[3,3]:[3,4];case 1:return t.sent(),[4,y.selectLayerClassPath(S)];case 2:M=t.sent(),m=M.className||"UnknownLayer",s=o.layerLookupMap[m],t.label=3;case 3:return[3,8];case 4:return"ArcGISFeatureLayer"!==i?[3,8]:[4,l.isMapNotesLayer(e,p)];case 5:return t.sent()?(s=o.layerLookupMap.MapNotesLayer,[3,8]):[3,6];case 6:return[4,l.isRouteLayer(e,p)];case 7:t.sent()?s=o.layerLookupMap.RouteLayer:I(e)&&(s=o.layerLookupMap.GroupLayer),t.label=8;case 8:return e.wmtsInfo&&e.wmtsInfo.url&&e.wmtsInfo.layerIdentifier&&(s=o.layerLookupMap.WMTSLayer),[2,s()]}}))}))}function I(e){if("ArcGISFeatureLayer"!==e.layerType||T(e))return!1;var r=e.featureCollection;return!!(r&&r.layers&&r.layers.length>1)}function T(e){return"Feature Collection"===e.type}function b(e,r,i){return n(this,void 0,void 0,(function(){var n,u,o;return t(this,(function(t){switch(t.label){case 0:return n=new a,u=w(n,Array.isArray(r.layers)?r.layers:[],i),[4,e];case 1:return o=t.sent(),[4,u];case 2:return t.sent(),"group"===o.type?(o.layers.addMany(n),[2,o]):[2,void 0]}}))}))}function g(e,r,a){return n(this,void 0,void 0,(function(){var n,i,u,c;return t(this,(function(t){switch(t.label){case 0:return[4,(0,o.layerLookupMap.FeatureLayer)()];case 1:return n=t.sent(),i=r.featureCollection,u=i.showLegend,c=i.layers.map((function(e){var r=new n;return r.read(e,a),null!=u&&r.read({showLegend:u},a),r})),e.layers.addMany(c),[2]}}))}))}function w(e,r,a){return n(this,void 0,void 0,(function(){var n,i,o,c,l,y,s,L,f;return t(this,(function(t){switch(t.label){case 0:if(!r)return[2];for(n=[],i=0,o=r;i<o.length;i++)c=o[i],l=M(c,a),"GroupLayer"===c.layerType?n.push(b(l,c,a)):n.push(l);return[4,u.eachAlways(n)];case 1:for(y=t.sent(),s=0,L=y;s<L.length;s++)f=L[s],p&&f.error||!f.value||a.filter&&!a.filter(f.value)||e.add(f.value);return[2]}}))}))}r.createLayer=M,r.populateOperationalLayers=function(e,r,a){return n(this,void 0,void 0,(function(){return t(this,(function(t){return[2,w(e,r,a)]}))}))}}.apply(null,n))||(e.exports=a)}}]);