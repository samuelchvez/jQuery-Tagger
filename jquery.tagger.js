(function($, window, undefined){
    
    $.fn.tagger = function(options){
        
        /**
         * @returns {boolean} true if the tag is accepted by regex. If not regex defined, then also returns true.
         * @param {String} lastValue last string readed to try to convert to tag
         * @param {Object} opts options of the plugin
         */
        function isValidTag(lastValue, opts){
            if(opts.acceptedTagRegex != undefined)
                return opts.acceptedTagRegex.test(lastValue);
            else
                if(opts.rejectedTagRegex != undefined)
                    return !opts.rejectedTagRegex.test(lastValue);
                else return true;
        }
        
        /**
         * @returns {void} nothing
         * @param {String} lastValue string with the new tag label
         * @param {Object} opts plugin options
         * @param {jQuery Object} $cur input object to apply tagger
         * @param {Input Hidden Element} $hidden object to manage the submit
         */
        function addTag(lastValue, opts, $cur, $hidden){
            // If it got a valid last value
            if(lastValue != undefined && lastValue != ""){
                
                // Check if the new string fits in the given RegExp in the configuration of the plugin
                if(isValidTag(lastValue, opts)){
                    // Create the close element
                    var $close = $("<a class='" + opts.closeClass + "'>" + opts.closeChar + "</a>").click(function(){
                        $(this).parent().remove();
                        
                        // When removing, don't forget to remove the entry in the hidden
                        $hidden.val($hidden.val().replace(lastValue + ",", ""))
                    });
                    
                    // Generate colors (if needed)
                    var colors = {}, styleString = "";
                    if(opts.useColorFunction){
                        colors = opts.colorFunction(lastValue);
                        styleString = "style='color:" + colors.font +";background-color:" + colors.background + ";'";
                    }
                    
                    // Add the tag
                    var $tag = $("<span class='" + opts.tagClass + "' "+ styleString +" >" + lastValue + "</span>").append($close);
                    $tag.insertBefore($cur);
                    
                    // Update hidden
                    $cur.next().val(lastValue + opts.separator + $cur.next().val());
                    
                    // Callback
                    opts.tagPlacedCallback($tag, lastValue);
                }
                else{
                    
                    // Rejected callback
                    opts.rejectedTagCallback($cur, lastValue);
                }
                
            }
        }
        
        // Options merge
        var opts = $.extend({}, $.fn.tagger.defaults, options);
        
        /**
         * Chainability
         */
        return this.each(function(){
            
            // Format input
            var $input = $(this); var iName = $input.attr("name");$input.attr("name", "tagger_old_" + iName);
            
            // Create hidden replace
            var $hidden = $("<input type='hidden' name='" + iName + "' />")
            
            // Fill new container
            var $inputContainer = $("<div class='" + opts.taggerWrapperClass + "'></div>");
            $input.replaceWith($inputContainer);$inputContainer.append($input).append($hidden);
            $inputContainer.click(function(){$input.focus();})
            
            // Initial state
            for(var i = 0; i < opts.startWith.length; i++)addTag(opts.startWith[i], opts, $input, $hidden);
            
            // Keydown event over the current input
            var clr = false;
            $input.keypress(function(event){
                
                // Input
                var $cur = $(this);
                
                // If a separator is detected
                if(event.which == opts.separator.charCodeAt(0)){
                    
                    // Get last value
                    var lastValue = $.trim($(this).val());
                    lastValue = lastValue.substr(0, lastValue.length);
                     
                    // Add tag
                    addTag(lastValue, opts, $cur, $hidden);
                    
                    // Clear input
                    $cur.val("");
                    clr = true;
                    return false;
                }
                return true;
            });
            
            // Keyup event over the current input
            $input.keyup(function(event){
                // Clear input
                if(clr){
                    $(this).val("");
                    clr = false;
                }
            });
        })
    }
    
    // Configuration defaults
    $.fn.tagger.defaults = {
        separator: ",", // Separator used to generate tags
        useColorFunction: true, // Indicates if is used a coloring function to color tags
        colorFunction: function(label){return {font:"#333", background:"#CCC"}}, // Returns bg and font color for tags
        startWith: new Array(), // Starting array of tags (for edition purposes)
        closeChar: "x", // Char used in the closing anchor of each tag
        tagClass: "tag", // CSS class for the span tag container
        taggerWrapperClass: "tagger-input-container", // CSS class for the div container
        closeClass: "close", // CSS class for the close anchor for each tag
        tagPlacedCallback: function($tag, stag){}, // Callback function called each time a tag is created
        rejectedTagCallback: function($input, stag){}, // Callback function called each time a tag is rejected
        acceptedTagRegex: undefined, // RegExp object to test new tags for acceptance. rejectedTagRegex is used only if acceptedTagRegex is undefined
        rejectedTagRegex: undefined // RegExp object to test new tags for rejection
    };
})(jQuery, window);
