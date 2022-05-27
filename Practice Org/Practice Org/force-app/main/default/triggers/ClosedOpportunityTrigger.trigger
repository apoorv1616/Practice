trigger ClosedOpportunityTrigger on Opportunity (before insert,before update) {
    if(Trigger.isInsert || Trigger.isUpdate) {
        OpportunityClassTrigger.oppTrigger(Trigger.new);
    }
}