export default function stringify(tag) {
    const {tagType, body, name, ...othersFields} = tag;
    let strTag = ''
    for (const val in othersFields) {
        strTag += ` ${ val }="${ othersFields[val] }"`;

    }
    return `<${ name }${ strTag }>${ tagType === 'pair' ? `${ body }</${ name }>` : '' }`
}


const tag = {
    name: 'div',
    tagType: 'pair',
    body: 'text2',
    id: 'wow',
    132: 'value',
};
console.log(stringify(tag)) // <hr class="px-3" id="myid">
