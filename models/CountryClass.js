define(['backbone'], 
	function(Backbone) {
		/*	Country Class 	*/
		var CountryClass = Backbone.Model.extend({
			defaults:{
				code:"",
				name:"",
				description:""
			}
		});
		return CountryClass;
	}
);
