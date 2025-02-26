const templateString = `width: 20px; height: 20px; color: black`

let templateName = "";
let templateValue = "";
let collectionName = true;

const objStyle = {}
for (const templateChar of templateString) {
    const normalizedTemplateChar = templateChar.trim().toLowerCase()
    if (normalizedTemplateChar === " ") {
    } else if (normalizedTemplateChar === ":") {
        objStyle[templateName] = "";
        collectionName = false;
    } else if (normalizedTemplateChar === ";") {
        objStyle[templateName] = templateValue;
        templateName = "";
        templateValue = ""
        collectionName = true
    } else if (normalizedTemplateChar.matchAll("[a-z][A-Z]-") && collectionName) {
        templateName += normalizedTemplateChar
    } else {
        templateValue += normalizedTemplateChar;
    }
}
if (templateName) {
    objStyle[templateName] = templateValue;
}

console.log(JSON.stringify(objStyle, null, 2));