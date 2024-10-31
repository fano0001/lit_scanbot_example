import {css, CSSResult, html, LitElement, TemplateResult, unsafeCSS} from 'lit'
import {customElement, query} from 'lit/decorators.js'
import ScanbotSDK from 'scanbot-web-sdk'
import elementStyles from './DocumentScanner.scss'


@customElement('myaxa-document-scanner')
export class DocumentScanner extends LitElement {
    static override get styles(): CSSResult {
        return css`
            ${unsafeCSS(elementStyles)}
        `
    }

    @query('#document-scanner-container')
    documentScannerContainer?: HTMLElement

    scanner?: HTMLElement

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

        const iDocumentScannerHandle = await scanbotSDK.createDocumentScanner({
            container: this.documentScannerContainer,
            onDocumentDetected: this.onDocumentDetected,
            autoCaptureEnabled: false,
            onError: this.onError,
            style : {
                captureButton: {
                    color: "blue"
                },
                outline: {
                    polygon: {
                        strokeCapturing: "green",
                        strokeSearching: "yellow",
                        fillCapturing: "transparent",
                        fillSearching: "transparent",
                        strokeWidth: "2px"
                    },
                    label: {
                        position: "absolute",
                        top: "90%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        borderRadius: "0.25em",
                        padding: "0.5em",
                        fontFamily: "sans-serif",
                        fontSize: "1em"
                    },
                    path: {
                        stroke: "green",
                        strokeWidth: 4
                    }
                },
            },
            text: {
                hint: {
                    OK: 'Capturing your document... Please do not move the camera.',
                    OK_SmallSize: 'The document is too small. Try moving closer.',
                    OK_BadAngles: 'This is a bad camera angle. Hold the device straight over the document.',
                    OK_BadAspectRatio: 'Rotate the device sideways, so that the document fits better into the screen.',
                    OK_OffCenter: 'Try holding the device at the center of the document.',
                    Error_NothingDetected: 'Bitte halte dein Kamera über das Dokument um mit dem Scannen zu beginnen!',
                    Error_Brightness: 'It is too dark. Try turning on a light.',
                    Error_Noise: 'Please move the document to a clear surface.'
                }
            }
        })
    }

    private onError(e: any) : void{
        console.error('Kaputt', e)
    }

    private onDocumentDetected(scan: any): void {
        console.log('Anzahl scans: ')
    }
}