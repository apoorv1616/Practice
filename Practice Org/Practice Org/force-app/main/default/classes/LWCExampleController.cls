public without sharing class LWCExampleController {
    public static Integer fileSize = 0;
    public static Integer count = 0;

    // Get names of all custom metadata in org
    @AuraEnabled
    public static List < CustomMetadataWrapper > getAllCustomMetadata() {

        List < CustomMetadataWrapper > wrapperList = new List < CustomMetadataWrapper > ();
        for (EntityDefinition metadataRecord: [Select MasterLabel, QualifiedApiName, KeyPrefix, DurableId
                From EntityDefinition Where IsCustomizable = true
                And QualifiedApiName Like '%_mdt'
            ]) {

            CustomMetadataWrapper wrapper = new CustomMetadataWrapper();
            wrapper.label = metadataRecord.MasterLabel;
            wrapper.fieldAPI = metadataRecord.QualifiedApiName;
            wrapperList.add(wrapper);
        }

        return wrapperList;
    }

    //Get all records of custom metadata
    @AuraEnabled
    public static List < sobject > getAllCustomMetadRecords(String fields, String customMetadata) {
        String query = 'SELECT ' + fields + ' FROM ' + customMetadata;
        return Database.query(query);
    }


    //Get all custom fields from custom metadata
    @AuraEnabled
    public static List < CustomMetadataWrapper > getAllCustomMetadataFields(String customMetadata) {

        Map < String, Schema.SObjectType > schemaMap = Schema.getGlobalDescribe();
        Map < String, Schema.SObjectField > fieldMap = schemaMap.get(customMetadata).getDescribe().fields.getMap();
        List < CustomMetadataWrapper > wrapperList = new List < CustomMetadataWrapper > ();

        for (Schema.SObjectField sfield: fieldMap.Values()) {

            schema.describefieldresult dfield = sfield.getDescribe();

            if (dfield.getname().contains('__c')) {
                CustomMetadataWrapper wrapper = new CustomMetadataWrapper();
                wrapper.label = dfield.getLabel();
                wrapper.fieldAPI = dfield.getname();
                wrapperList.add(wrapper);
            }
        }

        return wrapperList;
    }


    @AuraEnabled
    public static void readCSVFile(Id idContentDocument, String metadataName, String fields) {
        Metadata.DeployContainer mdContainer = new Metadata.DeployContainer();

        if (idContentDocument != null) {
            List < sobject > metadataRecordList = getAllCustomMetadRecords(fields, metadataName);
            count = metadataRecordList.size();
            // getting File Data based on document id 
            ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =: idContentDocument];
            // split the file data
            list < String > lstCSVLines = objVersion.VersionData.toString().split('\n');
            fileSize = lstCSVLines.size();


            List < String > fieldList = fields.split(',');

            for (Integer i = 1; i < lstCSVLines.size(); i++) {

                list < String > csvRowData = lstCSVLines[i].split(',');
                System.debug('csvRowData====> ' + csvRowData);

                mdContainer.addMetadata(insertbulkMetadata(csvRowData, metadataName, fields));

            }

            if (mdContainer != NULL) {
                Id jobId = Metadata.Operations.enqueueDeployment(mdContainer, null);
            }

        }
    }

    public static Metadata.CustomMetadata insertbulkMetadata(List < String > metadataRecord, String metadataName, String fields) {

        Metadata.DeployContainer mdContainer = new Metadata.DeployContainer();

        String nameSpacePrefix = '';
       
        Metadata.CustomMetadata metadataRec = new Metadata.CustomMetadata();
        count += 1;
        System.debug(count);

        metadataRec.fullName = metadataName + '.X' + count;
        metadataRec.label = String.valueOf(count);

        List < String > fieldList = fields.split(',');

        Integer start = 1;

        for (String fieldRecord: fieldList) {
            SObjectType r = ((SObject)(Type.forName('Schema.' + metadataName).newInstance())).getSObjectType();
            DescribeSObjectResult d = r.getDescribe();
            String type = String.valueOf(d.fields
                .getMap()
                .get(fieldRecord)
                .getDescribe()
                .getType());

            Metadata.CustomMetadataValue customField1 = new Metadata.CustomMetadataValue();
            customField1.field = fieldRecord;
            if (type.equalsIgnoreCase('date')) {

                customField1.value = metadataRecord.get(start - 1);
            } else {
                customField1.value = String.valueOf(metadataRecord.get(start - 1));
            }
            start += 1;

            metadataRec.values.add(customField1);
        }
        return metadataRec;

    }

    public class CustomMetadataWrapper {
        @AuraEnabled public string label {
            get;
            set;
        }
        @AuraEnabled public string fieldAPI {
            get;
            set;
        }
    }
}