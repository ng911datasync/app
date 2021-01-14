var globalId=0,outgoing=new Map,configured=!1,HANDSHAKE=0,CONFIGURE=1,CONFIGURED=2,OPEN=3,OPENED=4,RESPONSE=5,INVOKE=6,ABORT=7;function createAbortError(){var e=new Error("AbortError");return e.dojoType="cancel",e}function receiveMessage(e){return e&&e.data?"string"==typeof e.data?JSON.parse(e.data):e.data:null}function invokeStaticMessage(e,r,o){var t=o&&o.signal,n=require("dojo/Deferred"),a=globalId++,i=function(){var e=outgoing.get(a);e&&(outgoing.delete(a),self.postMessage({type:ABORT,jobId:a}),e.reject(createAbortError()))},s=new n(i);if(t){if(t.aborted)return s.reject(createAbortError());t.addEventListener("abort",(function(){i(),s.reject(createAbortError())}))}return outgoing.set(a,s),self.postMessage({type:INVOKE,jobId:a,methodName:e,abortable:!0,data:r}),s.promise}function messageHandler(e){var r=receiveMessage(e);if(r){var o=r.jobId;switch(r.type){case CONFIGURE:var t=r.configure;if(configured)return;self.dojoConfig=t.loaderConfig,self.importScripts(t.loaderUrl),"function"==typeof require.config&&require.config(t.loaderConfig),require(["esri/config"],(function(e){for(var r in t.esriConfig)Object.prototype.hasOwnProperty.call(t.esriConfig,r)&&(e[r]=t.esriConfig[r]);self.postMessage({type:CONFIGURED})})),configured=!0;break;case OPEN:var n=r.modulePath;require(["esri/core/workers/RemoteClient"],(function(e){e.loadWorker(n).then((function(e){return e||new Promise((function(e){require([n],e)}))})).then((function(r){var t=e.connect(r);self.postMessage({type:OPENED,jobId:o,data:t},[t])}))}));break;case RESPONSE:if(outgoing.has(o)){var a=outgoing.get(o);outgoing.delete(o),r.error?a.reject(JSON.parse(r.error)):a.resolve(r.data)}}}}self.addEventListener("message",messageHandler),self.postMessage({type:HANDSHAKE});