define(['backbone','../collections/CountryCollection', '../views/CountryView'], 
	function(Backbone, CountryCollection, CountryView){
		var CountriesView = Backbone.View.extend({
			model:CountryCollection,
			childViews:[CountryView],
			_template:"#countries_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.model.fetch();
			},
			render: function(){
				this.$el.html(_.template($(this._template).html(),this.controller.loc.getLocalizedObj()));
				return this;
			},
			events: {
				'change #countrySelect': 'updateCountry'
			},
			updateCountry:function(evt){
				this.trigger('updateCountry', evt.target.options[evt.target.selectedIndex].value );
			},
			toString:function(){
				return "[Countries View]";
			}
		});
		return CountriesView;
	}
);