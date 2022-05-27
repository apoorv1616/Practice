@isTest
public class TransactionHandlerTest {
    public static List<Bank_Transaction__c> bankTransactionList;
    public static Id accId = NULL;
    public static Id conId = NULL;
    
    public static void create(Integer totalCount) {
        bankTransactionList = new List<Bank_Transaction__c>();
        
        Account acc = new Account();
        acc.Name = 'Test';
        acc.Per_Person_Transaction__c = 2;
        insert acc;
        accId = acc.Id;
        
        Contact con = new Contact();
        con.LastName = 'test';
        con.Active__c = true;
        con.AccountId = acc.Id;
        insert con;
        conId = con.Id;
        
        for(Integer count = 0;count< totalCount;count++) {
            Bank_Transaction__c obj = new Bank_Transaction__c();
            obj.Account_Holder__c = con.Id;
            obj.Amount__c = 500 + count;
            obj.Type__c = 'Debit';
            bankTransactionList.add(obj);
        }
    }
    
    static testmethod void insertBankTransaction() {
        create(2);
        Test.startTest();
        insert bankTransactionList;
        Test.stopTest();
        
        System.assertEquals(2, [SELECT COUNT() 
                                FROM Bank_Transaction__c
                                WHERE Account_Holder__c = :conId]);
    }
    
    static testmethod void insertBankTransactionError() {
        try {
            create(3);
            Test.startTest();
            insert bankTransactionList;
            Test.stopTest();
        }
        catch(Exception e) {
            Boolean isContains = e.getMessage().contains('Permission Denied');
            System.assertEquals(true, isContains);
        }
    }
    
    static testmethod void updateBankTransaction() {
        create(2);
        insert bankTransactionList;
        
        List<Bank_Transaction__c> updateList = new List<Bank_Transaction__c>();
        for(Bank_Transaction__c obj : [SELECT Id,CreatedDate,Amount__c 
                                       FROM Bank_Transaction__c
                                       WHERE Amount__c = 500]) {
                                           obj.Amount__c = 300;
                                           updateList.add(obj);
                                       }
        Test.startTest();
        update updateList;
        Test.stopTest();  
        
        System.assertEquals(1, [SELECT COUNT()
                                FROM Bank_Transaction__c
                                WHERE Amount__c = 300]);
    }
    
    static testmethod void updateBankTransaction2() {
        create(2);
        insert bankTransactionList;
        
        Contact conNew = new Contact();
        conNew.LastName = 'test1';
        conNew.Active__c = true;
        conNew.AccountId = accId;
        insert conNew;
        
        List<Bank_Transaction__c> updateList = new List<Bank_Transaction__c>();
        for(Bank_Transaction__c obj : [SELECT Id,CreatedDate,Amount__c 
                                       FROM Bank_Transaction__c
                                       WHERE Amount__c = 500]) {
                                           obj.Account_Holder__c = conNew.Id;
                                           updateList.add(obj);
                                       }
        Test.startTest();
        update updateList;
        Test.stopTest(); 
        
        System.assertEquals(1, [SELECT COUNT()
                                FROM Bank_Transaction__c
                                WHERE Account_Holder__c = :conNew.Id]);
    }
    
    static testmethod void deleteBankTransaction() {
        create(2);
        insert bankTransactionList;
        List<Bank_Transaction__c> deleteList = [SELECT Id,Amount__c 
                                                FROM Bank_Transaction__c
                                                WHERE Amount__c = 500];
        Test.startTest();
        TestUtil.stopLoop = false;
        delete deleteList;
        Test.stopTest();
        
        System.assertEquals(0, [SELECT COUNT()
                                FROM Bank_Transaction__c
                                WHERE Amount__c = 500]);
    }
}