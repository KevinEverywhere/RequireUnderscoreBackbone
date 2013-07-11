Require -> Underscore -> Backbone -> JQuery
=========================

By Kevin Ready, the example presents a single page application which uses the following frameworks and techniques.

Require: Module Loader for Application
JQuery: Base Utility, Selector and Browser Management
Underscore: Templating and General Purpose Utility
Backbone: Class Definition and Application Control
Responsive Design: Feature and Resolution Based Coding
Localization: A Backbone Based Solution for Localization
Script Injection: Safe Cross Domain Loading of Foreign URL Assets
Frameworks and Techniques

Framework selection

Each of the frameworks used serves a specific function for the application. Some individual full-featured frameworks, along with their accompanying CSS solutions, static or dynamic, may address all of the functions served by the combination used here. These were chosen due to their integration and wide community embrace and support. Among the salient features that a similar solution would want to address are module loading, templating, access to utility features like DOM selecting, object defining and populating, asynchronous data loading and localization.

Responsive Design in a Single Page Application

The templates.php file is included in the HEAD of the HTML document. It contains SCRIPT elements with 'type="text/template"' attributes that provide parameterized Underscore templates for runtime data insertion. These elements in conjunction with CSS-based media queries, which dynamically define the style definitions that a device will use for rendering a page, provide the application with a clean separation of data and display.

Localization

Once data and presentation are separated, the layer of abstraction for localization injection is easily accessed. Here, a Backbone collection named Localizer is used with the localized.js asset file to bind data to the presentation layer at runtime.

Script Injection: Safe Cross Domain

This application features two ajax loading mechanisms: one same-domain for loading the language and country menus; and one cross-domain, which injects SCRIPT elements at runtime in response to the server return from a Country selection query. These are viewed in the controller.js file, and these will need to be modified to work with distinct data sources. One must know the structure of the returned server file in order to know how to process its return. Often, the return is not a single node of XML or JSON, and one needs to traverse the structure to find the values that map to client-side classes. For instance, the same feed that works here often has nodes with image definition at one level deeper than the title and description contents. These can be individually discerned and mapped in the callback function if required for use in your application.

The Application

Initiating the Flow

In this example, a bare document (a link to a text copy of the PHP file follows this description) contains a single include file, housing all of the Underscore templates that the Backbone View Classes will use for rendering. In addition to the templates, it references a single CSS file, with all the style information that is required for the application to be experienced; and a single SCRIPT element which contains src and data-main attributes, the former being the pointer to the require JavaScript file, the latter pointing to the file that initiates the require framework. This file, main.js, works with require to preload necessary assets, the libraries contained in the libs directory, and then it launches the application by invoking the Controller at the bottom of the page.

The Controller

The Controller script in this application contains the majority of the business logic and the creation of the visual interface. The master template and the localizer are first loaded, and then, once the localized version of content is available, loadLocalized calls the create functions: the two select elements are based on collections, while the other views are associated with class or dynamic models. The Controller associates initial events with class instances. Additional events will be added by views in the case of the Country and Language select elements.

Models and Collections

These are defined on the Backbone site and elsewhere. Any processing of data should take place within the model, including value changes, as reflected in events.

Views

Views are used in many different fashions. This example is atomic in its design of views, others may not want to have views at as many levels as this example does. The highest level of nested views occurs at the pulldown menus. Their structures are MainView->LanguagesView->LanguageView. Notice that this does not need to be reflected in its DOM relationship. At each level, it is the #el property that determines which DOM element is associated with a View.

User events, like mouse and gesture events, are often managed at the view level. A View does not need a model to be displayed, and a model can support more than one view. Here, Views are mapped to Underscore templates that are found in the templates.php file. In the example, when you choose a country from the pull down, four new ItemClass instances are created. These first support the four NavigationTabView elements, and then they support the individual ItemView elements.

Libs, Scripts, Styles and Templates

The structure of the application is a simple one that can grow. One can use whatever makes sense to organize one's code and assets. As with all that you find in the example, there are some good, even best, practices outlined here, but each of us will have our own way that is most relevant or useful to the situation in which we find ourselves. Hopefully, the separation of files into their respected directories will be understandable to the reader.

Summary

This example should help readers quickly get up to speed on how to set up the beginning of a Backbone-based responsive website. There are many excellent resources out there. I hope that someone finds that this helps them at a point when they needed it.

Links

Text view of the Live Document - | - ZIP source code

All content created, copied or modified by Kevin Ready