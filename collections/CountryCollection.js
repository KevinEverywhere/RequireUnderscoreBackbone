define(['backbone','../models/CountryClass', '../views/CountryView'], 
	function(Backbone, CountryClass, CountryView) {
		var CountryCollection = Backbone.Collection.extend({
			defaultCountry:'en',
			currentCountry:'en',
			url:'scripts/countryMap.js',
			model:CountryClass,
			initialize: function(z) {
				for(var n in z){this[n]=z[n];}
				this.initCountryMap();
			},
			renderChildren:function(data){
				var me=this;
				$.each(data, function(i, arg ) {
					me.controller.countriesView.childViews[i]=new CountryView({el:"#countrySelect",controller:me.controller, model:arg});
				});
			},
			initCountryMap:function(){
				this.setCountryMap(this.controller.countryMapURL);
			},
			setCountryMap:function(countryMapURL){
				console.log("countryMapLoaded=" + countryMapURL)
				var me=this;
				$.getJSON( countryMapURL, {
					format: "json"
				}).always(function( data ) {
					me.countryMap=data;
					me.trigger("countryMapLoaded", eval(data.responseText));
				});
			},
			toString:function(){
				return("CountryCollection");
			}
		});
		return CountryCollection;
	}
);