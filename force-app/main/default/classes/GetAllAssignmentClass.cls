public class GetAllAssignmentClass {
    @AuraEnabled
    public static List<Assignment__c> getAllAssignmentList() {
        return [SELECT Name,Start_Date__c,End_Date__c,Contact__c From Assignment__c];
    }
}