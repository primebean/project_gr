sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sap.sync.projectgr.controller.Detail", {
      onInit: function () {
        var oOwnerComponent = this.getOwnerComponent();

        this.oRouter = oOwnerComponent.getRouter();
        this.oModel = oOwnerComponent.getModel();

        this.oRouter
          .getRoute("Detail")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      _onPatternMatched: function (oEvent) {
        var oArguments = oEvent.getParameter("arguments");
        // this.byId("headerKey").setText(sValue);

        var oView = this.getView();

        oView.setBusy(true);

        oView.setModel( new JSONModel(
              {
                  today: new Date()
              }
            ), "detail" );


        var oModel = this.getOwnerComponent().getModel();

        var sPath = oModel.createKey("/GRdataSet", {
            Plant: oArguments.Plant,
            Pono: oArguments.Pono,
            Seqno: oArguments.Seqno
        })

        oModel.read(sPath, {
                success: function (oData) {
                  oView.getModel('detail')
                       .setProperty('/GRdataSet', oData);   // <== 오브젝트
                      //.setProperty('/GRdataSet', [oData]);  <== 배열
                  oView.setBusy(false);
                },
                error: function() {

                  oView.setBusy(false);
                }
             }); 
        // this._product =
        //   oEvent.getParameter("arguments").product  this._product  "0";
        // this.getView().bindElement({
        //   path: "/ProductCollection/" + this._product,
        //   model: "products",
        // });
      },

      onSave: function () {
        var oModel = this.getView().getModel();
        var oViewModel = this.getView().getModel();

        var msg = '재고 업데이트 완료!';
        MessageToast.show(msg);

      }


    });
  }
);