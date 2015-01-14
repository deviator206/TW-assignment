//wrapper component
gApp.AppWrapper = function()
{
	this.appState = gApp.AppConstant.INIT_STATE;
	this.pageInstances = {};
	this.browserType = 0 ; // 0 -- rest  and 1 -- old IE
	this.browserBasedChanges();
	this.setUp();

}

gApp.AppWrapper.prototype = {

	browserBasedChanges :function()
	{
		 //browser detection code
		 var browserVersion  = this.getIE();
		 this.browserType = 0 ;
		 if(typeof browserVersion !== undefined && typeof browserVersion !== "boolean" )
		 {
			 if(browserVersion < 11)
			 {
				this.browserType = 0;
			 }
			 else
			 {
				this.browserType = 1;
			 }
		 }
	},
	getIE :function() {
		  var myNav = navigator.userAgent.toLowerCase();
		  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
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
		this.showPage();
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




var appInitialization = function()
{
	var app =  new gApp.AppWrapper();
}


window.on("","load",appInitialization)



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




