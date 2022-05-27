@isTest
public class AccountProcessorTest {
    static testmethod void testAccount() {
        List<Id> accountIdList = new List<Id>();
 		List<Contact> contactList = new List<Contact>();
        
        Account acc = new Account();
        acc.Name = 'Test123';
 		Insert acc;
        
        for(Integer count = 1 ; count <= 3 ; count++) {
            Contact con = new Contact();
            con.AccountId = acc.Id;
            con.LastName = 'Test'+count;
            contactList.add(con);
        }
        
        Insert contactList;
        
        accountIdList.add(acc.Id);
        Test.startTest();
        AccountProcessor.countContacts(accountIdList);
        Test.stopTest();
    }
}