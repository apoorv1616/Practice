@isTest
public class DailyLeadProcessorTest {
    static testmethod void insertLead() {
        List<Lead> leadList = new List<Lead>();
        String sch = '0 0 0 1 3 ? *';
        for(Integer count=0;count<200;count++) {
            Lead l = new Lead();
            l.OwnerId = '0052v00000ftAxTAAU';
            l.Company = 'MTX';
            l.Status = 'Open - Not Contacted';
            l.LastName = 'Test'+count;
            leadList.add(l);
        }
		insert leadlist;
        Test.startTest();
        System.schedule('ScheduledApexTest',sch,new DailyLeadProcessor());
        Test.stopTest();
    }
}