public class capturePhotoV1Controller {
	public String blobValue {get;set;}
    public void convertToAttachment() {
        System.assert(false, 'blobValue-----> ' + this.blobValue);
        
        Attachment attach=new Attachment();    
        attach.Name='EmployeeSignature Capture.jpeg';
        Blob bodyBlob=Blob.valueOf('EmployeeSignature Capture Body');
        attach.body=bodyBlob;

    }
}