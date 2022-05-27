public class ContactAndLeadSearch {
    public static List<List<SObject>> searchContactsAndLeads(String name) {
        List<SObject> matchContact = new List<SObject>();
        List<SObject> matchLead = new List<SObject>();
        List<List<SObject>> ans = new List<List<Sobject>>();
        
        for(Contact con : [SELECT Id,Name
                          FROM Contact
                          WHERE FirstName = :name
                           OR LastName = :name]) {
                               matchContact.add(con);
                           }
        for(Lead lead : [SELECT Id,Name
                        FROM Lead
                        WHERE FirstName = :name
                         OR LastName = :name]) {
                              matchLead.add(lead);
                         }
        
        ans.add(matchContact);
        ans.add(matchLead);
        //System.debug(ans);
        return ans;
    }

}