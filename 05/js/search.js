
gApp.SearchPage = function()
{
	this.resetPageParams();
	this.setUp();
}

gApp.SearchPage.prototype = {

	resetPageParams:function()
	{
		this.nPassengerCount = 1;
		this.supportsDateInput =false;
		this.supportsRangeInput =false;	
		this.restrictProcessing = false;
	},
	setUp:function()
	{
		//render 
		this.setTabListeners();	
		//search Origin City
		document.getElementById("originName").value= "";
		document.getElementById("destinationName").value= ""
		//passenger counter component
		this.setUpPassengerCountComponent()
		//set date components
		this.setUpDateComponent();
		
		this.setUpCostFilter();
		this.populateFlightList(gApp.AppConstant.SEARCH_RESULT,gApp.AppConstant.SEARCH_RESULT_METADATA);
		
		
	},
	
	setUpCostFilter :function()
	{
		if(window.testHTML5Works("input","date"))
		{
			// WORKS so use regular 
			this.supportsRangeInput =true;	
		}
		else
		{
			this.supportsRangeInput =false;
			window.empty("filterCost");
			
			var sT = window.getHtmlTemplate("qtyComponentTemplate",{});
			document.getElementById("filterCost").innerHTML = sT;	
			
				
		}
	},
	setUpDateComponent :function()
	{
		//set the support
		if(window.testHTML5Works("input","date"))
		{
			// WORKS so use regular 
			this.supportsDateInput =true;	
		}
		else
		{
			// Change the OutPut
			this.supportsDateInput =false;
			//empty the dom
			window.empty("startDateComponent");
			window.empty("endDateComponent");
			//create new dom element from html template
			var sT = window.getHtmlTemplate("dateComponentTemplate",{"componentId":"startDateComponent_rel"});
			document.getElementById("startDateComponent").innerHTML = sT;
			//	
			sT = window.getHtmlTemplate("dateComponentTemplate",{"componentId":"endDateComponent_rel"});
			document.getElementById("endDateComponent").innerHTML = sT;
			//populate the UI elements
			this.dateComponentUI("endDateComponent_rel");
			this.dateComponentUI("startDateComponent_rel");
		}
		
		//based on it decide add event listeners
		
	},
	dateComponentUI :function(str)
	{
		var optionComponent, i, maxDay = 31 , arrMonth=["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"], beginYear, maxYear = 10, yearComponent, monthComponent, dayComponent;
		dayComponent = window.find(str+"##fetchDay");
		window.removeAllChild(dayComponent);
		
		optionComponent = document.createElement("option");
			optionComponent.value ="";
			optionComponent.text = "";
			dayComponent.appendChild(optionComponent);
		for( i =1;i<=maxDay;i++)
		{
			optionComponent = document.createElement("option");
			optionComponent.value =i;
			optionComponent.text = i;
			dayComponent.appendChild(optionComponent);
		}
		
		
		
		monthComponent = window.find(str+"##fetchMonth");
		window.removeAllChild(monthComponent);
			optionComponent = document.createElement("option");
			optionComponent.value ="";
			optionComponent.text = "";
			monthComponent.appendChild(optionComponent);
			
		for( i =0;i<arrMonth.length;i++)
		{
			optionComponent = document.createElement("option");
			optionComponent.value =i;
			optionComponent.text = arrMonth[i];
			monthComponent.appendChild(optionComponent);
		}	
		
		yearComponent = window.find(str+"##fetchYear");
		window.removeAllChild(yearComponent);
		optionComponent = document.createElement("option");
			optionComponent.value ="";
			optionComponent.text = "";
			yearComponent.appendChild(optionComponent);
			
		beginYear = (new Date()).getFullYear();
		for( i =0;i<maxYear;i++)
		{
			optionComponent = document.createElement("option");
			optionComponent.value =beginYear;
			optionComponent.text = beginYear;
			yearComponent.appendChild(optionComponent);
			beginYear++;
		}	
	},
	
	/*
	 Passenger Count Component
	 ## START
	*/
	setUpPassengerCountComponent :function()
	{
		this.updatePassengerCount();
		window.on("removePassenger","click",this.updatePassengerCount.bind(this,-1));
		window.on("addPassenger","click",this.updatePassengerCount.bind(this,1));
		window.on("","keyup",this.setPassengerValue.bind(this));
		
	},
	isValidCount :function(val)
	{
		var rexp =  /^[0-9]+(\.)*[0-9]*$/;
		return rexp.test(val);
	},
	setPassengerValue :function()
	{
		var str = document.getElementById("passengerCount").value;
		if(!this.isValidCount(str))
		{
			return false;	
		}
		else
		{
			this.nPassengerCount = Number(str);
		}
		
		
	},
	updatePassengerCount :function(action)
	{
		if(typeof action === "undefined")
		{
			this.nPassengerCount = 1;
			document.getElementById("passengerCount").value = this.nPassengerCount;	
		}
		else
		{
		
			this.nPassengerCount = this.nPassengerCount + action;
			
			if(this.nPassengerCount < 1)
			 this.nPassengerCount = 1;
			 
			document.getElementById("passengerCount").value= this.nPassengerCount;	 
		}
	},
	/*
	 Passenger Count Component
	 ## END
	*/
	/* 
	Main Menu Tab Listeners ... 
	# START
	*/
	setTabListeners :function()
	{
		//oneWayBtn
		//twoWayBtn
		window.on("oneWayBtn","click",this.clickedOneWay.bind(this));
		window.on("twoWayBtn","click",this.clickedTwoWay.bind(this));
		window.on("searchBtn","click",this.searchBtnClicked.bind(this));
		
		this.changeSelectedState("oneWayBtn" ,["oneWayBtn","twoWayBtn"],"btnSelected");
		document.getElementById("endDateComponent").style.display ="none";
	},
	triggerSearch :function(data)
	{
		console.log(data)
		// populate UI with result set
		gApp.AppConstant.SEARCH_RESULT_METADATA["startDate"] =data.start;
		gApp.AppConstant.SEARCH_RESULT_METADATA["endDate"] =data.end;
		
		this.populateFlightList(gApp.AppConstant.SEARCH_RESULT,gApp.AppConstant.SEARCH_RESULT_METADATA);
		
	},
	populateFlightList :function(arrData,metaData)
	{
		var i, arr = [] ,sT="",domEle,domParent = document.getElementById("search_result_content");;
		domParent.innerHTML = "";
		
		
		document.getElementById("flight_route").innerHTML =metaData["route"];
		document.getElementById("flight_deart_return_date").innerHTML = "";
		sT = (metaData["startDate"] !== "") ? "<div> Depart :"+metaData["startDate"]+"</div>":"";
		sT += (metaData["endDate"] !== "") ? "<div> Return :"+metaData["endDate"]+"</div>":"";
		
		document.getElementById("flight_deart_return_date").innerHTML =sT;
		
		for(i =0;i< arrData.length;i++)
		{
			arrData[i]["bookBtnComponent"] = "btnComponent_"+i
			sT = window.getHtmlTemplate("flightDetailTemplate",arrData[i]);
			domEle = document.createElement("div");
			domEle.className = "flight-detail-single-row";
			domEle.setAttribute("id","singleRowElement_"+i);
			domEle.setAttribute("singleRowCost",(arrData[i]["cost"] !== undefined)?arrData[i]["cost"]:0);
			domEle.innerHTML = sT;
			domParent.appendChild(domEle);
			window.find("btnComponent_"+i+"##book_btn",{type:"click",callbackFunction:this.bookBtnHandler.bind(this)});
			
		}
		 
	},
	bookBtnHandler:function(evt)
	{
		console.log(evt);
	},
	searchBtnClicked :function()
	{
		// check for the valid originName &  check for valid destinationName
		var strOriginName 	 = document.getElementById("originName").value;
		var strDestinatioName 	 = document.getElementById("destinationName").value;
		var strStartDate = "", strEndDate = "",strPassenger="";
		
		if(!this.isEmptyOrUndefined(strOriginName) &&  !this.isEmptyOrUndefined(strDestinatioName) )
			{ // SRC & DESTINATION IS VALID
					//check for date type support
					if(this.supportsDateInput)
					{
						//iF YES support is present & fetch valid start date
							strStartDate = document.getElementById("startDateInput").value;;
							strEndDate = document.getElementById("endDateInput").value;;
								
					}
				else{					
						//if NO support is present  -- fetch the data from individual component
						strStartDate = this.getDateComponentValue("startDateComponent_rel")
						strEndDate = this.getDateComponentValue("endDateComponent_rel")
						
											 
					}		
					
					if(this.isEmptyOrUndefined(strStartDate))
							{
								this.indicateInvalidAction(gApp.AppConstant.INVALID_START_DATE);	
								return false;
							}
							
							if(typeof strStartDate === "boolean")
							{
								this.indicateInvalidAction(gApp.AppConstant.SELECT_START_DATE);	
								return false;
							}
						
							
							//check for is return clicked
							if(document.getElementById("endDateComponent").style.display === "block")
							{
								//IF YES checkfor end date as well
								if(this.isEmptyOrUndefined(strEndDate))
								{
									this.indicateInvalidAction(gApp.AppConstant.INVALID_END_DATE);	
									return false;
								}
								
								if(typeof strEndDate === "boolean")
								{
									this.indicateInvalidAction(gApp.AppConstant.SELECT_END_DATE);	
									return false;
								}
											
							}
					
					
					
					// check for passengerCount Validity
					if( !this.isValidCount(document.getElementById("passengerCount").value ))
						{
							this.indicateInvalidAction(gApp.AppConstant.INVALID_PASSENGER_COUNT);	
							return false;
						}
					 //trigger the API for search the list 

					this.triggerSearch({
						"src":strOriginName,
						"dest":strDestinatioName,
						"start":strStartDate,
						"end":(typeof strEndDate === "string" && strEndDate !== "")? strEndDate :"",
						"passenger":this.nPassengerCount
					})		
			}
			else
			{
				//SRC OR DESTINATION is INVALID
				this.indicateInvalidAction(gApp.AppConstant.INVALID_NAME);
			}
			
		
	},
	getDateComponentValue:function(str)
	{
		var day = window.find(str+"##fetchDay");
		var month = window.find(str+"##fetchMonth");
		var year = window.find(str+"##fetchYear");
		if(day.selectedOptions[0].value === "" || month.selectedOptions[0].value === "" || year.selectedOptions[0].value === "")
			return false;
		else
			return day.selectedOptions[0].value+"-"+month.selectedOptions[0].value+"-"+year.selectedOptions[0].value
		
	},
	changeSelectedState:function(divName,arrHideBtn,strSelectedClass)
	{
		var i =0, strClass ="";
		for(i =0;i< arrHideBtn.length;i++)
		{
			strClass = document.getElementById(arrHideBtn[i]).className;
			
			if(strClass !== "")
			{
				//strSelectedClass
				strClass = strClass.replace(strSelectedClass, "");
				document.getElementById(arrHideBtn[i]).className = strClass;
			}
			
		}
		//twoWayBtn
		//btnSelected
		strClass = document.getElementById(divName).className ;
		strClass = strClass+" "+ strSelectedClass;
		document.getElementById(divName).className = strClass;
	},
	clickedOneWay:function(evt)
	{
		document.getElementById("endDateComponent").style.display ="none";
		this.changeSelectedState("oneWayBtn" ,["oneWayBtn","twoWayBtn"],"btnSelected");
		
	},
	clickedTwoWay:function(evt)
	{
		document.getElementById("endDateComponent").style.display ="block";
		this.changeSelectedState("twoWayBtn" ,["oneWayBtn","twoWayBtn"],"btnSelected");
	},
	/* 
	Main Menu Tab Listeners ... 
	# END
	*/	
	
	isEmptyOrUndefined :function(str)
	{
		var bReturn = true;
		
		if(typeof str !== "undefined" && str !== "")
		{
			bReturn = false;
		}
		
		return bReturn;
	},
	indicateInvalidAction:function(cmd)
	{
		console.log(cmd)
	}

}
