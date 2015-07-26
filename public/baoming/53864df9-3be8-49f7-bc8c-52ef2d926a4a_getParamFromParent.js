function initialise(e) {
 try {
        e.source.postMessage(DCAD_CurrentTab, '*');
    } catch (e) {
        return;
    }

}

/* Establish the 'message' event listener for incoming messages from the iframes
 * and initialise the script.
 */

if (typeof window.addEventListener != 'undefined') {
    window.addEventListener('message', initialise, false);
} else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent('onmessage', initialise);
}

