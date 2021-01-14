(function(){(this||window).webpackJsonp.registerAbsMids({"esri/layers/WebTileLayer":1003,"esri/layers/support/WMTSLayerInfo":1165})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1003:function(e,t,r){var l,o;l=[r.dj.c(e.i),t,r(5),r(1),r(0),r(8),r(9),r(18),r(31),r(10),r(7),r(323),r(4),r(46),r(23),r(23),r(2),r(97),r(327),r(325),r(331),r(198),r(143),r(324),r(1165)],void 0===(o=function(e,t,r,l,o,n,i,a,p,s,u,y,c,f,d,v,m,h,w,b,g,T,S,R,j){return function(e){function t(t,r){var l=e.call(this,t)||this;return l.copyright="",l.fullExtent=new a.Extent(-20037508.342787,-20037508.34278,20037508.34278,20037508.342787,a.SpatialReference.WebMercator),l.legendEnabled=!1,l.isReference=null,l.popupEnabled=!1,l.spatialReference=a.SpatialReference.WebMercator,l.subDomains=null,l.tileInfo=new R({size:[256,256],dpi:96,format:"png8",compressionQuality:0,origin:new a.Point({x:-20037508.342787,y:20037508.342787,spatialReference:a.SpatialReference.WebMercator}),spatialReference:a.SpatialReference.WebMercator,lods:[new S({level:0,scale:591657527.591555,resolution:156543.033928}),new S({level:1,scale:295828763.795777,resolution:78271.5169639999}),new S({level:2,scale:147914381.897889,resolution:39135.7584820001}),new S({level:3,scale:73957190.948944,resolution:19567.8792409999}),new S({level:4,scale:36978595.474472,resolution:9783.93962049996}),new S({level:5,scale:18489297.737236,resolution:4891.96981024998}),new S({level:6,scale:9244648.868618,resolution:2445.98490512499}),new S({level:7,scale:4622324.434309,resolution:1222.99245256249}),new S({level:8,scale:2311162.217155,resolution:611.49622628138}),new S({level:9,scale:1155581.108577,resolution:305.748113140558}),new S({level:10,scale:577790.554289,resolution:152.874056570411}),new S({level:11,scale:288895.277144,resolution:76.4370282850732}),new S({level:12,scale:144447.638572,resolution:38.2185141425366}),new S({level:13,scale:72223.819286,resolution:19.1092570712683}),new S({level:14,scale:36111.909643,resolution:9.55462853563415}),new S({level:15,scale:18055.954822,resolution:4.77731426794937}),new S({level:16,scale:9027.977411,resolution:2.38865713397468}),new S({level:17,scale:4513.988705,resolution:1.19432856685505}),new S({level:18,scale:2256.994353,resolution:.597164283559817}),new S({level:19,scale:1128.497176,resolution:.298582141647617})]}),l.type="web-tile",l.urlTemplate=null,l.wmtsInfo=null,l}return l(t,e),t.prototype.normalizeCtorArgs=function(e,t){return"string"==typeof e?u.mixin({urlTemplate:e},t||{}):e},t.prototype.load=function(e){var t=this,r=this.loadFromPortal({supportedTypes:["WMTS"]},e).then((function(){var e="";if(t.urlTemplate)if(t.spatialReference.equals(t.tileInfo.spatialReference)){var r=new d.Url(t.urlTemplate);t.subDomains&&t.subDomains.length>0||-1===r.authority.indexOf("{subDomain}")||(e="is missing 'subDomains' property")}else e="spatialReference must match tileInfo.spatialReference";else e="is missing the required 'urlTemplate' property value";if(e)throw new s("web-tile-layer:load","WebTileLayer (title: '"+t.title+"', id: '"+t.id+"') "+e)}));return this.addResolvingPromise(r),c.resolve(this)},Object.defineProperty(t.prototype,"levelValues",{get:function(){var e=[];if(!this.tileInfo)return null;for(var t=0,r=this.tileInfo.lods;t<r.length;t++){var l=r[t];e[l.level]=l.levelValue||l.level}return e},enumerable:!0,configurable:!0}),t.prototype.readSpatialReference=function(e,t){return e||t.fullExtent&&t.fullExtent.spatialReference&&a.SpatialReference.fromJSON(t.fullExtent.spatialReference)},Object.defineProperty(t.prototype,"tileServers",{get:function(){if(!this.urlTemplate)return null;var e=[],t=this.urlTemplate,r=this.subDomains,l=new d.Url(t),o=l.scheme?l.scheme+"://":"//",n=o+l.authority+"/";if(-1===l.authority.indexOf("{subDomain}"))e.push(n);else if(r&&r.length>0&&l.authority.split(".").length>1)for(var i=0,a=r;i<a.length;i++){var p=a[i];e.push(o+l.authority.replace(/\{subDomain\}/gi,p)+"/")}return e.map((function(e){return"/"!==e.charAt(e.length-1)&&(e+="/"),e}))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"urlPath",{get:function(){if(!this.urlTemplate)return null;var e=this.urlTemplate,t=new d.Url(e),r=(t.scheme?t.scheme+"://":"//")+t.authority+"/";return e.substring(r.length)},enumerable:!0,configurable:!0}),t.prototype.readUrlTemplate=function(e,t){return e||t.templateUrl},t.prototype.writeUrlTemplate=function(e,t){e&&v.isProtocolRelative(e)&&(e="https:"+e),t.templateUrl=e?v.normalize(e):e},t.prototype.fetchTile=function(e,t,r,l){void 0===l&&(l={});var o=l.signal,n=l.timestamp,i=this.getTileUrl(e,t,r),a={responseType:"image",signal:o};return null!=n&&(a.query={_ts:l.timestamp}),p(i,a).then((function(e){return e.data}))},t.prototype.getTileUrl=function(e,t,r){var l=this.levelValues[e],o=this.tileServers[t%this.tileServers.length]+f.replace(this.urlPath,{level:l,col:r,row:t});return o.replace(/\{level\}/gi,""+l).replace(/\{row\}/gi,""+t).replace(/\{col\}/gi,""+r)},o([m.property({type:String,value:"",json:{write:!0}})],t.prototype,"copyright",void 0),o([m.property({type:a.Extent,json:{write:!0}})],t.prototype,"fullExtent",void 0),o([m.property({readOnly:!0,json:{read:!1,write:!1}})],t.prototype,"legendEnabled",void 0),o([m.property({type:["show","hide"]})],t.prototype,"listMode",void 0),o([m.property({dependsOn:["tileInfo"]})],t.prototype,"levelValues",null),o([m.property({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:function(){return{enabled:!1}}}}})],t.prototype,"isReference",void 0),o([m.property({type:["WebTiledLayer"],value:"WebTiledLayer"})],t.prototype,"operationalLayerType",void 0),o([m.property({readOnly:!0,json:{read:!1,write:!1}})],t.prototype,"popupEnabled",void 0),o([m.property({type:a.SpatialReference})],t.prototype,"spatialReference",void 0),o([m.reader("spatialReference",["spatialReference","fullExtent.spatialReference"])],t.prototype,"readSpatialReference",null),o([m.property({type:[String],json:{write:!0}})],t.prototype,"subDomains",void 0),o([m.property({type:R,json:{write:!0}})],t.prototype,"tileInfo",void 0),o([m.property({readOnly:!0,dependsOn:["urlTemplate","subDomains"]})],t.prototype,"tileServers",null),o([m.property({json:{read:!1}})],t.prototype,"type",void 0),o([m.property({dependsOn:["urlTemplate"]})],t.prototype,"urlPath",null),o([m.property({type:String,json:{origins:{"portal-item":{read:{source:"url"}}}}})],t.prototype,"urlTemplate",void 0),o([m.reader("urlTemplate",["urlTemplate","templateUrl"])],t.prototype,"readUrlTemplate",null),o([m.writer("urlTemplate",{templateUrl:{type:String}})],t.prototype,"writeUrlTemplate",null),o([m.property({type:j.default,json:{write:!0}})],t.prototype,"wmtsInfo",void 0),o([m.subclass("esri.layers.WebTileLayer")],t)}(m.declared(g.RefreshableLayer(T.ScaleRangeLayer(w.OperationalLayer(b.PortalLayer(y.MultiOriginJSONMixin(h)))))))}.apply(null,l))||(e.exports=o)},1165:function(e,t,r){var l,o;l=[r.dj.c(e.i),t,r(1),r(0),r(3),r(7),r(2)],void 0===(o=function(e,t,r,l,o,n,i){Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){function t(t){return e.call(this,t)||this}var o;return r(t,e),o=t,t.prototype.clone=function(){return new o({customLayerParameters:n.clone(this.customLayerParameters),customParameters:n.clone(this.customParameters),layerIdentifier:this.layerIdentifier,tileMatrixSet:this.tileMatrixSet,url:this.url})},l([i.property({json:{type:Object,write:!0}})],t.prototype,"customLayerParameters",void 0),l([i.property({json:{type:Object,write:!0}})],t.prototype,"customParameters",void 0),l([i.property({type:String,json:{write:!0}})],t.prototype,"layerIdentifier",void 0),l([i.property({type:String,json:{write:!0}})],t.prototype,"tileMatrixSet",void 0),l([i.property({type:String,json:{write:!0}})],t.prototype,"url",void 0),o=l([i.subclass("esri.layer.support.WMTSLayerInfo")],t)}(i.declared(o.JSONSupport));t.WMTSLayerInfo=a,t.default=a}.apply(null,l))||(e.exports=o)}}]);