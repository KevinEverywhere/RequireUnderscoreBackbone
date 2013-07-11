define(['backbone'], 
	function(Backbone){
		var ItemView = Backbone.View.extend({
			_template:"#item_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			render: function(){
				console.log("ITEm render and " + this.controller)
				if(!this.controller.onePageThreshold()){
					location.href=this.model.get('link');
				}else{
					this.$el.html(_.template( $(this._template).html(), this.model.toJSON()));
				}
				return this;
			},		
			events: {
				'click #toLink': 'chooseItem'
			},
			chooseItem: function(evt) {
				/* This would likely have some processing before exiting the application in a real use scenario. */ 
				location.href=this.model.get('link');
			},
			toString:function(){
				return "[Item View]";
			}
		});
		return ItemView;
	}
);
