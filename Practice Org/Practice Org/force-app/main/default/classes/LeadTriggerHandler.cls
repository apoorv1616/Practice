public class LeadTriggerHandler {
    public static void validLead(List<Lead> newList) {
        Set<String> country = new Set<String>{'USA','US','United States',' '};
        Map<String,Id>queueMap = new Map<String,Id>();
            	
            	for(Group g : [SELECT Id,Name
                              FROM Group
                               WHERE type = 'Queue']) {
                                   queueMap.put(g.Name,g.Id);
                               }
        
                for(Lead l : newList) {
                    if(country.contains((String)l.Country) && ((String)l.State).length() < 3) {
                        
                        if(l.LeadSource == 'Web') {
                            Group g = new Group();
                            g.Type = 'Queue';
                            l.OwnerId = queueMap.get('Rainbow Sales');
                        }
                        else if(l.LeadSource == 'Partner Referral' || l.LeadSource == 'Purchased List') {
                            Group g = new Group();
                            g.Type = 'Queue';
                            l.OwnerId = queueMap.get('Assembly System Sales');
                        }
                    }
                    else {
                        l.addError('Country or State Error');
                    }
                }
        
        
    }
}