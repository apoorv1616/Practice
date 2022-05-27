({
	packItem : function(component, event, helper) {
		component.set("v.item.Packed__c",true);
        var btnClicked = event.getSource();
        btnClicked.set("v.disabled",true);
	}
})