public class LeadProcessor implements  Database.Batchable<sObject> {
    Integer count = 0;
    public Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator('SELECT Id FROM Lead');
    }
    
    public void execute(Database.BatchableContext context , List<Lead> leadList) {
        List<Lead> leadUpdateList = new List<Lead>();
        for(Lead l : leadList) {
            l.LeadSource = 'Dreamforce';
            leadUpdateList.add(l);
            count++;
        }        
        update leadUpdateList;
    }
    public void finish(Database.BatchableContext context) {
        
    }
}