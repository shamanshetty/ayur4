(()=>{var a={};a.id=801,a.ids=[801],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},6487:()=>{},8335:()=>{},9121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9582:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>H,patchFetch:()=>G,routeModule:()=>C,serverHooks:()=>F,workAsyncStorage:()=>D,workUnitAsyncStorage:()=>E});var d={};c.r(d),c.d(d,{POST:()=>B});var e=c(5736),f=c(9117),g=c(4044),h=c(9326),i=c(2324),j=c(261),k=c(4290),l=c(5328),m=c(8928),n=c(6595),o=c(3421),p=c(7679),q=c(1681),r=c(3446),s=c(6439),t=c(1356),u=c(641);let v=new(c(4364)).ij(process.env.GEMINI_API_KEY).getGenerativeModel({model:"gemini-pro"}),w={consultation:`You are an experienced Ayurvedic practitioner with deep knowledge of traditional Indian medicine, Panchakarma, and holistic wellness. Based on the patient's symptoms, health goals, and constitution, provide personalized recommendations following these guidelines:

1. Analyze the symptoms from an Ayurvedic perspective (Vata, Pitta, Kapha doshas)
2. Suggest appropriate Panchakarma treatments if applicable
3. Recommend dietary modifications based on Ayurvedic principles
4. Suggest lifestyle changes and daily routines (Dinacharya)
5. Provide herbal remedies or preparations if suitable
6. Always emphasize the importance of consulting with a qualified Ayurvedic practitioner

Please structure your response with clear sections and practical advice.`,treatmentPlan:`Create a personalized Panchakarma treatment plan based on the patient's profile. Consider their dosha constitution, health goals, activity level, and any chronic conditions. Include:

1. Preparatory phase (Purvakarma)
2. Main treatment phase (Panchakarma procedures)
3. Post-treatment care (Paschatkarma)
4. Timeline and frequency
5. Dietary guidelines throughout the treatment
6. Lifestyle modifications

Ensure all recommendations are safe and emphasize professional supervision.`,dietaryAdvice:`Provide Ayurvedic dietary recommendations based on the patient's constitution, health goals, and current conditions. Include:

1. Foods to favor and avoid
2. Eating habits and timing
3. Seasonal considerations
4. Specific recipes or preparations
5. Spices and herbs to include
6. Hydration guidelines

Focus on practical, achievable dietary changes that align with Ayurvedic principles.`};async function x(a,b){try{let c=`${w.consultation}

Patient Information:
- Age: ${A(a.dateOfBirth)}
- Gender: ${a.gender}
- Activity Level: ${a.activityLevel}
- Health Goals: ${a.healthGoals.join(", ")}
- Chronic Conditions: ${a.chronicConditions.join(", ")}
- Current Medications: ${a.currentMedications.join(", ")}
- Prior Panchakarma Experience: ${a.priorPanchakarmaExperience?"Yes":"No"}
- Dietary Habits: ${a.dietaryHabits}

Current Symptoms/Concerns:
${b}

Please provide a comprehensive Ayurvedic consultation and recommendations.`;return(await v.generateContent(c)).response.text()}catch(a){throw console.error("Error getting Ayurveda consultation:",a),Error("Failed to get AI consultation")}}async function y(a){try{let b=`${w.treatmentPlan}

Patient Profile:
- Age: ${A(a.dateOfBirth)}
- Gender: ${a.gender}
- Activity Level: ${a.activityLevel}
- Health Goals: ${a.healthGoals.join(", ")}
- Chronic Conditions: ${a.chronicConditions.join(", ")}
- Dietary Habits: ${a.dietaryHabits}
- Prior Experience: ${a.priorPanchakarmaExperience?"Yes":"No"}
- Expectations: ${a.panchkarmaExpectations.join(", ")}

Please create a personalized Panchakarma treatment plan.`;return(await v.generateContent(b)).response.text()}catch(a){throw console.error("Error getting treatment plan:",a),Error("Failed to generate treatment plan")}}async function z(a){try{let b=`${w.dietaryAdvice}

Patient Information:
- Age: ${A(a.dateOfBirth)}
- Gender: ${a.gender}
- Activity Level: ${a.activityLevel}
- Health Goals: ${a.healthGoals.join(", ")}
- Current Dietary Habits: ${a.dietaryHabits}
- Chronic Conditions: ${a.chronicConditions.join(", ")}

Please provide personalized Ayurvedic dietary recommendations.`;return(await v.generateContent(b)).response.text()}catch(a){throw console.error("Error getting dietary advice:",a),Error("Failed to get dietary advice")}}function A(a){let b=new Date,c=new Date(a),d=b.getFullYear()-c.getFullYear(),e=b.getMonth()-c.getMonth();return(e<0||0===e&&b.getDate()<c.getDate())&&d--,d}async function B(a){try{let{type:b,patientData:c,symptoms:d}=await a.json();if(!c)return u.NextResponse.json({error:"Patient data is required"},{status:400});let e="";switch(b){case"consultation":if(!d)return u.NextResponse.json({error:"Symptoms are required for consultation"},{status:400});e=await x(c,d);break;case"treatment-plan":e=await y(c);break;case"dietary-advice":e=await z(c);break;default:return u.NextResponse.json({error:"Invalid consultation type"},{status:400})}return u.NextResponse.json({result:e})}catch(a){return console.error("API Error:",a),u.NextResponse.json({error:"Failed to get AI consultation"},{status:500})}}let C=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/consultation/route",pathname:"/api/consultation",filename:"route",bundlePath:"app/api/consultation/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"C:\\Users\\Shaman Shetty\\Desktop\\G\\ayur2\\ayur2\\src\\app\\api\\consultation\\route.ts",nextConfigOutput:"standalone",userland:d}),{workAsyncStorage:D,workUnitAsyncStorage:E,serverHooks:F}=C;function G(){return(0,g.patchFetch)({workAsyncStorage:D,workUnitAsyncStorage:E})}async function H(a,b,c){var d;let e="/api/consultation/route";"/index"===e&&(e="/");let g=await C.prepare(a,b,{srcPage:e,multiZoneDraftMode:!1});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:x,prerenderManifest:y,routerServerContext:z,isOnDemandRevalidate:A,revalidateOnlyGenerated:B,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(y.dynamicRoutes[E]||y.routes[D]);if(F&&!x){let a=!!y.routes[D],b=y.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||C.isDev||x||(G="/index"===(G=D)?"/":G);let H=!0===C.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:y,renderOpts:{experimental:{cacheComponents:!!w.experimental.cacheComponents,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>C.onRequestError(a,b,d,z)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>C.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&A&&B&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await C.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:A})},z),b}},l=await C.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:B,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",A?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),x&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(b instanceof s.NoFallbackError||await C.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:A})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[586,692,364],()=>b(b.s=9582));module.exports=c})();