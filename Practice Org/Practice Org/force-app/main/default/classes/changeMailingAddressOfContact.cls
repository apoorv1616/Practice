public class changeMailingAddressOfContact {
    public static void changeMAilingAddress(List<Contact> newList) {
        for(Account acc : [SELECT Id,BillingAddress
                           FROM Account]) {
                               for(Contact con : acc.Contacts) {
                                   Contact con1 = new Contact();
                                   con1.Id = con.Id;
                                   con1.MailingStreet = acc.BillingStreet;
                                   con1.MailingCity = acc.BillingCity;
                                   con1.MailingState = acc.BillingState;
                                   con1.MailingPostalCode = acc.BillingPostalCode;
                                   con1.MailingCountry = acc.BillingCountry;
                                   
                               }
                           }
    }
}