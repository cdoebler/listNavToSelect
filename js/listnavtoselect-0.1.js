/**
 * listNavToSelect - converts a list navigation into a select field
 *          2012 by Christian Doebler <info@christian-doebler.net>
 */
(function($){
	var methods = {
		dataPrefix : "listNavToSelect.",
		select : false,
		
		init : function($this, settings) {
			$($this)
				.each(function(){
					var keyTarget = methods.dataPrefix + "target";
					var keyHref = methods.dataPrefix + "href";
					
					var currentHref = methods.getHref();
					
					var listObj = $(this);
					var select = $(document.createElement("select"));
					
					// create select field
					$(settings.anchor_selector, this)
						.each(function() {
							var anchorObj = $(this);
							var target = $(this).attr("target");
							var href = this.href;
							var option = $(document.createElement("option"));
							
							// store target if it is set to _blank
							if (target == "_blank") {
								option.data(keyTarget, target);
								
								if (
									settings.class_target_blank !== false &&
									!option.hasClass(settings.class_target_blank)
								) {
									option.addClass(settings.class_target_blank);
								}
							}
							
							// set selected option
							if (href == currentHref) {
								select.val(href);
								option.attr("selected", "selected");
								select.data(keyHref, href);
							}
							
							option
								.appendTo(select)
								.val(href)
								.html(anchorObj.html());
						});
						
					// add change event to select field
					select
						.change(function() {
							var liObj = $(this).find(":selected");
							
							var target = liObj.data(keyTarget);
							var href = liObj.val();
							
							if (target == "_blank") {
								window.open(href);
								
								// restore previous option since we opened a new window
								href = select.data(keyHref);
								methods.selectOption(href);
								
							} else {
								window.location.href = href;
								select.data(keyHref, href);							
							}
						});

					// hide list element
					if (settings.hide_list) {
						listObj.hide()
					}

					// insert select field into content
					if (settings.container_selector !== false) {
						$(settings.container_selector).append(select);
					} else {
						select.insertBefore(listObj);
					}
					
					// store select field globally
					methods.select = select;
				});
		},
		
		selectOption : function(href, select) {
			if (select === undefined) {
				select = methods.select;
			}
			
			select.val(href);
			select
				.find("option")
				.each(function() {
					var option = $(this);					
					var value = option.val();
					
					if (value == href) {
						option.attr("selected", "selected");
					} else {
						option.removeAttr("selected");
					}
				});
		},
		
		getHref : function() {
			return window.location.href;
		}
	}
	
	$.fn.listNavToSelect = function(method, params, options) {
		if (method === undefined) {
			method = "init";
		}
		if (options === undefined && typeof params == "object") {
			options = params;
		}
		if (typeof method == "object") {
			options = method;
			method = "init";
		}
		
		var settings = $.extend( {
			"container_selector": false,
			"anchor_selector": "li a",
			"class_target_blank": false,
			"hide_list": true
		}, options);

		if (methods[method] !== undefined) {
			methods[method](this, settings);
		} else {
			console.log("Method " + method + " not defined in listNavToSelect!");
		}
		
		return this.each(function() {        
			var $this = $(this);
		});
	};
})(jQuery);
