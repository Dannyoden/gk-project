(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-94cd2152"],{"25eb":function(e,t,a){var n=a("23e7"),i=a("c20d");n({target:"Number",stat:!0,forced:Number.parseInt!=i},{parseInt:i})},2839:function(e,t,a){"use strict";a("94e1")},2909:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function i(e){if(Array.isArray(e))return n(e)}a.d(t,"a",(function(){return c}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function s(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}a("fb6a"),a("b0c0");function r(e,t){if(e){if("string"===typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e){return i(e)||s(e)||r(e)||o()}},"3cae":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"field has-text-left"},[e.label?a("label",{staticClass:"has-text-weight-bold"},[e._v(e._s(this.label))]):e._e(),a("div",{staticClass:"control",class:e.iconPosition},["checkbox"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],class:e.className,attrs:{placeholder:e.placeHolder,autocomplete:e.autoCompleteSetting,type:"checkbox"},domProps:{checked:Array.isArray(e.input)?e._i(e.input,null)>-1:e.input},on:{change:function(t){var a=e.input,n=t.target,i=!!n.checked;if(Array.isArray(a)){var s=null,r=e._i(a,s);n.checked?r<0&&(e.input=a.concat([s])):r>-1&&(e.input=a.slice(0,r).concat(a.slice(r+1)))}else e.input=i}}}):"radio"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],class:e.className,attrs:{placeholder:e.placeHolder,autocomplete:e.autoCompleteSetting,type:"radio"},domProps:{checked:e._q(e.input,null)},on:{change:function(t){e.input=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],class:e.className,attrs:{placeholder:e.placeHolder,autocomplete:e.autoCompleteSetting,type:e.type},domProps:{value:e.input},on:{input:function(t){t.target.composing||(e.input=t.target.value)}}}),e.iconData?a("span",{staticClass:"icon is-small",class:e.alignIcon},[a("i",{class:e.icon})]):e._e()])])},i=[],s=a("d4ec"),r=a("bee2"),o=a("262e"),c=a("2caf"),u=a("9ab4"),l=a("1b40"),p=function(e){Object(o["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.inputStringValue="",e}return Object(r["a"])(a,[{key:"returnValue",value:function(){this.$emit("inputChanged",this.inputStringValue)}},{key:"iconPosition",get:function(){var e;return null!==(e=this.iconData)&&void 0!==e&&e.position?"left"===this.iconData.position?"has-icons-left":"right"===this.iconData.position?"has-icons-right":void console.error("Position of icon is not valid"):""}},{key:"alignIcon",get:function(){var e;return null!==(e=this.iconData)&&void 0!==e&&e.position?"left"===this.iconData.position?"is-left":"right"===this.iconData.position?"is-right":void 0:""}},{key:"icon",get:function(){return this.iconData.icon}},{key:"input",get:function(){return this.inputValue?this.inputValue:""},set:function(e){this.inputStringValue=e}}]),a}(l["d"]);Object(u["a"])([Object(l["c"])({default:""}),Object(u["c"])("design:type",String)],p.prototype,"type",void 0),Object(u["a"])([Object(l["c"])({default:""}),Object(u["c"])("design:type",String)],p.prototype,"placeHolder",void 0),Object(u["a"])([Object(l["c"])({default:""}),Object(u["c"])("design:type",String)],p.prototype,"className",void 0),Object(u["a"])([Object(l["c"])({default:void 0}),Object(u["c"])("design:type",Object)],p.prototype,"iconData",void 0),Object(u["a"])([Object(l["c"])({default:void 0}),Object(u["c"])("design:type",Object)],p.prototype,"label",void 0),Object(u["a"])([Object(l["c"])({default:void 0}),Object(u["c"])("design:type",Object)],p.prototype,"inputValue",void 0),Object(u["a"])([Object(l["c"])({default:"off"}),Object(u["c"])("design:type",String)],p.prototype,"autoCompleteSetting",void 0),Object(u["a"])([Object(l["e"])("inputStringValue"),Object(u["c"])("design:type",Function),Object(u["c"])("design:paramtypes",[]),Object(u["c"])("design:returntype",void 0)],p.prototype,"returnValue",null),p=Object(u["a"])([l["a"]],p);var d=p,b=d,m=(a("abde"),a("2877")),f=Object(m["a"])(b,n,i,!1,null,"0d5e4ade",null);t["a"]=f.exports},4919:function(e,t,a){"use strict";var n;a.d(t,"a",(function(){return n})),function(e){e["WON"]="WON",e["LOST"]="LOST",e["TIE"]="TIE",e["NOT_PLAYED"]="NOT_PLAYED"}(n||(n={}))},"4df4":function(e,t,a){"use strict";var n=a("0366"),i=a("7b0b"),s=a("9bdd"),r=a("e95a"),o=a("50c4"),c=a("8418"),u=a("35a1");e.exports=function(e){var t,a,l,p,d,b,m=i(e),f="function"==typeof this?this:Array,y=arguments.length,h=y>1?arguments[1]:void 0,v=void 0!==h,g=u(m),O=0;if(v&&(h=n(h,y>2?arguments[2]:void 0,2)),void 0==g||f==Array&&r(g))for(t=o(m.length),a=new f(t);t>O;O++)b=v?h(m[O],O):m[O],c(a,O,b);else for(p=g.call(m),d=p.next,a=new f;!(l=d.call(p)).done;O++)b=v?s(p,h,[l.value,O],!0):l.value,c(a,O,b);return a.length=O,a}},"5b22":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"body"},[a("nav-bar"),a("div",{staticClass:"wrapper"},[a("div",{staticClass:"box"},[a("div",{staticClass:"box-header"},[a("span",{staticClass:"tag is-info is-pulled-left"},[e._v(e._s(e.LABEL_TEXT))]),a("button",{staticClass:"delete is-pulled-right",on:{click:e.navigateBack}})]),a("div",{staticClass:"stepper"},[a("ul",{staticClass:"steps has-content-centered is-horizontal has-gaps"},e._l(e.SESSION_WIZARD_STEPS(),(function(t,n){return a("li",{key:t.title,staticClass:"steps-segment",class:{"is-active":n+1===e.currentStep,"is-dashed":n+1>=e.currentStep}},[a("span",{staticClass:"steps-marker"},[e.SESSION_WIZARD_STEPS()[n].hasIcon?a("span",{staticClass:"icon"},[a("i",{class:e.SESSION_WIZARD_STEPS()[n].iconValue})]):a("span",[e._v(" "+e._s(e.SESSION_WIZARD_STEPS()[n].iconValue)+" ")])])])})),0),e._l(e.SESSION_WIZARD_STEPS(),(function(t,n){return a("ul",{key:n,staticClass:"steps-content"},[n+1===e.currentStep?a("li",{staticClass:"step-content"},[a(t.component,{tag:"component"})],1):e._e()])}))],2),a("footer",{staticClass:"footer-buttons"},[this.currentStep>1?a("button",{staticClass:"button is-primary is-outlined no-background",on:{click:e.previousStep}},[e._v(" "+e._s(e.backButtonMessage)+" ")]):a("p"),this.currentStep<=4?a("button",{staticClass:"button is-primary is-outlined no-background",attrs:{id:"next-and-finish-button",disabled:e.noValidSessionDetails},on:{click:e.nextStep}},[e._v(e._s(e.nextOrFinishButton))]):a("p")])])])],1)},i=[],s=a("1da1"),r=a("d4ec"),o=a("bee2"),c=a("262e"),u=a("2caf"),l=(a("b0c0"),a("a9e3"),a("96cf"),a("9ab4")),p=a("1b40"),d=a("906d"),b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"session-details-wrapper"}},[a("input-field",{attrs:{"class-name":"input is-primary",type:"text",label:"Name","place-holder":"Choose a session name",autocomplete:"off","input-value":e.name},on:{inputChanged:e.setName}}),a("input-field",{attrs:{"class-name":"input is-primary",type:"number",label:"Duration",autocomplete:"off","place-holder":"Duration is in minutes","input-value":e.minutes},on:{inputChanged:e.setMinutes}}),a("date-picker",{attrs:{date:e.date},on:{dateChanged:e.setDate}})],1)},m=[],f=(a("25eb"),a("6c9c")),y=a("3cae"),h=a("4bb5"),v=Object(h["a"])("SessionWizardModule"),g=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"created",value:function(){this.previousStep,this.currentStep}},{key:"name",get:function(){return this.sessionName?this.sessionName:""}},{key:"minutes",get:function(){return this.sessionDuration?this.sessionDuration:""}},{key:"date",get:function(){return this.sessionDate?this.sessionDate:void 0}},{key:"setName",value:function(e){this.$store.commit("SessionWizardModule/setSessionName",e)}},{key:"setMinutes",value:function(e){var t=Number.parseInt(e);isNaN(t)?console.error("Input is not a number"):this.$store.commit("SessionWizardModule/setSessionDuration",t)}},{key:"setDate",value:function(e){this.$store.commit("SessionWizardModule/setSessionDate",e)}}]),a}(p["d"]);Object(l["a"])([v.State("step"),Object(l["c"])("design:type",Number)],g.prototype,"currentStep",void 0),Object(l["a"])([v.State("previousStep"),Object(l["c"])("design:type",Number)],g.prototype,"previousStep",void 0),Object(l["a"])([v.State("name"),Object(l["c"])("design:type",Object)],g.prototype,"sessionName",void 0),Object(l["a"])([v.State("duration"),Object(l["c"])("design:type",Object)],g.prototype,"sessionDuration",void 0),Object(l["a"])([v.State("date"),Object(l["c"])("design:type",Object)],g.prototype,"sessionDate",void 0),g=Object(l["a"])([Object(p["a"])({components:{InputField:y["a"],DatePicker:f["a"]}})],g);var O=g,S=O,j=(a("aaaa"),a("2877")),T=Object(j["a"])(S,b,m,!1,null,"3c6e8124",null),D=T.exports,k=a("99ff"),N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container",attrs:{id:"team-picker-wrapper"}},e._l(e.players,(function(t){return a("select-player",{key:t.player.id,attrs:{player:t},on:{"change-select-player":e.assignTeamOrRemoveTeamOfPlayer}})})),1)},_=[],C=a("2909"),M=(a("4de4"),a("99af"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("button",{staticClass:"button",class:[e.notSelected?"not-selected":e.firstTeam?"first-team":"second-team"],attrs:{disabled:e.firstTeamPlayerDisabled||e.secondTeamPlayerDisabled},on:{click:e.changeSelection}},[e._v(" "+e._s(e.player.hasDuplicateName?e.player.player.givenName+" "+e.player.player.surname:e.player.player.givenName)+" ")])}),E=[],x=a("bfe1"),I=Object(h["a"])("SessionWizardModule"),P=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"notSelected",get:function(){return this.player.team===x["a"].NOT_SELECTED}},{key:"firstTeamPlayerDisabled",get:function(){return 3===this.step&&this.player.team===x["a"].FIRST}},{key:"secondTeamPlayerDisabled",get:function(){return 2===this.step&&this.player.team===x["a"].SECOND}},{key:"firstTeam",get:function(){return this.player.team===x["a"].FIRST}},{key:"changeSelection",value:function(){this.$emit("change-select-player",this.player)}}]),a}(p["d"]);Object(l["a"])([Object(p["c"])(),Object(l["c"])("design:type",Object)],P.prototype,"player",void 0),Object(l["a"])([I.Getter("currentStep"),Object(l["c"])("design:type",Number)],P.prototype,"step",void 0),P=Object(l["a"])([p["a"]],P);var W=P,A=W,z=(a("a25d"),Object(j["a"])(A,M,E,!1,null,"2479a6e8",null)),$=z.exports,w=Object(h["a"])("SessionWizardModule"),F=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"created",value:function(){2!==this.currentStep?3!==this.currentStep?(this.previousStep,this.currentStep):this.$toasted.global.selectSessionTeamPlayers({message:"second team"}):this.$toasted.global.selectSessionTeamPlayers({message:"first team"})}},{key:"players",get:function(){return 2===this.currentStep?this.viewSelectFirstTeam():this.viewSelectSecondTeam()}},{key:"viewSelectFirstTeam",value:function(){var e=this.sessionWizardTeam.filter((function(e){return e.team===x["a"].SECOND})).sort((function(e,t){return e.player.givenName.localeCompare(t.player.givenName)})),t=this.sessionWizardTeam.filter((function(e){return e.team!==x["a"].SECOND})).sort((function(e,t){return e.player.givenName.localeCompare(t.player.givenName)}));return[].concat(Object(C["a"])(t),Object(C["a"])(e))}},{key:"viewSelectSecondTeam",value:function(){var e=this.sessionWizardTeam.filter((function(e){return e.team===x["a"].FIRST})).sort((function(e,t){return e.player.givenName.localeCompare(t.player.givenName)})),t=this.sessionWizardTeam.filter((function(e){return e.team!==x["a"].FIRST})).sort((function(e,t){return e.player.givenName.localeCompare(t.player.givenName)}));return[].concat(Object(C["a"])(t),Object(C["a"])(e))}},{key:"assignTeamOrRemoveTeamOfPlayer",value:function(e){e.team===x["a"].NOT_SELECTED?2===this.currentStep?this.assignFirstTeamToPlayer(e):this.assignSecondTeamToPlayer(e):this.$store.commit("SessionWizardModule/setTeamOfPlayer",{playerArg:e,sessionTeamValue:x["a"].NOT_SELECTED})}},{key:"assignFirstTeamToPlayer",value:function(e){this.$store.commit("SessionWizardModule/setTeamOfPlayer",{playerArg:e,sessionTeamValue:x["a"].FIRST})}},{key:"assignSecondTeamToPlayer",value:function(e){this.$store.commit("SessionWizardModule/setTeamOfPlayer",{playerArg:e,sessionTeamValue:x["a"].SECOND})}}]),a}(p["d"]);Object(l["a"])([w.State("step"),Object(l["c"])("design:type",Number)],F.prototype,"currentStep",void 0),Object(l["a"])([w.State("previousStep"),Object(l["c"])("design:type",Number)],F.prototype,"previousStep",void 0),Object(l["a"])([w.Getter("sessionWizardTeam"),Object(l["c"])("design:type",Array)],F.prototype,"sessionWizardTeam",void 0),F=Object(l["a"])([Object(p["a"])({components:{SelectPlayer:$}})],F);var V=F,B=V,R=(a("6097"),Object(j["a"])(B,N,_,!1,null,"cc2233b4",null)),L=R.exports,G=(a("159b"),a("c740"),a("6fc5")),Y=a("bfee"),U=a("531d");a("d81d");function Z(e,t){return t.filter((function(t){return t.team===e})).map((function(e){return e.player}))}var H,X=a("7138"),J=a("4919"),q=a("92fa"),K=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.step=1,e.previousStep=0,e.name=void 0,e.duration=void 0,e.date=void 0,e.team=[],e.DUMMY_ID="a2ec8743-b10d-4387-b67d-4f7fd8d8c8b0",e}return Object(o["a"])(a,[{key:"setStep",value:function(e){this.step+=e}},{key:"setPreviousStep",value:function(e){this.previousStep=e}},{key:"setSessionName",value:function(e){this.name=e}},{key:"setSessionDuration",value:function(e){this.duration=e}},{key:"setSessionDate",value:function(e){this.date=e}},{key:"setTeam",value:function(e){var t=this;e.forEach((function(a){var n=Object(Y["b"])(a,e);t.team.push(Object(Y["c"])(a,n))}))}},{key:"setTeamOfPlayer",value:function(e){var t=this.team.findIndex((function(t){return t.player.id===e.playerArg.player.id}));this.team[t].team=e.sessionTeamValue}},{key:"currentStep",get:function(){return this.step}},{key:"sessionName",get:function(){return this.name}},{key:"sessionDuration",get:function(){return this.duration}},{key:"sessionDate",get:function(){return this.date}},{key:"hasValidSessionDetails",get:function(){return!!(this.name&&this.duration&&this.date)&&(0!==this.name.length&&0!==this.duration)}},{key:"sessionWizardTeam",get:function(){return this.team}},{key:"playersOfTeam",get:function(){var e=this;return function(t){return e.team.filter((function(e){return e.team===t}))}}},{key:"session",get:function(){return U["a"].create({id:this.DUMMY_ID,name:this.name,first:X["a"].create({id:this.DUMMY_ID,players:Z(x["a"].FIRST,this.team),result:q["a"].create({id:this.DUMMY_ID,result:J["a"].NOT_PLAYED,playersScored:[]})}),second:X["a"].create({id:this.DUMMY_ID,players:Z(x["a"].SECOND,this.team),result:q["a"].create({id:this.DUMMY_ID,result:J["a"].NOT_PLAYED,playersScored:[]})}),minutes:this.duration,start:this.date})}}]),a}(G["d"]);Object(l["a"])([G["c"],Object(l["c"])("design:type",Function),Object(l["c"])("design:paramtypes",[Number]),Object(l["c"])("design:returntype",void 0)],K.prototype,"setStep",null),Object(l["a"])([G["c"],Object(l["c"])("design:type",Function),Object(l["c"])("design:paramtypes",[Number]),Object(l["c"])("design:returntype",void 0)],K.prototype,"setPreviousStep",null),Object(l["a"])([G["c"],Object(l["c"])("design:type",Function),Object(l["c"])("design:paramtypes",[String]),Object(l["c"])("design:returntype",void 0)],K.prototype,"setSessionName",null),Object(l["a"])([G["c"],Object(l["c"])("design:type",Function),Object(l["c"])("design:paramtypes",[Number]),Object(l["c"])("design:returntype",void 0)],K.prototype,"setSessionDuration",null),Object(l["a"])([G["c"],Object(l["c"])("design:type",Function),Object(l["c"])("design:paramtypes",["function"===typeof(H="undefined"!==typeof Date&&Date)?H:Object]),Object(l["c"])("design:returntype",void 0)],K.prototype,"setSessionDate",null),Object(l["a"])([G["c"],Object(l["c"])("design:type",Function),Object(l["c"])("design:paramtypes",[Array]),Object(l["c"])("design:returntype",void 0)],K.prototype,"setTeam",null),Object(l["a"])([G["c"],Object(l["c"])("design:type",Function),Object(l["c"])("design:paramtypes",[Object]),Object(l["c"])("design:returntype",void 0)],K.prototype,"setTeamOfPlayer",null),K=Object(l["a"])([Object(G["b"])({name:"SessionWizardModule",namespaced:!0,stateFactory:!0})],K);var Q=K,ee=a("daaa"),te=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"confirmation-page-wrapper"}},[a("div",{staticClass:"box"},[a("div",{attrs:{id:"session-details"}},[a("p",[e._v(" Date: "+e._s(e.sessionDate)+" ")]),a("p",[e._v(" Name: "+e._s(e.sessionName)+" ")]),a("p",[e._v(" Duration: "+e._s(e.sessionDuration)+" minutes")])])]),a("div",{staticClass:"box"},[a("h5",{staticClass:"title is-5"},[e._v("First Team")]),a("div",{staticClass:"team"},e._l(e.firstTeam,(function(t){return a("div",{key:t.player.id,staticClass:"card-content first-team-player"},[e._v(" "+e._s(t.hasDuplicateName?t.player.givenName+" "+t.player.surname:t.player.givenName)+" ")])})),0)]),a("div",{staticClass:"box"},[a("h5",{staticClass:"title is-5"},[e._v("Second Team")]),a("div",{staticClass:"team"},e._l(e.secondTeam,(function(t){return a("div",{key:t.player.id,staticClass:"card-content second-team-player"},[e._v(" "+e._s(t.hasDuplicateName?t.player.givenName+" "+t.player.surname:t.player.givenName)+" ")])})),0)])])},ae=[],ne=Object(h["a"])("SessionWizardModule"),ie=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"sessionName",get:function(){return this.getSessionName?this.getSessionName:""}},{key:"sessionDuration",get:function(){return this.getSessionDuration?this.getSessionDuration:""}},{key:"sessionDate",get:function(){return this.getSessionDate&&this.getSessionDate?this.getSessionDate.toLocaleDateString("nl"):""}},{key:"firstTeam",get:function(){return this.getPlayersOfTeam(x["a"].FIRST)}},{key:"secondTeam",get:function(){return this.getPlayersOfTeam(x["a"].SECOND)}}]),a}(p["d"]);Object(l["a"])([ne.Getter("sessionName"),Object(l["c"])("design:type",Object)],ie.prototype,"getSessionName",void 0),Object(l["a"])([ne.Getter("sessionDuration"),Object(l["c"])("design:type",Object)],ie.prototype,"getSessionDuration",void 0),Object(l["a"])([ne.Getter("sessionDate"),Object(l["c"])("design:type",Object)],ie.prototype,"getSessionDate",void 0),Object(l["a"])([ne.Getter("playersOfTeam"),Object(l["c"])("design:type",Function)],ie.prototype,"getPlayersOfTeam",void 0),ie=Object(l["a"])([p["a"]],ie);var se,re=ie,oe=re,ce=(a("846c"),Object(j["a"])(oe,te,ae,!1,null,"07629bfb",null)),ue=ce.exports,le=a("7673"),pe=Object(h["a"])("ClubTeamModule"),de=Object(h["a"])("SessionWizardModule"),be=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.LABEL_TEXT="Create Session",e.backButtonMessage="Back",e.nextButtonMessage="Next",e.SESSION_WIZARD_STEPS=function(){return[{title:"Session Details",component:D,hasIcon:!0,iconValue:"far fa-calendar"},{title:"Select First Team",component:L,hasIcon:!1,iconValue:1},{title:"Select Second Team",component:L,hasIcon:!1,iconValue:2},{title:"Confirmation",component:ue,hasIcon:!0,iconValue:"fa fa-check"}]},e}return Object(o["a"])(a,[{key:"created",value:function(){this.$store.hasModule("SessionWizardModule")||(this.$store.registerModule("SessionWizardModule",Q),this.clubTeamExist?this.initSessionWizardPlayers():this.getTeamDetails())}},{key:"mounted",value:function(){this.$store.hasModule("SessionWizardModule")||(this.$store.registerModule("SessionWizardModule",Q),this.clubTeamExist?this.initSessionWizardPlayers():this.getTeamDetails())}},{key:"beforeDestroy",value:function(){this.$store.hasModule("SessionWizardModule")&&this.$store.unregisterModule("SessionWizardModule")}},{key:"initSessionWizardPlayers",value:function(){var e=this.clubTeamPlayers();this.$store.commit("SessionWizardModule/setTeam",e)}},{key:"getTeamDetails",value:function(){var e=this;ee["a"].retrieveTeam().subscribe((function(t){e.$store.commit("ClubTeamModule/setClubTeam",t),e.$store.commit("SessionWizardModule/setTeam",t.players)}),(function(e){console.error(e)}))}},{key:"currentStep",get:function(){return this.step}},{key:"noValidSessionDetails",get:function(){return!this.hasValidSessionDetails}},{key:"nextOrFinishButton",get:function(){return 4===this.step?this.nextButtonMessage="Finish":this.nextButtonMessage}},{key:"nextStep",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var a,n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(4!==this.step){e.next=4;break}return a=this.getSession,le["a"].createSession(a).subscribe((function(){return n.navigateBack(t)})),e.abrupt("return");case 4:this.$store.commit("SessionWizardModule/setPreviousStep",this.step),this.$store.commit("SessionWizardModule/setStep",1);case 6:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"previousStep",value:function(){1!==this.step&&("Finish"===this.nextButtonMessage&&(this.nextButtonMessage="Next"),this.$store.commit("SessionWizardModule/setPreviousStep",this.step),this.$store.commit("SessionWizardModule/setStep",-1))}},{key:"navigateBack",value:function(e){this.currentStep===this.SESSION_WIZARD_STEPS().length&&"next-and-finish-button"===e.target.id&&this.$toasted.global.sessionCreatedToast({message:this.getSession.name}),this.$router.push({name:k["a"].Main})}}]),a}(p["d"]);Object(l["a"])([pe.Getter("clubTeamExists"),Object(l["c"])("design:type",Boolean)],be.prototype,"clubTeamExist",void 0),Object(l["a"])([pe.Getter("clubTeamPlayers"),Object(l["c"])("design:type",Function)],be.prototype,"clubTeamPlayers",void 0),Object(l["a"])([de.Getter("sessionWizardTeamExists"),Object(l["c"])("design:type",Boolean)],be.prototype,"sessionWizardTeamExists",void 0),Object(l["a"])([de.Getter("currentStep"),Object(l["c"])("design:type",Number)],be.prototype,"step",void 0),Object(l["a"])([de.Getter("hasValidSessionDetails"),Object(l["c"])("design:type",Boolean)],be.prototype,"hasValidSessionDetails",void 0),Object(l["a"])([de.Getter("session"),Object(l["c"])("design:type","function"===typeof(se="undefined"!==typeof U["a"]&&U["a"])?se:Object)],be.prototype,"getSession",void 0),be=Object(l["a"])([Object(p["a"])({components:{SessionDetails:D,NavBar:d["a"]}})],be);var me=be,fe=me,ye=(a("2839"),Object(j["a"])(fe,n,i,!1,null,"41e932b8",null));t["default"]=ye.exports},6097:function(e,t,a){"use strict";a("d735")},"66cb":function(e,t,a){},"846c":function(e,t,a){"use strict";a("f19e")},"94e1":function(e,t,a){},"99af":function(e,t,a){"use strict";var n=a("23e7"),i=a("d039"),s=a("e8b5"),r=a("861d"),o=a("7b0b"),c=a("50c4"),u=a("8418"),l=a("65f0"),p=a("1dde"),d=a("b622"),b=a("2d00"),m=d("isConcatSpreadable"),f=9007199254740991,y="Maximum allowed index exceeded",h=b>=51||!i((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),v=p("concat"),g=function(e){if(!r(e))return!1;var t=e[m];return void 0!==t?!!t:s(e)},O=!h||!v;n({target:"Array",proto:!0,forced:O},{concat:function(e){var t,a,n,i,s,r=o(this),p=l(r,0),d=0;for(t=-1,n=arguments.length;t<n;t++)if(s=-1===t?r:arguments[t],g(s)){if(i=c(s.length),d+i>f)throw TypeError(y);for(a=0;a<i;a++,d++)a in s&&u(p,d,s[a])}else{if(d>=f)throw TypeError(y);u(p,d++,s)}return p.length=d,p}})},"9bdd":function(e,t,a){var n=a("825a"),i=a("2a62");e.exports=function(e,t,a,s){try{return s?t(n(a)[0],a[1]):t(a)}catch(r){throw i(e),r}}},a25d:function(e,t,a){"use strict";a("a68b")},a630:function(e,t,a){var n=a("23e7"),i=a("4df4"),s=a("1c7e"),r=!s((function(e){Array.from(e)}));n({target:"Array",stat:!0,forced:r},{from:i})},a689:function(e,t,a){},a68b:function(e,t,a){},aaaa:function(e,t,a){"use strict";a("a689")},abde:function(e,t,a){"use strict";a("66cb")},c20d:function(e,t,a){var n=a("da84"),i=a("58a8").trim,s=a("5899"),r=n.parseInt,o=/^[+-]?0[Xx]/,c=8!==r(s+"08")||22!==r(s+"0x16");e.exports=c?function(e,t){var a=i(String(e));return r(a,t>>>0||(o.test(a)?16:10))}:r},c740:function(e,t,a){"use strict";var n=a("23e7"),i=a("b727").findIndex,s=a("44d2"),r="findIndex",o=!0;r in[]&&Array(1)[r]((function(){o=!1})),n({target:"Array",proto:!0,forced:o},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),s(r)},d735:function(e,t,a){},d81d:function(e,t,a){"use strict";var n=a("23e7"),i=a("b727").map,s=a("1dde"),r=s("map");n({target:"Array",proto:!0,forced:!r},{map:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},f19e:function(e,t,a){},fb6a:function(e,t,a){"use strict";var n=a("23e7"),i=a("861d"),s=a("e8b5"),r=a("23cb"),o=a("50c4"),c=a("fc6a"),u=a("8418"),l=a("b622"),p=a("1dde"),d=p("slice"),b=l("species"),m=[].slice,f=Math.max;n({target:"Array",proto:!0,forced:!d},{slice:function(e,t){var a,n,l,p=c(this),d=o(p.length),y=r(e,d),h=r(void 0===t?d:t,d);if(s(p)&&(a=p.constructor,"function"!=typeof a||a!==Array&&!s(a.prototype)?i(a)&&(a=a[b],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return m.call(p,y,h);for(n=new(void 0===a?Array:a)(f(h-y,0)),l=0;y<h;y++,l++)y in p&&u(n,l,p[y]);return n.length=l,n}})}}]);
//# sourceMappingURL=chunk-94cd2152.d2bd8056.js.map