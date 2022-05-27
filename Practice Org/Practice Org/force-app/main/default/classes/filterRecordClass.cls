public with sharing class filterRecordClass {
    @AuraEnabled
    public static List<Product2> getAllRecords(String name) {
        return [SELECT Name From Product2
                WHERE Name = :name];
    }
}