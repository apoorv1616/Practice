trigger BankTransactionTrigger on Bank_Transaction__c (after insert,after update,after delete) {
    if(TestUtil.stopLoop == false) {
		TransactionHandler.transactionOperationByAccount(Trigger.new,Trigger.oldMap);
    }
}