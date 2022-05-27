public without sharing class SearchContactName {
    
    public class WrapperClass {
        @AuraEnabled public List<Contact> contactList;
        @AuraEnabled public Boolean isExactMatch = false;
    }
    
    public static List<String> permutations = new List<String>();
    
    @AuraEnabled
    public static void increaseSearchCount(Contact con) {
        
        //increase count of search
        List<Contact> contactList = [SELECT Id, Search_Count__c
                                     FROM Contact
                                     Where Id = :con.Id];
        if(!contactList.isEmpty()) {
            Contact contactRecord = contactList.get(0);
            contactRecord.Search_Count__c = contactRecord.Search_Count__c != null 
                							? contactRecord.Search_Count__c + 1 : 1;
            update contactRecord;
        }
    }
    
    @AuraEnabled
    public static WrapperClass findContactName(String seachName) {
        WrapperClass wrapper = new WrapperClass();
        //Exact match
        List<Contact> contactSearchList = [SELECT Id, Name 
                                            FROM Contact
                                            WHERE Name = :seachName
                                            OR FirstName = :seachName
                                            OR LastName = :seachName
                                           	ORDER BY Search_Count__c
                                           	LIMIT 1];
        
        //Exact match not found then first go for permutation
        if(contactSearchList.isEmpty()) {
            wrapper.isExactMatch = false;
            getAllPermutations(seachName,'');
            
            if(!permutations.isEmpty()) {
                //getAllPermutations
                contactSearchList = [SELECT Id, Name 
                                      FROM Contact
                                      WHERE Name IN :permutations
                                      OR FirstName IN :permutations
                                      OR LastName IN :permutations
                                      ORDER BY Search_Count__c
                                      LIMIT 1];
            }
            
        }
        
        //If permutation not found then go for like option
        if(contactSearchList.isEmpty()) {
            String likeSearch = '%'+ seachName + '%';
            contactSearchList = [SELECT Id, Name
                                  FROM Contact
                                  WHERE Name Like :likeSearch
                                  OR FirstName Like :likeSearch
                                  OR LastName Like :likeSearch
                                  ORDER BY Search_Count__c
                                  LIMIT 1];
        }
        
        //if found search contact then return;
        if(!contactSearchList.isEmpty()) {
            wrapper.contactList = contactSearchList;
            return wrapper;
        }
        
        //if no result found then return null
        return null;
    }
    
    // Function to print all the permutations of str 
    public static void getAllPermutations(String str, String ans) 
    { 
        
        // If string is empty 
        if (str.length() == 0) {
            permutations.add(ans); 
            //return ans;
        } 
        
        for (Integer i = 0; i < str.length(); i++) { 
            
            // ith character of str 
            String ch = convertASCIIToString(str.charAt(i)); 
            
            // Rest of the string after excluding  
            // the ith character 
            String ros = str.substring(0, i) +  
                str.substring(i + 1); 
            
            // Recurvise call 
            getAllPermutations(ros, ans + ch); 
        } 
    } 
    
    public static String convertASCIIToString(Integer ascii) {
        return String.fromCharArray( new List<integer> { ascii } );
    }
}