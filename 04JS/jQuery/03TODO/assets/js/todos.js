$("ul").on("click", "li", function(){
	$(this).toggleClass("done");
});

$("ul").on("click", "span", function(e){
	$(this).parent().toggleClass("done").fadeOut("slow", function(){
		$(this).remove();
	});
	e.stopPropagation();
});

$("input[type='text']").keypress(function(e){
	if (e.which === 13) { // enter key
		addItem($(this).val());
	}
});

function addItem(text) {
	if (text) {
		$("ul").append("<li><span>X</span>" + text + "</li>");
	}
}