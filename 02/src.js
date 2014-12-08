window.onload = function()
{
	document.getElementById("startDateComponent").addEventListener("click",function(evt)
	{
		document.getElementById("dateController").style.display ="block";
		document.getElementById("dateController").style.marginTop = getPosition(document.getElementById(evt.currentTarget.id)).y +"px";
	});
	
	
	document.getElementById("endDateComponent").addEventListener("click",function(evt)
	{
		document.getElementById("dateController").style.display ="block";
		document.getElementById("dateController").style.marginTop = getPosition(document.getElementById(evt.currentTarget.id)).y +"px";
	});
}





function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}