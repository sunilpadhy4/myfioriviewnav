	sap.ui.define([
	"oft/fiori/controller/BaseController"
], function (Controller) {
	"use strict";

	return Controller.extend("oft.fiori.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf oft.fiori.view.View1
		 */
		//	onInit: function() {
		//
		//	},
		// aFilter: null,
		onNext: function () {
			var oApp = this.getAppObject();
			oApp.to("idView2");
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf oft.fiori.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		onItemPress: function(oEvent){
			var oItem = oEvent.getParameter("listItem");
		    var sPath = oItem.getBindingContextPath();
		    var oApp = this.getAppObject();
		    var oView2 = oApp.getDetailPages()[0];
		    oView2.bindElement(sPath);
		    oApp.to("idView2"); 
		   
		},

		onSearch: function (oEvent) {
			var queryString = oEvent.getParameter("query");
			if (!queryString) {
				queryString = oEvent.getParameter("newValue");
			}
			var oFilter1 = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, queryString);
			var oFilter2 = new sap.ui.model.Filter("benefit", sap.ui.model.FilterOperator.Contains, queryString);

			var oFilter = new sap.ui.model.Filter({
				filters: [oFilter1, oFilter2],
				and: false
			});
			var aFilter = [oFilter];
			var oList = this.getView().byId("fruits");
			oList.getBinding("items").filter(aFilter);

		},
		
		onFilter: function (oFevent) {
			var oList = this.getView().byId("fruits").getBinding("items");
			var oBtn = this.getView().byId("oBtnFilter");

			if (!this.oPopOver) {
				var oPopup = new sap.m.Popover("idPop", {

					contentWidth: "250px",
					placement: sap.m.PlacementType.Auto,
					enableScrolling: true,
					contentHeight: "250px",
					resizable: true,
					title: "Filter Ranges",
					content: [
						new sap.m.Button("idFilBtn1", {
							text: "<50",
							press: function (oEvent) {
								var oFilValue = oEvent.getSource().getText();
								var oValue = oFilValue.substr(1);

								var oFilPrice = new sap.ui.model.Filter("price", sap.ui.model.FilterOperator.LT, parseInt(oValue));
								var aFilter = [oFilPrice];
								oList.filter(aFilter);
								oEvent.getSource().getParent().close();
							}
						}),
						new sap.m.Button("idFilBtn2", {
							text: ">80",
							press: function (oEvent) {
								var oFilValue = oEvent.getSource().getText();
								var oValue = oFilValue.substr(1);

								var oFilPrice = new sap.ui.model.Filter("price", sap.ui.model.FilterOperator.GT, parseInt(oValue));
								var aFilter = [oFilPrice];
								oList.filter(aFilter);
								oEvent.getSource().getParent().close();
							}
						}),
						new sap.m.Button("idFilBtn3", {
							text: ">=50,<=80",
							press: function (oEvent) {
								var oFilValue = oEvent.getSource().getText();
								var oValue1 = oFilValue.substr(2, 4);
								var oValue2 = oFilValue.substr(7, 9);
								var oVal2 = parseInt(oValue2);
								oVal2 = oVal2 + 1;
								var oFilPrice = new sap.ui.model.Filter("price", sap.ui.model.FilterOperator.BT, parseInt(oValue1), oVal2);
								var aFilter = [oFilPrice];
								oList.filter(aFilter);
								oEvent.getSource().getParent().close();
							}
						})
					]

				});
				this.oPopOver = oPopup;
			}
			this.oPopOver.openBy(oBtn);
		}

	});

});