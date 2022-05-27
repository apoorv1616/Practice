import { LightningElement,track,wire } from 'lwc';
import { createRecord,getRecord } from 'lightning/uiRecordApi';

var fieldArray = ['Account.Name','Account.Phone','Account.Website'];

export default class LwcDemo16LDS extends LightningElement {
    @track accountName;
    @track accountPhone;
    @track accountWebiste;
    @track recordId;
    
    @wire(getRecord,{recordId : '$recordId',fields : fieldArray}) accountRecord;

    nameChangeHandler(event) {
        this.accountName = event.target.value;
    }

    phoneChangeHandler(event) {
        this.accountPhone = event.target.value;  
    }

    websiteChangeHandler(event) {
        this.accountWebsite = event.target.value;        
    }

    createAccount() {
        var fields = {'Name':this.accountName,'Phone':this.accountPhone,'Website':this.accountWebsite};
        var recordInput = {apiName : 'Account' , fields};

        createRecord(recordInput).then(response => {
            console.log("Account Record Created and account id is : "+response.id);
            this.recordId = response.id;
        })

        .catch(error => {
            console.log("Account Record Not Created and error is : " + error.body.message);
        })
    }

    get retAccountName(){
        if(this.accountRecord.data) {
            return this.accountRecord.data.fields.Name.value;
        }
        return undefined;

    }

    get retAccountPhone() {
        if(this.accountRecord.data) {
            return this.accountRecord.data.fields.Phone.value;
        }
        return undefined;
        
    }

    get retAccountWebsite() {
        if(this.accountRecord.data) {
            return this.accountRecord.data.fields.Website.value;
        }
        return undefined;
    }



}