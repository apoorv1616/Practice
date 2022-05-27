public class AccountProcessor {
    @future
    public static void countContacts(List<Id> accountId) {
        List<Account> accountList = new List<Account>();
        
        for(AggregateResult ar:[SELECT COUNT(Id),AccountId
                                FROM Contact
                                WHERE AccountId IN :accountId
                                GROUP BY AccountId]) {
                                    
                                    //System.debug((Id)ar.get('ar.AccountId')+' '+(Decimal)ar.get('expr0'));
                                    Account acc = new Account();
                                    acc.Id = (Id)ar.get('AccountId');
                                    acc.Number_of_Contacts__c = (Decimal)ar.get('expr0');
                                    accountList.add(acc);
                                }
        
        if(accountList.size() > 0)
            //System.debug(accountList);
            Update accountList;
    }
}