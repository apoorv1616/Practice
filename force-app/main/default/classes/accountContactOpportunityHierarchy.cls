public without sharing class accountContactOpportunityHierarchy {

    public static List<sObject> searchAccount(String searchTerm, string myObject, String filter) {
        String myQuery = null;
        if(filter != null && filter != ''){
            myQuery = 'Select Id from '+myObject+' Where Name Like  \'%' + searchTerm + '%\' AND '+filter+' LIMIT  5';
        }
        else {
            if(searchTerm == null || searchTerm == ''){
                myQuery = 'Select Id from '+myObject+' Where LastViewedDate != NULL ORDER BY LastViewedDate DESC LIMIT  5';
            }
            else {
                myQuery = 'Select Id from '+myObject+' Where Name Like  \'%' + searchTerm + '%\' LIMIT  5';
            }
        }
        List<sObject> lookUpList = database.query(myQuery);
        return lookUpList;
    }

	@AuraEnabled
    public static List<accountContactOpportunityHierarchy.AccountWrapper> getAllAccountByContactByOpportunity(String searchTerm, string myObject, String filter) {
        Map<String,List<accountContactOpportunityHierarchy.OpportunityWrapper>> contactToOpportunityWrapperMap = 
            new Map<String,List<accountContactOpportunityHierarchy.OpportunityWrapper>>();
        
        Map<String,List<accountContactOpportunityHierarchy.ContactWrapper>> accountToOContactWrapperMap = 
            new Map<String,List<accountContactOpportunityHierarchy.ContactWrapper>>();
        
        List<accountContactOpportunityHierarchy.AccountWrapper>accountWrapperList = new List<accountContactOpportunityHierarchy.AccountWrapper>();
        
        List<sobject> searchList = searchAccount(searchTerm, myObject, filter);
        
        String oppQuery = 'SELECT Id,Name,StageName,CloseDate,ContactId FROM Opportunity';
        oppQuery += searchList.size() > 0 ? ' WHERE contactId.AccountId IN :'+(searchList) : '';

		for(opportunity opp : 
            Database.query(oppQuery)) {
                 OpportunityWrapper wrapper = new OpportunityWrapper();
                 wrapper.opportunityName = opp.Name;
                 wrapper.StageName = opp.StageName;
                 wrapper.CloseDate = String.valueOf(opp.CloseDate);
                 
                 if(!contactToOpportunityWrapperMap.containsKey(opp.ContactId)) {
                     contactToOpportunityWrapperMap.put(opp.ContactId , new List<accountContactOpportunityHierarchy.OpportunityWrapper>());
                 }
                 contactToOpportunityWrapperMap.get(opp.ContactId).add(wrapper);
             }
        
        for(Contact con : 
           [SELECT Id,Name,accountId 
           	FROM Contact
            WHERE Id IN :contactToOpportunityWrapperMap.keySet()]) {
                
                ContactWrapper wrapper = new ContactWrapper();
                wrapper.contactName = con.Name;
                wrapper.contactValue = false;
                wrapper.opportunityWrapperList = contactToOpportunityWrapperMap.get(con.id);
                
                if(!accountToOContactWrapperMap.containsKey(con.AccountId)) {
                    accountToOContactWrapperMap.put(con.AccountId,new List<accountContactOpportunityHierarchy.ContactWrapper>());
                }
                accountToOContactWrapperMap.get(con.AccountId).add(wrapper);
        }
        
        for(Account acc : 
           [SELECT Id,Name 
            FROM Account
            WHERE Id IN :accountToOContactWrapperMap.keySet()]) {
                AccountWrapper wrapper = new AccountWrapper();
                wrapper.accountName = acc.Name;
                wrapper.accountValue = false;
                wrapper.contactWrapperList = accountToOContactWrapperMap.get(acc.id);
                accountWrapperList.add(wrapper);
            }
        System.debug(accountWrapperList);
        return accountWrapperList; 
    }
    
    public class AccountWrapper {
        @AuraEnabled public String accountName {get;set;}
        @AuraEnabled public Boolean accountValue {get;set;}
        @AuraEnabled public List<ContactWrapper> contactWrapperList {get;set;}
    }
    public class ContactWrapper {
        @AuraEnabled public String contactName {get;set;}
        @AuraEnabled public Boolean contactValue {get;set;}
        @AuraEnabled public List<OpportunityWrapper> opportunityWrapperList {get;set;}
    }
    public class OpportunityWrapper {
        @AuraEnabled public String opportunityName {get;set;}
        @AuraEnabled public String StageName {get;set;}
        @AuraEnabled public String CloseDate {get;set;}
    }
}