(this.webpackJsonppoetical=this.webpackJsonppoetical||[]).push([[0],{40:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(0),o=a.n(r),s=a(5),l=a(2),c=a.n(l);t.default=function(e){var t=e.post,a=e.setPosts,l=Object(r.useState)(t.meta.favs),i=Object(n.a)(l,2),m=i[0],u=i[1],d=Object(r.useState)(t.meta.favsUserIds),h=Object(n.a)(d,2),p=h[0],g=h[1],E=!1,b=sessionStorage.getItem("userId"),f=function(e){if(e.preventDefault(),b){var a=p,n=m,r=a.indexOf(b);if(r>=0?(a.splice(r,1),n--):(a.push(b),n++),!E){var o={meta:{favs:n,favsUserIds:a}};c.a.put("http://localhost:8000/api/home/"+t._id,o).then((function(e){u(n),g(a),E=!1})).catch((function(e){console.error("Error updating post: "+e),E=!1}))}E=!0}else console.error("You must be logged in to favoutie posts")},v=function(e,t,n){var r;switch(e.preventDefault(),n){case"tag":r={params:{tag:t}};break;case"username":r={params:{username:t}}}c.a.get("http://localhost:8000/api/home/",r).then((function(e){s.a.push("/?"+n+"="+t);var r=e.data.reverse();a(r)})).catch((function(e){console.error("Error getting posts by tag: "+e)}))};return o.a.createElement("article",{className:"post"},o.a.createElement("h3",null,t.title),o.a.createElement("p",null,t.body),o.a.createElement("hr",{className:"divider"}),t.tags.length>0&&o.a.createElement("div",{className:"tags"},t.tags.map((function(e,t){return o.a.createElement("button",{key:t,onClick:function(t){return v(t,e,"tag")}},"# "+e)}))),o.a.createElement("div",{className:"post__details"},o.a.createElement("div",{className:"post__details-row"},o.a.createElement("label",null,t.collaborators.length>0?"Authors:":"Author:"),o.a.createElement("p",{className:"authors"},o.a.createElement("button",{onClick:function(e){return v(e,t.username,"username")}},t.username),t.collaborators.map((function(e,t){return o.a.createElement("button",{key:t,onClick:function(t){return v(t,e.username,"username")}},", "+e.username)})))),o.a.createElement("div",{className:"post__details-row"},o.a.createElement("label",null,"Posted:"),o.a.createElement("p",null,new Date(t.date).toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"})))),o.a.createElement("div",{className:"post__stats"},p.includes(b)?o.a.createElement("button",{onClick:f,"aria-label":"Unfavourite Post"},o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"black",width:"18px",height:"18px"},o.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),o.a.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}))):o.a.createElement("button",{onClick:f,"aria-label":"Favourite Post"},o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"black",width:"18px",height:"18px"},o.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),o.a.createElement("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}))),o.a.createElement("p",null,m),t.isPrivate&&o.a.createElement("p",null,"Private")))}},41:function(e,t,a){e.exports=a(69)},47:function(e,t,a){},5:function(e,t,a){"use strict";var n=a(7);t.a=Object(n.a)()},69:function(e,t,a){"use strict";a.r(t);a(42);var n=a(0),r=a.n(n),o=a(35),s=a.n(o),l=a(3),c=(a(47),a(5)),i=a(13),m=a(14),u=a(16),d=a(15),h=a(6),p=a(1),g=a(36),E=a(17),b=a(11),f=a.n(b),v=f()("mode",{light:"#ffffff",dark:"#2c3e50"}),w=f()("mode",{light:"#e6eaf2",dark:"#282c34"}),N=f()("mode",{light:"#e6eaf2",dark:"#3c5168"}),k=f()("mode",{light:"#222222",dark:"#ffffff"}),C=f()("mode",{light:"rgb(153, 153, 153)",dark:"rgba(255, 255, 255, 0.589)"}),y=f()("mode",{light:"rgba(0, 0, 0, 0.8)",dark:"rgba(255, 255, 255, 0.8)"}),_=f()("mode",{light:"#222222",dark:"#ffffff"}),O=f()("mode",{light:"#007bff",dark:"#007bff"}),S=f()("mode",{light:"0 4px 4px 0 #c8ccd4, 0 6px 10px 0 #c8ccd4f6",dark:"0 4px 4px 0 #282c34, 0 6px 10px 0 #282c34f6"}),j=f()("mode",{light:"none",dark:"inset 0px 0px 3px #2c3e50"});function I(){var e=Object(g.a)(["\n  background-color: ",";\n  color: ",";\n  border-color: ",";\n  header,\n  footer {\n    background-color: ",";\n  }\n  button {\n    color: ",";\n    border-color: ",";\n    background: ",";\n    &:hover {\n      color: ",";\n      border-color: ",";\n    }\n  }\n  a {\n    color: ",";\n    &:hover {\n      color: ",";\n      border-color: ",";\n    }\n  }\n  textarea,\n  input {\n    color: ",";\n    background-color: ",";\n    ::placeholder {\n      color: ",";\n    }\n  }\n  svg {\n    fill: ",";\n  }\n  .btn--minimal {\n    &:hover {\n      background: ",";\n    }\n  }\n  .post--summary {\n    &:hover {\n      border-color: ",";\n      background-color: ",";\n    }\n  }\n  .card {\n    background: ",";\n    box-shadow: ",";\n  }\n  .tags,\n  .post__details,\n  .post__stats {\n    color: ",";\n    p {\n      color: ",";\n    }\n    button {\n      color: ",";\n      border-color: ",";\n      &:hover {\n        color: ",";\n        border-color: ",";\n      }\n      &:focus {\n        color: ",";\n      }\n    }\n  }\n  .btn--red {\n    &:hover {\n      border-color: ",";\n    }\n  }\n  .line1,\n  .line2,\n  .line3 {\n    background: ",";\n  }\n  .user-options {\n    background-color: ",";\n  }\n  .font--secondary-color {\n    color: ",";\n  }\n  #privacy-checkbox {\n    box-shadow: ",";\n  }\n"]);return I=function(){return e},e}var P=r.a.createContext({toggle:function(){}}),x=E.b.div(I(),v,k,_,w,k,_,"transparent",k,O,k,k,O,k,N,y,k,v,"transparent",w,"transparent",S,C,C,C,C,k,_,k,"red",k,w,C,j),M=function(e){var t=e.children,a=localStorage.getItem("mode"),o=Object(n.useState)({mode:a||"dark"}),s=Object(p.a)(o,2),l=s[0],c=s[1];return r.a.createElement(P.Provider,{value:{toggle:function(){var e="dark"===l.mode?"light":"dark";localStorage.setItem("mode",e),c({mode:e})}}},r.a.createElement(E.a,{theme:{mode:l.mode}},r.a.createElement(x,null,t)))},L=(E.a,Object(E.c)((function(e){var t=Object(n.useState)(!1),a=Object(p.a)(t,2),o=a[0],s=a[1],l=r.a.useContext(P);return r.a.createElement("header",null,r.a.createElement("div",{id:"top"},r.a.createElement(h.a,{to:"/",onClick:function(e){return function(e){"/"===c.a.location.pathname&&(e.preventDefault(),window.location.reload())}(e)}},r.a.createElement("h1",null,"Poetical")),r.a.createElement("div",{className:"visible-top-options"},e.isLoggedIn?r.a.createElement("button",{className:"menu "+(o&&"menu--active"),onClick:function(){s(!o)},"aria-label":"Main menu"},r.a.createElement("div",{className:"line1"}),r.a.createElement("div",{className:"line2"}),r.a.createElement("div",{className:"line3"})):r.a.createElement(h.a,{to:"/login",className:"btn"},"Login"),r.a.createElement("button",{"aria-label":"Change Theme",className:"btn btn--minimal",onClick:function(){return l.toggle()}},"dark"===e.theme.mode?r.a.createElement("svg",{className:"toggle-night",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",width:"30px",height:"30px"},r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),r.a.createElement("path",{d:"M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"})):r.a.createElement("svg",{className:"toggle-day",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",width:"30px",height:"30px"},r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),r.a.createElement("path",{d:"M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"}))))),r.a.createElement("div",{className:"top-options-wrapper"},r.a.createElement("nav",{className:"user-options "+(o&&"user-options--active")},r.a.createElement("button",{className:"btn",onClick:function(){sessionStorage.removeItem("username"),sessionStorage.removeItem("userId"),"/"===c.a.location.pathname?window.location.reload():c.a.push("/")}},"Logout"),r.a.createElement(h.a,{to:"/user/"+sessionStorage.getItem("userId"),className:"btn"},"Settings"))))}))),U=function(e){var t=e.children;return r.a.createElement("footer",null,t)},F=function(e){var t=e.children;return r.a.createElement("div",{className:"options"},t)},T=function(e){var t=e.name,a=e.checked,n=e.handleOnChange;return r.a.createElement("div",{className:"privacy"},r.a.createElement("label",{htmlFor:"privacy-checkbox"}," Private: "),r.a.createElement("input",{id:"privacy-checkbox",type:"checkbox",name:t,checked:a,onChange:n}))},z=a(2),D=a.n(z),H=function(e){var t=e.getPosts,a=Object(n.useState)(""),o=Object(p.a)(a,2),s=o[0],l=o[1],c=Object(n.useState)(""),i=Object(p.a)(c,2),m=i[0],u=i[1],d=Object(n.useState)(""),h=Object(p.a)(d,2),g=h[0],E=h[1],b=Object(n.useState)(!1),f=Object(p.a)(b,2),v=f[0],w=f[1],N=function(e){var t=e.target.name,a=e.target.value;switch(t){case"title":l(a);break;case"body":u(a);break;case"tags":E(a);break;case"isPrivate":w(e.target.checked);break;default:return}};return r.a.createElement("div",{className:"card"},r.a.createElement("p",null,"Hi ",r.a.createElement("i",null,sessionStorage.getItem("username")),", add your new post here:"),r.a.createElement("hr",{className:"divider"}),r.a.createElement("label",{htmlFor:"title"},"Title:"),r.a.createElement("input",{type:"text",name:"title",id:"title",cols:"50",rows:"1",placeholder:"Title...",value:s,onChange:N}),r.a.createElement("label",{htmlFor:"content"},"Content:"),r.a.createElement("textarea",{name:"body",id:"content",cols:"50",rows:"3",placeholder:"Content...",value:m,onChange:N}),r.a.createElement("hr",{className:"divider"}),r.a.createElement("label",{htmlFor:"tags"},"Tags:"),r.a.createElement("input",{type:"text",name:"tags",id:"tags",cols:"50",rows:"1",placeholder:"Song, Rap, Poem, Haiku...",value:g,onChange:N}),r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){return function(){var e=[];""!==g&&(e=g.split(","));var a={title:s,body:m,username:sessionStorage.getItem("username"),userId:sessionStorage.getItem("userId"),tags:e,isPrivate:v};D.a.post("http://localhost:8000/api/home",a).then((function(e){l(""),u(""),E(""),w(!1),t()})).catch((function(e){console.error("Error saving new post: "+e)}))}()}},"Save")),r.a.createElement(T,{className:"options__right",name:"isPrivate",checked:v,handleOnChange:N})))},R=function(e){var t=e.message,a=e.animation;return r.a.createElement("section",{className:"status-message "+a},r.a.createElement("h2",null,t))},B=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={error:!1},n}return Object(m.a)(a,[{key:"componentDidCatch",value:function(e,t){console.error(e,t)}},{key:"render",value:function(){return this.state.error?this.props.fallback:this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{error:e}}}]),a}(r.a.Component),A=Object(n.lazy)((function(){return Promise.resolve().then(a.bind(null,40))})),V=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e))._isMounted=!1,n._isLoggedIn=sessionStorage.getItem("username"),n.userId=sessionStorage.getItem("userId"),n.setPosts=function(e){n.setState({posts:e})},n.state={posts:null},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.getPosts()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"getPosts",value:function(){var e,t=this;window.location.search&&(window.location.search.includes("tag")?e={params:{tag:new URL(window.location.href).searchParams.get("tag")}}:window.location.search.includes("username")&&(e={params:{username:new URL(window.location.href).searchParams.get("username")}})),D.a.get("http://localhost:8000/api/home",e).then((function(e){if(t._isMounted){var a=e.data.reverse();Object.keys(a).length>0?t.setState({posts:a}):t.setState({posts:"Empty"})}})).catch((function(e){console.error("Error from posts: "+e)}))}},{key:"clearFilter",value:function(){c.a.push("/"),this.getPosts()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"wrapper"},r.a.createElement(L,{isLoggedIn:this._isLoggedIn}),r.a.createElement("main",null,r.a.createElement("section",{className:"cards"},this._isLoggedIn?r.a.createElement(H,{getPosts:function(){return e.getPosts()}}):r.a.createElement("div",{className:"card card--intro"},r.a.createElement("h1",null,"P"),r.a.createElement("h2",null,"Poetical is a platform for collaborating on creative prose"),r.a.createElement("p",null,"Register to start posting or browse others creations below."),r.a.createElement(h.a,{to:"/register",className:"btn"},"Register"))),null===this.state.posts?r.a.createElement(R,{message:"Loading Posts . . .",animation:"animate-flicker"}):"Empty"===this.state.posts?r.a.createElement(R,{message:"There are no posts"}):r.a.createElement(n.Suspense,{fallback:r.a.createElement(R,{message:"Loading Posts . . .",animation:"animate-flicker"})},r.a.createElement(B,{fallback:r.a.createElement(R,{message:"Something went wrong"})},r.a.createElement("section",{className:"cards"},window.location.search&&r.a.createElement("div",{className:"card-width-wrapper"},r.a.createElement("hr",{className:"divider"}),r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("h5",null,window.location.search.includes("tag")?"Showing posts tagged as: "+new URL(window.location.href).searchParams.get("tag"):"Showing posts by: "+new URL(window.location.href).searchParams.get("username"))),r.a.createElement("div",{className:"options__right"},r.a.createElement("button",{className:"btn btn--red",onClick:function(){return e.clearFilter()}},"Clear")))),this.state.posts.map((function(t){return(!t.isPrivate||t.userId===e.userId||t.collaborators.filter((function(t){return t.id===e.userId})).length>0)&&r.a.createElement(h.a,{to:{pathname:"/post/".concat(t._id),state:{postId:t._id}},className:"card post--summary",key:t._id,"aria-label":t.title},r.a.createElement(A,{post:t,setPosts:e.setPosts}))})),r.a.createElement("a",{href:"#top","aria-label":"Go to top of page"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",width:"36px",height:"36px"},r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),r.a.createElement("path",{d:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"}))))))),this.state.posts&&r.a.createElement(U,null,r.a.createElement("a",{href:"https://github.com/ianbaxter/chat-wall"},"View on GitHub")))}}]),a}(n.Component),J=a(40),G=function(e){var t=e.post,a=e.updatePost,o=Object(n.useState)(t.title),s=Object(p.a)(o,2),l=s[0],i=s[1],m=Object(n.useState)(t.body),u=Object(p.a)(m,2),d=u[0],h=u[1],g=Object(n.useState)(t.tags.toString()),E=Object(p.a)(g,2),b=E[0],f=E[1],v=Object(n.useState)(t.isPrivate),w=Object(p.a)(v,2),N=w[0],k=w[1],C=function(e){var t=e.target.name,a=e.target.value;switch(t){case"title":i(a);break;case"body":h(a);break;case"tags":f(a);break;case"isPrivate":k(e.target.checked);break;default:return}};return r.a.createElement("div",{className:"card"},r.a.createElement("label",{htmlFor:"title"},"Title:"),r.a.createElement("input",{type:"text",name:"title",id:"title",cols:"50",rows:"1",value:l,onChange:C}),r.a.createElement("label",{htmlFor:"body"},"Content:"),r.a.createElement("textarea",{name:"body",id:"body",cols:"50",rows:"3",value:d,onChange:C}),r.a.createElement("hr",{className:"divider"}),r.a.createElement("label",{htmlFor:"tags"},"Tags:"),r.a.createElement("input",{type:"text",name:"tags",id:"tags",cols:"50",rows:"1",placeholder:"Enter Tags",value:b,onChange:C}),r.a.createElement("div",{className:"margin-bottom"},r.a.createElement(T,{name:"newIsPrivate",checked:N,handleOnChange:C})),r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){return function(e){var n=""===b?[]:b.split(","),r={title:l,body:d,tags:n,dateEdited:new Date,isPrivate:N,currentUser:""};D.a.put("http://localhost:8000/api/home/"+t._id,r).then((function(e){var r=t;r.title=l,r.body=d,r.tags=n,r.isPrivate=N,r.currentUser="",a(r)})).catch((function(e){console.error("Error updating post: "+e)}))}(t.date)}},"Save")),r.a.createElement("div",{className:"options__right"},r.a.createElement("button",{className:"btn btn--red",onClick:function(){D.a.delete("http://localhost:8000/api/home/"+t._id).then((function(e){c.a.push("/")})).catch((function(e){console.error("Error deleting post: "+e)}))}},"Delete"))))},W=function(e){var t=e.post,a=Object(n.useState)(""),o=Object(p.a)(a,2),s=o[0],l=o[1];return r.a.createElement("div",{className:"card"},r.a.createElement("div",null,r.a.createElement("h2",null,"Collaborators:"),r.a.createElement("div",null,t.collaborators.length>0?t.collaborators.map((function(e){return r.a.createElement("li",{key:e.id},e.username)})):r.a.createElement("p",{className:"font--secondary-color"},"No Collaborators"))),r.a.createElement("hr",{className:"divider"}),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"collaborator"},"Collaborator Username:"),r.a.createElement("input",{type:"text",name:"collaborator",id:"collaborator",cols:"50",rows:"1",placeholder:"Username (case sensitive)",value:s,onChange:function(e){l(e.target.value)}}),r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){if(""!==s){if(s===sessionStorage.getItem("username"))return console.error("Cannot add yourself as a collaborator");var e=t.collaborators;if(e.length>0&&e.filter((function(e){return e.username===s})).length>0)console.error("User is already a collaborator");else{var a={username:s};D.a.get("http://localhost:8000/api/users",{params:a}).then((function(a){var n={id:a.data,username:s};e.push(n);var r={collaborators:e};D.a.put("http://localhost:8000/api/home/"+t._id,r).then((function(e){l("")})).catch((function(e){console.error("Error updating post: "+e)}))})).catch((function(e){return console.error("This user does not exist: "+e)}))}}}},"Add")),r.a.createElement("div",{className:"options__right"},r.a.createElement("button",{className:"btn btn--red",onClick:function(){if(""!==s){var e=t.collaborators,a=-1;if(e.forEach((function(e,t){e.username===s&&(a=t)})),a>=0){e.splice(a,1);var n={collaborators:e};D.a.put("http://localhost:8000/api/home/"+t._id,n).then((function(e){l("")})).catch((function(e){console.error("Error updating post: "+e)}))}}}},"Remove")))))},Y=function(e){var t=Math.floor((new Date-e)/1e3),a=Math.floor(t/31536e3);return a>1?a+" years":(a=Math.floor(t/2592e3))>1?a+" months":(a=Math.floor(t/86400))>1?a+" days":(a=Math.floor(t/3600))>1?a+" hours":(a=Math.floor(t/60))>1?a+" minutes":Math.floor(t)+" seconds"},Z=function(e){var t=e.post,a=e.isLoggedIn,o=e.getPost,s=Object(n.useState)(""),l=Object(p.a)(s,2),c=l[0],i=l[1];return r.a.createElement("section",{className:"card"},r.a.createElement("h5",null,"Comments:"),0===t.comments.length?r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("p",{className:"font--secondary-color"},"No comments")):t.comments.reverse().map((function(e){return r.a.createElement("div",{key:e._id},r.a.createElement("hr",null),r.a.createElement("p",null,e.body),r.a.createElement("div",{className:"post__details"},r.a.createElement("div",{className:"post__details-row"},r.a.createElement("label",null,"Author:"),r.a.createElement("p",null,e.username)),r.a.createElement("div",{className:"post__details-row"},r.a.createElement("label",null,"Posted:"),r.a.createElement("p",null,Y(new Date(e.date))+" ago"))))})),a?r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("label",{htmlFor:"comment"},"New comment:"),r.a.createElement("textarea",{name:"comment",id:"comment",cols:"50",rows:"2",value:c,onChange:function(e){var t=e.target.value;i(t)}}),r.a.createElement("button",{className:"btn",onClick:function(){if(""!==c){var e={body:c,username:sessionStorage.getItem("username"),parentId:t._id};D.a.post("http://localhost:8000/api/home/"+t._id,e).then((function(e){i(""),o()})).catch((function(e){return console.error("Eror saving comment: "+e)}))}}},"Save")):r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement(h.a,{to:"/login",className:"btn btn--wide"},"Login to comment")))},q=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e))._isMounted=!1,n._isLoggedIn=sessionStorage.getItem("username"),n.updatePost=function(e){n.setState({post:e,editMode:!1})},n.state={post:null,title:"",body:"",tags:[],isPrivate:!1,editMode:!1,collabMode:!1,userCanEdit:!1},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("beforeunload",(function(t){e.updateCurrentUserOnExit()})),this._isMounted=!0,this.getPost()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.updateCurrentUserOnExit()}},{key:"updateCurrentUserOnExit",value:function(){if(this.state.post&&this._isLoggedIn===this.state.post.currentUser){D.a.put("http://localhost:8000/api/home/"+this.state.post._id,{currentUser:""}).catch((function(e){console.error("Error updating post: "+e)}))}}},{key:"getPost",value:function(){var e=this;D.a.get("http://localhost:8000/api/home/"+this.props.location.state.postId).then((function(t){if(e._isMounted){var a=!1;t.data.userId===sessionStorage.getItem("userId")&&(a=!0),t.data.collaborators.forEach((function(e){e.id===sessionStorage.getItem("userId")&&(a=!0)})),e.setState({post:t.data,title:t.data.title,body:t.data.body,tags:t.data.tags,isPrivate:t.data.isPrivate,userCanEdit:a})}})).catch((function(e){return console.error("Error getting post: "+e)}))}},{key:"toggleEditMode",value:function(){this.state.post.currentUser||this.updateCurrentUser(this._isLoggedIn,!0)}},{key:"updateCurrentUser",value:function(e,t){var a=this,n={currentUser:e};D.a.put("http://localhost:8000/api/home/"+this.state.post._id,n).then((function(n){var r=a.state.post;r.currentUser=e,a.setState({post:r,editMode:t})})).catch((function(e){console.error("Error accessing editmode: "+e)}))}},{key:"toggleColabMode",value:function(){this.setState({collabMode:!0})}},{key:"cancel",value:function(e){switch(e){case"edit":this.updateCurrentUser("",!1);break;case"collab":this.setState({collabMode:!1});break;default:return}}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"wrapper"},r.a.createElement(L,{isLoggedIn:this._isLoggedIn}),!this.state.editMode&&!this.state.collabMode&&(null===this.state.post?r.a.createElement(R,{message:"Loading Post . . .",animation:"animate-flicker"}):r.a.createElement("main",{className:"cards"},r.a.createElement("div",{className:"card"},r.a.createElement(J.default,{post:this.state.post})),this.state.userCanEdit&&r.a.createElement("div",{className:"card-width-wrapper margin-bottom"},this.state.post.currentUser?r.a.createElement("p",{className:"font--secondary-color"},"Currently being edited by: "+this.state.post.currentUser):r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn small-screen-margin-bottom",onClick:function(){return e.toggleEditMode()}},"Edit")),r.a.createElement("div",{className:"options__right"},r.a.createElement("button",{className:"btn btn--wide",onClick:function(){return e.toggleColabMode()}},"Manage Collaborators")))),r.a.createElement(Z,{post:this.state.post,isLoggedIn:this._isLoggedIn,getPost:function(){return e.getPost()}}))),this.state.editMode&&r.a.createElement("main",{className:"cards"},r.a.createElement(G,{post:this.state.post,updatePost:this.updatePost}),r.a.createElement("div",{className:"card-width-wrapper"},r.a.createElement(F,null,r.a.createElement("button",{className:"btn",onClick:function(){return e.cancel("edit")}},"Cancel")))),this.state.collabMode&&r.a.createElement("main",{className:"cards"},r.a.createElement(W,{post:this.state.post}),r.a.createElement("div",{className:"card-width-wrapper"},r.a.createElement(F,null,r.a.createElement("button",{className:"btn ",onClick:function(){return e.cancel("collab")}},"Back")))),this.state.post&&r.a.createElement(U,null))}}]),a}(n.Component),K=function(){var e=Object(n.useState)(""),t=Object(p.a)(e,2),a=t[0],o=t[1],s=Object(n.useState)(""),l=Object(p.a)(s,2),i=l[0],m=l[1],u=Object(n.useState)(""),d=Object(p.a)(u,2),g=d[0],E=d[1],b=function(e){var t=e.target,a=t.value;switch(t.name){case"email":o(a);break;case"password":m(a)}};return r.a.createElement("div",{className:"wrapper"},r.a.createElement(L,null),r.a.createElement("main",null,r.a.createElement("section",{className:"cards entry"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),""!==a&&""!==i&&fetch("http://localhost:8000/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:a,password:i})}).then((function(e){if(200===e.status)return e.json();throw new Error(e.error)})).then((function(e){sessionStorage.setItem("username",e.username),sessionStorage.setItem("userId",e.userId),c.a.push("/")})).catch((function(e){console.error(e),E("The user name or password provided is incorrect.")}))},className:"card"},r.a.createElement("label",{htmlFor:"email"},"Email:"),r.a.createElement("input",{type:"email",name:"email",id:"email",placeholder:"Email",value:a,onChange:b,autoComplete:"email"}),r.a.createElement("label",{htmlFor:"password"},"Password:"),r.a.createElement("input",{type:"password",name:"password",id:"password",placeholder:"Password",value:i,onChange:b,autoComplete:"current-password"}),r.a.createElement("button",{className:"btn btn--full-width",type:"submit"},"Login")),r.a.createElement("div",{className:"entry__nav card-width-wrapper"},r.a.createElement("p",{className:"font--secondary-color"},"Not yet registered? ",r.a.createElement(h.a,{to:"/register"},"Sign up")),r.a.createElement("p",{className:"font--secondary-color"},g)))),r.a.createElement(U,null))},Q=function(){var e=Object(n.useState)(""),t=Object(p.a)(e,2),a=t[0],o=t[1],s=Object(n.useState)(""),l=Object(p.a)(s,2),i=l[0],m=l[1],u=Object(n.useState)(""),d=Object(p.a)(u,2),g=d[0],E=d[1],b=Object(n.useState)(""),f=Object(p.a)(b,2),v=f[0],w=f[1],N=function(e){var t=e.target,a=t.value;switch(t.name){case"username":o(a);break;case"email":m(a);break;case"password":E(a)}};return r.a.createElement("div",{className:"wrapper"},r.a.createElement(L,null),r.a.createElement("main",null,r.a.createElement("section",{className:"cards entry"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),""!==a&&""!==i&&""!==g&&fetch("http://localhost:8000/api/auth/register",{method:"POST",body:JSON.stringify({username:a,email:i,password:g}),headers:{"Content-Type":"application/json"}}).then((function(e){if(200===e.status)return e.json();throw new Error(e.error)})).then((function(e){sessionStorage.setItem("username",e.username),sessionStorage.setItem("userId",e.userId),c.a.push("/")})).catch((function(e){console.error(e),w("Please check the username is at least 3 characters and the password is at least 6 characters.")}))},className:"card"},r.a.createElement("label",{htmlFor:"username"},"Username:"),r.a.createElement("input",{type:"text",name:"username",id:"username",placeholder:"Username",value:a,onChange:N,autoComplete:"username"}),r.a.createElement("label",{htmlFor:"email"},"Email:"),r.a.createElement("input",{type:"email",name:"email",id:"email",placeholder:"Email",value:i,onChange:N,autoComplete:"email"}),r.a.createElement("label",{htmlFor:"password"},"Password:"),r.a.createElement("input",{type:"password",name:"password",id:"password",placeholder:"Password",value:g,onChange:N,autoComplete:"new-password"}),r.a.createElement("button",{className:"btn btn--full-width",type:"submit"},"Register")),r.a.createElement("div",{className:"entry__nav card-width-wrapper"},r.a.createElement("p",{className:"font--secondary-color"},"Already registered? ",r.a.createElement(h.a,{to:"/login"},"Login")),r.a.createElement("p",{className:"font--secondary-color"},v)))),r.a.createElement(U,null))},X=function(){var e=Object(n.useState)(),t=Object(p.a)(e,2),a=t[0],o=t[1],s=Object(n.useState)(""),l=Object(p.a)(s,2),c=l[0],i=l[1],m=Object(n.useState)(""),u=Object(p.a)(m,2),d=u[0],h=u[1],g=Object(n.useState)(""),E=Object(p.a)(g,2),b=E[0],f=E[1],v=Object(n.useState)(!1),w=Object(p.a)(v,2),N=w[0],k=w[1],C=Object(n.useState)(!1),y=Object(p.a)(C,2),_=y[0],O=y[1],S=Object(n.useState)(!1),j=Object(p.a)(S,2),I=j[0],P=j[1];Object(n.useEffect)((function(){x()}),[]);var x=function(){D.a.get("http://localhost:8000/api/account/"+sessionStorage.getItem("userId"),{withCredentials:!0}).then((function(e){o(e.data),i(e.data.email),h(e.data.username)})).catch((function(e){return console.error("Error getting user: "+e)}))},M=function(e){var t={};switch(e){case"email":t={email:c},D.a.put("http://localhost:8000/api/account/"+sessionStorage.getItem("userId"),t,{withCredentials:!0}).then((function(e){o(e.data),k(!1)})).catch((function(e){console.error("Error updating user: "+e)}));break;case"username":t={username:d},D.a.put("http://localhost:8000/api/account/"+sessionStorage.getItem("userId"),t,{withCredentials:!0}).then((function(e){!function(e,t){var a={username:e.username,newUsername:t};D.a.put("http://localhost:8000/api/account/",a,{withCredentials:!0}).catch((function(e){console.error("Error updating user: "+e)}))}(a,d),sessionStorage.setItem("username",d),o(e.data),O(!1)})).catch((function(e){console.error("Error updating user: "+e)}));break;case"password":t={password:b},D.a.put("http://localhost:8000/api/account/"+sessionStorage.getItem("userId"),t,{withCredentials:!0}).then((function(e){o(e.data),P(!1)})).catch((function(e){console.error("Error updating user: "+e)}));break;default:return}},T=function(e){switch(e){case"email":k(!0);break;case"username":O(!0);break;case"password":P(!0);break;default:return}},z=function(e){switch(e){case"email":i(a.email),k(!1);break;case"username":h(a.username),O(!1);break;case"password":f(""),P(!1);break;default:return}},H=function(e){var t=e.target.name,a=e.target.value;switch(t){case"email":i(a);break;case"username":h(a);break;case"password":f(a);break;default:return}};return r.a.createElement("div",{className:"wrapper"},r.a.createElement(L,{isLoggedIn:sessionStorage.getItem("username")}),r.a.createElement("main",{className:"cards"},r.a.createElement("div",{className:"card"},r.a.createElement("label",{htmlFor:"email"},"Email:"),N?r.a.createElement("div",null,r.a.createElement("input",{type:"email",name:"email",id:"email",placeholder:"New Email",value:c,onChange:H}),r.a.createElement("div",{className:"margin-bottom"},r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){return M("email")}},"Save")),r.a.createElement("div",{className:"options__right"},r.a.createElement("button",{className:"btn btn--red",onClick:function(){return z("email")}},"Cancel"))))):r.a.createElement("div",null,r.a.createElement("p",null,c),r.a.createElement("div",{className:"margin-bottom"},r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){return T("email")}},"Edit"))))),r.a.createElement("hr",{className:"divider"}),r.a.createElement("label",{htmlFor:"username"},"Username:"),_?r.a.createElement("div",null,r.a.createElement("input",{type:"text",name:"username",id:"username",placeholder:"New Username",cols:"50",rows:"1",value:d,onChange:H}),r.a.createElement("div",{className:"margin-bottom"},r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){return M("username")}},"Save")),r.a.createElement("div",{className:"options__right"},r.a.createElement("button",{className:"btn btn--red",onClick:function(){return z("username")}},"Cancel"))))):r.a.createElement("div",null,r.a.createElement("p",null,d),r.a.createElement("div",{className:"margin-bottom"},r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){return T("username")}},"Edit"))))),r.a.createElement("hr",{className:"divider"}),I?r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"password"},"New Password:"),r.a.createElement("input",{type:"password",name:"password",id:"password",placeholder:"New Password",value:b,onChange:H}),r.a.createElement(F,null,r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn",onClick:function(){return M("password")}},"Save")),r.a.createElement("div",{className:"options__right"},r.a.createElement("button",{className:"btn btn--red",onClick:function(){return z("password")}},"Cancel")))):r.a.createElement("div",null,r.a.createElement(F,{name:"password"},r.a.createElement("div",{className:"options__left"},r.a.createElement("button",{className:"btn btn--wide",onClick:function(){return T("password")}},"Change Password")))))),r.a.createElement(U,null))};var $=function(){return r.a.createElement(l.b,{history:c.a},r.a.createElement("div",{className:"app"},r.a.createElement(l.a,{exact:!0,path:"/",component:V}),r.a.createElement(l.a,{path:"/post/:id",component:q}),r.a.createElement(l.a,{exact:!0,path:"/login",component:K}),r.a.createElement(l.a,{exact:!0,path:"/register",component:Q}),r.a.createElement(l.a,{path:"/user/:id",component:X})))};s.a.render(r.a.createElement(M,null,r.a.createElement($,null)),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.c7c513d9.chunk.js.map