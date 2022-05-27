public class CampingListController {
    @AuraEnabled 
    public static List<Camping_Item__c> getItems() {
            return [SELECT Id,Name,Price__c,Quantity__c,Packed__c
                    FROM Camping_Item__c];
    }
    
    @AuraEnabled
    public static void saveItem(Camping_Item__c item) {
        Camping_Item__c obj = new Camping_Item__c();
        obj.Name = item.Name;
        obj.Quantity__c = item.Quantity__c;
        obj.Price__c = item.Price__c;
        obj.Packed__c = item.Packed__c;
        
        insert obj;
    }
}