define(['backbone', '../models/ItemClass'], 
	function(Backbone, ItemClass) {
		var NavigationClass = Backbone.Model.extend({
			items:[ItemClass]
		});
		return NavigationClass;
	}
);