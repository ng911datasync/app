// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/accessorSupport/decorators"],(function(e,t,r,i,n,o){return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),Object.defineProperty(t.prototype,"canZoomIn",{get:function(){if(!this.get("view.ready"))return!1;var e=this.get("view.animation.target.scale")||this.get("view.scale"),t=this.get("view.constraints.effectiveMaxScale");return 0===t||e>t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canZoomOut",{get:function(){if(!this.get("view.ready"))return!1;var e=this.get("view.animation.target.scale")||this.get("view.scale"),t=this.get("view.constraints.effectiveMinScale");return 0===t||e<t},enumerable:!0,configurable:!0}),i([o.property({dependsOn:["view.ready","view.scale","view.animation.target.scale","view.constraints.effectiveMaxScale"],readOnly:!0})],t.prototype,"canZoomIn",null),i([o.property({dependsOn:["view.ready","view.scale","view.animation.target.scale","view.constraints.effectiveMinScale"],readOnly:!0})],t.prototype,"canZoomOut",null),i([o.property()],t.prototype,"view",void 0),t=i([o.subclass("esri.widgets.Zoom.ZoomConditions2D")],t)}(o.declared(n))}));