trigger ContactTrigger on Contact (before insert, after insert, before update, after update) {
    if(TriggerHandler.isTriggerActive('ContactTrigger')) {
     	new ContactTriggerHandler().run();   
    }
}