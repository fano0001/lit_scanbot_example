import {css, CSSResult, html, LitElement, TemplateResult, unsafeCSS} from 'lit'
import {customElement, query} from 'lit/decorators.js'
import ScanbotSDK from 'scanbot-web-sdk'
import elementStyles from './DocumentScanner.scss'


@customElement('document-scanner')
export class DocumentScanner extends LitElement {
    static override get styles(): CSSResult {
        return css`
            ${unsafeCSS(elementStyles)}
        `
    }

    @query('#document-scanner-container')
    documentScannerContainer?: HTMLElement

    scanner?: HTMLElement


    // to not use the ShadowRoot feature from Lit, enable the following method
    // if enabled the error of ScanBot will appear

    // override createRenderRoot() {
    //     return this
    // }

    override render(): TemplateResult {
        return html`
            <div id="document-scanner-container"></div>
        `
    }

    override firstUpdated(){
        this.initializeScanner()
    }

    private async initializeScanner () {
        const scanbotSDK: ScanbotSDK = await ScanbotSDK.initialize({licenseKey: ''})

        await scanbotSDK.createDocumentScanner({
            container: this.documentScannerContainer,
            onDocumentDetected: this.onDocumentDetected,
            autoCaptureEnabled: false,
            style : {
                captureButton: {
                    color: "blue"
                }
            }
        })
    }

    private onDocumentDetected(): void {
        console.log('scan triggert')
    }
}