(function(){(this||window).webpackJsonp.registerAbsMids({"esri/layers/StreamLayer":1008,"esri/layers/support/PurgeOptions":1963})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1008:function(e,r,t){var o,n;o=[t.dj.c(e.i),r,t(8),t(0),t(9),t(1),t(5),t(18),t(66),t(349),t(31),t(42),t(146),t(10),t(47),t(12),t(6),t(13),t(323),t(4),t(2),t(14),t(97),t(333),t(327),t(325),t(331),t(198),t(363),t(197),t(391),t(79),t(328),t(28),t(28),t(216),t(373),t(1963),t(136),t(356),t(340),t(223),t(49),t(101)],void 0===(n=function(e,r,t,o,n,i,p,a,l,s,d,y,u,c,f,m,b,g,v,w,h,S,I,O,R,P,T,x,j,F,D,L,E,G,k,J,N,_,M,W,A,C,U,V){var q=b.getLogger("esri.layers.StreamLayer"),z=new m.default({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon"});return function(e){function r(r){var t=e.call(this,r)||this;return t.copyright=null,t.definitionExpression=null,t.displayField=null,t.elevationInfo=null,t.featureReduction=null,t.fields=null,t.geometryDefinition=null,t.geometryType=null,t.labelsVisible=!0,t.labelingInfo=null,t.legendEnabled=!0,t.objectIdField=null,t.operationalLayerType="ArcGISStreamLayer",t.popupEnabled=!0,t.popupTemplate=null,t.purgeOptions=new _,t.screenSizePerspectiveEnabled=!0,t.sourceJSON=null,t.spatialReference=a.SpatialReference.WGS84,t.type="stream",t.url=null,t}return i(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?p({url:e},r):e},r.prototype.load=function(e){var r=this;"WebSocket"in f||w.reject(new c("stream-layer:websocket-unsupported","WebSocket is not supported in this browser. StreamLayer will not have real-time connection with the stream service."));var t=g.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Stream Service"]},e).catch((function(e){return e})).then((function(){return r._fetchService(t)}))),w.resolve(this)},Object.defineProperty(r.prototype,"defaultPopupTemplate",{get:function(){return this.createPopupTemplate()},enumerable:!0,configurable:!0}),r.prototype.readFeatureReduction=function(e,r){return D.read(e,r)},r.prototype.writeWebSceneFeatureReduction=function(e,r,t,o){D.writeTarget(e,r,"layerDefinition.featureReduction",o)},Object.defineProperty(r.prototype,"fieldsIndex",{get:function(){return new E(this.fields)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maximumTrackPoints",{get:function(){return u.deprecatedProperty(q,"maximumTrackPoints",{replacement:"purgeOptions.maxObservations",version:"4.15"}),this.purgeOptions.maxObservations},set:function(e){u.deprecatedProperty(q,"maximumTrackPoints",{replacement:"purgeOptions.maxObservations",version:"4.15"});var r=this.purgeOptions.clone();r.maxObservations=e,this.purgeOptions=r},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"renderer",{set:function(e){G.fixRendererFields(e,this.fields),this._set("renderer",e)},enumerable:!0,configurable:!0}),r.prototype.readRenderer=function(e,r,t){var o,n,i=(r=r.layerDefinition||r).drawingInfo&&r.drawingInfo.renderer||void 0;if(i)(o=M.read(i,r,t)||void 0)||q.error("Failed to create renderer",{rendererDefinition:r.drawingInfo.renderer,layer:this,context:t});else if(r.defaultSymbol)U.read(r.defaultSymbol,r,t),r.types&&r.types.length?(o=new s.UniqueValueRenderer({defaultSymbol:n,field:r.typeIdField}),r.types.forEach((function(e){i.addUniqueValueInfo(e.id,U.read(e.symbol,e,t))}))):o=new s.SimpleRenderer({symbol:n});else if("Table"!==r.type){switch(r.geometryType){case"esriGeometryPoint":case"esriGeometryMultipoint":n=new y.SimpleMarkerSymbol;break;case"esriGeometryPolyline":n=new y.SimpleLineSymbol;break;case"esriGeometryPolygon":n=new y.SimpleFillSymbol}o=n&&new s.SimpleRenderer({symbol:n})}return o},r.prototype.writeRenderer=function(e,r,t,o){M.writeTarget(e,r,t,o)},r.prototype.writeWebSceneRenderer=function(e,r,t,o){M.writeTarget(e,r,"layerDefinition.drawingInfo.renderer",o)},r.prototype.createPopupTemplate=function(e){return A.createPopupTemplate(this,e)},r.prototype.createQuery=function(){var e=new V;return e.returnGeometry=!0,e.outFields=["*"],e.where=this.definitionExpression||"1=1",e},r.prototype.getFieldDomain=function(e,r){if(!this.fields)return null;var t=null;return this.fields.some((function(r){return r.name===e&&(t=r.domain),!!t})),t},r.prototype.getField=function(e){return this.fieldsIndex.get(e)},r.prototype._fetchService=function(e){return n(this,void 0,void 0,(function(){var r;return t(this,(function(t){switch(t.label){case 0:return this.sourceJSON?[3,2]:[4,d(this.parsedUrl.path,{query:p({f:"json"},this.parsedUrl.query),responseType:"json",signal:e})];case 1:r=t.sent().data,this.sourceJSON=p({},r,{objectIdField:"__esri_stream_id__"}),t.label=2;case 2:return this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl}),k.fixRendererFields(this.renderer,this.fields),k.fixTimeInfoFields(this.timeInfo,this.fields),[2,W.loadStyleRenderer(this,{origin:"service"})]}}))}))},o([h.property({type:String})],r.prototype,"copyright",void 0),o([h.property({readOnly:!0,dependsOn:["fields","title"]})],r.prototype,"defaultPopupTemplate",null),o([h.property({type:String})],r.prototype,"definitionExpression",void 0),o([h.property({type:String})],r.prototype,"displayField",void 0),o([h.property({type:C})],r.prototype,"elevationInfo",void 0),o([h.reader("featureReduction",["layerDefinition.featureReduction"])],r.prototype,"readFeatureReduction",null),o([h.writer("web-scene","featureReduction",{"layerDefinition.featureReduction":{types:D.webSceneFeatureReductionTypes}})],r.prototype,"writeWebSceneFeatureReduction",null),o([h.property({type:[L]})],r.prototype,"fields",void 0),o([h.property({readOnly:!0,dependsOn:["fields"]})],r.prototype,"fieldsIndex",null),o([h.property({type:a.Extent})],r.prototype,"geometryDefinition",void 0),o([h.property({type:["point","polygon","polyline","multipoint"],json:{read:{reader:z.read}}})],r.prototype,"geometryType",void 0),o([h.property(F.labelsVisible)],r.prototype,"labelsVisible",void 0),o([h.property({type:[J],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:N.reader},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],r.prototype,"labelingInfo",void 0),o([h.property(F.legendEnabled)],r.prototype,"legendEnabled",void 0),o([h.property({type:["show","hide"]})],r.prototype,"listMode",void 0),o([h.property({type:S.Integer})],r.prototype,"maximumTrackPoints",null),o([h.property({type:String})],r.prototype,"objectIdField",void 0),o([h.property({value:"ArcGISStreamLayer",type:["ArcGISStreamLayer"]})],r.prototype,"operationalLayerType",void 0),o([h.property(F.popupEnabled)],r.prototype,"popupEnabled",void 0),o([h.property({type:l,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],r.prototype,"popupTemplate",void 0),o([h.property({type:_})],r.prototype,"purgeOptions",void 0),o([h.property({types:s.rendererTypes,json:{origins:{service:{write:{target:"drawingInfo.renderer",enabled:!1}}},write:{target:"layerDefinition.drawingInfo.renderer"}}})],r.prototype,"renderer",null),o([h.reader("service","renderer",["drawingInfo.renderer","defaultSymbol","type"]),h.reader("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol","layerDefinition.type"])],r.prototype,"readRenderer",null),o([h.writer("renderer")],r.prototype,"writeRenderer",null),o([h.writer("web-scene","renderer",{"layerDefinition.drawingInfo.renderer":{types:s.webSceneRendererTypes}})],r.prototype,"writeWebSceneRenderer",null),o([h.property(F.screenSizePerspectiveEnabled)],r.prototype,"screenSizePerspectiveEnabled",void 0),o([h.property({type:a.SpatialReference,json:{origins:{service:{read:{source:"spatialReference"}}}}})],r.prototype,"spatialReference",void 0),o([h.property({json:{read:!1}})],r.prototype,"type",void 0),o([h.property(F.url)],r.prototype,"url",void 0),o([h.subclass("esri.layers.StreamLayer")],r)}(h.declared(j.TemporalLayer(x.ScaleRangeLayer(T.RefreshableLayer(O.ArcGISService(R.OperationalLayer(P.PortalLayer(v.MultiOriginJSONMixin(I)))))))))}.apply(null,o))||(e.exports=n)},1963:function(e,r,t){var o,n;o=[t.dj.c(e.i),r,t(0),t(1),t(3),t(2)],void 0===(n=function(e,r,t,o,n,i){return function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.age=null,r.displayCount=null,r.maxObservations=1,r}var n;return o(r,e),n=r,r.prototype.clone=function(){return new n({age:this.age,displayCount:this.displayCount,maxObservations:this.maxObservations})},t([i.property({type:Number,json:{write:!0}})],r.prototype,"age",void 0),t([i.property({type:Number,json:{write:!0}})],r.prototype,"displayCount",void 0),t([i.property({type:Number,json:{write:!0}})],r.prototype,"maxObservations",void 0),n=t([i.subclass("esri.layers.support.PurgeOptions")],r)}(i.declared(n.JSONSupport))}.apply(null,o))||(e.exports=n)}}]);