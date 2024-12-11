sap.ui.define([], function () {
	return {
        
		onInit: function () {
        },
		
		onAfterRendering: function () {
			this.setButtonActionType();
			this.updateDataAfterActions();
		},

		setButtonActionType() {
            var moveToSourceBtn = this.getView().byId("CustomerTourTarget::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToSource");
            var moveToTargetBtn = this.getView().byId("CustomersTourSource::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToTarget");
            moveToSourceBtn.setType("Emphasized");
            moveToTargetBtn.setType("Emphasized");
        },

		updateDataAfterActions() {
			var oModel = this.getView().getModel();
			oModel.attachRequestCompleted(function (evn) {
				var tourSourceTable = this.getView().byId('CustomersTourSource::Table');
				var tourTargetTable = this.getView().byId('CustomerTourTarget::Table');

				if (evn.getParameter("url").startsWith("MoveToTarget") && evn.getParameter("success")) {
					tourTargetTable.rebindTable();
				} else if (evn.getParameter("url").startsWith("MoveToSource") && evn.getParameter("success")) {
					tourSourceTable.rebindTable();
				} 
			}.bind(this));

			/* 
			var moveToSourceBtn = this.getView().byId("CustomerTourTarget::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToSource");
            var moveToTargetBtn = this.getView().byId("CustomersTourSource::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToTarget");

			moveToSourceBtn.attachValidationSuccess((evn)=>{
				debugger
			});
			moveToSourceBtn.attachValidationError((evn)=>{
				debugger
			});
			moveToTargetBtn.attachValidationSuccess((evn)=>{
				debugger
			});
			moveToTargetBtn.attachValidationError((evn)=>{
				debugger
			}); 
			*/
        }
		
	};
});
