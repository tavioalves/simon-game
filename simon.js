$(document).ready(function(){
	
	$("#switch-slot").click(function(){
		var switchValue = $("#switch")[0].className;
		var countValue = $("#screen-info");

		if(switchValue == "") {
			$("#switch").addClass("switch-on");
			countValue.text("--");
		} else {
			$("#switch").removeClass("switch-on");
			countValue.text("");
		}
	});

	$("#button-strict").click(function(){
		var ledStrict = $("#led-strict")[0].className;

		if(ledStrict == "") {
			$("#led-strict").addClass("led-on");
		} else {
			$("#led-strict").removeClass("led-on");
		}
	});

});
