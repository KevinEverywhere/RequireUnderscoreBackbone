define(['backbone'], 
	function(Backbone) {
		/*
			Empty Class for holding any necessary item-based methods, properties
		*/
		var ItemClass = Backbone.Model.extend({
			defaults:{
				id:"",
				url:"",
				width:0,
				height:0,
				title:"",
				link:"",
				description:""
			}
		});
		return ItemClass;
	}
);
