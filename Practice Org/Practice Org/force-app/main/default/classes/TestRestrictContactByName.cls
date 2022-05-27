@isTest
public class TestRestrictContactByName {
    static testmethod void checkLastNameNull() {
        List<Contact> newContact = new List<Contact>();
        
        Contact con = new Contact();
        con.LastName = 'INVALIDNAME';
        newContact.add(con);
        
        if(newContact.size() > 0) {
            Insert newContact;
        }
    }
}