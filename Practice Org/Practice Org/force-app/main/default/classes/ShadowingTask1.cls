public without sharing class ShadowingTask1 {


    @AuraEnabled
    public static List<Contact> getAllContacts() {
        return [SELECT Id,Name,Email,Phone,MailingCity
                FROM Contact
                WHERE Email != null 
                AND Phone != null 
                AND MailingCity != null
               ];
    }

    @AuraEnabled 
    public static List<Contact> getContactById(String id) {
        return [SELECT Id,FirstName,LastName,Email,Phone,MailingStreet,MailingCity,MailingState,MailingPostalCode,MailingCountry
                FROM Contact
                WHERE Id = :id
               ];
    }

    @AuraEnabled
    public static Boolean updateContactById(String Id,String updatedContactList){
        ContactInformationWrapper obj = new ContactInformationWrapper();
        ContactInformationWrapper wrapper = (ContactInformationWrapper) JSON.deserialize(updatedContactList, ContactInformationWrapper.class);

        Contact con = obj.setContact(wrapper);
        if(con != null) {
            con.id = Id;
            update con;
            return true;
        }
        else {
            return false;
        }
    }

    @AuraEnabled
    public static Boolean saveContact(String contactDetails){
        ContactInformationWrapper obj = new ContactInformationWrapper();
        ContactInformationWrapper wrapper = (ContactInformationWrapper) JSON.deserialize(contactDetails, ContactInformationWrapper.class);

        Contact con = obj.setContact(wrapper);
        if(con != null) {
            insert con;
            return true;
        }
        else {
            return false;
        }
    }

    @AuraEnabled
    public static Boolean deleteContact(List<Id> contactIdList){
        List<Contact> deleteContact = new List<Contact>();

        if(contactIdList.size() > 0) {
            for(Contact con : [SELECT Id 
                               FROM Contact 
                               WHERE Id IN :contactIdList]) {
                deleteContact.add(con);
            }   
        }

        if(deleteContact.size() > 0) {
            delete deleteContact;
            return true;
        }
        return false;
    }

    public class ContactInformationWrapper{
        @AuraEnabled public String FirstName;
        @AuraEnabled public String LastName;
        @AuraEnabled public String Email;
        @AuraEnabled public String Phone;
        @AuraEnabled public String MailingStreet;
        @AuraEnabled public String MailingCity;
        @AuraEnabled public String MailingState;
        @AuraEnabled public String MailingPostalCode;
        @AuraEnabled public String MailingCountry;

        public Contact setContact(ContactInformationWrapper wrapper) {
            Contact con = new Contact();
            con.FirstName = wrapper.FirstName;
            con.LastName = wrapper.LastName;
            con.Email = wrapper.Email;
            con.Phone = wrapper.Phone;
            con.MailingStreet = wrapper.MailingStreet;
            con.MailingCity = wrapper.MailingCity;
            con.MailingState = wrapper.MailingState;
            con.MailingPostalCode = wrapper.MailingPostalCode;
            con.MailingCountry = wrapper.MailingCountry;

            return con;
        }
    }
}