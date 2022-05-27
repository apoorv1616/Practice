public class DailyLeadProcessor implements Schedulable {
    public void execute(System.SchedulableContext context) {
        
        List<Lead> leadList = new List<Lead>();
        
        for(Lead l : [SELECT Id,Name,LeadSource
                      FROM Lead
                      WHERE LeadSource = Null
                      LIMIT 200]) {
                          Lead l1 = new Lead();
                          l1.id = l.id;
                          l1.LeadSource = 'Dreamforce';
                          leadList.add(l1);
                      }
        update leadList;
    }
}