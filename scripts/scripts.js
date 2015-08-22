"use strict";function Author(a){this.EntityType="Author",angular.extend(this,a)}function Book(a){this.EntityType="Book",angular.extend(this,a)}function Client(a){this.EntityType="Client",angular.extend(this,a)}function Edition(a){this.EntityType="Edition",angular.extend(this,a)}function Search(a){this.EntityType="Search",angular.extend(this,a)}function Serie(a){this.EntityType="Serie",angular.extend(this,a)}function User(a){this.EntityType="User",this.Books=[],this.booksLoaded=!1,angular.extend(this,a),this.Firstname&&this.Lastname?this.Fullname=this.Firstname+" "+this.Lastname:this.Fullname=this.Firstname||this.Lastname,this.loadBooks=function(a,b){var c=this;c.booksLoaded?b():a.ofUser({userID:c.id},function(a){c.Books=a,c.booksLoaded=!0,b()})},this.addBook=function(a){this.Books.push(a)}}angular.module("needbookApp",["ngAnimate","ngAria","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","ngMdIcons","ui.router","app.ngResource","app.underscore","authorControllers","bookControllers"]).run(["$rootScope","$http","$cookies","ClientModel",function(a,b,c,d){d.connect(function(a){console.log("Connect"),console.log(a),console.log(c.getAll()),console.log("End")})}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("AppCtrl",["$rootScope","$scope","$timeout","$mdSidenav","$mdUtil","$log",function(a,b,c,d,e,f){function g(a){f.debug("buildToggler "+a);var b=e.debounce(function(){d(a).toggle().then(function(){f.debug("toggle "+a+" is done")})},200);return b}a.title="Page Title",b.toggleLeft=g("left"),b.toggleRight=g("right")}]);var needbookApp=angular.module("needbookApp");needbookApp.config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/library/books"),a.state("home",{url:"/home",data:{requireLogin:!1},views:{header:{templateUrl:"components/home/toolbar/homeToolbarView.html",controller:"HomeToolbarCtrl"},content:{templateUrl:"components/home/homeView.html"}}}).state("home.login",{url:"/login",views:{"content@":{templateUrl:"components/home/login/loginView.html",controller:"LoginCtrl"}}}).state("home.sign_up",{url:"/sign_up",views:{"content@":{templateUrl:"components/home/sign_up/signUpView.html"}}}).state("app",{"abstract":!0,data:{requireLogin:!0},views:{header:{templateUrl:"shared/core/toolbar/simpleToolbarView.html",controller:"SimpleToolbarCtrl"},sidenav:{templateUrl:"shared/core/sidenav/sidenavView.html",controller:"SidenavCtrl"}}}).state("app.book",{url:"/book/:id",views:{"content@":{templateUrl:"components/book/bookDetailView.html",controller:"BookDetailCtrl"}}}).state("app.author",{url:"/author/:id",views:{"content@":{templateUrl:"components/author/authorDetailView.html",controller:"AuthorDetailCtrl"}}}).state("app.library",{url:"/library","abstract":!0,views:{"header@":{templateUrl:"shared/core/toolbar/libraryToolbarView.html",controller:"LibraryToolbarCtrl"}}}).state("app.library.books",{url:"/books",views:{"content@":{templateUrl:"components/book/bookListView.html",controller:"BookListCtrl"}}}).state("app.library.authors",{url:"/authors",views:{"content@":{templateUrl:"components/author/authorListView.html",controller:"AuthorListCtrl"}}}).state("app.library.favorites",{url:"/favorites",views:{"content@":{templateUrl:"components/book/bookListView.html",controller:"FavoriteBooksCtrl"}}}).state("app.top_books",{url:"/top_books",views:{"content@":{templateUrl:"components/top_books/topBooksView.html",controller:"TopBookListCtrl"}}}).state("app.discover",{url:"/discover",views:{"content@":{templateUrl:"components/discover/discoverView.html",controller:"DiscoverCtrl"}}}).state("app.forum",{url:"/forum",views:{"content@":{templateUrl:"components/forum/forumView.html",controller:"ForumCtrl"}}}).state("app.settings",{url:"/settings",views:{"content@":{templateUrl:"components/settings/settingsView.html",controller:"SettingsCtrl"}}}).state("app.help",{url:"/help",views:{"content@":{templateUrl:"components/help/helpView.html",controller:"HelpCtrl"}}}).state("app.about",{url:"/about",views:{"content@":{templateUrl:"components/about/aboutView.html",controller:"AboutCtrl"}}})}]),angular.module("app.ngResource",["ngResource","ngCookies"]).factory("Resource",["$resource","$cookies",function(a,b){return function(c,d,e){var f=function(a){return angular.forEach(arguments,function(b){b!==a&&angular.forEach(b,function(b,c){a[c]&&a[c].constructor&&a[c].constructor===Object?f(a[c],b):a[c]=b})}),a};console.log("$cookies: "),console.log(b.getAll()),delete d.model;var g={post:{method:"POST"},patch:{method:"PATCH"},create:{method:"POST"},update:{method:"PUT",isArray:!1},query:{isArray:!0}};e=f({},g,e),d=angular.extend({id:"@id"},d);var h=a(c,d,e);return h.prototype.$save=function(){return this.id?this.$update():this.$create()},h}}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("config",[function(){var a="production",b={production:{apiUrl:"http://94.23.30.37:1337",clientName:"Admin",clientKey:"Ls5Peq5sfZcJHhkv54dfsdLg35HVfdff977fHF2S4354ZhkgyklMd5"},development:{apiUrl:"http://localhost:1337",clientName:"admin",clientKey:"admin"}};return b[a]}]);var needbookApp=angular.module("needbookApp");needbookApp.config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("teal").accentPalette("amber").warnPalette("red").backgroundPalette("grey")}]);var underscore=angular.module("app.underscore",[]);underscore.factory("_",["$window",function(a){return a._}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("AuthorModel",["_","Resource","config",function(a,b,c){function d(a){return new Author(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Author(a)})}return b(c.apiUrl+"/authors/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("BookModel",["_","Resource","config",function(a,b,c){function d(a){return new Book(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Book(a)})}return b(c.apiUrl+"/books/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("ClientModel",["_","Resource","config",function(a,b,c){function d(a){return new Client(angular.fromJson(a))}return b(c.apiUrl+"/auth/:client_id",{client_id:"@client_id"},{connect:{method:"GET",url:c.apiUrl+"/auth/"+c.clientName+"/"+c.clientKey},disconnect:{url:c.apiUrl+"/auth/stop"},create:{transformResponse:d}})}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("EditionModel",["_","Resource","config",function(a,b,c){function d(a){return new Edition(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Edition(a)})}return b(c.apiUrl+"/editions/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("SerieModel",["_","Resource","config",function(a,b,c){function d(a){return new Search(angular.fromJson(a))}return b(c.apiUrl+"/search",{},{query:{transformResponse:d}})}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("SerieModel",["_","Resource","config",function(a,b,c){function d(a){return new Serie(angular.fromJson(a))}function e(b){return a.map(angular.fromJson(b),function(a){return new Serie(a)})}return b(c.apiUrl+"/series/:id",{id:"@id"},{query:{transformResponse:e},get:{transformResponse:d}})}]);var needbookApp=angular.module("needbookApp");needbookApp.factory("UserModel",["_","Resource","config",function(a,b,c){function d(a){return new User(angular.fromJson(a))}return b(c.apiUrl+"/users/:id",{id:"@id"},{create:{method:"POST",transformResponse:d},login:{url:c.apiUrl+"/users/login/:username"},logout:{url:c.apiUrl+"/users/logout"},validateEmail:{url:c.apiUrl+"/user/validate/:login/:key",method:"POST"}})}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("SidenavCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("left").close().then(function(){d.debug("close LEFT is done")})},a.menu=[{subheader:"",links:[{title:"My Library",state:"app.library.books",icon:"my_library_books"},{title:"Top Books",state:"app.top_books",icon:"star"},{title:"Discover",state:"app.discover",icon:"explore"}]},{subheader:"Community",links:[{title:"Forum",state:"app.forum",icon:"forum"}]},{subheader:"Management",links:[{title:"Settings",state:"app.settings",icon:"settings"},{title:"Help & feedback",state:"app.help",icon:"help"},{title:"About",state:"app.about",icon:"business"}]}]}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("SimpleToolbarCtrl",[function(){}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("LibraryToolbarCtrl",["$rootScope","$scope","$state","$timeout","_",function(a,b,c,d,e){function f(){var a=1;return e.find(b.tabs,function(b,d){return c.is(b.state)?(a=d,!0):void 0}),a}a.title="Library",b.tabs=[{title:"Books",state:"app.library.books"},{title:"Authors",state:"app.library.authors"},{title:"Favorites",state:"app.library.favorites"}],b.selectedIndex=f()}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("BookCardCtrl",["$scope",function(a){a.ctrlName="BookCardCtrl"}]),needbookApp.directive("bookCard",function(){return{restrict:"E",scope:{details:"="},templateUrl:"shared/book_card/bookCard.tmpl.html",controller:"BookCardCtrl",link:function(a,b,c){var d=c.hovering||"md-whiteframe-z2";b.bind("mouseenter",function(){b.find("md-card").addClass(d)}),b.bind("mouseleave",function(){b.find("md-card").removeClass(d)})}}}),angular.module("bookControllers",[]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookListCtrl",["$rootScope","$scope","BookModel",function(a,b,c){b.selectedIndex=1,b.tabs=[{title:"Now Reading",templateUrl:"components/library/readingListView.html"},{title:"Books",templateUrl:"components/library/bookListView.html"},{title:"Authors",templateUrl:"components/library/authorsListView.html"},{title:"Favorites",templateUrl:"components/library/favoritesListView.html"}];var d=c;b.books=d.query()}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("BookDetailCtrl",["$rootScope","$scope","$stateParams","BookModel",function(a,b,c,d){var e=d;a.title="Book",b.author={},b.edition={},b.book=e.get({id:c.id},function(c){b.author=c.authors[0],b.edition=c.editions[0],a.title=b.book.title})}]);var bookControllers=angular.module("bookControllers");bookControllers.controller("FavoriteBooksCtrl",["$rootScope","$scope","BookModel",function(a,b,c){var d=c;b.books=d.query()}]),angular.module("authorControllers",[]);var authorControllers=angular.module("authorControllers");authorControllers.controller("AuthorListCtrl",["$rootScope","$scope","AuthorModel",function(a,b,c){var d=c;b.author=d.query()}]);var authorControllers=angular.module("authorControllers");authorControllers.controller("AuthorDetailCtrl",["$rootScope","$scope","$stateParams","AuthorModel",function(a,b,c,d){var e=d;b.author=e.get(c.id),a.title=b.author.name}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("HomeCtrl",[function(){}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("LoginCtrl",["$scope","$cookies","ClientModel","UserModel",function(a,b,c,d){a.submit=function(a,e){c.connect(),console.log(b.getAll());var f=d.login({username:a,login:a,password:e},function(a){console.log("Success:"),console.log(a)},function(a){console.log("Failed:"),console.log(a)});console.log(f)}}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("SignUpCtrl",[function(){}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("HomeToolbarCtrl",["$scope","$state",function(a,b){a.selectedIndex=b.is("home.login")?0:1}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("TopBooksCtrl",["$rootScope","$scope",function(a,b){a.title="Top Books"}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("DiscoverCtrl",["$rootScope","$scope",function(a,b){a.title="Discover"}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("ForumCtrl",["$rootScope","$scope",function(a,b){a.title="Forum"}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("SettingsCtrl",["$rootScope","$scope",function(a,b){a.title="Settings"}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("HelpCtrl",["$rootScope","$scope",function(a,b){a.title="Help"}]);var needbookApp=angular.module("needbookApp");needbookApp.controller("AboutCtrl",["$rootScope","$scope",function(a,b){a.title="About"}]);