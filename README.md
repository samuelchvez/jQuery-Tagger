jQuery-Tagger
=============

Welcome to Tagger plugin for jQuery - a new jQuery plugin to create tags from simple input text. 
If you want to learn how to use this plugin, see the following sections.

1) Download
-----------
Goto the downloads section and get the latest build of jQuery Tagger. Also you can press the 
"Download repository as ZIP" button.

2) What's in?
-------------------------
Inside your downloaded directory, you have two versions of the plugin, the human friendly version
(jquery.tagger.js) and a production version (jquery.tagger.min.js). Choose the first if you want
to debug and test, but when you migrate your project to your production environment, make sure
you are using the minified version.

Also includes four examples (in the /example directory):

* **simple.html** - shows the most basic usage of the plugin. It does not deppends on external CSS rules.
* **rainbow.html** - shows the usage of the coloring function.
* **email.html** - shows the usage of the regex filtering option and the two callbacks includend as configuration.
* **autocomplete.html** - shows a simple integration of jQuery Tagger and the Autocomplete tool of jQuery UI. 

3) Usage
--------
If you already have jQuery linked, then you must simply link the jQuery Tagger plugin, create an
input text element and initiate the plugin:

    <script src="scripts/jquery.js"></script>
    <script type="text/javascript" src="scripts/jquery.tagger.min.js"></script>
    <input type="text" name="test" id="test" />
    <script type="text/javascript">jQuery("#test").tagger();</script>


Please reffer to the examples folder in your downloaded repo.

4) Enjoy!
---------
At this point you have a functional environment where you can use jQuery Tagger. For more details in the full
configuration strategies included in the plugin, please reffer to our project [WIKI](https://github.com/samuelchvez/jQuery-Tagger/wiki).