public class TransactionHandler {
    public static void transactionOperationByAccount(List<Bank_Transaction__c> newList , Map<Id,Bank_Transaction__c> oldMap) {
        
        Set<Id> contactIdSet = new Set<Id>();
        Map<Id,Decimal> maxTransactionByAccountMap = new Map<Id,Decimal>();
        Map<Id,List<Bank_Transaction__c>> contactToBankTransactionMap = new Map<Id,List<Bank_Transaction__c>>();
        Set<Id> maxTransactionIdSet = new Set<Id>();
        List<Bank_Transaction__c> bankTransactionList = new List<Bank_Transaction__c>();
        
        if(newList != NULL) {
            for(Bank_Transaction__c obj : newList) {
                if(oldMap == NULL || (oldMap.get(obj.Id).Amount__c != obj.Amount__c) || ((oldMap.get(obj.Id).Type__c != obj.Type__c)&& (obj.Type__c == 'Debit'))|| (oldMap.get(obj.Id).Account_Holder__c != obj.Account_Holder__c)) {
                    contactIdSet.add(obj.Account_Holder__c);
                }
            }
        }
        
        if(newList == NULL && oldMap != NULL) {
            for(Bank_Transaction__c obj : oldMap.values()){
                contactIdSet.add(obj.Account_Holder__c);
            }
        }
        
        for(Contact con : [SELECT Id,Name,Active__c,Account.Id,Account.Name,Account.Per_Person_Transaction__c,
                           (SELECT Id,Type__c,Amount__c,Account_Holder__c
                            FROM Bank_Transactions__r)
                           FROM Contact
                           WHERE Active__c = true
                           AND Id IN :contactIdSet]) {
                               Decimal max = 0;
                               Id maxTransactionId = NULL;
                               
                               for(Bank_Transaction__c obj : con.Bank_Transactions__r) {
                                   maxTransactionByAccountMap.put(obj.Id,con.Account.Per_Person_Transaction__c);
                                   
                                   if(!contactToBankTransactionMap.containsKey(con.Id)) {
                                       contactToBankTransactionMap.put(con.Id,new List<Bank_Transaction__c>());
                                   }
                                   contactToBankTransactionMap.get(con.Id).add(obj);
                                   
                                   if(max < obj.Amount__c) {
                                       max = obj.Amount__c;
                                       maxTransactionId = obj.Id;
                                   }
                               }
                               maxTransactionIdSet.add(maxTransactionId);
                           }
        
        for(Id conId : contactToBankTransactionMap.keySet()) {
            for(Bank_Transaction__c obj : contactToBankTransactionMap.get(conId)) {
                
                if(maxTransactionIdSet.contains(obj.Id)) {
                    obj.High_Value_Transaction__c = true;
                }
                else {
                    obj.High_Value_Transaction__c = false;
                }
                bankTransactionList.add(obj);
            }
        }
        
        if(newList != NULL) {
            for(Bank_Transaction__c obj : newList) {
                if(contactToBankTransactionMap.get(obj.Account_Holder__c).size() > maxTransactionByAccountMap.get(obj.Id)) {
                    obj.addError('Permission Denied');
                }
            }
        }
        
        TestUtil.stopLoop = true;
        update bankTransactionList;
    }
}