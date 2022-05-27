public class AddPrimaryContact implements Queueable {
    
    public Contact con1 = Null;
    public String state = Null;
    
    public AddPrimaryContact(Contact con , String state) {
        this.con1 = con;
        this.state = state;
    }
    
    public void execute(QueueableContext context) {
        
        List<Contact> contactList = new List<Contact>();
    	for(Account acc : [SELECT Id,BillingState,Name,
                           (SELECT Id,Name
                            FROM Contacts)
                           FROM Account
                           WHERE BillingState = :state
                           LIMIT 200]) {
                               Contact con2 = con1.clone(false,false,false,false);
                               con2.AccountId = acc.Id;
                               contactList.add(con2);
                           }    
        Insert contactList;
    
    }
}