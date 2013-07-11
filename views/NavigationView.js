define(['backbone'], 
	function(Backbone){
		var NavigationView = Backbone.View.extend({
			_templateInit:"#navigation_template_init",
			_template:"#navigation_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			render: function(){
				this.$el.html(_.template($(this._templateInit).html(),this.controller.loc.getLocalizedObj()));
				return this;
			},
			renderNew: function(){
				this.$el.html(_.template($(this._template).html(),this.controller.loc.getLocalizedObj()));
				return this;
			},
			toString:function(){
				return "[Navigation View]";
			}
		});
		return NavigationView;
	}
);
