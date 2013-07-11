define(['backbone'], 
	function(Backbone) {
		/*	Language Class 	*/
		var LanguageClass = Backbone.Model.extend({
			url:'../scripts/languages',
			defaults:{
				code:"",
				name:"",
				description:""
			}
		});
		return LanguageClass;
	}
);
