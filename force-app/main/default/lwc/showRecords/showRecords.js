import { LightningElement,track } from 'lwc';

export default class ShowRecords extends LightningElement {
    @track inputValue = {};
    @track isDataFound = false;
    @track showSpinner = false;
    @track data = [];
    @track fieldName;
    @track fieldValueArr = [];
    @track isDownloadData = false;
    @track items = []; 

    constructor(){
        super();
        this.initializeValues();
    }

    handleRemove(event) {
        console.log(event.target.name);
    }

    handleFieldValue(event) {
        this.fieldName = event.target.value;
    }

    includeFields() {
        this.fieldValueArr.push(this.fieldName);
        console.log(JSON.stringify(this.fieldValueArr));
    }


    initializeValues() {
        this.inputValue.pageSize = 10;
        this.data = [];
        this.isDataFound = false;
        this.isDownloadData = false;
    }

    get options() {
        return [
            { label: 'Account', value: 'Account' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Opportunity', value: 'Opportunity' },
        ];
    }

    handleChange(event) {
        this.isDataFound = false;
        this.inputValue[event.target.name] = event.detail.value;
    }
    
    showRecords() {
        this.showSpinner = true;
        //console.log(JSON.stringify(this.inputValue));
        this.isDataFound = true;
    }

    handleData(event) {
        //console.log(JSON.stringify(event.detail.alldata));
        this.data = event.detail.data;
        this.items = event.detail.alldata;
        this.showSpinner = false;
        
    }

    downloadData() {
        this.isDownloadData = true;
    }
}