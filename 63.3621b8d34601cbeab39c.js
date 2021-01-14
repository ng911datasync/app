(function(){(this||window).webpackJsonp.registerAbsMids({"esri/views/2d/layers/BaseDynamicLayerView2D":1047,"esri/views/layers/support/ClipArea":1064,"esri/views/layers/LayerView":1071,"esri/views/2d/layers/LayerView2D":1072,"esri/views/layers/support/ClipRect":1073,"esri/views/layers/support/Geometry":1074,"esri/views/layers/support/Path":1075,"esri/views/2d/layers/BitmapLayerView2D":1148,"esri/views/2d/layers/support/ExportStrategy":1149,"esri/views/2d/viewStateUtils":1150})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{1047:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(1),r(0),r(8),r(9),r(6),r(4),r(2),r(1148),r(1072),r(1149),r(1071),r(336)],void 0===(n=function(e,t,r,i,n,o,p,a,s,u,l,d,y,c){var h=p.getLogger("esri.views.2d.layers.BaseDynamicLayerView2D");return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.hitTest=function(){return null},t.prototype.update=function(e){this.strategy.update(e).catch((function(e){a.isAbortError(e)||h.error(e)})),this.notifyChange("updating")},t.prototype.attach=function(){this.strategy=new d({container:this.container,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})},t.prototype.detach=function(){this.strategy.destroy(),this.strategy=null,this.container.removeAllChildren()},t.prototype.moveStart=function(){},t.prototype.viewChange=function(){},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.fetchBitmapData=function(e,t,r){return this.layer.fetchImage(e,t,r,{timestamp:this.refreshTimestamp})},t.prototype.doRefresh=function(){return o(this,void 0,void 0,(function(){return n(this,(function(e){return this.requestUpdate(),[2]}))}))},t.prototype.isUpdating=function(){return this.attached&&(this.strategy.updating||this.updateRequested)},i([s.property()],t.prototype,"strategy",void 0),i([s.property({dependsOn:["strategy.updating"]})],t.prototype,"updating",void 0),i([s.subclass("esri.views.2d.layers.BaseDynamicLayerView2D")],t)}(s.declared(c.RefreshableLayerView(u.BitmapLayerView2D(l.LayerView2D(y)))))}.apply(null,i))||(e.exports=n)},1064:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(0),r(1),r(3),r(2)],void 0===(n=function(e,t,r,i,n,o){return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),r([o.subclass("esri.views.layers.support.ClipArea")],t)}(o.declared(n.JSONSupport))}.apply(null,i))||(e.exports=n)},1071:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(1),r(0),r(11),r(52),r(132),r(133),r(6),r(98),r(2)],void 0===(n=function(e,t,r,i,n,o,p,a,s,u,l){return function(e){function t(t){var r=e.call(this,t)||this;return r.layer=null,r.parent=null,r}return r(t,e),t.prototype.initialize=function(){var e=this;this.when().catch((function(t){if("layerview:create-error"!==t.name){var r=e.layer&&e.layer.id||"no id",i=e.layer&&e.layer.title||"no title";throw s.getLogger(e.declaredClass).error("#resolve()","Failed to resolve layer view (layer title: '"+i+"', id: '"+r+"')",t),t}}))},t.prototype.destroy=function(){this.layer=this.parent=null},Object.defineProperty(t.prototype,"fullOpacity",{get:function(){var e=function(e){return null==e?1:e};return e(this.get("layer.opacity"))*e(this.get("parent.fullOpacity"))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"suspended",{get:function(){return!this.canResume()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"suspendInfo",{get:function(){return this.getSuspendInfo()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return!!(this.updatingHandles&&this.updatingHandles.updating||this.isUpdating())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visible",{get:function(){return!0===this.get("layer.visible")},set:function(e){void 0!==e?this._override("visible",e):this._clearOverride("visible")},enumerable:!0,configurable:!0}),t.prototype.canResume=function(){return!this.get("parent.suspended")&&this.get("view.ready")&&this.get("layer.loaded")&&this.visible||!1},t.prototype.getSuspendInfo=function(){var e=this.parent&&this.parent.suspended?this.parent.suspendInfo:{};return this.view&&this.view.ready||(e.viewNotReady=!0),this.layer&&this.layer.loaded||(e.layerNotLoaded=!0),this.visible||(e.layerInvisible=!0),e},t.prototype.isUpdating=function(){return!1},i([l.property({dependsOn:["layer.opacity","parent.fullOpacity"]})],t.prototype,"fullOpacity",null),i([l.property()],t.prototype,"layer",void 0),i([l.property()],t.prototype,"parent",void 0),i([l.property({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],t.prototype,"suspended",null),i([l.property({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],t.prototype,"suspendInfo",null),i([l.property({type:Boolean,dependsOn:["updatingHandles.updating"],readOnly:!0})],t.prototype,"updating",null),i([l.property({dependsOn:["layer.visible"]})],t.prototype,"visible",null),i([l.subclass("esri.views.layers.LayerView")],t)}(l.declared(p.HandleOwnerMixin(a.IdentifiableMixin(u.EsriPromiseMixin(o.EventedMixin(n))))))}.apply(null,i))||(e.exports=n)},1072:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(1),r(0),r(20),r(102),r(16),r(2),r(1064),r(1073),r(1074),r(1075)],void 0===(n=function(e,t,r,i,n,o,p,a,s,u,l,d){Object.defineProperty(t,"__esModule",{value:!0});var y=n.ofType({key:"type",base:s,typeMap:{rect:u,path:d,geometry:l}});t.LayerView2D=function(e){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.clips=new y,t.moving=!1,t.attached=!1,t.lastUpdateId=-1,t.updateRequested=!1,t}return r(t,e),t.prototype.initialize=function(){var e=this;this.when((function(){e.requestUpdate()}),(function(){}));var t=function(){return e.notifyChange("rendering")};this.handles.add([p.init(this,"suspended",(function(t){e.container&&(e.container.visible=!t),e.view&&!t&&e.updateRequested&&e.view.requestLayerViewUpdate(e)}),!0),p.init(this,["fullOpacity","container"],(function(){e.container&&(e.container.opacity=e.fullOpacity)}),!0),p.on(this,"container","post-render",t),p.on(this,"container","will-render",t)])},t.prototype.destroy=function(){this.attached&&(this.attached=!1,this.detach()),this.handles.remove("initialize"),this.updateRequested=!1,this.layer=null,this.view=null},Object.defineProperty(t.prototype,"rendering",{get:function(){return this.attached&&!this.suspended&&(this.moving||this.container.renderRequested||this.isRendering())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return!this.suspended&&(!this.attached||this.updateRequested||this.isUpdating())},enumerable:!0,configurable:!0}),t.prototype.isVisibleAtScale=function(e){var t=!0,r=this.layer,i=r.minScale,n=r.maxScale;if(null!=i&&null!=n){var o=!i,p=!n;!o&&e<=i&&(o=!0),!p&&e>=n&&(p=!0),t=o&&p}return t},t.prototype.requestUpdate=function(){this.updateRequested||(this.updateRequested=!0,this.suspended||this.view.requestLayerViewUpdate(this))},t.prototype.processUpdate=function(e){!this.isFulfilled()||this.isResolved()?(this._set("updateParameters",e),this.updateRequested&&!this.suspended&&(this.updateRequested=!1,this.update(e))):this.updateRequested=!1},t.prototype.isUpdating=function(){return!1},t.prototype.isRendering=function(){return!1},t.prototype.canResume=function(){var e=this.inherited(arguments);return e&&(e=this.isVisibleAtScale(this.view.scale)),e},i([a.property({type:y,set:function(e){var t=o.referenceSetter(e,this._get("clips"),y);this._set("clips",t)}})],t.prototype,"clips",void 0),i([a.property()],t.prototype,"moving",void 0),i([a.property({dependsOn:["attached","suspended","moving"]})],t.prototype,"rendering",null),i([a.property()],t.prototype,"attached",void 0),i([a.property()],t.prototype,"container",void 0),i([a.property({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],t.prototype,"suspended",void 0),i([a.property({readOnly:!0})],t.prototype,"updateParameters",void 0),i([a.property()],t.prototype,"updateRequested",void 0),i([a.property({dependsOn:["updateRequested","attached","suspended"]})],t.prototype,"updating",null),i([a.property()],t.prototype,"view",void 0),i([a.subclass("esri.views.2d.layers.LayerView2D")],t)}(a.declared(e))}}.apply(null,i))||(e.exports=n)},1073:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(0),r(1),r(2),r(1064)],void 0===(n=function(e,t,r,i,n,o){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="rect",t.left=null,t.right=null,t.top=null,t.bottom=null,t}var o;return i(t,e),o=t,t.prototype.clone=function(){return new o({left:this.left,right:this.right,top:this.top,bottom:this.bottom})},Object.defineProperty(t.prototype,"version",{get:function(){return(this._get("version")||0)+1},enumerable:!0,configurable:!0}),r([n.property({type:[Number,String],json:{write:!0}})],t.prototype,"left",void 0),r([n.property({type:[Number,String],json:{write:!0}})],t.prototype,"right",void 0),r([n.property({type:[Number,String],json:{write:!0}})],t.prototype,"top",void 0),r([n.property({type:[Number,String],json:{write:!0}})],t.prototype,"bottom",void 0),r([n.property({readOnly:!0,dependsOn:["left","right","top","bottom"]})],t.prototype,"version",null),o=r([n.subclass("esri.views.layers.support.ClipRect")],t)}(n.declared(o))}.apply(null,i))||(e.exports=n)},1074:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(0),r(1),r(18),r(2),r(60),r(19),r(1064)],void 0===(n=function(e,t,r,i,n,o,p,a,s){var u={base:p,key:"type",typeMap:{extent:n.Extent,polygon:n.Polygon}};return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="geometry",t.geometry=null,t}var n;return i(t,e),n=t,Object.defineProperty(t.prototype,"version",{get:function(){return(this._get("version")||0)+1},enumerable:!0,configurable:!0}),t.prototype.clone=function(){return new n({geometry:this.geometry.clone()})},r([o.property({types:u,json:{read:a.fromJSON,write:!0}})],t.prototype,"geometry",void 0),r([o.property({readOnly:!0,dependsOn:["geometry"]})],t.prototype,"version",null),n=r([o.subclass("esri.views.layers.support.Geometry")],t)}(o.declared(s))}.apply(null,i))||(e.exports=n)},1075:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(0),r(1),r(2),r(1064)],void 0===(n=function(e,t,r,i,n,o){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="path",t.path=[],t}return i(t,e),Object.defineProperty(t.prototype,"version",{get:function(){return(this._get("version")||0)+1},enumerable:!0,configurable:!0}),r([n.property({type:[[[Number]]],json:{write:!0}})],t.prototype,"path",void 0),r([n.property({readOnly:!0,dependsOn:["path"]})],t.prototype,"version",null),r([n.subclass("esri.views.layers.support.Path")],t)}(n.declared(o))}.apply(null,i))||(e.exports=n)},1148:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(0),r(1),r(2),r(1174)],void 0===(n=function(e,t,r,i,n,o){Object.defineProperty(t,"__esModule",{value:!0}),t.BitmapLayerView2D=function(e){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.container=new o.BitmapContainer(t.clips),t}return i(t,e),t.prototype.initialize=function(){var e=this;this.handles.add(this.clips.on("change",(function(){return e.container.setClips(e.clips)})))},r([n.subclass("esri.views.2d.layers.BitmapLayerView2D")],t)}(n.declared(e))}}.apply(null,i))||(e.exports=n)},1149:function(e,t,r){var i,n;i=[r.dj.c(e.i),t,r(5),r(8),r(9),r(1),r(0),r(11),r(4),r(2),r(36),r(131),r(37),r(324),r(320),r(1150),r(334),r(96)],void 0===(n=function(e,t,r,i,n,o,p,a,s,u,l,d,y,c,h,f,v,g){var m=d.create(),b=[0,0],w=new g(0,0,0,0);return function(e){function t(t){var r=e.call(this,t)||this;return r._imagePromise=null,r.hidpi=!1,r.imageMaxWidth=2048,r.imageMaxHeight=2048,r.imageRotationSupported=!1,r.imageNormalizationSupported=!1,r.update=s.debounce((function(e,t){return n(r,void 0,void 0,(function(){var r,n,o,p,a,s,u,l,d,c=this;return i(this,(function(i){return r=e.state,n=y.getInfo(r.spatialReference),o=this.hidpi?e.pixelRatio:1,!e.stationary||this.destroyed?[2]:(this.imageRotationSupported?(b[0]=r.size[0],b[1]=r.size[1]):f.getOuterSize(b,r),p=Math.floor(b[0]*o)>this.imageMaxWidth||Math.floor(b[1]*o)>this.imageMaxHeight,a=n&&(r.extent.xmin<n.valid[0]||r.extent.xmax>n.valid[1]),s=!this.imageNormalizationSupported&&a,u=!p&&!s,l=this.imageRotationSupported?r.rotation:0,u?this._imagePromise=this._singleExport(r,b,l,o,t):(d=Math.min(this.imageMaxWidth,this.imageMaxHeight),s&&(d=Math.min(r.worldScreenWidth,d)),this._imagePromise=this._tiledExport(r,d,l,o,t)),[2,this._imagePromise.then((function(e){c._imagePromise=null;var t=c.container.children.slice();c.container.removeAllChildren(),e.forEach(c.container.addChild,c.container),c.disposeSource&&t.forEach((function(e){c.disposeSource(e.source)}),c)})).catch((function(e){throw c._imagePromise=null,e}))])}))}))}),5e3),r}return o(t,e),t.prototype.destroy=function(){},Object.defineProperty(t.prototype,"updating",{get:function(){return null!==this._imagePromise},enumerable:!0,configurable:!0}),t.prototype.updateExports=function(e){for(var t=0,r=this.container.children;t<r.length;t++){var i=r[t];if(!i.visible||!i.attached)return;e(i)||(i.invalidateTexture(),i.requestRender())}},t.prototype._export=function(e,t,r,i,n,o){var p=this;return s.resolve().then((function(){return p.fetchSource(e,Math.floor(t*n),Math.floor(r*n),{rotation:i,pixelRatio:n,signal:o})})).then((function(r){var o=new h.Bitmap(r);return o.x=e.xmin,o.y=e.ymax,o.resolution=e.width/t,o.rotation=i,o.pixelRatio=n,o}))},t.prototype._singleExport=function(e,t,r,i,n){f.getBBox(m,e.center,e.resolution,t);var o=new l(m[0],m[1],m[2],m[3],e.spatialReference);return this._export(o,t[0],t[1],r,i,n).then((function(e){return[e]}))},t.prototype._tiledExport=function(e,t,r,i,n){var o=this,p=c.create({size:t,spatialReference:e.spatialReference,scales:[e.scale]}),a=new v(p),u=a.getTileCoverage(e);if(!u)return null;var d=[];return u.forEach((function(p,s,u,y){w.set(p,s,u,y),a.getTileBounds(m,w);var c=new l(m[0],m[1],m[2],m[3],e.spatialReference);d.push(o._export(c,t,t,r,i,n))})),s.all(d)},p([u.property()],t.prototype,"_imagePromise",void 0),p([u.property()],t.prototype,"container",void 0),p([u.property()],t.prototype,"disposeSource",void 0),p([u.property()],t.prototype,"fetchSource",void 0),p([u.property()],t.prototype,"hidpi",void 0),p([u.property()],t.prototype,"imageMaxWidth",void 0),p([u.property()],t.prototype,"imageMaxHeight",void 0),p([u.property()],t.prototype,"imageRotationSupported",void 0),p([u.property()],t.prototype,"imageNormalizationSupported",void 0),p([u.property()],t.prototype,"requestUpdate",void 0),p([u.property({dependsOn:["_imagePromise"]})],t.prototype,"updating",null),p([u.subclass("esri.views.2d.layers.support.ExportStrategy")],t)}(u.declared(a))}.apply(null,i))||(e.exports=n)},1150:function(e,t,r){var i,n;i=[r.dj.c(e.i),t],void 0===(n=function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=Math.PI/180;t.snapToPixel=function(e,t,r){var i=r.resolution,n=r.size;return e[0]=i*(Math.round(t[0]/i)+n[0]%2*.5),e[1]=i*(Math.round(t[1]/i)+n[1]%2*.5),e},t.getOuterSize=function(e,t){var i=t.rotation*r,n=Math.abs(Math.cos(i)),o=Math.abs(Math.sin(i)),p=t.size,a=p[0],s=p[1];return e[0]=Math.round(s*o+a*n),e[1]=Math.round(s*n+a*o),e},t.getBBox=function(e,t,r,i){var n=t[0],o=t[1],p=i[0],a=i[1],s=.5*r;return e[0]=n-s*p,e[1]=o-s*a,e[2]=n+s*p,e[3]=o+s*a,e},t.bboxIntersects=function(e,t){var r=e[0],i=e[1],n=e[2],o=e[3],p=t[0],a=t[1],s=t[2],u=t[3];return!(r>s||n<p||i>u||o<a)}}.apply(null,i))||(e.exports=n)}}]);