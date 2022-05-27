import { LightningElement, track, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import readCSV from '@salesforce/apex/LWCExampleController.readCSVFile';
import getAllCustomMetadata from '@salesforce/apex/LWCExampleController.getAllCustomMetadata';
import getAllCustomMetadataFields from '@salesforce/apex/LWCExampleController.getAllCustomMetadataFields';
import getAllCustomMetadRecords from '@salesforce/apex/LWCExampleController.getAllCustomMetadRecords';

export default class ReadCSVFileInLWC extends LightningElement {
    @api recordId;
    @track error;
    @track data;
    @track result;
    @track optionsArr;
    @track value;
    @track metadataFields;
    @track showFields;
    @track fields;
    @track recordsToDisplay = [];
    @track now;
    @track showSpinner; 
    @track showData;

    currentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        this.now = mm + '/' + dd + '/' + yyyy+', '+today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    }

    ShowToastEvent(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }


    connectedCallback() {
        this.showSpinner = true;
        this.getAllCustomMetadata();
    }

    handleDownload() {
        this.showSpinner = true;
        if(!this.value) {
            this.ShowToastEvent('Custom metadata not selected','','warning');
            this.showSpinner = false;
            return;
        }
        this.downloadData();
    }

    getAllCustomMetadRecords() {
        if(!this.fields || !this.value) {
            this.showSpinner = false;
            return;
        }
        getAllCustomMetadRecords({fields : this.fields , customMetadata : this.value})
        .then(result => {
            if(result) {
                this.data = JSON.parse(JSON.stringify(result));
                //this.recordsToDisplay = [...this.data];
                this.recordsToDisplay = this.data;
                this.showData = this.data.length > 0 ? true : false;
                this.showSpinner = false;
            }
            else {
                this.ShowToastEvent(JSON.stringify(error),'','warning');
                this.showData = this.data.length > 0 ? true : false;
                this.showSpinner = false;
            }
            
        })
        .catch(error => {
            this.ShowToastEvent(JSON.stringify(error),'','error');
            this.showSpinner = false;
            this.showData = false;
        })
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    handleRefresh() {
        if(!this.value) {
            this.ShowToastEvent('Custom metadata not selected','','warning');
            this.showSpinner = false;
            return;
        }
        this.showSpinner = true;
        this.showData = false;
        this.currentDate();
        this.handleSearch();
    }

    handleSearch() {
        this.showSpinner = true;
        if(!this.value) {
            this.ShowToastEvent('Custom metadata not selected','','warning');
            this.showSpinner = false;
            return;
        }
        this.getAllCustomMetadataFields();
    }

    getAllCustomMetadataFields() {
        if(!this.value) {
            this.ShowToastEvent('Custom metadata not selected','','warning');
            this.showSpinner = false;
            return;
        }
        getAllCustomMetadataFields({customMetadata : this.value})
        .then(result => {
            let optionsArr = [];

            //result.forEach(item => optionsArr.push({'label' : item.label, 'fieldName' : item.fieldAPI}));
            let fields = '';
            result.forEach(function(item,ind) {
                optionsArr.push({'label' : item.label, 'fieldName' : item.fieldAPI})
                fields += item.fieldAPI + ',';
            });
            this.fields = fields.substring(0,fields.length - 1);

            this.metadataFields = optionsArr;
            this.showFields = true;
            this.data = false;
            this.getAllCustomMetadRecords();
        })
        .catch(error => {
            this.ShowToastEvent(JSON.stringify(error),'','error');
            this.showFields = false;
            this.data = false;
            this.showSpinner = false;
        });
    }

    getAllCustomMetadata() {
        getAllCustomMetadata()
        .then(result => {
            this.result = JSON.parse(JSON.stringify(result));

            let optionsArr = [];

            this.result.forEach(item => optionsArr.push({'label' : item.label, 'value' : item.fieldAPI}));

            this.optionsArr = optionsArr;
            this.showSpinner = false;

        })
        .catch(error => {
            this.ShowToastEvent(JSON.stringify(error),'','error');
            this.showSpinner = false;
        });
    }

    // accepted parameters
    get acceptedFormats() {
        return ['.csv'];
    }
    
    handleUploadFinished(event) {
        if(!this.value) {
            this.ShowToastEvent('Custom metadata not selected','','warning');
            return;
        }
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        console.log("field is ==> ",this.fields);
        // calling apex class
        readCSV({idContentDocument : uploadedFiles[0].documentId, metadataName : this.value , fields : this.fields})
        .then(result => {
            console.log('result ===> '+JSON.stringify(result));
            this.data = result;
            this.handleSearch();
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: '',
                    variant: 'success',
                }),
            );
            
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error',
                }),
            );     
        })

    }

    handlePaginatorChange(event) {
        this.showSpinner = true;
        this.recordsToDisplay = event.detail;
        this.rowNumberOffset = this.recordsToDisplay[0].rowNumber-1;
        this.showSpinner = false;
    }
    

    downloadData() {
        let rowEnd = '\n';
        let csvString = '';
        // this set elminates the duplicates if have any duplicate keys
        let rowData = new Set();

        // // getting keys from data
        // this.metadataFields.forEach(function (record) {
        //     Object.keys(record).forEach(function (key) {
        //         rowData.add(key);
        //     });
        // });

        // Array.from() method returns an Array object from any object with a length property or an iterable object.
        rowData = Array.from(rowData);
        
        // splitting using ','
        csvString = this.fields;

        

        // Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = this.value + '.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click(); 
        this.showSpinner = false;
    }

}