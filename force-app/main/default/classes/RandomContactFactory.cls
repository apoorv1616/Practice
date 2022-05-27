public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer num , String str) {
        List<Contact> contactList = new List<Contact>();
        
        for(Integer i = 1;i<=num;i++) {
            Contact con = new Contact();
            con.FirstName = 'Test'+i;
            con.LastName = str;
            contactList.add(con);
        }
        return contactList;
    }
}