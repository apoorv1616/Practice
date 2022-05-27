import { LightningElement,track} from 'lwc';
import getAllContacts from '@salesforce/apex/ShadowingTask1.getAllContacts';
import deleteContact from '@salesforce/apex/ShadowingTask1.deleteContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ShadowingLWCTask1BaseComponent extends LightningElement {
    @track contactInfo = [];
    @track showModalContact = false;
    @track showDelete = true;
    @track showDetails = true;
    @track showEditDetails = false;
    @track selectedContact = [];
    @track showMultipleSearchModal = false;
    @track searchMultipleContactsList = [];
    

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone'},
        { label: 'Email', fieldName: 'Email'},
        { label: 'MailingCity', fieldName: 'MailingCity'},
    ];

    @track data = [];

    connectedCallback() {
        this.getContacts();
    }

    getContacts(){
        getAllContacts()
        .then(response=>{
            if(response) {
               this.data = response;
            }
        })
        .catch(error => {
            let erroMsg = error.message || error.body.message;
            const event = new ShowToastEvent({
                title: '',
                message: erroMsg,
                variant : 'error'
            });
            this.dispatchEvent(event);
      
        });
    }

    addContact() {
        this.showModalContact = true;
    }
    
    closeModal() {
        this.selectedContact = null;
        this.showModalContact = false; 
        this.showEditDetails = false;
        this.showMultipleSearchModal = false;
        this.connectedCallback();
    }

    showContactDetails() {
        this.showEditDetails = true;
    }

    rowSelectedHandler(event) {
        this.showMultipleSearchModal = false;
        var rowSelected = event.detail;
        this.selectedContact = rowSelected;

        this.showContactDetails();
    }

    searchContactInput(event) {
        const isEnterKey = event.keyCode === 13;
        var temp = [];
        if (isEnterKey) {
            var queryInput = event.target.value.toLowerCase();
            
            this.data.forEach(function(item){
                if(item.Name.toLowerCase() === queryInput) {
                    temp.push(item); 
                }
            });
            
            if(temp.length === 1) {
                this.selectedContact = temp;
                this.showContactDetails();
            }
            else if(temp.length > 1) {
                console.log("Multiple contacts found : " + JSON.stringify(temp));
                this.searchMultipleContactsList = temp;
                this.showMultipleSearchModal = true;
            }
            else {
                const event = new ShowToastEvent({
                title: 'No Contact Found',
                message: '',
                variant : 'error'
                });
                this.dispatchEvent(event);
            }
        }
    }

    selectedRows(event) {
        this.selectedContact = event.detail.selectedRows;
        console.log(JSON.stringify(this.selectedContact));
        if(this.selectedContact.length === 1) {
            this.showDetails = false;
        }
        else {
            this.showDetails = true;
        } 
        if(this.selectedContact.length >= 1) {
            this.showDelete = false;
        }
        else{
            this.showDelete = true;
        }
    }

    deleteContact() {
        var contactId = [];
        this.selectedContact.forEach(function(item){
            contactId.push(item.Id);
        });   
        deleteContact({contactIdList:contactId}).then(response => {
            if(response === true) {
                const event = new ShowToastEvent({
                title: 'Success',
                message: 'Contact Deleted Successfully',
                variant : 'success'
            });
            this.dispatchEvent(event);
            this.connectedCallback();
            }
            else {
                let erroMsg = error.message || error.body.message;
                const event = new ShowToastEvent({
                title: 'Error',
                message: erroMsg,
                variant : 'error'
            });
            this.dispatchEvent(event);
            this.connectedCallback();
            }
        })
        .catch(error => {
            let erroMsg = error.message || error.body.message;
            const event = new ShowToastEvent({
                title: 'Error',
                message: erroMsg,
                variant : 'error'
            });
            this.dispatchEvent(event);
        });
    }
}