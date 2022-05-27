public with sharing class ShowRecordsController {
    static Integer limitRecord = 50;
	@AuraEnabled
    public static List<sobject> showObjectRecords(String objectName ,List<String> fieldValueArr) {        
        String query = 'SELECT ';
        Boolean firstValue = true;
        for(String fieldsValue : fieldValueArr){
            if(firstValue) {
                query += fieldsValue;
                firstValue = false;
            }
            else {
                query += ',' + fieldsValue;
            }
        }
        query += ' FROM '+ objectName + ' LIMIT ' + 100;
        System.debug(query);
        List<sobject> sobjectList = Database.query(query);
        System.debug(sobjectList);
        return sobjectList;
    }
}