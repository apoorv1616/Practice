import { LightningElement,track,api } from 'lwc';

export default class ShadowingLWCTask1MultipleSearchModal extends LightningElement {
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone'},
        { label: 'Email', fieldName: 'Email'},
        { label: 'MailingCity', fieldName: 'MailingCity'},
    ];

    @track data = [];
    @api contactedit = null;
    @track selectedContact;

    connectedCallback() {
        var temp = [];
        this.contactedit.forEach(function(item){
            temp.push(item);
        });
        this.data = temp;
    }

    selectedRows(event) {
        this.selectedContact = event.detail.selectedRows;   
        const rowselected = new CustomEvent('rowselected',{detail:this.selectedContact});
        this.dispatchEvent(rowselected);

    }

    closeModal() {
        const selectedEvent = new CustomEvent("closemodal");
        this.dispatchEvent(selectedEvent);
    }

}