import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        // [2,4,8] splice(1,2(how many i want to delete)) -> returns [4], original array is [2,8] 
        // [2,4,8] splice(1,2(end position of exclusion)) -> returns [4], original array is [2,4,8]

        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1); // the splice pass in a start index and how many positions we want to take and it will then return this items and delete them from the original array, it mutates the original array

        // slice accepts an start and end and it doesnt mutate the original array
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}