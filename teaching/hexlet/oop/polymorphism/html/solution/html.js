/**
 * @typedef {Object} Tag
 * @property {string} name
 * */

/**
 * @param {Tag[]} tags
 * */
export default function html(tags) {
    const linkMap = {
        img: 'src',
        a: 'href',
        link: 'href',
    }
    return tags.reduce((acc,tag) => {
        if(tag[linkMap[tag.name]]) {
            acc.push(tag[linkMap[tag.name]]);
        }
        return acc
    }, [])}