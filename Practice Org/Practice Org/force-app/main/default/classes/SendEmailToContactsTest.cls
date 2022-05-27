@isTest
public class SendEmailToContactsTest {
	@testSetup
    static void setup(){
        List<Contact> contactList = new List<Contact>();
        
        for(Integer count=0;count<10;count++){
            Contact con = new Contact();
            con.LastName = 'Test'+count;
            con.Email = 'apoorvanand4@gmail.com';
            contactList.add(con);
        }
        insert contactList;
    }
    
    @isTest
    static void testExecute(){
        SendEmailToContacts obj = new SendEmailToContacts();
        Test.startTest();
        	Database.executeBatch(obj);
        Test.stopTest();
    }
}