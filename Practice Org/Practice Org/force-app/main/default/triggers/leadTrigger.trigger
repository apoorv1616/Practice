trigger leadTrigger on Lead (before insert , before update) {
    LeadTriggerHandler.validLead(Trigger.new);
}