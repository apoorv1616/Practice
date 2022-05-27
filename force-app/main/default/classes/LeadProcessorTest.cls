@isTest
public class LeadProcessorTest {
    static testmethod void testLead() {
        List<Lead> leadList = new List<Lead>();
        
        for(Integer count = 1 ; count <= 200 ; count++) {
            Lead l = new Lead();
            l.LastName = 'XYZ';
            l.Company = 'MTX';
            l.Country = 'India';
            l.State = 'Rajasthan';
            leadList.add(l);
        }
        insert leadList;
        
        Test.startTest();
        LeadProcessor obj = new LeadProcessor();
        Id batchId = Database.executeBatch(obj);
        Test.stopTest();
    }
}