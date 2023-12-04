sap.ui.define([
	"oft/fiori/controller/BaseController",
	"sap/m/MessageToast"

], function(Controller,oMessage) {
	"use strict";

	return Controller.extend("oft.fiori.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf oft.fiori.view.View2
		 */
		//	onInit: function() {
		//
		//	},
		onBack: function(){
			//Step 1: get the app object from base class method
			//Step 2: navigate to view1 - idView1
			this.getAppObject().to("idView1");
		},
		
		onPress:function(){
		 
		 oMessage.show("Your request has been approved succesfully!!");
		},
		
		onConfirm:function(oEvnt){
		var oItem = oEvnt.getParameter("selectedItem");	
		var oSelVal = oItem.getProperty("title");
		var oInp = sap.ui.getCore().byId(this.inputField);
		 oInp.setValue(oSelVal);
			
			
			
		},
		
		onValueRequest:function(oEvent){
			this.inputField = oEvent.getSource().getId();
			
			if(!this.cityPopup){
				
				this.cityPopup = new sap.ui.xmlfragment("oft.fiori.fragments.Popup",this);
				this.getView().addDependent(this.cityPopup);
				this.cityPopup.bindAggregation("items",{
					path:"/cities",
					template:
						new sap.m.StandardListItem({
						title:"{city}",
						description:"{famousFor}"
							
						})
					
				});
				this.cityPopup.attachConfirm(this.onConfirm,this);
				this.cityPopup.open();
			}
				this.cityPopup.open();
		},
		
		onFilter:function(){
			if(!this.countryPopup){
				
				this.countryPopup = new sap.ui.xmlfragment("oft.fiori.fragments.Popup",this);
				this.getView().addDependent(this.countryPopup);
				this.countryPopup.bindAggregation("items",{
					path:"/countries",
					template:
						new sap.m.StandardListItem({
						title:"{name}",
						description:"{code}"
							
						})
					
				});
				this.countryPopup.attachConfirm(this.onConfirm,this);
				this.countryPopup.open();
			}
				this.countryPopup.open();			
			
			
		},
		
		onItemPress:function(oEvent){
			
			var sPath = oEvent.getSource().getBindingContextPath();
			var oApp = this.getAppObject();
			var oView = oApp._aDetailPages[1];
			oView.bindElement(sPath);
			oApp.toDetail("idView3");
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf oft.fiori.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf oft.fiori.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf oft.fiori.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});