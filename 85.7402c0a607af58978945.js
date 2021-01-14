(function(){(this||window).webpackJsonp.registerAbsMids({"esri/layers/MapNotesLayer":1239})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{1239:function(e,t,o){var r,n;r=[o.dj.c(e.i),t,o(1),o(0),o(8),o(9),o(20),o(323),o(4),o(2),o(199),o(97),o(327),o(325)],void 0===(n=function(e,t,o,r,n,l,a,i,u,p,c,s,f,y){return function(e){function t(){var t=e.call(this)||this;return t.type="map-notes",t}return o(t,e),Object.defineProperty(t.prototype,"fullExtent",{get:function(){return this.featureCollections?this.featureCollections.reduce((function(e,t){return e?e.union(t.fullExtent):t.fullExtent}),null):null},enumerable:!0,configurable:!0}),t.prototype.readFeatureCollectionsFromItem=function(e,t,o){return t.layers.map((function(e){var t=new c;return t.read(e,o),t}))},t.prototype.readFeatureCollectionsFromWebMap=function(e,t,o){return t.featureCollection.layers.map((function(e){var t=new c;return t.read(e,o),t}))},Object.defineProperty(t.prototype,"minScale",{get:function(){return this.featureCollections?this.featureCollections.reduce((function(e,t){return null==e?t.minScale:Math.min(e,t.minScale)}),null):0},set:function(e){this.featureCollections.forEach((function(t){t.minScale=e})),this._set("minScale",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxScale",{get:function(){return this.featureCollections?this.featureCollections.reduce((function(e,t){return null==e?t.maxScale:Math.min(e,t.maxScale)}),null):0},set:function(e){this.featureCollections.forEach((function(t){t.maxScale=e})),this._set("maxScale",e)},enumerable:!0,configurable:!0}),t.prototype.load=function(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Collection"]},e)),u.resolve(this)},r([p.property({dependsOn:["featureCollections"],readOnly:!0})],t.prototype,"fullExtent",null),r([p.property({type:["show","hide"]})],t.prototype,"listMode",void 0),r([p.property({type:a.ofType(c)})],t.prototype,"featureCollections",void 0),r([p.reader("portal-item","featureCollections",["layers"])],t.prototype,"readFeatureCollectionsFromItem",null),r([p.reader("web-map","featureCollections",["featureCollection.layers"])],t.prototype,"readFeatureCollectionsFromWebMap",null),r([p.property({dependsOn:["featureCollections"]})],t.prototype,"minScale",null),r([p.property({dependsOn:["featureCollections"]})],t.prototype,"maxScale",null),r([p.property({readOnly:!0,json:{read:!1}})],t.prototype,"type",void 0),r([p.subclass("esri.layers.MapNotesLayer")],t)}(p.declared(f.OperationalLayer(y.PortalLayer(i.MultiOriginJSONMixin(s)))))}.apply(null,r))||(e.exports=n)}}]);