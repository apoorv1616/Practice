public without sharing class CheckRefreshAndToastExportController {
    @AuraEnabled(cacheable=true)
    public static CheckRefreshAndToastExportController.AccountWrapper getAccountDetails(String recordId) {
        AccountWrapper wrapper = new AccountWrapper();
        if(recordId !=  null) {
        for(Account acc : [SELECT id,Name,Type
                           FROM Account
                           WHERE id = :recordId]) {
                            wrapper.id = acc.id;
                            wrapper.Name = acc.Name;
                            wrapper.Type = acc.Type;
                           }
                        }
        return wrapper;
    }

    public class AccountWrapper {
        @AuraEnabled public String id {get;set;}
        @AuraEnabled public String Name {get;set;}
        @AuraEnabled public String Type {get;set;}
    }
}