import countup7 from '@salesforce/resourceUrl/countup7';
import { LightningElement,track } from 'lwc';

export default class PcDragAndDrop extends LightningElement {
    @track message = {};
    @track messageArray = [];
    @track count = 0;

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.message[evt.target.name] = evt.target.value;
            this.messageArray.push(this.message[evt.target.value]);
        }
        console.log(JSON.stringify(this.messageArray));
    }

    drag(event){
        event.dataTransfer.setData("divId", event.target.id);
    }
 
    allowDrop(event){
        event.preventDefault();
    }
 
    drop(event){
        event.preventDefault();
        var divId = event.dataTransfer.getData("divId");
        var draggedElement = this.template.querySelector('#' +divId);
        console.log("dragged element",JSON.stringify(draggedElement));
        draggedElement.classList.add('completed'); 
        event.target.appendChild(draggedElement);
    }

    dropIncomplete(event){
        event.preventDefault();
        var divId = event.dataTransfer.getData("divId");
        var draggedElement = this.template.querySelector('#' +divId);
        console.log("dragged element",JSON.stringify(draggedElement));
        draggedElement.classList.remove('completed'); 
        draggedElement.classList.add('box'); 
        event.target.appendChild(draggedElement);
    }

}