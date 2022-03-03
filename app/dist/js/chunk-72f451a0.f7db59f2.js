(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72f451a0"],{"0511":function(e,r,a){"use strict";a.r(r);var s=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"register-container"},[a("div",{staticClass:"register"},[e._m(0),a("div",{staticClass:"content"},[a("label",[e._v("手机号:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"},{name:"validate",rawName:"v-validate",value:{required:!0,regex:/^1\d{10}$/},expression:"{ required: true, regex: /^1\\d{10}$/ }"}],class:{invalid:e.errors.has("phone")},attrs:{placeholder:"请输入你的手机号",name:"phone"},domProps:{value:e.phone},on:{input:function(r){r.target.composing||(e.phone=r.target.value)}}}),a("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("phone")))])]),a("div",{staticClass:"content"},[a("label",[e._v("验证码:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"},{name:"validate",rawName:"v-validate",value:{required:!0,regex:/^\d{6}$/},expression:"{ required: true, regex: /^\\d{6}$/ }"}],class:{invalid:e.errors.has("code")},attrs:{placeholder:"请输入你的验证码",name:"code"},domProps:{value:e.code},on:{input:function(r){r.target.composing||(e.code=r.target.value)}}}),a("button",{staticStyle:{width:"100px",height:"38px"},on:{click:e.getCode}},[e._v(" 获取验证码 ")]),a("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("code")))])]),a("div",{staticClass:"content"},[a("label",[e._v("登录密码:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"},{name:"validate",rawName:"v-validate",value:{required:!0,regex:/^[0-9A-Za-z]{8,20}$/},expression:"{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"}],class:{invalid:e.errors.has("password")},attrs:{placeholder:"请输入你的密码",name:"password"},domProps:{value:e.password},on:{input:function(r){r.target.composing||(e.password=r.target.value)}}}),a("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("password")))])]),a("div",{staticClass:"content"},[a("label",[e._v("确认密码:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password1,expression:"password1"},{name:"validate",rawName:"v-validate",value:{required:!0,is:e.password},expression:"{ required: true, is: password }"}],class:{invalid:e.errors.has("password1")},attrs:{placeholder:"请输入确认密码",name:"password1"},domProps:{value:e.password1},on:{input:function(r){r.target.composing||(e.password1=r.target.value)}}}),a("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("password1")))])]),a("div",{staticClass:"controls"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.agree,expression:"agree"},{name:"validate",rawName:"v-validate",value:{required:!0,tongyi:!0},expression:"{ required: true, tongyi: true }"}],class:{invalid:e.errors.has("agree")},attrs:{type:"checkbox",name:"agree"},domProps:{checked:Array.isArray(e.agree)?e._i(e.agree,null)>-1:e.agree},on:{change:function(r){var a=e.agree,s=r.target,t=!!s.checked;if(Array.isArray(a)){var i=null,n=e._i(a,i);s.checked?n<0&&(e.agree=a.concat([i])):n>-1&&(e.agree=a.slice(0,n).concat(a.slice(n+1)))}else e.agree=t}}}),a("span",[e._v("同意协议并注册《尚品汇用户协议》")]),a("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("agree")))])]),a("div",{staticClass:"btn"},[a("button",{on:{click:e.userRegister}},[e._v("完成注册")])])]),e._m(1)])},t=[function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("h3",[e._v(" 注册新用户 "),a("span",{staticClass:"go"},[e._v("我有账号，去 "),a("a",{attrs:{href:"login.html",target:"_blank"}},[e._v("登陆")])])])},function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"copyright"},[a("ul",[a("li",[e._v("关于我们")]),a("li",[e._v("联系我们")]),a("li",[e._v("联系客服")]),a("li",[e._v("商家入驻")]),a("li",[e._v("营销中心")]),a("li",[e._v("手机尚品汇")]),a("li",[e._v("销售联盟")]),a("li",[e._v("尚品汇社区")])]),a("div",{staticClass:"address"},[e._v("地址：北京市昌平区宏福科技园综合楼6层")]),a("div",{staticClass:"beian"},[e._v("京ICP备19006430号")])])}],i=a("1da1"),n=(a("96cf"),{name:"Register",data:function(){return{phone:"",code:"",password:"",password1:"",agree:!0}},methods:{getCode:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(r.prev=0,a=e.phone,r.t0=a,!r.t0){r.next=6;break}return r.next=6,e.$store.dispatch("user/getVerificationCode",a);case 6:e.code=e.$store.state.user.verificationCode,r.next=11;break;case 9:r.prev=9,r.t1=r["catch"](0);case 11:case"end":return r.stop()}}),r,null,[[0,9]])})))()},userRegister:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,s,t,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$validator.validateAll();case 2:if(a=r.sent,!a){r.next=14;break}return r.prev=4,s=e.phone,t=e.code,i=e.password,e.password1,r.next=8,e.$store.dispatch("user/userRegister",{phone:s,code:t,password:i});case 8:e.$router.push("/login"),r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](4),alert(r.t0.message);case 14:case"end":return r.stop()}}),r,null,[[4,11]])})))()}}}),o=n,c=(a("65e4"),a("2877")),l=Object(c["a"])(o,s,t,!1,null,"664ffce4",null);r["default"]=l.exports},"65e4":function(e,r,a){"use strict";a("83d3")},"83d3":function(e,r,a){}}]);