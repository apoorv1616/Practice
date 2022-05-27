public class GetBirthdayOfContacts {
    public GetBirthdayOfContacts() {
        Map<Id,Id> accountToOpportunityMap = new Map<Id,Id>();
        Map<Id,String> idToNameMap = new Map<Id,String>();
        Map<Id,Id> accountToContactMap = new Map<Id,Id>();
        Map<String,List<String>> accountToContactToOpportunity = new Map<String,List<String>>();
        
        for(Account acc : [SELECT Id,Name,
                           (SELECT Id,Name
                            FROM Opportunities),
                           (SELECT Id,Name
                            FROM Contacts)
                           FROM Account
                           WHERE (Id NOT IN :accountToOpportunityMap.keySet())]) {
                               
                               idToNameMap.put(acc.Id,acc.Name);
                               
                               for(Opportunity opp : acc.Opportunities) {
                                   accountToOpportunityMap.put(acc.Id,opp.Id);
                                   idToNameMap.put(opp.Id,opp.Name);
                                   
                                   if(!accountToContactToOpportunity.containsKey(acc.Id)) {
                                       accountToContactToOpportunity.put(acc.Id,new List<String>());
                                   }
                                   accountToContactToOpportunity.get(acc.Id).add(opp.Id);
                               }
                               
                               for(Contact con : acc.Contacts) {
                                   accountToContactMap.put(acc.Id,con.Id);
                                   idToNameMap.put(con.Id,con.Name);
                                   
                                   if(!accountToContactToOpportunity.containsKey(acc.Id)) {
                                       accountToContactToOpportunity.put(acc.Id,new List<String>());
                                   }
                                   accountToContactToOpportunity.get(acc.Id).add(con.Id);
                               }
                           }
        
        System.debug(accountToContactToOpportunity);
        
        
        
    }
}