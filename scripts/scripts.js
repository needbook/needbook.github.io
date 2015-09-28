"use strict";function Author(a){this.EntityType="Author",angular.extend(this,a)}function Book(a){this.EntityType="Book",angular.extend(this,a)}function Character(a){this.EntityType="Character",angular.extend(this,a)}function CharacterTrait(a){this.EntityType="CharacterTrait",angular.extend(this,a)}function CharacterTraitType(a){this.EntityType="CharacterTraitType",angular.extend(this,a)}function CharacterLink(a){this.EntityType="CharacterLink",angular.extend(this,a)}function CharacterLinkType(a){this.EntityType="CharacterLinkType",angular.extend(this,a)}function Place(a){this.EntityType="Place",angular.extend(this,a)}function PlaceTrait(a){this.EntityType="PlaceTrait",angular.extend(this,a)}function PlaceTraitType(a){this.EntityType="PlaceTraitType",angular.extend(this,a)}function Client(a){this.EntityType="Client",angular.extend(this,a)}function Edition(a){this.EntityType="Edition",angular.extend(this,a)}function Library(a){this.EntityType="Library",angular.extend(this,a)}function Search(a){this.EntityType="Search",angular.extend(this,a)}function Serie(a){this.EntityType="Serie",angular.extend(this,a)}function User(a){this.EntityType="User",this.Books=[],this.booksLoaded=!1,angular.extend(this,a),this.Firstname&&this.Lastname?this.Fullname=this.Firstname+" "+this.Lastname:this.Fullname=this.Firstname||this.Lastname,this.loadBooks=function(a,b){var c=this;c.booksLoaded?b():a.ofUser({userID:c.id},function(a){c.Books=a,c.booksLoaded=!0,b()})},this.addBook=function(a){this.Books.push(a)}}angular.module("needbookApp",["ngAnimate","ngAria","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","ngMdIcons","ui.router","md.data.table","app.ngResource","app.underscore","apiModels","authControllers","authorControllers","bookControllers","serieControllers"]).run(["$rootScope","$state","AUTH_EVENTS","AuthService",function(a,b){a.$on("$stateChangeError",function(){b.go("home.login")})}]);var needbookApp=angular.module("needbookApp");needbookApp.config(["$httpProvider",function(a){a.interceptors.push(["$injector",function(a){return a.get("AuthInterceptor")}])}]).factory("AuthInterceptor",["$rootScope","$q","AUTH_EVENTS",function(a,b,c){return{responseError:function(d){return a.$broadcast({401:c.notAuthenticated,403:c.notAuthorized,419:c.sessionTimeout,440:c.sessionTimeout}[d.status],d),b.reject(d)}}}]);var needbookApp=angular.module("needbookApp");needbookApp.constant("AUTH_EVENTS",{clientAuthSuccess:"auth:client-success",clientAuthFailed:"auth:client-failed",registrationSuccess:"auth:registration-success",registrationFailed:"auth:registration-failed",deletionSuccess:"auth:deletion-success",deletionFailed:"auth:deletion-failed",loginSuccess:"auth:login-success",loginFailed:"auth:login-failed",logoutSuccess:"auth:logout-success",sessionCreated:"auth:session-created",sessionDeleted:"auth:session-deleted",sessionTimeout:"auth:session-timeout",notAuthenticated:"auth:not-authenticated",notAuthorized:"auth:not-authorized"}).constant("USER_ROLES",{all:"*",admin:"admin",editor:"editor",guest:"guest"});var needbookApp=angular.module("needbookApp");needbookApp.controller("AppCtrl",["$log","$rootScope","$scope","$state","$mdSidenav","$mdToast","$mdUtil","USER_ROLES","AUTH_EVENTS","AuthService","Session",function(a,b,c,d,e,f,g,h,i,j,k){function l(b){var c=g.debounce(function(){e(b).toggle().then(function(){a.debug("toggle "+b+" is done")})},200);return c}b.pageTitle="Page Title",c.currentUser=null,c.userRoles=h,c.isAuthorized=j.isAuthorized,c.toggleLeft=l("left"),j.clientConnection(),c.logout=j.logout,c.$on(i.loginSuccess,function(){f.show(f.simple().position("bottom right").content("Login Success")),d.go("app.library.books")}),c.$on(i.loginFailed,function(){f.show(f.simple().position("bottom right").content("Login Failure"))}),c.$on(i.deletionSuccess,function(){f.show(f.simple().position("bottom right").content("Account Deleted"))}),c.$on(i.deletionFailure,function(){f.show(f.simple().position("bottom right").content("Account Deletion Failed"))}),c.$on(i.sessionCreated,function(){c.currentUser||(c.currentUser=k.loadState())}),c.$on(i.sessionDeleted,function(){c.currentUser=null,d.go("home.login")})}]);var needbookApp=angular.module("needbookApp");needbookApp.config(["$stateProvider","$urlRouterProvider","$httpProvider",function(a,b,c){c.defaults.withCredentials=!0,b.otherwise("/library/books"),a.state("home",{url:"/home",data:{requireLogin:!1},views:{header:{templateUrl:"components/home/toolbar/homeToolbarView.html",controller:"HomeToolbarCtrl"},content:{templateUrl:"components/home/homeView.html"}}}).state("home.login",{url:"/login",views:{"content@":{templateUrl:"components/auth/loginView.html",controller:"LoginCtrl"}}}).state("home.sign_up",{url:"/sign_up",views:{"content@":{templateUrl:"components/auth/signUpView.html",controller:"SignUpCtrl"}}}).state("app",{"abstract":!0,data:{requireLogin:!0},resolve:{auth:["AuthResolver",function(a){return a.resolve()}]},views:{header:{templateUrl:"shared/core/toolbar/simpleToolbarView.html",controller:"SimpleToolbarCtrl"},sidenav:{templateUrl:"shared/core/sidenav/sidenavView.html",controller:"SidenavCtrl"}}}).state("app.search",{url:"/search/:query",views:{"content@":{templateUrl:"components/search/searchResultView.html",controller:"SearchCtrl"}}}).state("app.book",{url:"/book/:bookID","abstract":!0,views:{"header@":{templateUrl:"shared/core/toolbar/simpleToolbarView.html",controller:"BookToolbarCtrl"}}}).state("app.book.details",{url:"",views:{"content@":{templateUrl:"components/book/bookDetailView.html",controller:"BookDetailCtrl"}}}).state("app.book.characters",{url:"/chars",views:{"content@":{templateUrl:"components/book/character/bookCharacterListView.html",controller:"BookCharacterListCtrl"}}}).state("app.book.character",{url:"/char/:charID",views:{"content@":{templateUrl:"components/book/character/bookCharacterDetailView.html",controller:"BookCharacterDetailCtrl"}}}).state("app.book.character.edit",{url:"/edit",views:{"content@":{templateUrl:"components/book/character/bookCharacterEditView.html",controller:"BookCharacterEditCtrl"}}}).state("app.book.characters.new",{url:"/new",views:{"content@":{templateUrl:"components/book/character/bookCharacterEditView.html",controller:"BookCharacterEditCtrl"}}}).state("app.book.places",{url:"/places",views:{"content@":{templateUrl:"components/book/place/bookPlaceListView.html",controller:"BookPlaceListCtrl"}}}).state("app.book.place",{url:"/place/:placeID",views:{"content@":{templateUrl:"components/book/place/bookPlaceDetailView.html",controller:"BookPlaceDetailCtrl"}}}).state("app.book.place.edit",{url:"/edit",views:{"content@":{templateUrl:"components/book/place/bookPlaceEditView.html",controller:"BookPlaceEditCtrl"}}}).state("app.book.places.new",{url:"/new",views:{"content@":{templateUrl:"components/book/place/bookPlaceEditView.html",controller:"BookPlaceEditCtrl"}}}).state("app.serie",{url:"/serie/:id",views:{"content@":{templateUrl:"components/serie/serieDetailView.html",controller:"SerieDetailCtrl"}}}).state("app.author",{url:"/author/:id",views:{"content@":{templateUrl:"components/author/authorDetailView.html",controller:"AuthorDetailCtrl"}}}).state("app.library",{url:"/library","abstract":!0,views:{"header@":{templateUrl:"shared/core/toolbar/simpleToolbarView.html",controller:"LibraryToolbarCtrl"}}}).state("app.library.books",{url:"/books",views:{"content@":{templateUrl:"components/book/bookListView.html",controller:"LibraryBookListCtrl"}}}).state("app.library.series",{url:"/series",views:{"content@":{templateUrl:"components/serie/serieListView.html",controller:"SerieListCtrl"}}}).state("app.library.authors",{url:"/authors",views:{"content@":{templateUrl:"components/author/authorListView.html",controller:"LibraryAuthorListCtrl"}}}).state("app.library.favorites",{url:"/favorites",views:{"content@":{templateUrl:"components/book/bookListView.html",controller:"FavoriteBooksCtrl"}}}).state("app.top_books",{url:"/top_books",views:{"content@":{templateUrl:"components/book/bookListView.html",controller:"TopBooksCtrl"}}}).state("app.discover",{url:"/discover",views:{"content@":{templateUrl:"components/book/bookListView.html",controller:"DiscoverCtrl"}}}).state("app.forum",{url:"/forum",views:{"content@":{templateUrl:"components/forum/forumView.html",controller:"ForumCtrl"}}}).state("app.settings",{url:"/settings",views:{"content@":{templateUrl:"components/settings/settingsView.html",controller:"SettingsCtrl"}}}).state("app.feedback",{url:"/feedback",views:{"content@":{templateUrl:"components/feedback/feedBackView.html",controller:"FeedbackCtrl"}}})}]),angular.module("app.ngResource",["ngResource","ngCookies"]).factory("Resource",["$resource","$cookies",function(a,b){return function(b,c,d){var e=function(a){return angular.forEach(arguments,function(b){b!==a&&angular.forEach(b,function(b,c){a[c]&&a[c].constructor&&a[c].constructor===Object?e(a[c],b):a[c]=b})}),a};delete c.model;var f={post:{method:"POST"},patch:{method:"PATCH"},create:{method:"POST"},update:{method:"PUT",isArray:!1},query:{isArray:!0}};d=e({},f,d),c=angular.extend({id:"@id"},c);var g=a(b,c,d);return g.prototype.$save=function(){return this.id?this.$update():this.$create()},g}}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("config",[function(){var a="production",b={production:{apiUrl:"http://api.needbook.io:1337",clientName:"Admin",clientKey:"Ls5Peq5sfZcJHhkv54dfsdLg35HVfdff977fHF2S4354ZhkgyklMd5",log:!0},development:{apiUrl:"http://localhost:1337",clientName:"Admin",clientKey:"Ls5Peq5sfZcJHhkv54dfsdLg35HVfdff977fHF2S4354ZhkgyklMd5",log:!0}};return b[a]}]);var needbookApp=angular.module("needbookApp");needbookApp.config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("brown").accentPalette("amber").warnPalette("red").backgroundPalette("grey")}]);var underscore=angular.module("app.underscore",[]);underscore.factory("_",["$window",function(a){return a._}]),angular.module("apiModels",[]);var apiModels=angular.module("apiModels");apiModels.factory("AuthorModel",["_","Resource","config",function(a,b,c){function d(a){return new Author(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Author(a)})}return b(c.apiUrl+"/authors/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var apiModels=angular.module("apiModels");apiModels.factory("BookModel",["_","Resource","config",function(a,b,c){function d(a){return new Book(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Book(a)})}return b(c.apiUrl+"/books/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var apiModels=angular.module("apiModels");apiModels.factory("CharacterModel",["_","Resource","config",function(a,b,c){function d(a){return new Character(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Character(a)})}return b(c.apiUrl+"/characters/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d},save:{method:"POST",transformResponse:d}})}]),apiModels.factory("BookCharacterModel",["_","Resource","config",function(a,b,c){function d(a){return new Character(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Character(a)})}return b(c.apiUrl+"/books/:bookID/characters/:charID",{bookID:"@bookID",charID:"@charID"},{query:{transformResponse:e},get:{transformResponse:d},save:{method:"POST"}})}]);var apiModels=angular.module("apiModels");apiModels.factory("CharacterTraitModel",["_","Resource","config",function(a,b,c){function d(a){return new CharacterTrait(angular.fromJson(a))}return b(c.apiUrl+"/characters/:character/traits/:id",{character:"@character",id:"@id"},{get:{method:"GET",transformResponse:d,isArray:!1},post:{method:"POST",transformResponse:d,isArray:!1}})}]),apiModels.factory("CharacterTraitTypeModel",["_","Resource","config",function(a,b,c){function d(a){return new CharacterTraitType(angular.fromJson(a))}function e(b){return a.map(b,function(a){return new CharacterTraitType(a)})}function f(a){return e(angular.fromJson(a))}function g(a){return a=angular.fromJson(a),e(a.character_trait_type)}return b(c.apiUrl+"/characters/traits/_types/:id",{id:"@id"},{get:{method:"GET",transformResponse:d,isArray:!1},query:{method:"GET",transformResponse:f,isArray:!0},post:{method:"POST",transformResponse:d,isArray:!1},search:{method:"GET",transformResponse:g,isArray:!0,url:c.apiUrl+"/search",params:{types:"character_trait_type"}}})}]);var apiModels=angular.module("apiModels");apiModels.factory("CharacterLinkModel",["_","Resource","config",function(a,b,c){function d(a){return new CharacterLink(angular.fromJson(a))}return b(c.apiUrl+"/characters/:character/links/:id",{character:"@character",id:"@id"},{get:{method:"GET",transformResponse:d,isArray:!1},post:{method:"POST",transformResponse:d,isArray:!1}})}]),apiModels.factory("CharacterLinkTypeModel",["_","Resource","config",function(a,b,c){function d(a){return new CharacterLinkType(angular.fromJson(a))}function e(b){return a.map(b,function(a){return new CharacterLinkType(a)})}function f(a){return e(angular.fromJson(a))}function g(a){return a=angular.fromJson(a),e(a.character_link_type)}return b(c.apiUrl+"/characters/links/_types/:id",{id:"@id"},{get:{method:"GET",transformResponse:d,isArray:!1},query:{method:"GET",transformResponse:f,isArray:!0},post:{method:"POST",transformResponse:d,isArray:!1},search:{method:"GET",transformResponse:g,isArray:!0,url:c.apiUrl+"/search",params:{types:"character_link_type"}}})}]);var apiModels=angular.module("apiModels");apiModels.factory("PlaceModel",["_","Resource","config",function(a,b,c){function d(a){return new Place(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Place(a)})}return b(c.apiUrl+"/places/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d},save:{method:"POST",transformResponse:d}})}]),apiModels.factory("BookPlaceModel",["_","Resource","config",function(a,b,c){function d(a){return new Place(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Place(a)})}return b(c.apiUrl+"/books/:bookID/places/:charID",{bookID:"@bookID",charID:"@charID"},{query:{transformResponse:e},get:{transformResponse:d},save:{method:"POST"}})}]);var apiModels=angular.module("apiModels");apiModels.factory("PlaceTraitModel",["_","Resource","config",function(a,b,c){function d(a){return new PlaceTrait(angular.fromJson(a))}return b(c.apiUrl+"/places/:place/traits/:id",{place:"@place",id:"@id"},{get:{method:"GET",transformResponse:d,isArray:!1},post:{method:"POST",transformResponse:d,isArray:!1}})}]),apiModels.factory("PlaceTraitTypeModel",["_","Resource","config",function(a,b,c){function d(a){return new PlaceTraitType(angular.fromJson(a))}function e(b){return a.map(b,function(a){return new PlaceTraitType(a)})}function f(a){return e(angular.fromJson(a))}function g(a){return a=angular.fromJson(a),e(a.place_trait_type)}return b(c.apiUrl+"/places/traits/_types/:id",{id:"@id"},{get:{method:"GET",transformResponse:d,isArray:!1},query:{method:"GET",transformResponse:f,isArray:!0},post:{method:"POST",transformResponse:d,isArray:!1},search:{method:"GET",transformResponse:g,isArray:!0,url:c.apiUrl+"/search",params:{types:"place_trait_type"}}})}]);var apiModels=angular.module("apiModels");apiModels.factory("ClientModel",["_","Resource","config",function(a,b,c){function d(a){return new Client(angular.fromJson(a))}return b(c.apiUrl+"/auth/:client_id",{client_id:"@client_id"},{connect:{method:"GET",url:c.apiUrl+"/auth/"+c.clientName+"/"+c.clientKey},disconnect:{url:c.apiUrl+"/auth/stop"},create:{transformResponse:d}})}]);var apiModels=angular.module("apiModels");apiModels.factory("EditionModel",["_","Resource","config",function(a,b,c){function d(a){return new Edition(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Edition(a)})}return b(c.apiUrl+"/editions/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var apiModels=angular.module("apiModels");apiModels.factory("LibraryModel",["_","Resource","config",function(a,b,c){function d(a){return new Library(angular.fromJson(a))}return b(c.apiUrl+"/library/:id",{id:"@id"},{query:{transformResponse:d,isArray:!1},addBook:{url:c.apiUrl+"/library",method:"POST"},removeBook:{url:c.apiUrl+"/library/:id",method:"DELETE"}})}]);var apiModels=angular.module("apiModels");apiModels.factory("SearchModel",["_","Resource","config",function(a,b,c){function d(a){return new Search(angular.fromJson(a))}return b(c.apiUrl+"/search?q=:query",{query:"@query"},{query:{transformResponse:d,isArray:!1}})}]);var apiModels=angular.module("apiModels");apiModels.factory("SerieModel",["_","Resource","config",function(a,b,c){function d(a){return new Serie(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Serie(a)})}return b(c.apiUrl+"/series/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var apiModels=angular.module("apiModels");apiModels.factory("UserModel",["_","Resource","config",function(a,b,c){function d(a){return new User(angular.fromJson(a))}return b(c.apiUrl+"/users/:id",{id:"@id"},{create:{method:"POST",transformResponse:d},login:{url:c.apiUrl+"/users/login"},logout:{url:c.apiUrl+"/users/logout"},validateEmail:{url:c.apiUrl+"/user/validate/:login/:key",method:"POST"}})}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("AuthService",["_","$log","AUTH_EVENTS","BroadcastService","ClientModel","UserModel","Session",function(a,b,c,d,e,f,g){var h={};return h.clientConnection=function(){e.connect(function(a){d.sendSuccess(c.clientAuthSuccess,a)},function(a){d.sendFailure(c.clientAuthSuccess,a)})},h.currentUser=function(a,b){f.get({id:g.uid},function(b){a(b)},b)},h.login=function(a){f.login(a,function(a){g.saveState(a.user),g.create(a.user.id),d.sendSuccess(c.loginSuccess,a.user)},function(a){d.sendFailure(c.loginFailed,a)})},h.logout=function(){g.destroy()},h.register=function(b){f.create(b,function(e){d.sendSuccess(c.registrationSuccess,e),h.login(a.pick(b,"login","password"))},function(a){d.sendFailure(c.registrationFailed,a)})},h.deleteUser=function(a){f["delete"]({id:a},function(a){d.sendSuccess(c.deletionSuccess,a),h.logout()},function(a){d.sendFailure(c.deletionFailed,a)})},h.isAuthenticated=function(){return b.info("authService.isAuthenticated",!!g.userId),!!g.userId},h.isAuthorized=function(a){return angular.isArray(a)||(a=[a]),b.info("authService.isAuthorized",h.isAuthenticated()&&-1!==a.indexOf(g.userRole)),h.isAuthenticated()&&-1!==a.indexOf(g.userRole)},h}]),needbookApp.factory("AuthResolver",["$cookies","$q","Session",function(a,b,c){return{resolve:function(){var d=b.defer(),e=a.get("uid");return e?(c.create(e),d.resolve()):d.reject("Not logged in"),d.promise}}}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("BroadcastService",["$log","$rootScope","config",function(a,b,c){var d={};return d.send=function(a,c){b.$broadcast(a,c)},d.sendSuccess=function(b,e){c.log&&a.info(b,e),d.send(b,e)},d.sendFailure=function(b,e){c.log&&a.warn(b,e),d.send(b,e)},d}]);var needbookApp=angular.module("needbookApp");needbookApp.service("Session",["$log","$cookies","BroadcastService","AUTH_EVENTS","USER_ROLES",function(a,b,c,d,e){this.loadState=function(){var b=localStorage.getItem("user");return a.debug("Session.loadState",null!==localStorage.getItem("user")?angular.fromJson(b):null),null!==localStorage.getItem("user")?angular.fromJson(b):null},this.saveState=function(b){localStorage.setItem("user",angular.toJson(b)),a.debug("Session.saveState",angular.toJson(b))},this.deleteState=function(){localStorage.removeItem("user")},this.create=function(a,f){this.uid=a,this.userRole=f||e.admin,b.put("uid",a),c.sendSuccess(d.sessionCreated,a)},this.destroy=function(){this.uid=null,this.userRole=null,this.deleteState(),b.remove("uid"),c.sendSuccess(d.sessionDeleted)}}]);var needbookApp=angular.module("needbookApp");needbookApp.service("ToolbarService",["$log","$rootScope",function(a,b){this.setPageTitle=function(a){b.pageTitle=a}}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("AuthorCardCtrl",["$scope",function(a){a.ctrlName="AuthorCardCtrl"}]),needbookApp.directive("authorCard",function(){return{restrict:"E",scope:{author:"="},templateUrl:"shared/author/authorCard.tmpl.html",controller:"AuthorCardCtrl"}});var needbookApp=angular.module("needbookApp");needbookApp.controller("BookCardCtrl",["$scope",function(a){a.ctrlName="BookCardCtrl"}]),needbookApp.directive("bookCard",function(){return{restrict:"A",scope:{book:"="},templateUrl:"shared/book/bookCard.tmpl.html",controller:"BookCardCtrl"}});var needbookApp=angular.module("needbookApp");needbookApp.controller("EmptyContentCtrl",["$scope",function(a){a.ctrlName="EmptyContentCtrl"}]),needbookApp.directive("emptyContent",function(){return{restrict:"E",scope:{icon:"@",text:"@"},templateUrl:"shared/core/empty-content/emptyContent.tmpl.html",controller:"EmptyContentCtrl"}});var needbookApp=angular.module("needbookApp");needbookApp.controller("LoadingCircleCtrl",["$scope",function(a){a.ctrlName="LoadingCircleCtrl"}]),needbookApp.directive("loadingCircle",function(){return{restrict:"E",scope:{loading:"="},templateUrl:"shared/core/loading-circle/loadingCircle.tmpl.html",controller:"LoadingCircleCtrl"}});var needbookApp=angular.module("needbookApp");needbookApp.controller("SearchInputCtrl",["$scope","$state","$stateParams",function(a,b,c){a.ctrlName="SearchInputCtrl",a.query=c.query||"",a.search=function(c){c.length>1&&b.go("app.search",{query:a.query})}}]),needbookApp.directive("searchInput",function(){return{restrict:"E",templateUrl:"shared/core/search/searchInput.tmpl.html",controller:"SearchInputCtrl"}});var needbookApp=angular.module("needbookApp");needbookApp.controller("SidenavCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("left").close().then(function(){d.debug("close LEFT is done")})},a.menu=[{subheader:"",links:[{title:"My Library",state:"app.library.books",icon:"my_library_books"},{title:"Top Books",state:"app.top_books",icon:"star"},{title:"Discover",state:"app.discover",icon:"explore"}]},{subheader:"Community",links:[{title:"Forum",state:"app.forum",icon:"forum"}]},{subheader:"Management",links:[{title:"Settings",state:"app.settings",icon:"settings"},{title:"Send feedback",state:"app.feedback",icon:"message"}]}]}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("SimpleToolbarCtrl",[function(){}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("LibraryToolbarCtrl",["_","$scope","$state","ToolbarService",function(a,b,c,d){function e(){var d=1;return a.find(b.tabs,function(a,b){return c.is(a.state)?(d=b,!0):void 0}),d}d.setPageTitle("My Library"),b.tabs=[{title:"Books",state:"app.library.books"},{title:"Series",state:"app.library.series"},{title:"Authors",state:"app.library.authors"},{title:"Favorites",state:"app.library.favorites"}],b.selectedIndex=e()}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("BookToolbarCtrl",["_","$log","$rootScope","$scope","$state","$stateParams",function(a,b,c,d,e,f){function g(){var b=1;return a.find(d.tabs,function(a,c){var d=a.state.split("(")[0];return e.is(d)?(b=c,!0):void 0}),b}var h="app.book",i='{ bookID: "'+f.bookID+'"}',j=h+".details("+i+")",k=h+".characters("+i+")",l=h+".places("+i+")";d.tabs=[{title:"Details",state:j},{title:"Characters",state:k},{title:"Places",state:l}],d.selectedIndex=g()}]),angular.module("authControllers",[]);var authControllers=angular.module("authControllers");authControllers.controller("LoginCtrl",["$log","$scope","AuthService",function(a,b,c){b.credentials={login:"",password:""},b.login=function(a){c.login(a)}}]);var authControllers=angular.module("authControllers");authControllers.controller("SignUpCtrl",["$scope","$mdToast","AUTH_EVENTS","AuthService",function(a,b,c,d){a.user={firstName:"",lastName:"",login:"",email:"",password:"",password_confirm:"",state:"validated"},a.signUp=function(a){d.register(a)},a.$on(c.registrationSuccess,function(){b.show(b.simple().position("bottom right").content("Registration Success"))}),a.$on(c.registrationFailed,function(){b.show(b.simple().position("bottom right").content("Registration Failure"))})}]),angular.module("authorControllers",[]);var authorControllers=angular.module("authorControllers");authorControllers.controller("AuthorListCtrl",["_","$scope","AuthorModel",function(a,b,c){var d=c;b.emptyMsg="No Authors found",b.isEmpty=!0,b.isLoading=!0,b.authors=d.query(function(c){b.isEmpty=a.isEmpty(c),b.isLoading=!1})}]);var authorControllers=angular.module("authorControllers");authorControllers.controller("AuthorDetailCtrl",["$scope","$stateParams","AuthorModel","ToolbarService",function(a,b,c,d){d.setPageTitle("Author");var e=c;a.books={},a.author=e.get({id:b.id},function(b){a.books=b.books,d.setPageTitle(b.names[0])})}]);var authorControllers=angular.module("authorControllers");authorControllers.controller("LibraryAuthorListCtrl",["_","$scope","AuthorModel",function(a,b,c){b.emptyMsg="No Authors found in your Library",b.isEmpty=!0,b.isLoading=!1,b.authors=[]}]),angular.module("bookControllers",[]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookListCtrl",["_","$rootScope","$scope","BookModel",function(a,b,c,d){var e=d;c.emptyMsg="No Books found",c.isEmpty=!0,c.isLoading=!0,c.books=e.query(function(b){c.isEmpty=a.isEmpty(b),c.isLoading=!1})}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookDetailCtrl",["_","$scope","$stateParams","BookModel","LibraryModel","ToolbarService",function(a,b,c,d,e,f){function g(c){var d=!1;return a.each(b.currentUser.library.books,function(a){a.edition.id===c&&(d=!0)}),d}f.setPageTitle("Book");var h=d,i=e;b.edition={},b.author={},b.added=!1,b.book=h.get({id:c.bookID},function(a){b.edition=a.editions[0],b.author=a.authors[0],b.added=g(b.edition.id),f.setPageTitle(b.book.title)}),b.addToLibrary=function(a){i.addBook({id:a},function(a){console.log(a),b.added=!0})},b.removeFromLibrary=function(a){i.removeBook({id:a},function(a){console.log(a),b.added=!1})}}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("LibraryBookListCtrl",["_","$scope","LibraryModel",function(a,b,c){var d=c;b.emptyMsg="No Books found in your Library",b.isEmpty=!0,b.isLoading=!0,b.books=d.query(function(c){b.books=a.map(c.books,function(b){var c=b.edition.book;return c.editions=[a.omit(b.edition,"book")],c}),b.isEmpty=a.isEmpty(c.books),b.isLoading=!1})}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("FavoriteBooksCtrl",["$scope","BookModel",function(a,b){a.icon="favorite",a.emptyMsg="No favorite Books",a.books=[]}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookCharacterListCtrl",["$rootScope","$scope","ToolbarService","$stateParams","BookCharacterModel",function(a,b,c,d,e){c.setPageTitle("Characters");var f=e;b.progress=!0,b.characters=f.query({bookID:d.bookID},function(){b.progress=!1})}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookCharacterDetailCtrl",["$rootScope","$scope","$stateParams","BookCharacterModel",function(a,b,c,d){var e=d;a.title="Character",b.character=e.get({bookID:c.id,charID:c.characterID},function(b){a.title=b.name})}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookCharacterEditCtrl",["_","$rootScope","$scope","ToolbarService","$state","$stateParams","$mdDialog","CharacterModel","BookCharacterModel","CharacterTraitModel","CharacterTraitTypeModel","CharacterLinkModel","CharacterLinkTypeModel","BookPlaceModel",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){function o(b,c,d,e,f){b.move=f||{from:null,to:null,begin_locations:[],end_locations:[]},b.places=e,b.closeDialog=function(){c.hide(b.move)},b.cancelDialog=function(){c.cancel()},b.querySearch=function(c){return c?b.places.filter(function(b){var d=!1;return a.each(b.traits.names.values.en_US,function(a){0===angular.lowercase(a).indexOf(angular.lowercase(c))&&(d=!0)}),d}):b.places}}function p(a,b,c,d){a.trait=d||{trait:null,values:{en_US:[]},begin_locations:[],end_locations:[]},a.closeDialog=function(){a.trait.values.length<=0||b.hide(a.trait)},a.cancelDialog=function(){b.cancel()},a.querySearch=function(a){return""===a?[]:k.search({q:a},function(a){return a}).$promise},a.addTraitValue=function(){a.newTraitValue&&""!==a.newTraitValue&&(a.trait.values.en_US.push(a.newTraitValue),a.newTraitValue="")},a.newTraitType=function(){b.show({templateUrl:"/components/book/character/bookCharacterAddTraitType.tmpl.html",controller:q}).then(function(b){a.trait.trait=b})["finally"](function(){c.addTraitDialog(a.trait)})}}function q(a,b,c){a.newTraitTypeValue="",a.trait_type={names:{en_US:""},possible_values:[],primary:!1,multiple:!0},a.closeDialog=function(){a.possibleValues||(a.trait_type.possible_values=[]),c.post(a.trait_type,function(a){b.hide(a)})},a.cancelDialog=function(){b.cancel()},a.addTraitTypeValue=function(){a.newTraitTypeValue&&""!==a.newTraitTypeValue&&(a.trait_type.possible_values.push(a.newTraitTypeValue),a.newTraitTypeValue="")}}function r(a,b,c,d,e,f){b.characters=e,b.link=f||{link:null,values:{en_US:[]},begin_locations:[],end_locations:[]},b.closeDialog=function(){b.link.values.length<=0||c.hide(b.link)},b.cancelDialog=function(){c.cancel()},b.querySearch=function(a){return""===a?m.query(function(a){return a}).$promise:m.search({q:a},function(a){return a}).$promise},b.characterSearch=function(c){return c?b.characters.filter(function(b){var d=!1;return a.each(b.traits.names.values.en_US,function(a){0===angular.lowercase(a).indexOf(angular.lowercase(c))&&(d=!0)}),d}):b.characters},b.addLinkValue=function(){b.newLinkValue&&""!==b.newLinkValue&&(b.link.values.en_US.push(b.newLinkValue),b.newLinkValue="")},b.newLinkType=function(){c.show({templateUrl:"/components/book/character/bookCharacterAddLinkType.tmpl.html",controller:s}).then(function(a){b.link.link=a})["finally"](function(){d.addLinkDialog(b.link)})}}function s(a,b,c){a.newLinkTypeValue="",a.link_type={names:{en_US:""},reverse_link_type:null,reverse_itself:!1},a.closeDialog=function(){a.link_type.reverse_itself===!0&&(a.link_type.reverse_link_type=null),c.post(a.link_type,function(a){b.hide(a)})},a.querySearch=function(a){return""===a?c.query(function(a){return a}).$promise:c.search({q:a},function(a){return a}).$promise},a.cancelDialog=function(){b.cancel()},a.addLinkTypeValue=function(){a.newLinkTypeValue&&""!==a.newLinkTypeValue&&(a.link_type.possible_values.push(a.newLinkTypeValue),a.newLinkTypeValue="")}}c.progress=!1,f.charID?d.setPageTitle("Edit character"):d.setPageTitle("New character"),c.character={traits:[],links:[]},c.loadCharacters=function(b){i.query({bookID:b},function(b){f.charID&&(b=a.filter(b,function(a){return a.id===f.charID})),c.characters=b})},c.loadPlaces=function(a){n.query({bookID:a},function(a){c.places=a})},c.loadCharacter=function(a,b){c.progress=!0,i.get({bookID:a,charID:b,simple:!1,"with":"traits,links,moves"},function(a){c.character=a,c.progress=!1})},f.charID&&c.loadCharacter(f.bookID,f.charID),f.bookID&&(c.loadCharacters(f.bookID),c.loadPlaces(f.bookID)),b.title="New Character",c.addTraitDialog=function(a){g.show({templateUrl:"/components/book/character/bookCharacterAddTrait.tmpl.html",locals:{parentScope:c,trait:a},controller:p}).then(function(a){c.character.traits.push(a)})},c.addLinkDialog=function(a){g.show({templateUrl:"/components/book/character/bookCharacterAddLink.tmpl.html",locals:{parentScope:c,link:a,characters:c.characters},controller:r}).then(function(a){c.character.links.push(a)})},c.addMoveDialog=function(a){g.show({templateUrl:"/components/book/character/bookCharacterAddMove.tmpl.html",locals:{parentScope:c,move:a,places:c.places
},controller:o}).then(function(a){c.character.moves.push(a)})},c.save=function(){0!==c.character.traits.length&&h.save({id:f.charID},c.character,function(a){i.save({bookID:f.bookID},{character:a.id},function(){e.go("app.book.character.edit",{bookID:f.bookID,charID:a.id})})})},c.hasKeys=function(a){var b=0;for(var c in a)b++;return 0!==b},o.$inject=["$scope","$mdDialog","parentScope","places","move"],p.$inject=["$scope","$mdDialog","parentScope","trait"],q.$inject=["$scope","$mdDialog","CharacterTraitTypeModel"],r.$inject=["_","$scope","$mdDialog","parentScope","characters","link"],s.$inject=["$scope","$mdDialog","CharacterLinkTypeModel"]}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookPlaceListCtrl",["$rootScope","$scope","ToolbarService","$stateParams","BookPlaceModel",function(a,b,c,d,e){c.setPageTitle("Places"),b.progress=!0,b.places=e.query({bookID:d.bookID},function(){b.progress=!1})}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookPlaceDetailCtrl",["$rootScope","$scope","$stateParams","BookPlaceModel",function(a,b,c,d){a.title="Place",b.character=d.get({bookID:c.id,charID:c.placeID},function(b){a.title=b.name})}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookPlaceEditCtrl",["_","$rootScope","$scope","$state","$stateParams","$mdDialog","PlaceModel","BookPlaceModel","PlaceTraitModel","PlaceTraitTypeModel",function(a,b,c,d,e,f,g,h,i,j){function k(a,b,c,d){a.trait=d||{trait:null,values:{en_US:[]},begin_locations:[],end_locations:[]},a.closeDialog=function(){a.trait.values.length<=0||b.hide(a.trait)},a.cancelDialog=function(){b.cancel()},a.querySearch=function(a){return""===a?[]:j.search({q:a},function(a){return a}).$promise},a.addTraitValue=function(){a.newTraitValue&&""!==a.newTraitValue&&(a.trait.values.en_US.push(a.newTraitValue),a.newTraitValue="")},a.newTraitType=function(){b.show({templateUrl:"/components/book/place/bookPlaceAddTraitType.tmpl.html",controller:l}).then(function(b){a.trait.trait=b})["finally"](function(){c.addTraitDialog(a.trait)})}}function l(a,b,c){a.newTraitTypeValue="",a.trait_type={names:{en_US:""},possible_values:[],primary:!1,multiple:!0},a.closeDialog=function(){a.possibleValues||(a.trait_type.possible_values=[]),c.post(a.trait_type,function(a){b.hide(a)})},a.cancelDialog=function(){b.cancel()},a.addTraitTypeValue=function(){a.newTraitTypeValue&&""!==a.newTraitTypeValue&&(a.trait_type.possible_values.push(a.newTraitTypeValue),a.newTraitTypeValue="")}}e.placeID?c.progress=!0:c.progress=!1,c.place={traits:[],coordinates:{}},c.loadPlaces=function(b){h.query({bookID:b},function(b){e.placeID&&(b=a.filter(b,function(a){return a.id===e.placeID})),c.places=b})},c.loadPlace=function(a,b){h.get({bookID:a,charID:b,simple:!1,"with":"traits"},function(a){c.place=a,c.progress=!1})},e.placeID&&c.loadPlace(e.bookID,e.placeID),e.bookID&&c.loadPlaces(e.bookID),b.title="New Place",c.addTraitDialog=function(a){f.show({templateUrl:"/components/book/place/bookPlaceAddTrait.tmpl.html",locals:{parentScope:c,trait:a},controller:k}).then(function(a){c.place.traits.push(a)})},c.save=function(){console.log(c.place),0!==c.place.traits.length&&g.save({id:e.placeID},c.place,function(a){h.save({bookID:e.bookID},{place:a.id},function(){d.go("app.book.place.edit",{bookID:e.bookID,placeID:a.id})})})},c.hasKeys=function(a){var b=0;for(var c in a)b++;return 0!==b},k.$inject=["$scope","$mdDialog","parentScope","trait"],l.$inject=["$scope","$mdDialog","PlaceTraitTypeModel"]}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("SearchCtrl",["_","$scope","$stateParams","$timeout","SearchModel","ToolbarService",function(a,b,c,d,e,f){f.setPageTitle("Search");var g=e;b.query=c.query,b.results={},b.isLoading=!0,b.isEmpty=!0;var h=function(b,c){return a.forEach(c,function(c){return a.has(b,c)?void 0:!1}),!0},i=function(b,c){var d=!0;return a.forEach(c,function(c){a.isEmpty(b[c])||(d=!1)}),d};d(function(){g.query({query:b.query},function(a){b.results=a,h(a,["author","book","serie","edition"])&&(b.isEmpty=i(a,["author","book","serie","edition"])),b.isLoading=!1})},500)}]),angular.module("serieControllers",[]);var serieControllers=angular.module("serieControllers");serieControllers.controller("SerieListCtrl",["$scope","SerieModel",function(a,b){a.emptyMsg="No Series found in your Library",a.isEmpty=!0,a.isLoading=!1,a.series=[]}]);var serieControllers=angular.module("serieControllers");serieControllers.controller("SerieDetailCtrl",["$scope","$stateParams","SerieModel","ToolbarService",function(a,b,c,d){d.setPageTitle("Serie");var e=c;a.serie=e.get({id:b.id},function(a){d.setPageTitle(a.name)})}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("HomeCtrl",[function(){}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("HomeToolbarCtrl",["$scope","$state",function(a,b){a.selectedIndex=b.is("home.login")?0:1}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("TopBooksCtrl",["$scope","ToolbarService",function(a,b){b.setPageTitle("Top Books"),a.books=[],a.emptyMsg="No Top Books found"}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("DiscoverCtrl",["_","$scope","BookModel","ToolbarService",function(a,b,c,d){d.setPageTitle("Discover");var e=c;b.emptyMsg="No Books found",b.isEmpty=!0,b.isLoading=!0,b.books=e.query(function(c){b.isEmpty=a.isEmpty(c),b.isLoading=!1})}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("ForumCtrl",["$scope","ToolbarService",function(a,b){b.setPageTitle("Forum")}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("SettingsCtrl",["$scope","$mdDialog","AuthService","ToolbarService",function(a,b,c,d){d.setPageTitle("Settings")}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("FeedbackCtrl",["$scope","ToolbarService",function(a,b){b.setPageTitle("Send feedback")}]);