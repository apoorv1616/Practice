public class sampleClass {
    @AuraEnabled
    public static List<Account> sampleFunction(String name) {
        return [SELECT Id,Name FROM Account WHERE Name = :name];
    }
    
    @AuraEnabled
    public static List<Account> getAccountList() {
        return [SELECT Id,Name from Account];
    }
}