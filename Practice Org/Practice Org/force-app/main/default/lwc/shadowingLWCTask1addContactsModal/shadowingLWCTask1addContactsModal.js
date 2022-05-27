import { LightningElement,track,api } from 'lwc';
import saveContact from '@salesforce/apex/ShadowingTask1.saveContact';
import getContactById from '@salesforce/apex/ShadowingTask1.getContactById';
import updateContactById from '@salesforce/apex/ShadowingTask1.updateContactById';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class ShadowingLWCTask1addContactsModal extends LightningElement {
    @track contactDetails = {};
    @api contactedit = null;
    @track contactInfo;
    @track id = null;

    connectedCallback() {
        this.contactInfo = {Id :'',FirstName:'',LastName:'',Phone:'',Email:'',MailingStreet:'',
                            MailingCity:'',MailingState:'',MailingPostalCode:'',MailingCountry:''};

        if(this.contactedit !== null) {

            this.contactedit = this.contactedit[0];
            this.id = this.contactedit.Id;

            this.getContactById();    
        }
    }
    HandleInputChange(event) {
        if(this.id === null) {
            this.contactDetails[event.target.name] = event.target.value; 
        }
        else {
            this.contactInfo[event.target.name] = event.target.value;
        }
    }

    closeModal() {
        const selectedEvent = new CustomEvent("closemodal");
        this.dispatchEvent(selectedEvent);
    }

    saveContact() {
        if(this.id === null) {
            saveContact({contactDetails : JSON.stringify(this.contactDetails)})
            .then(response=>{
                if(response === true) {
                    const event = new ShowToastEvent({
                        title: 'Saved!',
                        message: 'Saved Successfully',
                        variant : 'success'
                    });
                    this.dispatchEvent(event);
                    this.closeModal();
                }
                else {
                    let erroMsg = error.message || error.body.message;
                    const event = new ShowToastEvent({
                    title: 'Error - Failed to Add Contact!',
                    message: erroMsg,
                    variant : 'error'
                });
                this.dispatchEvent(event);
                }
            })
            .catch(error => {
                let erroMsg = error.message || error.body.message;
                const event = new ShowToastEvent({
                    title: 'Error!',
                    message: erroMsg,
                    variant : 'error'
                });
                this.dispatchEvent(event);
            
            });
        }
        else {
            //console.log("Inside : " + JSON.stringify(this.contactInfo) +'and Id is : ' + this.id);
            updateContactById({Id : this.id, updatedContactList : JSON.stringify(this.contactInfo)})
            .then(response=>{
                if(response === true) {
                    const event = new ShowToastEvent({
                        title: 'Saved!',
                        message: 'Saved Successfully',
                        variant : 'success'
                    });
                    this.dispatchEvent(event);
                    this.closeModal();
                }
                else {
                    let erroMsg = error.message || error.body.message;
                    const event = new ShowToastEvent({
                    title: 'Error - Failed to Add Contact!',
                    message: erroMsg,
                    variant : 'error'
                });
                this.dispatchEvent(event);
                }
            })
            .catch(error => {
                let erroMsg = error.message || error.body.message;
                const event = new ShowToastEvent({
                    title: 'Error!',
                    message: erroMsg,
                    variant : 'error'
                });
                this.dispatchEvent(event);
            
            });
        }
    }

    getContactById() {
        getContactById({id : this.id})
        .then(response=>{
            if(response !== null) {
                this.contactInfo = response[0];
                // console.log(JSON.stringify(this.contactInfo));
            }
            else {
                let erroMsg = error.message || error.body.message;
                const event = new ShowToastEvent({
                title: 'Error - Failed to Get Contact!',
                message: erroMsg,
                variant : 'error'
            });
            this.dispatchEvent(event);
            }
        })
        .catch(error => {
            let erroMsg = error.message || error.body.message;
            const event = new ShowToastEvent({
                title: 'Error!',
                message: erroMsg,
                variant : 'error'
            });
            this.dispatchEvent(event);
        
        });
    }
}