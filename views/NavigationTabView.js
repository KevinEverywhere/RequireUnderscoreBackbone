define(['backbone', '../views/ItemView'], 
	function(Backbone, ItemView){
		var NavigationTabView = Backbone.View.extend({
			_template:"#navigation_tab_template",
			initialize: function(config) {
				for(var n in config){this[n]=config[n];}
				this.render();
			},
			renderMyItem: function(){
				try{
					this.itemView.render();
				}catch(oops){
					this.itemView=new ItemView({controller:this.controller, model:this.model, el: "#itemContent",})
					this.itemView.on('chooseItem',this.itemView.chooseItem)
				}
			},
			setMyEl: function(){
				this._el=_.template($(this._template).html(),this.model.toJSON());
			},
			getMyEl: function(){
				return(this._el);
			},
			render: function(){
				this.setMyEl();
				this.$el.append(this._el);
				return this;
			},		
			events:{
				'click .navTab': 'choose'
			},
			choose: function(evt) {
				this.trigger('chooseItem', evt);
			},
			destroy: function() {
				console.log('detsory')
				this._el.remove();
			},
			chooseItem: function(event) {
				var evt = event || window.event;
			    var target = evt.target || evt.srcElement;
				if(this.model.get('id') == target.id){
					this.renderMyItem()
				}
			},
			toString:function(){
				return "[NavigationTab View]";
			}
		});
		return NavigationTabView;
	}
);
