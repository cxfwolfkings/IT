// Write your Javascript code.
function topLeft() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'show',
        style: {
            right: '',
            left: 0,
            top: document.body.scrollTop + document.documentElement.scrollTop,
            bottom: ''
        }
    });
}
function topCenter() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'slide',
        style: {
            right: '',
            top: document.body.scrollTop + document.documentElement.scrollTop,
            bottom: ''
        }
    });
}
function topRight() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'show',
        style: {
            left: '',
            right: 0,
            top: document.body.scrollTop + document.documentElement.scrollTop,
            bottom: ''
        }
    });
}
function centerLeft() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'fade',
        style: {
            left: 0,
            right: '',
            bottom: ''
        }
    });
}
function center(title, msg) {
    $.messager.show({
        title: title,
        msg: msg,
        showType: 'fade',
        style: {
            right: '',
            bottom: ''
        }
    });
}
function centerRight() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'fade',
        style: {
            left: '',
            right: 0,
            bottom: ''
        }
    });
}
function bottomLeft() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'show',
        style: {
            left: 0,
            right: '',
            top: '',
            bottom: -document.body.scrollTop - document.documentElement.scrollTop
        }
    });
}
function bottomCenter() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'slide',
        style: {
            right: '',
            top: '',
            bottom: -document.body.scrollTop - document.documentElement.scrollTop
        }
    });
}
function bottomRight() {
    $.messager.show({
        title: 'My Title',
        msg: 'The message content',
        showType: 'show'
    });
}