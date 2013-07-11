define(['backbone'], 
	function(Backbone) {
		var MainView = Backbone.View.extend({
			_template:"#master_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			render: function(){
				this.$el.append(_.template($(this._template).html(),{}));
 				return this;
			},
			toString:function(){
				return "[Main View]";
			}
		});
		return MainView;
	}
);