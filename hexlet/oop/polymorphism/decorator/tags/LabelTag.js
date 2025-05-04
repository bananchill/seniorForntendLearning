export default class LabelTag {
    constructor(label, tag) {
    this.label = label;
    this.tag = tag;
    }

    render() {
        return `<label>${this.label}${this.tag.toString()}</label>`;
    }
}