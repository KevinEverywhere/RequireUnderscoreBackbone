define([
	'../views/MainView',
	'../views/NavigationView',
	'../views/NavigationTabView',
	'../views/ItemView',
	'../views/LanguageView',
	'../views/LanguagesView',
	'../views/CountryView',
	'../views/CountriesView',
	'../views/ItemsView',
	'../views/DescriptionView',
	'../views/HeadlineView',
	'../models/MainClass',
	'../models/ItemClass',
	'../models/NavigationClass',
	'../models/LanguageClass',
	'../collections/LanguageCollection',
	'../collections/CountryCollection',
	'../collections/Localizer'
], function(
	MainView,
	NavigationView,
	NavigationTabView,
	ItemView,
	LanguageView,
	LanguagesView,
	CountryView,
	CountriesView,
	ItemsView,
	DescriptionView,
	HeadlineView,
	MainClass,
	ItemClass,
	NavigationClass,
	LanguageClass,
	LanguageCollection,
	CountryCollection,
	Localizer
){
	var Controller = Backbone.Model.extend({
		localizedURL:'scripts/localized.js',
		languageMapURL:'scripts/languageMap.js',
		countryMapURL:'scripts/countryMap.js?callback=?',
		maxReturn:4, // The number is set to 4, because this is the number of results from the yahooapis search below. 
		undisplayableContent:[],
		maxAttempts:5,
		currentAttempt:0,
		currentIndex:0,
		navigationTabs:[],
		isSearching:false,
		languagesView:null,
		minWidth:731,
		minHeight:431,
		initialize: function(config) {
			this.config = config;
			this.createMain();
			this.createLocalizer()
		},
		createMain: function() {
			var self = this;
			this.mainClass=new MainClass({controller:self}); 
			this.mainView=new MainView({el:"body",controller:self, model:MainClass});
		},	
		createLocalizer: function() {
			var self = this;
			this.loc=this.localizer=new Localizer({controller:self, localizedURL:self.localizedURL}); 
			this.localizer.on("localizeLoaded", self.loadLocalized);
		},
		loadLocalized: function(evt) {
			with(this){
				createDescription();
				createNavigation();
				createItems();
				createHeadline();
				createCountries();
				createLanguages();
			}
		},
		createDescription: function() {
			var self = this;
			this.descriptionView=new DescriptionView({el:"#descriptionTemplate",controller:self, 
			 	model:{description:self.loc.getLocalized("description")}
			});
 		},
		createNavigation: function() {
			var self = this;
			this.navigationClass=new NavigationClass({controller:self});
			this.navigationView = new NavigationView({el: "#navigationTemplate", controller:self, model:NavigationClass});
		},
		createItems: function() {
			var self = this;
			this.itemsView = new ItemsView({el: "#itemPane", controller:self, model:{itemDefault:self.loc.getLocalized("itemDefault")}});
		},
		createHeadline: function() {
			var self=this;
			this.headlineView=new HeadlineView({el:"#headlineTemplate",controller:self, model:{statusText:self.loc.getLocalized("statusText")}});
		},
		createLanguages: function() {
			var self = this;
			this.lc=this.languageCollection=new LanguageCollection({controller:self, languageMap:self.languageMapURL}); 
			this.languagesView=new LanguagesView({el:"#languageTemplate",controller:self, model:this.languageCollection});
			this.languageCollection.on("languageMapLoaded", self.bindLanguages, this);
			this.languagesView.on("updateLanguage", self.updateLanguage, this);
		},
		bindLanguages: function(data) {
			with(this){
				languagesView.render();
				lc.renderChildren(data);
			}
		},
		updateLanguage: function(data) { 
			this.loc.setCurrentLanguage(data);
 		},
		createCountries: function() {
			var self = this;
			this.cc=this.countryCollection=new CountryCollection({controller:self, countryMap:self.countryMapURL}); 
			this.countriesView=new CountriesView({el:"#countryTemplate",controller:self, model:this.countryCollection});
			this.countryCollection.on("countryMapLoaded", self.bindCountries);
			this.countriesView.on("updateCountry", self.initSearch, this);
		},
		bindCountries: function(data) {
			with(this.controller){
				countriesView.render()
				cc.renderChildren(data);
			}
		},
		initSearch:function(queryString){
			if(this.isSearching==false){
				this.cleanTabs();
				this.refreshHeadline("Attempt " + 
					(this.currentAttempt + 1) + " of " + this.maxAttempts + " searching for " + 
					queryString.substring(0,15) + "...")
				var me=this;
				$.getJSON( this.refreshURL(queryString), {
					format: "json"
				})
				.done(function( data ) {
					me.currentAttempt++;
					try{
						$.each( data.query.results.results, function( i, result ) {
							try{
								me.undisplayableContent.push(new ItemClass({
									id:"nav" + i,
									title:result.title,
									link:result.unescapedUrl,
									description:result.content
								}));
							}catch(inneroops){
								console.log('inneroops=' + inneroops);
							}
						});
						(data.query.results.results.length > 0) ?  
						me.refreshHeadline("Query loaded.") : me.refreshHeadline("No items found.");
						me.currentAttempt=0;
						me.isSearching=false;
						me.populateCurrentTabs();
					}catch(oops){
						console.log('oops=' + oops);
						if(me.currentAttempt<me.maxAttempts){
							var timer=1000;
							me.isSearching=false;
							setTimeout(function(){
								me.initSearch(queryString);
							},timer);
						}else{
							me.currentAttempt=0;
							me.isSearching=false;
							me.refreshHeadline("No articles found in " + me.maxAttempts + " attempts.");
						}
					}
				});
			}
		},
		refreshHeadline: function(what) {
			this.headlineView.refreshStatus("statusText", what)
		},
		updateViews: function(data) {
			this.createMain();
			this.createLanguages();
			this.bindLanguages();
			if(data){this.lc.renderChildren(data);}	
		},
		currentTabs:function(){
			return(this.undisplayableContent.slice(this.currentIndex,this.maxReturn));
		},
		onePageThreshold:function(){
			/* 
				This is a temporary include to handle items from small displays. This determines whether
				to show a headline and link, or to take the user directly to the page.
			*/
			var z=false,
			w=(document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth),
			h=(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight);
			if((w>this.minWidth) && (h>this.minHeight)){
				z=true;
			}
			return z;
		},
		refreshURL:function(searchString){
			/* This needs to be modified to work with other data sources. */
			newsString='http://query.yahooapis.com/v1/public/yql?q=';
			newsString+='select%20*%20from%20google.news%20where%20q%20%3D%20%22Country,';
			newsString+=escape(searchString);
			newsString+='%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?';
			return(newsString);
		},
		cleanTabs:function(){
			this.undisplayableContent=this.navigationTabs=[];
			this.navigationView.renderNew();
			this.isSearching=true;
		},
		populateCurrentTabs:function(){
			var me=this;
			if(! (this.maxReturn > this.navigationTabs.length)){
				$.each(me.currentTabs(), function( i, item ) {
					me.navigationTabs.push(new NavigationTabView({controller:me, model:item, el: "#theNav",}))
					me.navigationTabs[me.navigationTabs.length-1].on('chooseItem', 
					me.navigationTabs[me.navigationTabs.length-1].chooseItem);
				})
			}
		},
		toString:function(){
			return "[Controller]";
		}
	});
	return Controller;
});