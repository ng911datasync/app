(function(){(this||window).webpackJsonp.registerAbsMids({"esri/core/workers/request":1028})})(),(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{1028:function(e,r,s){var t,n;t=[s.dj.c(e.i),r,s(5),s(10),s(47)],void 0===(n=function(e,r,s,t,n){var o;Object.defineProperty(r,"__esModule",{value:!0}),r.execute=function(e,r){void 0===r&&(r={});var a=r.responseType;a?"json"!==a&&"text"!==a&&"blob"!==a&&"array-buffer"!==a&&(a="text"):a="json";var i=r&&r.signal;return delete r.signal,n.invokeStaticMessage("request",{url:e,options:r},{signal:i}).then((function(n){var i,u,l,c,p=n.data;if(p&&!("json"!==a&&"text"!==a&&"blob"!==a||(i=new Blob([p]),"json"!==a&&"text"!==a||(o||(o=new FileReaderSync),u=o.readAsText(i),"json"!==a)))){try{l=JSON.parse(u||null)}catch(n){var w=s({},n,{url:e,requestOptions:r});throw new t("request:server",n.message,w)}if(l.error)throw w=s({},l.error,{url:e,requestOptions:r}),new t("request:server",l.error.message,w)}switch(a){case"json":c=l;break;case"text":c=u;break;case"blob":c=i;break;default:c=p}return{data:c,requestOptions:r,ssl:n.ssl,url:e}}))}}.apply(null,t))||(e.exports=n)}}]);