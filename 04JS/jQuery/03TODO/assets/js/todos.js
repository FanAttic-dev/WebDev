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

$("#addIcon i").click(function(){
	$("input[type='text']").slideToggle();
});

function addItem(text) {
	if (text) {
		$("ul").append("<li><span><i class='far fa-trash-alt'></i></span>" + text + "</li>");
	}
}