public class practice {
    public void practiceTrigger() {
        
        List<list<SObject>> invoiceSearchList = new List<List<SObject>>();

        invoiceSearchList = [FIND 'Test' IN ALL FIELDS RETURNING Account,Contact];
        
        
        
    }
}