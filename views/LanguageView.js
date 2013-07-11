define(['backbone'], 
	function(Backbone){
		var LanguageView = Backbone.View.extend({
			_template:"#language_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			render: function(){
				this.$el.append(_.template($(this._template).html(),this.model));
 				return this;
			},
			toString:function(){
				return "[Language View]";
			}
		});
		return LanguageView;
	}
);