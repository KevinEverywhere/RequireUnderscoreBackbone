define(['backbone','../models/LanguageClass', '../views/LanguageView'], 
	function(Backbone, LanguageClass, LanguageView) {
		var LanguageCollection = Backbone.Collection.extend({
			defaultLanguage:'en',
			currentLanguage:'es',
			url:'scripts/languageMap.js',
			model:LanguageClass,
			initialize: function(z) {
				for(var n in z){this[n]=z[n];}
				this.initLanguageMap();
			},
			renderChildren:function(data){
				var me=this;
				$.each(data, function(i, arg ) {
					me.controller.languagesView.childViews[i]=new LanguageView({el:"#languageSelect",controller:me.controller, model:arg});
				});
			},
			initLanguageMap:function(){
				this.setLanguageMap(this.controller.languageMapURL);
			},
			setLanguageMap:function(languageMapURL){
				var me=this;
				$.getJSON( languageMapURL, {
					format: "json"
				})
				.always(function( data ) {
					me.languageMap=data;
					me.trigger("languageMapLoaded", eval(data.responseText));
				});
			},
			toString:function(){
				return("LanguageCollection");
			}
		});
		return LanguageCollection;
	}
);