import { LightningElement, track } from 'lwc';

export default class FindContactDetails extends LightningElement {
    @track contactName;
    @track noContactNameOnSearch = false;

    handleInput(event) {
        this.contactName = event.target.vaue;
    }

    handleSearch() {
        let allCombinations =  this.contactName.stringPermutations();
        console.log(allCombinations);
    }
}