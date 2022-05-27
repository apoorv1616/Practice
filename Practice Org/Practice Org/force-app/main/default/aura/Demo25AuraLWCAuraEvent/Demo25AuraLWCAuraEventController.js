({
    doInit : function(component, event, helper) {

        var contactList = [
            {id : '1' , name:'Apoorv' , email:'apoorvanand4@gmail.com'},
            {id : '2' , name:'Apoorv2' , email:'apoorv2anand4@gmail.com'},
            {id : '3' , name:'Apoorv3' , email:'apoorv3anand4@gmail.com'},   
        ];

        component.set('v.contactInfoList',contactList);
    },

    onTileClickHandler : function(component,event,helper) {
        component.set("v.selectedContactName",event.getParam('name'));
    }
})