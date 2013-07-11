define(['backbone'], 
	function(Backbone){
		var ItemsView = Backbone.View.extend({
			_template:"#items_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			render: function(){
				this.$el.html(_.template( $(this._template).html(), this.model));
				return this;
			},
			toString:function(){
				return "[Items View]";
			}
		});
		return ItemsView;
	}
);
