   (function( $ ){ 
        "use strict";
        
        var speed = 500; // Default animation speed in milliseconds (1000 = 1 second)

        function gimmePrefix(prop){
          var prefixes = ['Moz','Khtml','Webkit','O','ms'],
              elem     = document.createElement('div'),
              upper    = prop.charAt(0).toUpperCase() + prop.slice(1);
         
          if (prop in elem.style) {
            return prop;
          }
                
          for (var len = prefixes.length; len--; ){
            if ((prefixes[len] + upper)  in elem.style) {
              return (prefixes[len] + upper);
            }
          }
          
         
          return false;
        }                 

        var prefixedProperty = gimmePrefix('transition');
        var vendorRegex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
        
        var vendorMatches = prefixedProperty ? prefixedProperty.match(vendorRegex) : null;
        var vendor = ( vendorMatches != null  ? prefixedProperty.match(vendorRegex)[0] : "");

        var transitionEnd;

        switch(vendor){
            case "Webkit":
                transitionEnd = "webkitTransitionEnd";
                break;
            case "Moz":
                transitionEnd = "transitionend";
                break;
            case "O":
                transitionEnd = "oTransitionEnd";
                break;
            default:
                transitionEnd = "TransitionEnd";
        }

        function animate2(object, cssProperties, callback, ms) {
            if (!ms) {
                ms = speed;
            }
            
            if (prefixedProperty) {

                object.css(prefixedProperty, "all "+ms+"ms ease-in-out");
                
                object.css(cssProperties);

                if ($.isFunction(callback)) {
                    object.bind(transitionEnd,function(e){
                         console.log(e);
                         object.unbind(transitionEnd);
                         setTimeout(callback, 0);
                         callback = null;
                    });
                }
                
            } else {
                if ($.isFunction(callback)) {       
                    object.animate(cssProperties, ms, callback);
                } else {
                    object.animate(cssProperties, ms);          
                }
            }
        }

        $.fn.animate2 = function(_cssProperties, _callback, _ms){
            animate2($(this), _cssProperties, _callback, _ms);
        };

})(jQuery);
