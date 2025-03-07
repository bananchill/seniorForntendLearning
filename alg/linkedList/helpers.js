import LinkedList from "./LinkedList.js";

 const getListFromArray = (arr) => {
    if (arr.length <= 1) {
        return false
    }

    const linkedList = arr.reduce((acc, cur) => {
       acc.add(cur)
        return acc
    }, new LinkedList())


     return linkedList.toArray();
}

export default getListFromArray;