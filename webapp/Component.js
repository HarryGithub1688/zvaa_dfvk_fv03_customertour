sap.ui.define(
    ["sap/suite/ui/generic/template/lib/AppComponent"],
    function (Component) {
        "use strict";

        function attachInitLisReport (x) {
            setTimeout(function () {
                if ($("[id$='ListReport.view.ListReport::CustomerTourMap']").length >= 1) {
                    initListReport(this);
                } else {
                    attachInitLisReport();
                }
            }.bind(this), x);
        };
        function attachInitDetails (x) {
            setTimeout(function () {
                if ($("[id$='ObjectPage.view.Details::CustomerTourMap']").length >= 1) {
                    initObjectPage(this);
                } else {
                    attachInitDetails();
                }
            }.bind(this), x);
        };

        attachInitLisReport(500);
        attachInitDetails(500);

        return Component.extend("hap.zvaadfvk00005.Component", {
            metadata: {
                manifest: "json"
            }
        });

        /* List Report Controller */

        function initListReport() {
            //addingNavigationObjectPage();
        };

        function addingNavigationObjectPage() {
            var listReportId = $("[id$='CustomerTourMap--listReport']")[0].id;
            var listReport = sap.ui.getCore().byId(listReportId);
            var oModel = listReport.getModel();

            oModel.attachRequestCompleted(function (evn) {
                var url = evn.mParameters.url;

                if (url.includes("/to_CustomersTourSource")) {
                    //wait until object page finish to load
                    function fun(x) {
                        setTimeout(function () {
                            if ($("[id$='CustomersTourSource::responsiveTable']").length >= 1 && $("[id$='CustomerTourTarget::responsiveTable']").length >= 1) {
                                var cTourSourceTableId = $("[id$='CustomersTourSource::responsiveTable']")[0].id;
                                var cTourTargetTableId = $("[id$='CustomerTourTarget::responsiveTable']")[0].id;
                                var cTourSourceTable = sap.ui.getCore().byId(cTourSourceTableId);
                                var cTourTargetTable = sap.ui.getCore().byId(cTourTargetTableId);

                                /* for (var i = 0; cTourSourceTable.getItems().length > i; i++) {
                                    if (cTourSourceTable.getItems()[i].getNavigated()) {
                                    }
                                }
                                for (var i = 0; cTourTargetTable.getItems().length > i; i++) {
                                    if (cTourTargetTable.getItems()[i].getNavigated()) {
                                    }
                                } */

                                cTourSourceTable.attachItemPress(function (evn) {
                                    var modelPath = evn.getParameters().listItem.getBindingContextPath();
                                    var oModel = evn.getSource().getModel();
                                    var modelProperty = oModel.getProperty(modelPath);
                                    var thisTable = evn.getSource().getParent();

                                    function fun(x, modelProperty, thisTable) {
                                        setTimeout(function () {
                                            if ($("[id$='CustomersTourSource--objectPage']").length >= 1) {

                                                var FullName = modelProperty.FullName;
                                                var MainCustomerId = modelProperty.MainCustomerId;
                                                var DeliveryDate = modelProperty.DeliveryDate;
                                                var Location1 = modelProperty.Location1;
                                                var Location2 = modelProperty.Location2;
                                                var Location3 = modelProperty.Location3;

                                                /* MoveToSource_ac
                                                PlantId
                                                RunNo
                                                SequenceNumber
                                                SourceTourId
                                                TargetTourId */

                                                //objPage
                                                var objectPageId = $("[id$='CustomersTourSource--objectPage']")[0].id;
                                                var objectPage = sap.ui.getCore().byId(objectPageId);

                                                //set object title
                                                var objectPageHeaderTitleId = $("[id$='CustomersTourSource--template::ObjectPage::ObjectPageDynamicHeaderTitle']")[0].id;
                                                var objectPageHeaderTitle = sap.ui.getCore().byId(objectPageHeaderTitleId);
                                                objectPageHeaderTitle.setText(FullName);

                                                //set object subtitle
                                                if (!sap.ui.getCore().byId("objPageSubtitle")) {
                                                    objectPageHeaderTitle.getParent().addItem(new sap.m.Text({ id: "objPageSubtitle" }));
                                                    var objPageSubtitle = sap.ui.getCore().byId("objPageSubtitle");
                                                } else {
                                                    var objPageSubtitle = sap.ui.getCore().byId("objPageSubtitle");
                                                }
                                                var DeliveryDateFormated = DeliveryDate.toLocaleString('default', { day: "numeric", month: 'short', year: 'numeric' });
                                                objPageSubtitle.setText(DeliveryDateFormated);
                                                objPageSubtitle.addStyleClass("objPageSubtitleClass"); //margin-top: 1mm;

                                                //set object form section
                                                if (!sap.ui.getCore().byId("objForm")) {
                                                    var objSection = new sap.uxap.ObjectPageSection({ id: "objSection" });
                                                    var objSubSection = new sap.uxap.ObjectPageSubSection({ id: "objSubSection" });
                                                    var objForm = new sap.ui.layout.form.SimpleForm({ id: "objForm" });

                                                    //adding content
                                                    objectPage.addSection(objSection);
                                                    objSection.addSubSection(objSubSection);
                                                    objSubSection.addBlock(objForm);

                                                    //settings
                                                    objectPage.setShowHeaderContent(false);
                                                    objSection.setShowTitle(false);
                                                    objForm.setLayout("ColumnLayout");

                                                    //creating fields
                                                    //MainCustomerId
                                                    objForm.addContent(new sap.m.Label({ id: "MainCustomerIdLabel", labelFor: "MainCustomerIdTxt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "MainCustomerIdTxt" }));
                                                    //Location1
                                                    objForm.addContent(new sap.m.Label({ id: "Location1Label", labelFor: "Location1Txt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "Location1Txt" }));
                                                    //Location2
                                                    objForm.addContent(new sap.m.Label({ id: "Location2Label", labelFor: "Location2Txt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "Location2Txt" }));
                                                    //Location3
                                                    objForm.addContent(new sap.m.Label({ id: "Location3Label", labelFor: "Location3Txt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "Location3Txt" }));
                                                }

                                                //full fit content
                                                //MainCustomerId
                                                sap.ui.getCore().byId("MainCustomerIdLabel").setText(thisTable._mFieldMetadataByKey.MainCustomerId.label);
                                                sap.ui.getCore().byId("MainCustomerIdTxt").setText(MainCustomerId);
                                                //Location1
                                                sap.ui.getCore().byId("Location1Label").setText(thisTable._mFieldMetadataByKey.Location1.label);
                                                sap.ui.getCore().byId("Location1Txt").setText(Location1);
                                                //Location2
                                                sap.ui.getCore().byId("Location2Label").setText(thisTable._mFieldMetadataByKey.Location2.label);
                                                sap.ui.getCore().byId("Location2Txt").setText(Location2);
                                                //Location3
                                                sap.ui.getCore().byId("Location3Label").setText(thisTable._mFieldMetadataByKey.Location3.label);
                                                sap.ui.getCore().byId("Location3Txt").setText(Location3);

                                            } else {
                                                fun();
                                            }
                                        }.bind(this), x);
                                    };
                                    fun(500, modelProperty, thisTable);
                                });

                                cTourTargetTable.attachItemPress(function (evn) {
                                    var modelPath = evn.getParameters().listItem.getBindingContextPath();
                                    var oModel = evn.getSource().getModel();
                                    var modelProperty = oModel.getProperty(modelPath);
                                    var thisTable = evn.getSource().getParent();

                                    function fun(x, modelProperty, thisTable) {
                                        setTimeout(function () {
                                            if ($("[id$='CustomersTourTarget--objectPage']").length >= 1) {

                                                var FullName = modelProperty.FullName;
                                                var MainCustomerId = modelProperty.MainCustomerId;
                                                var DeliveryDate = modelProperty.DeliveryDate;
                                                var Location1 = modelProperty.Location1;
                                                var Location2 = modelProperty.Location2;
                                                var Location3 = modelProperty.Location3;

                                                /* MoveToSource_ac
                                                PlantId
                                                RunNo
                                                SequenceNumber
                                                SourceTourId
                                                TargetTourId */

                                                //objPage
                                                var objectPageId = $("[id$='CustomersTourTarget--objectPage']")[0].id;
                                                var objectPage = sap.ui.getCore().byId(objectPageId);

                                                //set object title
                                                var objectPageHeaderTitleId = $("[id$='CustomersTourTarget--template::ObjectPage::ObjectPageDynamicHeaderTitle']")[0].id;
                                                var objectPageHeaderTitle = sap.ui.getCore().byId(objectPageHeaderTitleId);
                                                objectPageHeaderTitle.setText(FullName);

                                                //set object subtitle
                                                if (!sap.ui.getCore().byId("objPageSubtitle")) {
                                                    objectPageHeaderTitle.getParent().addItem(new sap.m.Text({ id: "objPageSubtitle" }));
                                                    var objPageSubtitle = sap.ui.getCore().byId("objPageSubtitle");
                                                } else {
                                                    var objPageSubtitle = sap.ui.getCore().byId("objPageSubtitle");
                                                }
                                                var DeliveryDateFormated = DeliveryDate.toLocaleString('default', { day: "numeric", month: 'short', year: 'numeric' });
                                                objPageSubtitle.setText(DeliveryDateFormated);
                                                objPageSubtitle.addStyleClass("objPageSubtitleClass"); //margin-top: 1mm;

                                                //set object form section
                                                if (!sap.ui.getCore().byId("objForm")) {
                                                    var objSection = new sap.uxap.ObjectPageSection({ id: "objSection" });
                                                    var objSubSection = new sap.uxap.ObjectPageSubSection({ id: "objSubSection" });
                                                    var objForm = new sap.ui.layout.form.SimpleForm({ id: "objForm" });

                                                    //adding content
                                                    objectPage.addSection(objSection);
                                                    objSection.addSubSection(objSubSection);
                                                    objSubSection.addBlock(objForm);

                                                    //settings
                                                    objectPage.setShowHeaderContent(false);
                                                    objSection.setShowTitle(false);
                                                    objForm.setLayout("ColumnLayout");

                                                    //creating fields
                                                    //MainCustomerId
                                                    objForm.addContent(new sap.m.Label({ id: "MainCustomerIdLabel", labelFor: "MainCustomerIdTxt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "MainCustomerIdTxt" }));
                                                    //Location1
                                                    objForm.addContent(new sap.m.Label({ id: "Location1Label", labelFor: "Location1Txt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "Location1Txt" }));
                                                    //Location2
                                                    objForm.addContent(new sap.m.Label({ id: "Location2Label", labelFor: "Location2Txt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "Location2Txt" }));
                                                    //Location3
                                                    objForm.addContent(new sap.m.Label({ id: "Location3Label", labelFor: "Location3Txt" }));
                                                    objForm.addContent(new sap.m.Text({ id: "Location3Txt" }));
                                                }

                                                //full fit content
                                                //MainCustomerId
                                                sap.ui.getCore().byId("MainCustomerIdLabel").setText(thisTable._mFieldMetadataByKey.MainCustomerId.label);
                                                sap.ui.getCore().byId("MainCustomerIdTxt").setText(MainCustomerId);
                                                //Location1
                                                sap.ui.getCore().byId("Location1Label").setText(thisTable._mFieldMetadataByKey.Location1.label);
                                                sap.ui.getCore().byId("Location1Txt").setText(Location1);
                                                //Location2
                                                sap.ui.getCore().byId("Location2Label").setText(thisTable._mFieldMetadataByKey.Location2.label);
                                                sap.ui.getCore().byId("Location2Txt").setText(Location2);
                                                //Location3
                                                sap.ui.getCore().byId("Location3Label").setText(thisTable._mFieldMetadataByKey.Location3.label);
                                                sap.ui.getCore().byId("Location3Txt").setText(Location3);

                                            } else {
                                                fun();
                                            }
                                        }.bind(this), x);
                                    };
                                    fun(500, modelProperty, thisTable);
                                });

                            } else {
                                fun();
                            }
                        }.bind(this), x);
                    };
                    fun(500);

                    /*

                    //on manifest
                    "pages": {
                        "ObjectPage|to_CustomersTourSource": {
                            "entitySet": "CustomerTourSource",
                            "component": {
                                "name": "sap.suite.ui.generic.template.ObjectPage",
                                "settings": {
                                    "tableSettings": {
                                        "multiSelect": true
                                    }
                                }
                            }
                        },
                        "ObjectPage|to_CustomersTourTarget": {
                            "entitySet": "CustomersTourTarget",
                            "component": {
                                "name": "sap.suite.ui.generic.template.ObjectPage",
                                "settings": {
                                    "tableSettings": {
                                        "multiSelect": true
                                    }
                                }
                            }
                        }
                    }

                    */
                }
            });
        };

        /* Object Page Controller */

        function initObjectPage() {
            setButtonActionType()
        };

        function setButtonActionType() {
            var viewId = $("[id$='ObjectPage.view.Details::CustomerTourMap']")[0].id;
            var moveToSourceBtn = sap.ui.getCore().byId(viewId + "--CustomerTourTarget::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToSource");
            var moveToTargetBtn = sap.ui.getCore().byId(viewId + "--CustomersTourSource::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToTarget");
            moveToSourceBtn.setType("Emphasized");
            moveToTargetBtn.setType("Emphasized");
        };

    }
);

