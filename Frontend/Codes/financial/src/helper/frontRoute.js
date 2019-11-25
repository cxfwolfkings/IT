/* patch history pushState */
(function (history) {
    var pushState = history.pushState;
    history.pushState = function (state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({ state: state });
        }
        return pushState.apply(history, arguments);
    }
})(window.history);
/* Add trigger function */
window.onpopstate = history.onpushstate = function (event) {
    document.getElementById('state').innerHTML = "location: " + document.location + ", state: " + JSON.stringify(event.state);
}
/* Bind events to all links */
var elements = document.getElementsByTagName('a');
for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function (event) {
        event.preventDefault();
        var route = event.target.getAttribute('href');
        history.pushState({ page: route }, route, route);
        console.log('current state', history.state)
    }
}