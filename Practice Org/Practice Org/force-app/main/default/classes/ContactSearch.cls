public class ContactSearch {
    public static List<Contact> searchForContacts(String lastName , String mailingPostalCode) {
        
        List<Contact> matchContactList = new List<Contact>();
        
        for(Contact con : [SELECT Id,LastName,MailingPostalCode
                          FROM Contact
                          WHERE LastName = :lastName 
                           AND MailingPostalCode = :mailingPostalCode]) {
                               
        					   Contact con1 = new Contact();
                               con1.Id = con.Id;
                               con1.LastName = con.LastName;
                               matchContactList.add(con1);                       
                           }
      
        return matchContactList;
    }

}