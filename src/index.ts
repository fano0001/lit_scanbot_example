import './app/_ui/document-scanner/DocumentScanner'

/**
 * Safety measures to protect Lit-Element from itself...
 */
const _customElementsDefine = window.customElements.define
window.customElements.define = function (name, ceconstructor, config) {
    if (!customElements.get(name)) {
        _customElementsDefine.call(window.customElements, name, ceconstructor, config)
    }
}
