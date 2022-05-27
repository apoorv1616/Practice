import { LightningElement,track,api,wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/CheckRefreshAndToastExportController.getAccountDetails';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'c/pubsub';
export default class CheckRefreshAndToastExport extends LightningElement {
    @api recordId;

    @wire(getAccountDetails , {recordId : "$recordId"}) result;

    get responseReceived() {
        if(this.result.data) {
            return true;
        }
        return false;
    }
    
    handleRefresh() {
        this.refresh();
    }  
    
    @api
    refresh() {
        console.log("refreshed called");
        return refreshApex(this.result); 
        
    }
    
}