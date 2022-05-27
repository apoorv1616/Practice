import { LightningElement,track } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccountImperative'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class LwcDemo20ApexImperativeCall extends LightningElement {

    @track numberOfRecords;
    @track accounts;

    numberChangeHandler(event) {
        this.numberOfRecords = event.target.value;
    }

    getAccount() {
        getAllAccounts({totlalRecords : this.numberOfRecords}).then(response=>{
            this.accounts = response;
            const event = new ShowToastEvent({
                title:  'Account Loaded',
                variant : 'success',
                message: this.numberOfRecords + 'Accounts record are successfully loaded',
            });
            this.dispatchEvent(event);
        })
        .catch(error=>{
            console.log("error : "+error.body.message);
        })
    }

    responseReceived() {
        if(this.accounts) {
            return true;
        }
        return false;
    }
}