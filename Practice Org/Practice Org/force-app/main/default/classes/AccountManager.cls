public with sharing class AccountManager {
    
    @AuraEnabled(cacheable=True)
    public static List<Account> getAccount(){
        return [SELECT id,Name,Phone FROM Account LIMIT 5];
    }

    @AuraEnabled
    public static List<Account> getAccountImperative(Integer totlalRecords) {
        return [SELECT id,Name,Phone FROM Account LIMIT :totlalRecords];
    }
}