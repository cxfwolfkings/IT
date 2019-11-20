import "./main.css";

function createEl() {
    var element = document.createElement('div')
    element.innerHTML = 'hello world'
    return element;
}

document.body.appendChild(createEl());