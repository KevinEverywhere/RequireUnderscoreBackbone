define(['backbone','../collections/LanguageCollection', '../views/LanguageView'], 
	function(Backbone, LanguageCollection, LanguageView){
		var LanguagesView = Backbone.View.extend({
			model:LanguageCollection,
			childViews:[LanguageView],
			_template:"#languages_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.model.fetch();
			},
			render: function(){
				this.$el.html(_.template($(this._template).html(),this.controller.loc.getLocalizedObj()));
				return this;
			},
			events: {
				'change #languageSelect': 'updateLanguage'
			},
			updateLanguage:function(evt){
				this.trigger('updateLanguage', evt.target.options[evt.target.selectedIndex].value );
			},
			toString:function(){
				return "[Languages View]";
			}
		});
		return LanguagesView;
	}
);
