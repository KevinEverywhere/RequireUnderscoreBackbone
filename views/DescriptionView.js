define(['backbone'], 
	function(Backbone){
		var DescriptionView = Backbone.View.extend({
			_template:"#description_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			render: function(){
				this.$el.html(_.template($(this._template).html(),this.model));
 				return this;
			},
			toString:function(){
				return "[Description View]";
			}
		});
		return DescriptionView;
	}
);