public class GenerateStudentReport {
    public static void getStudentRecords() {
        Map<Id,List<Decimal>> contactMarksMap = new Map<Id,List<Decimal>>();
        
        for(Marks__c marks : [SELECT Id,Name,Contact__r.Id,Contact__r.Name,Total_Marks__c
                              FROM Marks__c
                              WHERE Total_Marks__c != NULL]) {
                                  System.debug(marks.Contact__r.Name + ' '+ marks.Name +' ' + marks.Total_Marks__c);
                                  Decimal Physics = 0;
                                  Decimal Chemistry = 0;
                                  Decimal Maths = 0;
                                  
                                  if(marks.Name == 'Physics')
                                      Physics = marks.Total_Marks__c;
                                  if(marks.Name == 'Chemistry')
                                      Chemistry = marks.Total_Marks__c;
                                  if(marks.Name == 'Maths')
                                      Maths = marks.Total_Marks__c;
                                  
                                  contactMarksMap.put(marks.Contact__r.Id , new List<Decimal>{Physics,Chemistry,Maths});
                                  
                              }
        System.debug(contactMarksMap);
    }
}