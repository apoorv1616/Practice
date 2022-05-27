({
    subscribeEvent : function(component, event, helper) {
        var pubsub = component.find('pubsubmodule');

        var callbackMethod = $A.getCallback(function(payload){
            component.set("v.selectedContactName",payload.name);
        });

        pubsub.registerListener('tileclick',callbackMethod);


    }
})