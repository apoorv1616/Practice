public class AccountTriggerClass {
    public static void matchBillingAddress(List<Account> newList) {
        List<Contact> updateContact = new List<Contact>();
        
        for(Account acc : newList) {
            
            for(Contact con : [SELECT Id,Name
                               FROM Contact
                               WHERE AccountId = :acc.Id]) {
                                   
                                   //System.debug(acc+' '+con);
                                   //con.AccountId = acc.Id;
                                   con.MailingCity = acc.BillingCity;
                                   con.MailingCountry = acc.BillingCountry;
                                   con.MailingState = acc.BillingState;
                                   con.MailingStreet = acc.BillingStreet;
                                   con.MailingPostalCode = acc.BillingPostalCode;
                                   updateContact.add(con);
                               }
        }
        
        if(updateContact.size() > 0) {
            Update updateContact;
        }	
    }	
}