/**
 * listNavToSelect - converts a list navigation into a select field
 * 
 * 2012 by Christian Doebler <info@christian-doebler.net>
 * 
 * Copyright 2012
 * licensed under the MIT License
 * Do not remove this copyright notice
 * 
 * Thanks,
 * Christian
 */
(function($){
	var methods = {
		dataPrefix : "listNavToSelect.",
		settings : false,
		select : false,
		
		init : function($this, settings) {
			methods.settings = settings;

			$($this)
				.each(function(){					
					var currentHref = methods.getHref();
					
					var listObj = $(this);
					var select = $(document.createElement("select"));
					
					// store list object for further manipulation
					methods.setData(select, "list", listObj);
					
					// create select field
					$(settings.anchor_selector, this)
						.each(function() {
							var anchorObj = $(this);
							var liObj = anchorObj.parents("li:first");
							var target = $(this).attr("target");
							var href = this.href;
							var option = $(document.createElement("option"));
							
							// store list element
							methods.setData(option, "li", liObj);
							
							// store target if it is set to _blank
							if (target == "_blank") {
								methods.setData(option, "target", target);
								
								if (
									settings.class_target_blank !== false &&
									!option.hasClass(settings.class_target_blank)
								) {
									option.addClass(settings.class_target_blank);
								}
							}
							
							// set selected option
							var active = liObj
											.hasClass(settings.class_list_active);
							if (active) {
								select.val(href);
								option.attr("selected", "selected");
								methods.setData(select, "href", href);
								methods.setData(select, "active_li", liObj);
							}
							
							option
								.appendTo(select)
								.val(href)
								.html(anchorObj.html());
								
							// add update of select when clicking link
							anchorObj.click(function() {
								if (target != "_blank") {
									var previousActiveLi = methods.getData(select, "active_li");
									previousActiveLi.removeClass(settings.class_list_active);

									// update select field
									methods.selectOption(href, select);

									// update class of li
									liObj.addClass(settings.class_list_active);

									// update select field
									methods.updateSelect(select);
								}
							});
						});
						
					// add change event to select field
					select
						.change(function() {
							methods.updateSelect($(this));
						});

					// hide list element
					if (settings.hide_list) {
						listObj.hide();	
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
		
		updateSelect : function(select) {
			var optionSelected = select.find(":selected");

			var target = methods.getData(optionSelected, "target");
			var href = optionSelected.val();

			if (target == "_blank") {
				window.open(href);

				// restore previous option since we opened a new window
				href = methods.getData(select, "href");
				methods.selectOption(href);

			} else {
				window.location.href = href;
				methods.setData(select, "href", href);	
				methods.updateLi(select, optionSelected);
			}			
		},
		
		updateLi : function(select, option) {
			if (option === undefined) {
				option = select.find(":selected");
			}
			
			var settings = methods.settings;
			var liObjPrev = methods.getData(select, "active_li");
			var liObj = methods.getData(option, "li");
			
			liObjPrev.removeClass(settings.class_list_active);
			liObj.addClass(settings.class_list_active);
			
			methods.setData(select, "active_li", liObj);
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
		},
		
		setData : function(obj, key, value) {
			return obj.data(methods.datarefix + key, value);
		},
		
		getData : function(obj, key) {
			return obj.data(methods.datarefix + key);
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
			"class_list_active": "active",
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
