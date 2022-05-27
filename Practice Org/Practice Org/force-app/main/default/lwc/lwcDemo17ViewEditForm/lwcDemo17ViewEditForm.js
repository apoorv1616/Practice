import { LightningElement,track } from 'lwc';

export default class LwcDemo17ViewEditForm extends LightningElement {

    @track recordId;
    successHandler(event) {
        this.recordId = event.detail.id;
    }
}