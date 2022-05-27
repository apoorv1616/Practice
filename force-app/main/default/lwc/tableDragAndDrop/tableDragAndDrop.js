import { LightningElement,track } from 'lwc';
var indexFrom;
var indexTo;
export default class TableDragAndDrop extends LightningElement {
    @track dataArray = [{
        seqNumber: 1,
        name: 'John',
        age: 50,
        sex: 'Male'

    },
    {
        seqNumber: 2,
        name: 'Moira',
        age: 51,
        sex: 'Female'
    },
    {
        seqNumber: 3,
        name: 'Sheldon',
        age: 52,
        sex: 'Male'
    },
    {
        seqNumber: 4,
        name: 'Nina',
        age: 42,
        sex: 'Female'
    },
    {
        seqNumber: 5,
        name: 'Morgan',
        age: 34,
        sex: 'Male'

    }]

    handleDragStart(event) {
        event.dataTransfer.dropEffect = 'move';

        indexFrom = this.getIndex(parseInt(event.target.dataset.item, 10));
        

    }

    getIndex(index) {
        return this.dataArray.map(function(e) { return e.seqNumber; }).indexOf(index);
    }


    handleDrop(event) {

        indexTo = this.getIndex(parseInt(event.target.dataset.key, 10));
        
        let cutOut = this.dataArray.splice(indexFrom, 1) [0]; // cut the element at index 'from'
            this.dataArray.splice(indexTo, 0, cutOut);
      
        console.log(JSON.stringify(this.dataArray));

    }
    handleDragover(event) {
        event.preventDefault()
    }

}