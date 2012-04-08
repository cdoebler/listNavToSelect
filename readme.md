listNavToSelect
================

### A jQuery plugin to convert lists into select fields

2012 by [Christian Doebler](http://www.christian-doebler.net/)


#### Examples

Convert list into select field using default values:
<pre>
$(".navigation").listNavToSelect();
</pre>

Convert list into select field and store it in element with class "container"
<pre>
$(".navigation").listNavToSelect({
	container_selector: ".container"
});
</pre>


#### Settings
<pre>
container_selector      jQuery selector for the container element for the select field
                        default: false (select field is inserted before list)

anchor_selector         jQuery selector for anchor elements in source list
                        default: "li a"

class_target_blank      css class for options which should open a new window
                        default: false

hide_list               flag to trigger visibility of source list
                        default: true
</pre>
