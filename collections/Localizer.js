define(['backbone', '../models/LanguageClass', '../views/LanguageView'], 
	function(Backbone, LanguageClass, LanguageView) {
		var Localizer = Backbone.Collection.extend({
			defaultLanguage:'fr',
			currentLanguage:'en',
			initialize: function(z) {
				for(var n in z){this[n]=z[n];}
				this.initLocalized();
			},
			setCurrentLanguage:function(toWhich){
				this.currentLanguage=toWhich;	
				this.controller.loadLocalized();
			},
			setLocalized:function(localizedURL){
				console.log(this.localizedURL + '=this.localizedURL and this=' + this)
				var me=this;
				$.getJSON( localizedURL, {
					format: "json"
				})
				.done(function( data ) {
					me.localized=data;
					me.controller.loadLocalized();
				})
			},
			initLocalized:function(){
				this.setLocalized(this.localizedURL); // localizedURL);
			},
			getLocalizedObj:function(whatLocale){
				return(this.localized[(whatLocale || this.currentLanguage || this.localized.defaultLanguage || this.defaultLanguage ||
					(window.navigator.userLanguage || window.navigator.language))]);
			},
			getLocalized:function(whatText, whatLocale){
				var whichLocale=(whatLocale || this.currentLanguage || this.localized.defaultLanguage || this.defaultLanguage ||
					(window.navigator.userLanguage || window.navigator.language));
				return(this.localized[whichLocale][whatText] || "");
			},
			toString:function(){
				return("Localizer");
			}
		});
		return Localizer;
	}
);