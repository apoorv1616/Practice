public class MetadataExample {

    public void updateMetadata () {
        Metadata.CustomMetadata customMetadata = new Metadata.CustomMetadata();
        customMetadata.fullName = 'MyNamespace__MyMetadataTypeName.MyMetadataRecordName';
        
        Metadata.CustomMetadataValue customField = new Metadata.CustomMetadataValue();
        customField.field = 'customField__c';
        customField.value = 'New value';
        
        /*Comment these lines as you can't add list
		List <Metadata.CustomMetadata> mdtlist = new List<Metadata.CustomMetadata>();
        mdtlist.add(customField);  // Line 12
		*/
		
		//Instead Use this
		customMetadata.values.add(customField);
		
    }

}