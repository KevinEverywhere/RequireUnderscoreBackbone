require.config({
	paths: {
		backbone:'../libs/backbone-min',
		underscore:'../libs/underscore.min',
		jquery:'../libs/jquery-1.9.1'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	},
	deps: ['jquery', 'underscore'],
	modules: [{
			name: 'app',
			include: [
				'jquery'
			]
		},{
			name: 'controller',
			exclude: ['app']
		}
	]
	,toString:function(){
		return "[Application]";
	}
});

define([
	'backbone',
	'underscore',
	'controller'
], function(
	Backbone,
	_,
	Controller
){
	$(function(){
		var appController = new Controller({
			container: 'body'
		});
	});
});
