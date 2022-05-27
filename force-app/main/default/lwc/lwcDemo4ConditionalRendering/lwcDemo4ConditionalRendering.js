import { LightningElement ,track} from 'lwc';

export default class LwcDemo4ConditionalRendering extends LightningElement {
    @track displayDiv = false;

    handleCheckboxChange(event) {
        this.displayDiv = event.target.checked;  //checkbox so we use checked instead of value
        

    }
}