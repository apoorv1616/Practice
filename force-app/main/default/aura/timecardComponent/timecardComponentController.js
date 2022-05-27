({
    doInit : function(component, event, helper) {
        var columnName = [{
            type:  'button',label:'Assignment',
                            typeAttributes: 
                            {
                                label: 'Click To Search', 
                                name: 'selectAssignmentList', 
                                title: 'ClickToSearch', 
                                disabled: false, 
                                value: 'Yes',
                                variant:'Base',
                            }
                          },
                          {label: 'Mon', fieldName: 'Mon', type: 'text'},
                          {label: 'Tue', fieldName: 'Tue', type: 'text'},
                          {label: 'Wed', fieldName: 'Wed', type: 'text'},
                          {label: 'Thu', fieldName: 'Thu', type: 'text'},
                          {label: 'Fri', fieldName: 'Fri', type: 'text'},
                          {label: 'Sat', fieldName: 'Sat', type: 'text'},
                          {label: 'Sun', fieldName: 'Sun', type: 'text'},
                          {label: 'Total', fieldName: 'Total', type: 'text'},
                          {
            				type:  'button',label:'Notes',
                            typeAttributes: 
                            {
                                iconName: 'action:new_note', 
                                name: 'viewNotes', 
                                disabled: false, 
                                value: 'Yes',
                                variant:'base'
                            }
                          },
                          {label: 'Status', fieldName: 'Status', type: 'text'}   			 
                         ];
        component.set("v.columns",columnName);
        
        var standardData = [{
            id: 'a',
            Mon: '0',
            Tue: '0',
            Wed: '0',
            Thu: '0',
            Fri: '0',
            Sat: '0',
            Sun: '0',
            Total: '0',
            Status: ''
        }];
        component.set("v.data",standardData);
    },
    
    showInsertAndDeleteButton : function (component, event, helper) {
        component.set("v.showDeleteButton",true);
        var actionName = event.getParam('action').name;
        if(actionName === 'selectAssignmentList') {
            var action = component.get('c.getAllAssignmentList');
        	action.setCallback(this, function(response){
            	var state = response.getState(); 
                var assignList = [];
            	if(state === 'SUCCESS') {
                    response.getReturnValue().forEach(function(item){
                        assignList.push({
                            			 'name' : item.Name,
                                         'startDate' : item.Start_Date__c,
                                         'endDate' : item.End_Date__c,
                                         'contact' : item.Contact__c});
                    });
            	}
            	component.set("v.AssignmentList",assignList);
        	});
        	$A.enqueueAction(action);
        	component.set("v.showAssignmentComponent",true);
            component.set("v.showTimesheet",false);
        }
        else if(actionName === 'viewNotes') {
            
        }
    },
    
    addTimeCard : function (component, event, helper) {
        var standardData = component.get("v.data");
        standardData.push({
            id: 'a',
            Mon: '0',
            Tue: '0',
            Wed: '0',
            Thu: '0',
            Fri: '0',
            Sat: '0',
            Sun: '0',
            Total: '0',
            Status: ''
        });
        component.set("v.data",standardData);
    },
    
    addAssignmentToTimecard : function (component, event, helper) {
        var showTimesheet = event.getParam("showTimesheet");
        var AssignmentListData;
        event.getParam("AssignmentListData").forEach(function(item){
            console.log("id is : " + item.id);
            AssignmentListData = item;
        });
		var data = component.get('v.data');
        data.unshift(AssignmentListData);
        console.log("now size has become : " + data.length);
        component.set("v.data",data);
    }
})