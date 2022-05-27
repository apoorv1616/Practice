public with sharing class addContactClass {
    @AuraEnabled
    public static String addContact(String contactString){    
        addContactClass.ContactWrapper wrapper = (ContactWrapper) JSON.deserialize(contactString, ContactWrapper.class);
        Contact con = new Contact();
        con.FirstName = wrapper.FirstName;
        con.LastName = wrapper.LastName;
        con.Email = wrapper.Email;
        con.Birthdate = wrapper.Birthdate;
        insert con;
        return con.id;
    }
    
    public static void callout(){
        String token = '6LdFMLEZAAAAAEbskSwXwl0tqjX7HtIOB5zWTo8u';
        Http http = new Http(); 
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.google.com/recaptcha/api/siteverify');
        req.setMethod('POST');
        req.setBody('secret=6LdFMLEZAAAAANiEcQio28rAgc1X3rSjSTNP4ZlH&response='+token);
        HttpResponse res = http.send(req);
        System.debug(res);
        System.debug(res.getBody());
    }

    class ContactWrapper{
        String FirstName;
        String LastName;
        String Email;
        Date Birthdate;
    }
}