(this.webpackJsonpfrontend_react=this.webpackJsonpfrontend_react||[]).push([[0],{20:function(e,t,a){e.exports=a(31)},25:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(18),c=a.n(l),i=(a(25),a(6)),s=a(7),o=a(9),m=a(8),u=a(11),p=a(1),d=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("nav",{className:"nav-wrapper teal darken-4"},r.a.createElement("div",{className:"container"},r.a.createElement("a",{href:"/",className:"brand-logo"},"Music ML"),r.a.createElement("ul",{className:"right"},r.a.createElement("li",null,r.a.createElement("div",{className:"btn"},"Profile")))))}}]),a}(r.a.Component),E=Object(p.g)(d),f=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={message:"",isLogin:!0},e.login=function(e){e.preventDefault()},e.signup=function(e){e.preventDefault()},e}return Object(s.a)(a,[{key:"switchModes",value:function(e){this.setState({isLogin:e})}},{key:"render",value:function(){var e=this,t=sessionStorage.getItem("token");if(console.log(t),t)return r.a.createElement(p.a,{to:{pathname:"/"}});var a=this.state.isLogin?r.a.createElement("form",{onSubmit:function(t){return e.login(t)}},r.a.createElement("div",{className:"input-field"},r.a.createElement("i",{className:"material-icons prefix"},"person"),r.a.createElement("input",{type:"text",id:"username"}),r.a.createElement("label",null,"username")),r.a.createElement("div",{className:"input-field"},r.a.createElement("i",{className:"material-icons prefix"},"vpn_key"),r.a.createElement("input",{type:"password",id:"password"}),r.a.createElement("label",null,"password")),r.a.createElement("div",{className:"input-field center"},r.a.createElement("button",{className:"btn"},"Login"))):r.a.createElement("form",{onSubmit:function(t){return e.signup(t)}},r.a.createElement("div",{className:"input-field"},r.a.createElement("i",{className:"material-icons prefix"},"person_add"),r.a.createElement("input",{type:"text",id:"username"}),r.a.createElement("label",null,"Full Name")),r.a.createElement("div",{className:"input-field"},r.a.createElement("i",{className:"material-icons prefix"},"person"),r.a.createElement("input",{type:"text",id:"username"}),r.a.createElement("label",null,"username")),r.a.createElement("div",{className:"input-field"},r.a.createElement("i",{className:"material-icons prefix"},"vpn_key"),r.a.createElement("input",{type:"password",id:"password"}),r.a.createElement("label",null,"password")),r.a.createElement("div",{className:"input-field center"},r.a.createElement("button",{className:"btn"},"Login"))),n=this.state.isLogin?r.a.createElement("div",{className:"center"},r.a.createElement("p",null,"Don't have a account?",r.a.createElement("span",{className:"indigo-text",style:{cursor:"pointer"},onClick:function(t){return e.switchModes(!1)}},"Sign Up"))):r.a.createElement("div",{className:"center"},r.a.createElement("p",null,"Already have a account?",r.a.createElement("span",{className:"indigo-text",style:{cursor:"pointer"},onClick:function(t){return e.switchModes(!0)}},"Login")));return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 l6 offset-l3"},a)),n))}}]),a}(r.a.Component),v=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return sessionStorage.getItem("token")?r.a.createElement("div",null,r.a.createElement(E,null)):r.a.createElement(p.a,{to:{pathname:"/login"}})}}]),a}(r.a.Component),h=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement(u.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(p.d,null,r.a.createElement(p.b,{exact:!0,path:"/",component:v}),r.a.createElement(p.b,{path:"/login",component:f}))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.16eb3ba7.chunk.js.map