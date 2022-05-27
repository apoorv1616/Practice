public class OpportunityClassTrigger {
    public static void oppTrigger(List<Opportunity> newList) {
        
        List<Task> createTask = new List<Task>();
        List<Contract> createCase = new List<Contract>();
        
        for(Opportunity opp : newList) {
            if(opp.StageName == 'Closed Won') {
                for(Account acc : [SELECT Id,Industry,OwnerId
                                   FROM Account
                                   WHERE Id = :opp.AccountId]) {
                                       
                                       if(acc.Industry == 'Banking') {
                                           System.debug(acc);
                                           Task t = new Task();
                                           
                                           t.WhatId = acc.Id;
                                           t.OwnerId = acc.OwnerId;
                                           t.Subject = 'Hello World';
                                           t.Status = 'Open';
                                           t.Priority = 'Normal';
                                           t.Status = 'Completed';
                                           t.ActivityDate = Date.today() + 7;
                                           createTask.add(t);
                                       }
                                       Contract c = new Contract();
                                       c.AccountId = acc.Id;
                                       c.Status = 'Draft';
                                       
                                      
                                       createCase.add(c);
                                   }
            }
        }
        
        if(createTask.size() > 0) {
            //System.debug(createTask);
            Insert createTask;
        }
        if(createCase.size() > 0) {
        	Insert createCase;
        }
        
    }
}