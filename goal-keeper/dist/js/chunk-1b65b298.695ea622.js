(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b65b298"],{"26f8":function(t,e,i){},"3cae":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"field has-text-left"},[t.label?i("label",{staticClass:"has-text-weight-bold"},[t._v(t._s(this.label))]):t._e(),i("div",{staticClass:"control",class:t.iconPosition},["checkbox"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],class:t.className,attrs:{placeholder:t.placeHolder,autocomplete:t.autoCompleteSetting,type:"checkbox"},domProps:{checked:Array.isArray(t.input)?t._i(t.input,null)>-1:t.input},on:{change:function(e){var i=t.input,a=e.target,n=!!a.checked;if(Array.isArray(i)){var s=null,c=t._i(i,s);a.checked?c<0&&(t.input=i.concat([s])):c>-1&&(t.input=i.slice(0,c).concat(i.slice(c+1)))}else t.input=n}}}):"radio"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],class:t.className,attrs:{placeholder:t.placeHolder,autocomplete:t.autoCompleteSetting,type:"radio"},domProps:{checked:t._q(t.input,null)},on:{change:function(e){t.input=null}}}):i("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],class:t.className,attrs:{placeholder:t.placeHolder,autocomplete:t.autoCompleteSetting,type:t.type},domProps:{value:t.input},on:{input:function(e){e.target.composing||(t.input=e.target.value)}}}),t.iconData?i("span",{staticClass:"icon is-small",class:t.alignIcon},[i("i",{class:t.icon})]):t._e()])])},n=[],s=i("d4ec"),c=i("bee2"),o=i("262e"),l=i("2caf"),u=i("9ab4"),r=i("1b40"),d=function(t){Object(o["a"])(i,t);var e=Object(l["a"])(i);function i(){var t;return Object(s["a"])(this,i),t=e.apply(this,arguments),t.inputStringValue="",t}return Object(c["a"])(i,[{key:"returnValue",value:function(){this.$emit("inputChanged",this.inputStringValue)}},{key:"iconPosition",get:function(){var t;return null!==(t=this.iconData)&&void 0!==t&&t.position?"left"===this.iconData.position?"has-icons-left":"right"===this.iconData.position?"has-icons-right":void console.error("Position of icon is not valid"):""}},{key:"alignIcon",get:function(){var t;return null!==(t=this.iconData)&&void 0!==t&&t.position?"left"===this.iconData.position?"is-left":"right"===this.iconData.position?"is-right":void 0:""}},{key:"icon",get:function(){return this.iconData.icon}},{key:"input",get:function(){return this.inputValue?this.inputValue:""},set:function(t){this.inputStringValue=t}}]),i}(r["d"]);Object(u["a"])([Object(r["c"])({default:""}),Object(u["c"])("design:type",String)],d.prototype,"type",void 0),Object(u["a"])([Object(r["c"])({default:""}),Object(u["c"])("design:type",String)],d.prototype,"placeHolder",void 0),Object(u["a"])([Object(r["c"])({default:""}),Object(u["c"])("design:type",String)],d.prototype,"className",void 0),Object(u["a"])([Object(r["c"])({default:void 0}),Object(u["c"])("design:type",Object)],d.prototype,"iconData",void 0),Object(u["a"])([Object(r["c"])({default:void 0}),Object(u["c"])("design:type",Object)],d.prototype,"label",void 0),Object(u["a"])([Object(r["c"])({default:void 0}),Object(u["c"])("design:type",Object)],d.prototype,"inputValue",void 0),Object(u["a"])([Object(r["c"])({default:"off"}),Object(u["c"])("design:type",String)],d.prototype,"autoCompleteSetting",void 0),Object(u["a"])([Object(r["e"])("inputStringValue"),Object(u["c"])("design:type",Function),Object(u["c"])("design:paramtypes",[]),Object(u["c"])("design:returntype",void 0)],d.prototype,"returnValue",null),d=Object(u["a"])([r["a"]],d);var p=d,b=p,v=(i("abde"),i("2877")),h=Object(v["a"])(b,a,n,!1,null,"0d5e4ade",null);e["a"]=h.exports},"66cb":function(t,e,i){},abde:function(t,e,i){"use strict";i("66cb")},e845:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"columns is-vcentered"},[i("div",{staticClass:"login column is-4 "},[i("section",{staticClass:"section"},[t._m(0),t.tokenIsSent?t._e():i("div",{staticClass:"input-field"},[t.emailValid?t._e():i("p",{staticClass:"help is-danger"},[t._v("Please enter your email")]),t.userNotFound?i("p",{staticClass:"help is-danger"},[t._v("We haven't found a user with the given email")]):t._e(),i("InputField",{attrs:{id:"email-input","class-name":"input is-primary",type:"text","place-holder":"Please enter your email","input-value":t.email},on:{inputChanged:t.setEmail}}),i("div",{staticClass:"field is-grouped"},[i("Button",{attrs:{"icon-data":{icon:"fas fa-angle-double-left",position:"left"},"class-name":"button is-centered is-warning is-outlined"},on:{clicked:t.navigateToLogin}}),i("Button",{attrs:{"class-name":"button is-centered is-primary is-outlined",text:"Reset password"},on:{clicked:t.handlePasswordReset}})],1)],1),t.tokenIsSent?i("div",[i("h2",{staticClass:"subtitle"},[t._v("We've successfully sent a reset link to your email adress. Please check your mail and follow the instructions")]),i("div",{staticClass:"has-text-centered"},[i("Button",{attrs:{"class-name":"button is-centered is-primary is-outlined no-background",text:"Go to login"},on:{clicked:t.navigateToLogin}})],1)]):t._e()])]),i("div",{staticClass:"interactive-bg column is-8",attrs:{id:"particles-js"}})])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"4"},[a("div",{staticClass:"has-text-centered"},[a("img",{attrs:{id:"logo",src:i("c3a5"),width:"250",alt:""}})])])}],s=i("d4ec"),c=i("bee2"),o=i("262e"),l=i("2caf"),u=i("9ab4"),r=i("1b40"),d=i("dd50"),p=i("3cae"),b=i("90cd"),v=function(t){Object(o["a"])(i,t);var e=Object(l["a"])(i);function i(){var t;return Object(s["a"])(this,i),t=e.apply(this,arguments),t.emailValid=!0,t.userNotFound=!1,t.tokenIsSent=!1,t.email="",t}return Object(c["a"])(i,[{key:"setEmail",value:function(t){this.email=t}},{key:"handlePasswordReset",value:function(){var t=this;this.emailValid=this.email.length>0,this.emailValid&&d["b"].resetPassword(this.email).then((function(){t.tokenIsSent=!0})).catch((function(e){400===e.response.status&&(t.userNotFound=!0)}))}},{key:"navigateToLogin",value:function(){this.$router.push("/login")}}]),i}(r["d"]);v=Object(u["a"])([Object(r["a"])({components:{InputField:p["a"],Button:b["a"]}})],v);var h=v,m=h,f=(i("ed85"),i("2877")),g=Object(f["a"])(m,a,n,!1,null,"2c93523c",null);e["default"]=g.exports},ed85:function(t,e,i){"use strict";i("26f8")}}]);
//# sourceMappingURL=chunk-1b65b298.695ea622.js.map