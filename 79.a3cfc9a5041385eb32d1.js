(function(){(this||window).webpackJsonp.registerAbsMids({"esri/layers/support/arcgisLayers":1031,"esri/layers/support/lazyLayerLoader":1127})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{1031:function(e,n,r){var t,u;t=[r.dj.c(e.i),n,r(5),r(8),r(9),r(31),r(10),r(108),r(1127),r(38)],void 0===(u=function(e,n,t,u,a,i,c,o,l){function s(e){return a(this,void 0,void 0,(function(){var n,r,t,i,l,s,p,d,v,b;return u(this,(function(L){switch(L.label){case 0:if(!(n=o.parse(e)))throw new c("arcgis-layers:url-mismatch","The url '${url}' is not a valid arcgis resource",{url:e});switch(r=n.serverType,t=n.sublayer,l={FeatureServer:"FeatureLayer",StreamServer:"StreamLayer",VectorTileServer:"VectorTileLayer"},r){case"MapServer":i=null!=t?"FeatureLayer":function(e){return a(this,void 0,void 0,(function(){return u(this,(function(n){switch(n.label){case 0:return[4,y(e)];case 1:return[2,n.sent().tileInfo]}}))}))}(e).then((function(e){return e?"TileLayer":"MapImageLayer"}));break;case"ImageServer":i=y(e).then((function(e){var n=e.tileInfo&&e.tileInfo.format;return e.tileInfo?n&&"LERC"===n.toUpperCase()&&e.cacheType&&"elevation"===e.cacheType.toLowerCase()?"ElevationLayer":"TileLayer":"ImageryLayer"}));break;case"SceneServer":i=y(n.url.path).then((function(e){var n={Point:"SceneLayer","3DObject":"SceneLayer",IntegratedMesh:"IntegratedMeshLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};if(e&&Array.isArray(e.layers)&&e.layers.length>0){var r=e.layers[0].layerType;if(null!=n[r])return n[r]}return"SceneLayer"}));break;default:i=l[r]}return s={FeatureLayer:!0,SceneLayer:!0},p={parsedUrl:n,Constructor:null,sublayerIds:null},[4,i];case 1:return d=L.sent(),s[d]&&null==t?[4,f(e)]:[3,3];case 2:1!==(v=L.sent()).length&&(p.sublayerIds=v),L.label=3;case 3:return b=p,[4,h(d)];case 4:return b.Constructor=L.sent(),[2,p]}}))}))}function f(e){return a(this,void 0,void 0,(function(){var n;return u(this,(function(r){switch(r.label){case 0:return[4,y(e)];case 1:return(n=r.sent())&&Array.isArray(n.layers)?[2,n.layers.map((function(e){return e.id})).reverse()]:[2,[]]}}))}))}function h(e){return a(this,void 0,void 0,(function(){return u(this,(function(n){return[2,(0,l.layerLookupMap[e])()]}))}))}function y(e){return a(this,void 0,void 0,(function(){return u(this,(function(n){switch(n.label){case 0:return[4,i(e,{responseType:"json",query:{f:"json"}})];case 1:return[2,n.sent().data]}}))}))}Object.defineProperty(n,"__esModule",{value:!0}),n.fromUrl=function(e){return a(this,void 0,void 0,(function(){var n,a,i,c;return u(this,(function(u){switch(u.label){case 0:return[4,s(e.url)];case 1:return n=u.sent(),a=t({},e.properties,{url:e.url}),n.sublayerIds?[4,new Promise((function(e,n){r.e(14).then(function(){var n=[r(1005)];e.apply(null,n)}.bind(this)).catch(n.bind(this))}))]:[2,new n.Constructor(a)];case 2:return i=u.sent(),c=new i({title:n.parsedUrl.title}),function(e,n){return e.sublayerIds.map((function(r){return new e.Constructor(t({},n,{layerId:r,sublayerTitleMode:"service-name"}))}))}(n,a).forEach((function(e){return c.add(e)})),[2,c]}}))}))}}.apply(null,t))||(e.exports=u)},1127:function(e,n,r){var t,u;t=[r.dj.c(e.i),n,r(4)],void 0===(u=function(e,n,t){Object.defineProperty(n,"__esModule",{value:!0}),n.layerLookupMap={BingMapsLayer:function(){return t.create((function(e){return r.e(9).then(function(){var n=[r(211)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},BuildingSceneLayer:function(){return t.create((function(e){return r.e(18).then(function(){var n=[r(1009)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},CSVLayer:function(){return t.create((function(e){return r.e(26).then(function(){var n=[r(1010)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},ElevationLayer:function(){return t.create((function(e){return r.e(11).then(function(){var n=[r(350)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},FeatureLayer:function(){return t.create((function(e){return Promise.resolve().then(function(){var n=[r(199)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},GroupLayer:function(){return t.create((function(e){return r.e(14).then(function(){var n=[r(1005)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},GeoRSSLayer:function(){return t.create((function(e){return r.e(33).then(function(){var n=[r(1011)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},ImageryLayer:function(){return t.create((function(e){return Promise.all([r.e(8),r.e(21)]).then(function(){var n=[r(1006)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},IntegratedMeshLayer:function(){return t.create((function(e){return r.e(27).then(function(){var n=[r(1012)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},KMLLayer:function(){return t.create((function(e){return r.e(28).then(function(){var n=[r(1013)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},MapImageLayer:function(){return t.create((function(e){return Promise.all([r.e(6),r.e(13)]).then(function(){var n=[r(1004)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},MapNotesLayer:function(){return t.create((function(e){return r.e(85).then(function(){var n=[r(1239)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},OpenStreetMapLayer:function(){return t.create((function(e){return r.e(29).then(function(){var n=[r(1014)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},PointCloudLayer:function(){return t.create((function(e){return r.e(17).then(function(){var n=[r(1015)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},RouteLayer:function(){return t.create((function(e){return r.e(86).then(function(){var n=[r(1240)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},SceneLayer:function(){return t.create((function(e){return r.e(22).then(function(){var n=[r(1007)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},StreamLayer:function(){return t.create((function(e){return r.e(31).then(function(){var n=[r(1008)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},TileImageryLayer:function(){return t.create((function(e){return Promise.all([r.e(8),r.e(47)]).then(function(){var n=[r(1241)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},TileLayer:function(){return t.create((function(e){return Promise.all([r.e(6),r.e(12)]).then(function(){var n=[r(351)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},UnknownLayer:function(){return t.create((function(e){return r.e(87).then(function(){var n=[r(1244)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},UnsupportedLayer:function(){return t.create((function(e){return r.e(88).then(function(){var n=[r(1245)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},VectorTileLayer:function(){return t.create((function(e){return r.e(19).then(function(){var n=[r(1016)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},WebTileLayer:function(){return t.create((function(e){return r.e(32).then(function(){var n=[r(1003)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},WMSLayer:function(){return t.create((function(e){return r.e(24).then(function(){var n=[r(1017)];e.apply(null,n)}.bind(this)).catch(r.oe)}))},WMTSLayer:function(){return t.create((function(e){return r.e(68).then(function(){var n=[r(1246)];e.apply(null,n)}.bind(this)).catch(r.oe)}))}}}.apply(null,t))||(e.exports=u)}}]);