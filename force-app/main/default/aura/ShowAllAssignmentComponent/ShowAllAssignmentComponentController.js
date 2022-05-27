({
	init : function(component, event, helper) {
		component.set('v.columns', [
            { label: 'Name', fieldName: 'name', type: 'text' },
            { label: 'Start Date', fieldName: 'startDate', type: 'date' },
            { label: 'End Date', fieldName: 'endDate', type: 'date' },
            { label: 'Contact', fieldName: 'contact', type: 'text' },
            
        ]);
        
        var assignmentList = component.get("v.AssignmentList");
        var data = [];
	},
    
    handleRowAction : function(component, event, helper) {
        component.set("v.showAssignmentComponent",false);
        var row = component.find("AssignmentListTable").getSelectedRows();
        var compEvent = component.getEvent("AssignmentEvent");
        compEvent.setParams({'showTimesheet':true,'AssignmentListData':row});
        compEvent.fire();

    },
    
    closeAssignmentComponent : function(component, event, helper) {
        component.set("v.showAssignmentComponent",false);
    }
})