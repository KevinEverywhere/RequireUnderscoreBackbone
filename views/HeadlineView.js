define(['backbone'], 
	function(Backbone){
		var HeadlineView = Backbone.View.extend({
			_template:"#headline_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			refreshStatus: function(whichProp, whichValue){
				this.setMyProp(whichProp, whichValue);
				this.render();
			},
			setMyProp: function(whichProp, whichValue){
				this.model[whichProp]=whichValue;
			},
			render: function(){
				var self=this;
				this.$el.html(_.template($(this._template).html(),this.model));
				return this;
			},
			toString:function(){
				return "[Headline View]";
			}
		});
		return HeadlineView;
	}
);
