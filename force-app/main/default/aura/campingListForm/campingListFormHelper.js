({
    createItem : function(component,event,helper) {
        var test = component.find("check");
        console.log(JSON.stringify(component.get("v.newItem")));
        console.log(test);
        
        var valid = component.find("check").reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if(valid) {
            var newItem = component.get("v.newItem");
        
            var fireEvent = component.getEvent("addItem");
            fireEvent.setParams({
                "item" : newItem
            });
            
            fireEvent.fire();

            component.set("v.newItem",
                          {'sobjectType':'Camping_Item__c' ,'Name':'','Price__c':0,'Quantity__c':0,'Packed__c':'false'});
            
        }
    }
})