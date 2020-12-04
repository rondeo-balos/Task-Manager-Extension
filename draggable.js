var data = null;
var x,y;
$('.tasks').on("dragstart",function(e){
	var startdrag = true;
	$('.ttask').click(function(){
		startdrag = false;
	});
	if(startdrag)
		startDrag(e,this);
});
startDrag = function(event,elem){
	event.preventDefault();
	data = elem;
	var cx = event.clientX;
	var cy = event.clientY;
	var ex = elem.getBoundingClientRect().left;
	var ey = elem.getBoundingClientRect().top;
	console.log(ex);
	x = cx - ex;
	y = cy - ey;
	x = x - 225;
}
document.onmousemove = function(event){
	event = event || window.event;
	var tx = event.clientX-x;
	var ty = event.clientY-y;
	localStorage.tx = tx;
	localStorage.ty = ty;

	var orig_left = $(".tasks")[0].getBoundingClientRect().left;
	var orig_top = $(".tasks")[0].getBoundingClientRect().top;
	var orig_width = $(".tasks")[0].getBoundingClientRect().width;
	var orig_height = $(".tasks")[0].getBoundingClientRect().height;
	if(data!=null)
		$(data).css({
			"left":tx+"px",
			"top":ty+"px"
		});
}
document.onmouseup = function(event){
	data = null;
}
$(document).ready(function(){
	var tx = 250;
	var ty = 0;
	$(".tasks").css({
		"left":tx+"px",
		"top":ty+"px"
	});
});