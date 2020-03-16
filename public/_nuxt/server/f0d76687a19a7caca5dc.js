exports.ids=[6],exports.modules={145:function(e,t,r){"use strict";r.r(t);var o=r(4),l={layout:"admin_dashboard",components:{VueTailwindModal:r(9).a},async created(){try{await this.$store.dispatch("admin/getUsers"),this.isLoading=!1}catch(e){}},data:()=>({isLoading:!0,formData:{email:null,displayName:null,password:null,role:"customer"}}),computed:{...Object(o.mapGetters)({users:"admin/users"})},methods:{addNewUser(){this.formData={email:null,displayName:null,password:null,role:"customer"},this.$refs.userFormModal.show()},async submitForm(){if(this.formData.uid)return this.isLoading=!0,this.$refs.userFormModal.hide(),await this.$store.dispatch("admin/updateUser",this.formData),void(this.isLoading=!1)},editUser(e){this.formData=JSON.parse(JSON.stringify(e)),this.$refs.userFormModal.show()}}},d=r(2),component=Object(d.a)(l,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"sm:px-8 relative"},[e.isLoading?r("AreaLoader"):e._e(),e._ssrNode(" "),r("VueTailwindModal",{ref:"userFormModal",attrs:{width:"30%"}},[r("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm(t)}}},[r("div",{staticClass:"text-xl font-bold mb-2"},[e._v(e._s(e.formData.uid?"EDIT":"ADD NEW")+" USER")]),e._v(" "),r("div",{staticClass:"mb-3 mt-2"},[r("label",{staticClass:"font-bold",attrs:{for:"name"}},[e._v("Name")]),e._v(" "),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.displayName,expression:"formData.displayName"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full py-2 px-3 border rounded focus:outline-none outline-none",class:{"border-red-400":e.errors.has("name"),"focus:border-gray-600":!e.errors.has("name")},attrs:{name:"name",type:"text",placeholder:"Name","data-vv-as":"Name"},domProps:{value:e.formData.displayName},on:{input:function(t){t.target.composing||e.$set(e.formData,"displayName",t.target.value)}}})]),e._v(" "),e.errors.has("name")?r("span",{staticClass:"text-red-700 text-xs pt-1 font-bold inline-block"},[e._v(e._s(e.errors.first("name")))]):e._e()]),e._v(" "),r("div",{staticClass:"mb-3"},[r("label",{staticClass:"font-bold",attrs:{for:"email"}},[e._v("Email")]),e._v(" "),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.email,expression:"formData.email"},{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full py-2 px-3 border rounded focus:outline-none outline-none",class:{"border-red-400":e.errors.has("email"),"focus:border-gray-600":!e.errors.has("email")},attrs:{name:"email",type:"text",placeholder:"email@example.com","data-vv-as":"Email"},domProps:{value:e.formData.email},on:{input:function(t){t.target.composing||e.$set(e.formData,"email",t.target.value)}}})]),e._v(" "),e.errors.has("email")?r("span",{staticClass:"text-red-700 text-xs pt-1 font-bold inline-block"},[e._v(e._s(e.errors.first("email")))]):e._e()]),e._v(" "),r("div",{staticClass:"mb-3"},[r("label",{staticClass:"font-bold",attrs:{for:"pass"}},[e._v("Password")]),e._v(" "),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.password,expression:"formData.password"},{name:"validate",rawName:"v-validate",value:"required|min:6",expression:"'required|min:6'"}],staticClass:"w-full py-2 px-3 border rounded focus:outline-none outline-none",class:{"border-red-400":e.errors.has("pass"),"focus:border-gray-600":!e.errors.has("pass")},attrs:{type:"password",name:"pass",placeholder:"Password","data-vv-as":"Password"},domProps:{value:e.formData.password},on:{input:function(t){t.target.composing||e.$set(e.formData,"password",t.target.value)}}})]),e._v(" "),e.errors.has("pass")?r("span",{staticClass:"text-red-700 text-xs pt-1 font-bold inline-block"},[e._v(e._s(e.errors.first("pass")))]):e._e()]),e._v(" "),r("div",{staticClass:"mb-3"},[r("label",{staticClass:"font-bold",attrs:{for:"pass"}},[e._v("Role")]),e._v(" "),r("div",[r("select",{directives:[{name:"model",rawName:"v-model",value:e.formData.role,expression:"formData.role"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full py-2 px-3 border rounded focus:outline-none outline-none",class:{"border-red-400":e.errors.has("pass"),"focus:border-gray-600":!e.errors.has("pass")},attrs:{name:"role",id:"role","data-vv-as":"Role"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.formData,"role",t.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"customer"}},[e._v("User")]),e._v(" "),r("option",{attrs:{value:"admin"}},[e._v("Admin")]),e._v(" "),r("option",{attrs:{value:"support"}},[e._v("Support")])])]),e._v(" "),e.errors.has("role")?r("span",{staticClass:"text-red-700 text-xs pt-1 font-bold inline-block"},[e._v(e._s(e.errors.first("role")))]):e._e()]),e._v(" "),r("div",{staticClass:"mb-3"},[r("button",{staticClass:"w-full items-center justify-center focus:outline-none outline-none flex flex-grow border px-3 py-2 font-bold rounded text-white border-white bg-primary hover:bg-primary-lighter"},[e._v("CREATE")])])])]),e._ssrNode(" "),e._ssrNode("<div>","</div>",[e._ssrNode('<div class="my-2 flex sm:flex-row justify-between items-center"><h2 class="text-2xl font-semibold leading-tight">Users</h2> <button type="button" class="border px-8 py-2 font-bold rounded outline-none focus:outline-none border-white bg-primary text-white hover:bg-primary-lighter">Add New User</button></div> '),e._ssrNode('<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">',"</div>",[e._ssrNode('<div class="inline-block min-w-full border-l border-r overflow-hidden">',"</div>",[e._ssrNode('<table class="min-w-full leading-normal table-fixed">',"</table>",[e._ssrNode('<thead><tr><th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">UID</th> <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Email</th> <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Display Name</th> <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Actions</th></tr></thead> '),e._ssrNode("<tbody>","</tbody>",e._l(e.users,function(t){return e._ssrNode("<tr>","</tr>",[e._ssrNode('<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"><div class="flex items-center justify-center"><div class="ml-3"><p class="text-gray-900 whitespace-no-wrap text-center"><a href="#" class="text-blue-600 hover:underline"><span>'+e._ssrEscape(e._s(t.uid))+'</span></a></p></div></div></td> <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">'+e._ssrEscape(e._s(t.email))+'</td> <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">'+e._ssrEscape(e._s(t.displayName))+"</td> "),e._ssrNode('<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">',"</td>",[e._ssrNode("<div>","</div>",[r("button",{directives:[{name:"tippy",rawName:"v-tippy",value:{arrow:!0},expression:"{arrow: true}"}],staticClass:"px-2 py-1 text-xs hover:bg-gray-200 border rounded mx-1",attrs:{type:"button",title:"Edit"},on:{click:function(r){return e.editUser(t)}}},[r("font-awesome-icon",{attrs:{icon:["fas","edit"]}})],1),e._ssrNode(" "),r("button",{directives:[{name:"tippy",rawName:"v-tippy",value:{arrow:!0},expression:"{arrow: true}"}],staticClass:"px-2 py-1 text-xs hover:bg-gray-200 border rounded mx-1",attrs:{type:"button",title:"Delete"}},[r("font-awesome-icon",{attrs:{icon:["fas","trash"]}})],1)],2)])],2)}),0)],2)])])],2)],2)},[],!1,null,null,"5a165cae");t.default=component.exports}};
//# sourceMappingURL=f0d76687a19a7caca5dc.js.map