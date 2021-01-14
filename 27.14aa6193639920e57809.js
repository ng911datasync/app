(function(){(this||window).webpackJsonp.registerAbsMids({"esri/layers/IntegratedMeshLayer":1012,"esri/layers/mixins/SceneService":1151,"esri/layers/support/I3SLayerDefinitions":1199})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{1012:function(e,t,r){var o,n;o=[r.dj.c(e.i),t,r(5),r(1),r(0),r(8),r(9),r(10),r(13),r(323),r(4),r(2),r(97),r(333),r(327),r(325),r(198),r(1151),r(197),r(1199)],void 0===(n=function(e,t,r,o,n,i,p,a,l,s,u,y,d,c,v,f,h,m,S,g){return function(e){function t(t,r){var o=e.call(this,t)||this;return o.geometryType="mesh",o.operationalLayerType="IntegratedMeshLayer",o.type="integrated-mesh",o.nodePages=null,o.materialDefinitions=null,o.textureSetDefinitions=null,o.geometryDefinitions=null,o.serviceUpdateTimeStamp=null,o.profile="mesh-pyramids",o.elevationInfo=null,o.path=null,o}return o(t,e),t.prototype.normalizeCtorArgs=function(e,t){return"string"==typeof e?r({url:e},t):e},t.prototype.load=function(e){var t=this,r=l.isSome(e)?e.signal:null,o=this.loadFromPortal({supportedTypes:["Scene Service"]},e).then((function(){return t._fetchService(r)}),(function(){return t._fetchService(r)})).then((function(){return t._verifyRootNodeAndUpdateExtent(t.nodePages,r)}));return this.addResolvingPromise(o),u.resolve(this)},t.prototype.validateLayer=function(e){if(e.layerType&&"IntegratedMesh"!==e.layerType)throw new a("integrated-mesh-layer:layer-type-not-supported","IntegratedMeshLayer does not support this layer type",{layerType:e.layerType});if(isNaN(this.version.major)||isNaN(this.version.minor))throw new a("layer:service-version-not-supported","Service version is not supported.",{serviceVersion:this.version.versionString,supportedVersions:"1.x"});if(this.version.major>1)throw new a("layer:service-version-too-new","Service version is too new.",{serviceVersion:this.version.versionString,supportedVersions:"1.x"})},n([y.property({type:String,readOnly:!0})],t.prototype,"geometryType",void 0),n([y.property({type:["show","hide"]})],t.prototype,"listMode",void 0),n([y.property({type:["IntegratedMeshLayer"]})],t.prototype,"operationalLayerType",void 0),n([y.property({json:{read:!1},readOnly:!0})],t.prototype,"type",void 0),n([y.property({type:g.I3SNodePageDefinition,readOnly:!0})],t.prototype,"nodePages",void 0),n([y.property({type:[g.I3SMaterialDefinition],readOnly:!0})],t.prototype,"materialDefinitions",void 0),n([y.property({type:[g.I3STextureSetDefinition],readOnly:!0})],t.prototype,"textureSetDefinitions",void 0),n([y.property({type:[g.I3SGeometryDefinition],readOnly:!0})],t.prototype,"geometryDefinitions",void 0),n([y.property({readOnly:!0})],t.prototype,"serviceUpdateTimeStamp",void 0),n([y.property(S.elevationInfo)],t.prototype,"elevationInfo",void 0),n([y.property({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],t.prototype,"path",void 0),n([y.subclass("esri.layers.IntegratedMeshLayer")],t)}(y.declared(h.ScaleRangeLayer(m.SceneService(c.ArcGISService(v.OperationalLayer(f.PortalLayer(s.MultiOriginJSONMixin(d))))))))}.apply(null,o))||(e.exports=n)},1151:function(e,t,r){var o,n;o=[r.dj.c(e.i),t,r(1),r(0),r(8),r(9),r(31),r(10),r(6),r(4),r(23),r(2),r(36),r(141),r(24),r(108),r(197)],void 0===(n=function(e,t,r,o,n,i,p,a,l,s,u,y,d,c,v,f,h){Object.defineProperty(t,"__esModule",{value:!0});var m=l.getLogger("esri.layers.mixins.SceneService");t.SceneService=function(e){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.blendMode=null,t.spatialReference=null,t.fullExtent=null,t.heightModelInfo=null,t.minScale=0,t.maxScale=0,t.version={major:Number.NaN,minor:Number.NaN,versionString:""},t.copyright=null,t.sublayerTitleMode="item-title",t.title=null,t.layerId=null,t}return r(t,e),t.prototype.readSpatialReference=function(e,t){return this._readSpatialReference(t)},t.prototype._readSpatialReference=function(e){if(null!=e.spatialReference)return v.fromJSON(e.spatialReference);var t=e.store,r=t.indexCRS||t.geographicCRS,o=r&&parseInt(r.substring(r.lastIndexOf("/")+1,r.length),10);return null!=o?new v(o):null},t.prototype.readFullExtent=function(e,t){var r=t.store,o=this._readSpatialReference(t);return null==o||null==r||null==r.extent||!Array.isArray(r.extent)||r.extent.some((function(e){return e<S}))?null:new d({xmin:r.extent[0],ymin:r.extent[1],xmax:r.extent[2],ymax:r.extent[3],spatialReference:o})},t.prototype.readVersion=function(e,t){var r=t.store,o=null!=r.version?r.version.toString():"",n={major:Number.NaN,minor:Number.NaN,versionString:o},i=o.split(".");return i.length>=2&&(n.major=parseInt(i[0],10),n.minor=parseInt(i[1],10)),n},t.prototype.readTitlePortalItem=function(e){return"item-title"!==this.sublayerTitleMode?void 0:e},t.prototype.readTitleService=function(e,t){var r=this.portalItem&&this.portalItem.title;if("item-title"===this.sublayerTitleMode)return f.titleFromUrlAndName(this.url,t.name);var o=t.name||f.parse(this.url).title;return"item-title-and-service-name"===this.sublayerTitleMode&&r&&(o=r+" - "+o),f.cleanTitle(o)},t.prototype.readLayerId=function(e,t){return t.id},Object.defineProperty(t.prototype,"url",{set:function(e){var t=f.sanitizeUrlWithLayerId(this,e,m);this._set("url",t.url),null!=t.layerId&&this._set("layerId",t.layerId)},enumerable:!0,configurable:!0}),t.prototype.writeUrl=function(e,t,r,o){f.writeUrlWithLayerId(this,e,"layers",t,o)},Object.defineProperty(t.prototype,"parsedUrl",{get:function(){var e=this._get("url");if(!e)return null;var t=u.urlToObject(e);return null!=this.layerId&&f.isArcGISUrl(t.path)&&(t.path=t.path+"/layers/"+this.layerId),t},enumerable:!0,configurable:!0}),t.prototype._verifyRootNodeAndUpdateExtent=function(e,t){return i(this,void 0,void 0,(function(){var r,o,i;return n(this,(function(n){switch(n.label){case 0:if(!e)return[3,4];n.label=1;case 1:return n.trys.push([1,3,,4]),r=this._updateExtentFromRootPage,o=[e],[4,this._fetchRootPage(e,t)];case 2:return[2,r.apply(this,o.concat([n.sent()]))];case 3:return n.sent(),[3,4];case 4:return i=this._updateExtentFromRootNode,[4,this._fetchRootNode(t)];case 5:return[2,i.apply(this,[n.sent()])]}}))}))},t.prototype._fetchRootPage=function(e,t){return i(this,void 0,void 0,(function(){var r,o;return n(this,(function(n){switch(n.label){case 0:return e?(r=Math.floor(e.rootIndex/e.nodesPerPage),o=this.parsedUrl.path+"/nodepages/"+r,[4,p(o,{responseType:"json",signal:t})]):[2,s.reject()];case 1:return[2,n.sent().data]}}))}))},t.prototype._updateExtentFromRootPage=function(e,t){if(null==t||null==t.nodes)throw new a("sceneservice:invalid-node-page","Inavlid node page.");var r=t.nodes[e.rootIndex%e.nodesPerPage];if(null==r||null==r.obb||null==r.obb.center||null==r.obb.halfSize)throw new a("sceneservice:invalid-node-page","Inavlid node page.");var o=r.obb.halfSize,n=r.obb.center[2],i=Math.sqrt(o[0]*o[0]+o[1]*o[1]+o[2]*o[2]);this.fullExtent.zmin=n-i,this.fullExtent.zmax=n+i},t.prototype._updateExtentFromRootNode=function(e){if(null!=this.fullExtent&&!this.fullExtent.hasZ&&null!=e&&Array.isArray(e.mbs)&&4===e.mbs.length){var t=e.mbs[2],r=e.mbs[3];this.fullExtent.zmin=t-r,this.fullExtent.zmax=t+r}},t.prototype._fetchRootNode=function(e){return i(this,void 0,void 0,(function(){var t,r;return n(this,(function(o){switch(o.label){case 0:if(!this.rootNode)return[2];t=u.join(this.parsedUrl.path,this.rootNode),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,p(t,{query:{f:"json"},responseType:"json",signal:e})];case 2:return[2,o.sent().data];case 3:throw r=o.sent(),new a("sceneservice:root-node-missing","Root node missing.",{error:r,url:t});case 4:return[2]}}))}))},t.prototype._fetchService=function(e){return i(this,void 0,void 0,(function(){var t;return n(this,(function(r){switch(r.label){case 0:return null==this.layerId&&/SceneServer\/*$/i.test(this.url)?[4,this._fetchFirstLayerId(e)]:[3,2];case 1:null!=(t=r.sent())&&(this.layerId=t),r.label=2;case 2:return[2,this._fetchServiceLayer(e)]}}))}))},t.prototype._fetchFirstLayerId=function(e){return i(this,void 0,void 0,(function(){var t;return n(this,(function(r){switch(r.label){case 0:return[4,p(this.url,{query:{f:"json"},responseType:"json",signal:e})];case 1:return(t=r.sent()).data&&Array.isArray(t.data.layers)&&t.data.layers.length>0?[2,t.data.layers[0].id]:[2,void 0]}}))}))},t.prototype._fetchServiceLayer=function(e){return i(this,void 0,void 0,(function(){var t,r;return n(this,(function(o){switch(o.label){case 0:return[4,p(this.parsedUrl.path,{query:{f:"json"},responseType:"json",signal:e})];case 1:return(t=o.sent()).ssl&&(this.url=this.url.replace(/^http:/i,"https:")),r=t.data,this.read(r,{origin:"service",url:this.parsedUrl}),this.validateLayer(r),[2]}}))}))},t.prototype.validateLayer=function(e){},o([y.shared({id:{json:{origins:{service:{read:!1},"portal-item":{read:!1}}}}})],t.prototype,"properties",void 0),o([y.property({type:v})],t.prototype,"spatialReference",void 0),o([y.reader("spatialReference",["spatialReference","store.indexCRS","store.geographicCRS"])],t.prototype,"readSpatialReference",null),o([y.property({type:d})],t.prototype,"fullExtent",void 0),o([y.reader("fullExtent",["store.extent","spatialReference","store.indexCRS","store.geographicCRS"])],t.prototype,"readFullExtent",null),o([y.property({readOnly:!0,type:c})],t.prototype,"heightModelInfo",void 0),o([y.property({type:Number,json:{read:{source:"layerDefinition.minScale"},write:{target:"layerDefinition.minScale"},origins:{service:{read:{source:"minScale"},write:!1}}}})],t.prototype,"minScale",void 0),o([y.property({type:Number,json:{read:{source:"layerDefinition.maxScale"},write:{target:"layerDefinition.maxScale"},origins:{service:{read:{source:"maxScale"},write:!1}}}})],t.prototype,"maxScale",void 0),o([y.property({readOnly:!0})],t.prototype,"version",void 0),o([y.reader("version",["store.version"])],t.prototype,"readVersion",null),o([y.property({type:String,json:{read:{source:"copyrightText"}}})],t.prototype,"copyright",void 0),o([y.property({type:String,json:{read:!1}})],t.prototype,"sublayerTitleMode",void 0),o([y.property({type:String})],t.prototype,"title",void 0),o([y.reader("portal-item","title")],t.prototype,"readTitlePortalItem",null),o([y.reader("service","title",["name"])],t.prototype,"readTitleService",null),o([y.property({type:Number})],t.prototype,"layerId",void 0),o([y.reader("service","layerId",["id"])],t.prototype,"readLayerId",null),o([y.property(h.url)],t.prototype,"url",null),o([y.writer("url")],t.prototype,"writeUrl",null),o([y.property({dependsOn:["layerId"]})],t.prototype,"parsedUrl",null),o([y.property({readOnly:!0})],t.prototype,"store",void 0),o([y.property({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],t.prototype,"rootNode",void 0),o([y.subclass("esri.layers.mixins.SceneService")],t)}(y.declared(e))};var S=-1e38}.apply(null,o))||(e.exports=n)},1199:function(e,t,r){var o,n;o=[r.dj.c(e.i),t,r(1),r(0),r(3),r(2)],void 0===(n=function(e,t,r,o,n,i){Object.defineProperty(t,"__esModule",{value:!0});var p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.nodesPerPage=null,t.rootIndex=0,t.lodSelectionMetricType=null,t}return r(t,e),o([i.property({type:Number})],t.prototype,"nodesPerPage",void 0),o([i.property({type:Number})],t.prototype,"rootIndex",void 0),o([i.property({type:String})],t.prototype,"lodSelectionMetricType",void 0),o([i.subclass("esri.layer.support.I3SNodePageDefinition")],t)}(i.declared(n.JSONSupport));t.I3SNodePageDefinition=p;var a=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.factor=1,t}return r(t,e),o([i.property({type:Number,json:{read:{source:"textureSetDefinitionId"}}})],t.prototype,"id",void 0),o([i.property({type:Number})],t.prototype,"factor",void 0),o([i.subclass("esri.layer.support.I3SMaterialTexture")],t)}(i.declared(n.JSONSupport));t.I3SMaterialTexture=a;var l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.baseColorFactor=[1,1,1,1],t.baseColorTexture=null,t.metallicRoughnessTexture=null,t.metallicFactor=1,t.roughnessFactor=1,t}return r(t,e),o([i.property({type:[Number]})],t.prototype,"baseColorFactor",void 0),o([i.property({type:a})],t.prototype,"baseColorTexture",void 0),o([i.property({type:a})],t.prototype,"metallicRoughnessTexture",void 0),o([i.property({type:Number})],t.prototype,"metallicFactor",void 0),o([i.property({type:Number})],t.prototype,"roughnessFactor",void 0),o([i.subclass("esri.layer.support.I3SMaterialPBRMetallicRoughness")],t)}(i.declared(n.JSONSupport));t.I3SMaterialPBRMetallicRoughness=l;var s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.alphaMode="opaque",t.alphaCutoff=.25,t.doubleSided=!1,t.cullFace="none",t.normalTexture=null,t.occlusionTexture=null,t.emissiveTexture=null,t.emissiveFactor=null,t.pbrMetallicRoughness=null,t}return r(t,e),o([i.enumeration.serializable()({opaque:"opaque",mask:"mask",blend:"blend"})],t.prototype,"alphaMode",void 0),o([i.property({type:Number})],t.prototype,"alphaCutoff",void 0),o([i.property({type:Boolean})],t.prototype,"doubleSided",void 0),o([i.enumeration.serializable()({none:"none",back:"back",front:"front"})],t.prototype,"cullFace",void 0),o([i.property({type:a})],t.prototype,"normalTexture",void 0),o([i.property({type:a})],t.prototype,"occlusionTexture",void 0),o([i.property({type:a})],t.prototype,"emissiveTexture",void 0),o([i.property({type:[Number]})],t.prototype,"emissiveFactor",void 0),o([i.property({type:l})],t.prototype,"pbrMetallicRoughness",void 0),o([i.subclass("esri.layer.support.I3SMaterialDefinition")],t)}(i.declared(n.JSONSupport));t.I3SMaterialDefinition=s;var u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),o([i.property({type:String,json:{read:{source:["name","index"],reader:function(e,t){return null!=e?e:""+t.index}}}})],t.prototype,"name",void 0),o([i.enumeration.serializable()({jpg:"jpg",png:"png",dds:"dds","ktx-etc2":"ktx-etc2"})],t.prototype,"format",void 0),o([i.subclass("esri.layer.support.I3STextureFormat")],t)}(i.declared(n.JSONSupport));t.I3STextureFormat=u;var y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.atlas=!1,t}return r(t,e),o([i.property({type:[u]})],t.prototype,"formats",void 0),o([i.property({type:Boolean})],t.prototype,"atlas",void 0),o([i.subclass("esri.layer.support.I3STextureSetDefinition")],t)}(i.declared(n.JSONSupport));t.I3STextureSetDefinition=y;var d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),o([i.enumeration.serializable()({Float32:"Float32",UInt64:"UInt64",UInt32:"UInt32",UInt16:"UInt16",UInt8:"UInt8"})],t.prototype,"type",void 0),o([i.property({type:Number})],t.prototype,"component",void 0),o([i.subclass("esri.layer.support.I3SGeometryAttribute")],t)}(i.declared(n.JSONSupport));t.I3SGeometryAttribute=d;var c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),o([i.enumeration.serializable()({draco:"draco"})],t.prototype,"encoding",void 0),o([i.property({type:[String]})],t.prototype,"attributes",void 0),o([i.subclass("esri.layer.support.I3SGeometryAttribute")],t)}(i.declared(n.JSONSupport));t.I3SGeometryCompressedAttributes=c;var v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.offset=0,t}return r(t,e),o([i.property({type:Number})],t.prototype,"offset",void 0),o([i.property({type:d})],t.prototype,"position",void 0),o([i.property({type:d})],t.prototype,"normal",void 0),o([i.property({type:d})],t.prototype,"uv0",void 0),o([i.property({type:d})],t.prototype,"color",void 0),o([i.property({type:d})],t.prototype,"uvRegion",void 0),o([i.property({type:d})],t.prototype,"featureId",void 0),o([i.property({type:d})],t.prototype,"faceRange",void 0),o([i.property({type:c})],t.prototype,"compressedAttributes",void 0),o([i.subclass("esri.layer.support.I3SGeometryBuffer")],t)}(i.declared(n.JSONSupport));t.I3SGeometryBuffer=v;var f=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),o([i.enumeration.serializable()({triangle:"triangle"})],t.prototype,"topology",void 0),o([i.property()],t.prototype,"geometryBuffers",void 0),o([i.subclass("esri.layer.support.I3SMeshDefinition")],t)}(i.declared(n.JSONSupport));t.I3SGeometryDefinition=f}.apply(null,o))||(e.exports=n)}}]);