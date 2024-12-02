sap.ui.define([], function () {
	return {
        
		onInit: function () {
        },
		
		onAfterRendering: function () {
			this.setButtonActionType();
		},

		setButtonActionType() {
            var moveToSourceBtn = this.getView().byId("CustomerTourTarget::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToSource");
            var moveToTargetBtn = this.getView().byId("CustomersTourSource::action::cds_zsd_vaa_dfvk_ui_fv03.cds_zsd_vaa_dfvk_ui_fv03_Entities::MoveToTarget");
            moveToSourceBtn.setType("Emphasized");
            moveToTargetBtn.setType("Emphasized");
        }
		
	};
});
