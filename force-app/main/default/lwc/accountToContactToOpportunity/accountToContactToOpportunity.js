import { LightningElement,track } from 'lwc';
import getData from '@salesforce/apex/accountContactOpportunityHierarchy.getAllAccountByContactByOpportunity';
import showToastEvent from 'c/pubsub';
export default class AccountToContactToOpportunity extends LightningElement {
    @track data = [];
    @track pageSize = 1;
    @track passData = false;
    @track childData = [];
    @track queryTerm;
    @track activeSections = [];
    @track activeSectionsMessage = '';

    handleAccountSelection(event){
        console.log("the selected record id is"+event.detail);
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.queryTerm = evt.target.value;
        }
    }
    handleEvent(event) {
        console.log("catched event");
        console.log("inside : " + JSON.stringify(event.detail));
        this.childData = event.detail;
    }
    handleClick(event) {
        var accountName = event.target.value;
        this.data.forEach(function(item,ind){
            if(item.accountName == accountName) {
                item.accountValue = item.accountValue === true ? false : true;
            }
        }); 
    }

    handleToggleSection(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }

    connectedCallback() {
        //this.getData();
    }

    getData() {
        getData('','','').then(result => {
            this.data = JSON.parse(JSON.stringify(result));
            this.ShowToastEvent('Success!!','Record fetched successfully','success');
            this.passData = true;

        }).catch(error => {
            this.ShowToastEvent('Error!!','Unable to fetch record','error');
        });
    }

    ShowToastEvent(title,message,variant) {
        showToastEvent(title,message,variant);
    }

    ShowToastEvent(title,message,variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant : variant,
        });
        this.dispatchEvent(event);
    }
}