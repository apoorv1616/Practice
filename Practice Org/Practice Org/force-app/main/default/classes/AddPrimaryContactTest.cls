@isTest
public class AddPrimaryContactTest {
    static testmethod void testContact() {
        
        List<Account> accountList = new List<Account>();
        Id accountId = Null;
        for(Integer count = 0; count < 50 ; count++) {
            Account acc = new Account();
            acc.BillingState = 'NY';
            acc.Name = 'Test'+count;
            accountList.add(acc);
        }
        
        for(Integer count=0;count<50;count++) {
            Account acc1 = new Account();
            acc1.BillingState = 'CA';
            acc1.Name = 'Test'+count;
            accountList.add(acc1);
        }
        insert accountList;
        
        Contact con = new Contact();
        con.LastName = 'Test';
        //con.AccountId = accountId;
        
        AddPrimaryContact obj = new AddPrimaryContact(con,'CA');
        Test.startTest();
        System.enqueueJob(obj);
        Test.stopTest();
    }
}