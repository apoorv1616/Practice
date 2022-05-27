import { LightningElement,track,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import addContact from '@salesforce/apex/addContactClass.addContact'

export default class CaptchaForm extends NavigationMixin(LightningElement) {
    @track contactInfo = {};
    @track navigateTo="/apex/portalSmartyAddress";
    @track _url= '/apex/vfCaptchaPage';
    @track data;
    @track allowSave = false;
    @track contactId;
    @track showSpinner = false;

    listenMessage(msg) 
    {
        window.data=msg.data;
        this.data=msg.data;
        console.log(this.data);
        if(this.data==='Unlock')
        {
            this.allowSave = true;
        }
    }
    connectedCallback()
    {
        if(window.addEventListener){
            window.addEventListener("message", this.listenMessage.bind(this));
        }
        
    }

    HandleInputChange(event){
        var input = event.target.value.trim();
        if(input!== null && input !== ' ' && input !== '' && input !== undefined){
            this.contactInfo[event.target.name] = input;
        }
        else{
            const event = new ShowToastEvent({
                title: 'Error!',
                message: 'Enter valid fields value',
                variant: 'error',
            });
            this.dispatchEvent(event);
        }
    }

    submitForm(){
        if(this.allowSave){
            addContact({contactString : JSON.stringify(this.contactInfo)}).then(result => {
                this.contactId = result;
                const event = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Contact Saved Successfully',
                    variant: 'success',
                });
                this.dispatchEvent(event);
                this.showSpinner = true;
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.contactId,
                        objectApiName: 'Contact',
                        actionName: 'view'
                    }
                });
                this.showSpinner = false;
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error!',
                    message: 'Contact Failed to Save',
                    variant: 'error',
                });
                this.dispatchEvent(event);
                this.showSpinner = false;
            });
        }
        else{
            const event = new ShowToastEvent({
                title: 'Error!',
                message: 'Enter the captcha',
                variant: 'error',
            });
            this.dispatchEvent(event);
        }
    }
}