/*
#0 show initial loading screen
#1 create wrapper instance
#2 detect browser & re-create UI
#3 create  search Page Instance -  if already created then reset it

*/


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



var gApp = {};

gApp.AppConstant ={

	INIT_STATE:0,
	PAGE_NAME:["landingPage","searchPage"]
}
//wrapper component
gApp.AppWrapper = function()
{
	this.appState = gApp.AppConstant.INIT_STATE;
	this.pageInstances = {};
	this.browserBasedChanges();
	this.setUp();

}

gApp.AppWrapper.prototype = {

	browserBasedChanges :function()
	{
	 //browser detection code
	},
	
	//add page to base page tracker	
	addPage:function(pageName,pageInstance)
	{
		if(this.pageInstances.hasOwnProperty(pageName))
		{
			//exist then overwrite
			this.pageInstances[pageName] = pageInstance;
		}
		else
		{
			//new
			this.pageInstances[pageName] = pageInstance;
		}
		
		// hide all page;
		var index =0;
		for(index=0;index<gApp.AppConstant.PAGE_NAME.length;index++)
		{
			document.getElementById(gApp.AppConstant.PAGE_NAME[index]).style.display="none";
		}
		
		
		//show the latest page 
		
		document.getElementById(pageName).style.display="block";
		
	},
	
	
	
	setUp:function()
	{
		//set to initial state
		this.appState = gApp.AppConstant.INIT_STATE;
		var pageInstance = new gApp.LandingPage();
		this.addPage("landingPage",pageInstance);
		
		
		// since no action on landing page redirect it to searchPage
		this.appState = 1;
		this.showPage()
	},
	
	showPage :function()
	{
		var pageInstance;
		switch(this.appState)
		{
			case 1:
				// RESET STATE
				pageInstance = new 	gApp.SearchPage();
				this.addPage(gApp.AppConstant.PAGE_NAME[this.appState],pageInstance);
				
			break;
		}
	}
	
}


gApp.SearchPage = function()
{
	this.setUp();
}

gApp.SearchPage.prototype = {

	setUp:function()
	{	
		//assign listener
		window.on("searchBtn","click",this.triggerSearchEvent.bind(this))
	},
	triggerSearchEvent:function(evt)
	{
		var validationByPassed =  this.validationCheck();
	},
	validationCheck:function()
	{
		var bReturn = true;
		//Origin City
		if(document.getElementById(""))
		
		//Destination 
		//startDate
		//endDate
		//passengers count
		
		return bReturn;
	}
	
}


gApp.LandingPage = function()
{
	this.setUp();
}

gApp.LandingPage.prototype = {

	setUp:function()
	{
		//set the initial page 
	}

}


//

gApp.AppModel = function()
{
	
}

var appInitialization = function()
{
	var app =  new gApp.AppWrapper();
}


window.on("","load",appInitialization)


/*
Testing Custom component

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
	
	var m1 =  new window.scroller({scrollerDiv:"slider_handle",barDiv:"slider_bar",slider:"slider","enablerDiv":"enableSliderBtn"})
}

*/







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
	this.enableBtnDiv =  attr.enablerDiv;
	this.currentMousePosition = 0;
	this.setUp()
}

//defining various methods for scroller
window.scroller.prototype = {

	// initial setting up
	setUp :function()
	{
		//add event listener
		//window.on(this.slider,"mousedown",this.scrollerMouseDown.bind(this));
		//window.on("","mouseup",this.scrollerMouseDown.bind(this));
		window.on(this.enableBtnDiv,"click",this.sliderBtnEnabaled.bind(this));
		window.on(this.slider,"mousemove",this.scrollerMouseDown.bind(this));
		//map  calculation
		
	},
	sliderBtnEnabaled:function(evt)
	{
	
		var str = document.getElementById(this.enableBtnDiv).innerHTML;
		if(str === "ON")
		{
			//enable
			document.getElementById(this.enableBtnDiv).innerHTML = "OFF";
			this.moveScroller = false;
		}
		else
		{
			// disable
			document.getElementById(this.enableBtnDiv).innerHTML = "ON";
			this.moveScroller = true;
		}
	}
	,
	scrollerMouseDown:function(evt)
	{
		switch(evt.type)
		{
			case "mousedown":
				// began movement;
				//this.currentMousePosition =evt.pageX;
				
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
				
			break;
		}
	}	
}




