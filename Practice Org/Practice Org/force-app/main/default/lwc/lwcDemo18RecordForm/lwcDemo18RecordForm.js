import { LightningElement,track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';


export default class LwcDemo18RecordForm extends LightningElement {
    
    fieldArray = [NAME_FIELD,PHONE_FIELD,WEBSITE_FIELD];
    @track recordId;
    successHandler(event) {
        this.recordId = event.detail.id;
    }
}