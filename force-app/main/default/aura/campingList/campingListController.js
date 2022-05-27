({
    doInit : function(component, event, helper) {
        
        var action = component.get("c.getItems");
        
        action.setCallback(this,function(response){
            console.log("success");
            var state = response.getState();
            
            var arr = [];
            if(state === "SUCCESS") {
                var res = response.getReturnValue();
                res.forEach(function(index,item){
                    arr.push({'sobjectType':'Camping_Item__c' ,
                              'Name':item.Name,
                              'Price__c':item.Price__c,
                              'Quantity__c':item.Quantity__c,
                              'Packed__c':item.Packed__c});
                });
                console.log(arr);
                component.set("v.items",arr);
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    handleAddItem : function(component, event, helper) {
        items = component.get("v.items");
        newItem = component.get("v.newItem");
        console.log("inside handle all item");
        
        var action = component.get("c.saveItem");
        action.setParams({
            "items" : newItem
        });
        $A.enqueueAction(action);
        console.log("save successful");
        
        items.push(newItem);
        component.set("v.items",items);
    }
})