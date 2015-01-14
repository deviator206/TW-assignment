/*
 common functionality
*/
window.on = function( divName, evtType,evtHandler,directDom)
{	
	var domEle
	if(divName === "")
		domEle = window
	else	
		domEle =(directDom === undefined)?document.getElementById(divName):divName;
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

window.getHtmlTemplate = function(templateId,dataObject)
{
	//(?:^|[&;])quality=([^&;]+)/g
	var pattern,key,str = document.getElementById(templateId).innerHTML;
	for( key in dataObject)
		{
			pattern = "<%="+key+"=%>";
			str = str.replace(new RegExp(pattern),dataObject[key]);
		}
		return str;
}

window.empty = function(divId)
{
	//could be extended to detect from class name
	var i , domEle = document.getElementById(divId);
	for(i =0;i<domEle.childNodes.length;i++)
	{
		domEle.childNodes[i].remove();
	}
}

window.find = function(selector,object)
{
	//basic implementation just single level search
	var doc, innerDomEle, innerClassName, arrTracker =[], arrTemp =  selector.split("##"), i;
	doc =  document.getElementById(arrTemp[0]);
	for(i =0;i<doc.childNodes.length;i++)
	{
		if(arrTemp[1] !== undefined && arrTemp[1] !== "")
		{
			innerDomEle = doc.childNodes[i];
			innerClassName = innerDomEle.className;
			if(typeof innerClassName !== "undefined")
			{
				if(innerClassName.indexOf(arrTemp[1]) !== -1)
				{
					if(object === undefined)
					{
						arrTracker.push(innerDomEle);
					}
					else
					{
						window.on(innerDomEle,object.type,object.callbackFunction,true);	
					}
					
				}
			}
		}	
	};
	return (arrTracker.length > 1)?arrTracker:arrTracker[0];
};

window.removeAllChild = function(dom)
{
	for(var i =0 ;i<dom.childNodes.length;i++)
	{
		dom.childNodes[i].remove();
	}
}
window.testHTML5Works = function(elementName,propName)
{
	//return false;
	var testrange=document.createElement(elementName)
		testrange.setAttribute("type", propName) //set INPUT element to the type we're testing for
		if (testrange.type==propName){
			//browser supports range INPUT!
			return true;
		}
		return false;
}
