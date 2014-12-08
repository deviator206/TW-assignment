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
	
	
	
	//page setup
	
	var m1 =  new window.scroller({scrollerDiv:"slider_handle",barDiv:"slider_bar",slider:"slider"})
}









/*
scroller functionality:

*/

//initialization code
window.scroller = function (attr)
{
	this.slider = attr.slider;
	this.scrollerDiv = attr.scrollerDiv;
	this.barDiv = attr.barDiv;
	this.moveScroller = false;
	this.speed = 0.2;
	this.currentMousePosition = 0;
	this.setUp()
}

//defining various methods for scroller
window.scroller.prototype = {

	// initial setting up
	setUp :function()
	{
		//add event listener
		window.on(this.slider,"mousedown",this.scrollerMouseDown.bind(this));
		window.on("","mouseup",this.scrollerMouseDown.bind(this));
		window.on(this.slider,"mousemove",this.scrollerMouseDown.bind(this));
		//map  calculation
		
	}
	,
	scrollerMouseDown:function(evt)
	{
		switch(evt.type)
		{
			case "mousedown":
				// began movement;
				//this.currentMousePosition =evt.pageX;
				this.moveScroller = true;
			break;
			case "mouseup":
				// stop movement
				this.moveScroller = false;
				console.log(" mouse up");
			break;
			case "mousemove":
				if(this.moveScroller)
				{
					if(this.currentMousePosition  < evt.pageX)
					{
						if(document.getElementById(this.scrollerDiv).offsetLeft < 249)
						{
							// moving right
							console.log(" right");
							document.getElementById(this.scrollerDiv).style.marginLeft = this.currentMousePosition+"px";
							this.currentMousePosition = evt.pageX
						}	
					}
					else
					{
						
						
						if(document.getElementById(this.scrollerDiv).offsetLeft > 43)
							{	
								// moving left
								document.getElementById(this.scrollerDiv).style.marginLeft = this.currentMousePosition+"px";
								this.currentMousePosition = evt.pageX;
							}
					}
					
					
					
					//detect moving left or right
					
				}
				else
				{
					//
					
				}
			break;
		}
	}	
}




/*
 common functionality
*/
window.on = function( divName, evtType,evtHandler)
{	
	var domEle
	if(divName === "")
		domEle = window
	else	
		domEle = document.getElementById(divName);
		if (domEle !== undefined && domEle.attachEvent) {
			domEle.attachEvent("on" + evtType, evtHandler);
		} else if (domEle !== undefined) {
			domEle.addEventListener(evtType, evtHandler);
		}
}


window.getPosition = function(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}
