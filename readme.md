listNavToSelect
================

### A jQuery plugin to convert lists into select fields

2012 by [Christian Doebler](http://www.christian-doebler.net/)

This plugin automates the process of creating navigations in
projects with responsive design


#### Examples

Convert list into select field using default values:
<pre>
$(".navigation").listNavToSelect();
</pre>

Convert list into select field and store it in element with class "container":
<pre>
$(".navigation").listNavToSelect({
	container_selector: ".container"
});
</pre>

Convert only first level of list into select field:
<pre>
$(".navigation").listNavToSelect({
	anchor_selector: "> li > a"
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

class_list_active       css class of active li element
						default: "active"

sub_options_indent      string to use per depth level when creation sub options which
                        were generated because of nested lists
                        default: "&nbsp;&nbsp;"

hide_list               flag to trigger visibility of source list
                        default: true

copy_list_classes       flag to trigger copy of list classes to select field
                        default: false

select_class            css class to add to select field
                        default: false
</pre>
