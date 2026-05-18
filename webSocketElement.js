import '../edirom-core-web-components/src/edirom-icon.js';

console.log("WebSocket Connector Web Component loaded");

const templates = {
    desktop: `
<style>
    :host {
        display: block;
        height: 100%;
    }

    #ws-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #ws-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        padding: 0;
        border: none;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
    }

    #ws-button:hover {
        background: rgba(255, 255, 255, 0.15);
    }

    #ws-button edirom-icon {
        width: 100%;
        height: 100%;
    }

    #session-popover {
        position: fixed;
        inset: 0;
        margin: auto;
        width: 95dvw;
        height: 95dvh;
        border: none;
        padding: 0;
        border-radius: 12px;
        background: rgba(31, 35, 51, 0.97);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        overflow: hidden;
    }

    #session-popover-inner {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 24px;
        box-sizing: border-box;
        gap: 12px;
    }

    #session-title {
        color: #e4d9a5;
        font-size: 1.4rem;
        margin: 0;
        flex-shrink: 0;
    }

    #connection-news-area {
        flex-shrink: 0;
    }

    .connection-news-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-radius: 8px;
        padding: 8px 12px;
        margin-bottom: 6px;
        font-size: 1rem;
        color: #1f2333;
        font-weight: 500;
    }

    .connection-news-item.connect {
        background-color: #83c702;
    }

    .connection-news-item.disconnect {
        background-color: #e05353;
        color: #fff;
    }

    .connection-news-item p {
        margin: 0;
        flex: 1;
    }

    .connection-news-dismiss {
        border: none;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 4px 10px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: bold;
        color: inherit;
        flex-shrink: 0;
    }

    #session-content {
        flex: 1;
        overflow-y: auto;
        color: #e4d9a5;
    }

    #session-content h2 {
        font-size: 1rem;
        margin: 12px 0 6px;
        color: #cdbf86;
    }

    #session-content hr {
        border: none;
        border-top: 1px solid rgba(228, 217, 165, 0.3);
        margin: 12px 0;
    }

    #qr-code-placeholder {
        text-align: center;
    }

    #qr-code-placeholder img {
        max-width: 180px;
    }

    #session-id {
        text-align: center;
        font-size: 0.9rem;
        word-break: break-all;
        margin: 4px 0 0;
        color: #cdbf86;
    }

    #session-members-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 1rem;
    }

    #session-members-list li {
        padding: 4px 0;
        border-bottom: 1px solid rgba(228, 217, 165, 0.15);
    }

    #button-row {
        display: flex;
        justify-content: flex-end;
        flex-shrink: 0;
    }

    #close-button {
        padding: 12px 28px;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        border-radius: 8px;
        background: #e4d9a5;
        color: #1f2333;
        font-weight: bold;
    }

    #close-button:hover {
        background: #cdbf86;
    }
</style>
<div id="ws-container">
    <button id="ws-button" aria-label="WebSocket Verbindung">
        <edirom-icon name="devices" size="fill" id="status-icon"></edirom-icon>
    </button>
    <div id="session-popover" popover="manual">
        <div id="session-popover-inner">
            <h1 id="session-title">Sitzungsinformationen</h1>
            <div id="connection-news-area"></div>
            <div id="session-content">
                <h2>Code</h2>
                <div id="qr-code-placeholder"></div>
                <p id="session-id"></p>
                <hr />
                <h2>Mitglieder</h2>
                <ul id="session-members-list"></ul>
            </div>
            <div id="button-row">
                <button id="close-button" aria-label="Schließen">Schließen</button>
            </div>
        </div>
    </div>
</div>
`,

    mobile: `
<style>
    :host {
        display: block;
        height: 100%;
    }

    #ws-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #ws-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        border: none;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        user-select: none;
    }

    #ws-button:active {
        background: rgba(255, 255, 255, 0.2);
    }

    #ws-button edirom-icon {
        width: 100%;
        height: 100%;
    }

    #session-popover {
        position: fixed;
        inset: 0;
        margin: auto;
        width: 95dvw;
        height: 95dvh;
        border: none;
        padding: 0;
        border-radius: 12px;
        background: rgba(31, 35, 51, 0.97);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        overflow: hidden;
    }

    #session-popover-inner {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 20px 16px 16px;
        box-sizing: border-box;
        gap: 10px;
    }

    #session-title {
        color: #e4d9a5;
        font-size: 1.3rem;
        margin: 0;
        flex-shrink: 0;
    }

    #connection-news-area {
        flex-shrink: 0;
    }

    .connection-news-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-radius: 8px;
        padding: 8px 12px;
        margin-bottom: 6px;
        font-size: 1rem;
        color: #1f2333;
        font-weight: 500;
    }

    .connection-news-item.connect {
        background-color: #83c702;
    }

    .connection-news-item.disconnect {
        background-color: #e05353;
        color: #fff;
    }

    .connection-news-item p {
        margin: 0;
        flex: 1;
    }

    .connection-news-dismiss {
        border: none;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 4px 10px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: bold;
        color: inherit;
        flex-shrink: 0;
    }

    #session-content {
        flex: 1;
        overflow-y: auto;
        color: #e4d9a5;
        -webkit-overflow-scrolling: touch;
    }

    #session-content h2 {
        font-size: 1rem;
        margin: 12px 0 6px;
        color: #cdbf86;
    }

    #session-content hr {
        border: none;
        border-top: 1px solid rgba(228, 217, 165, 0.3);
        margin: 12px 0;
    }

    #qr-code-placeholder {
        text-align: center;
    }

    #qr-code-placeholder img {
        max-width: min(220px, 60vw);
    }

    #session-id {
        text-align: center;
        font-size: 0.85rem;
        word-break: break-all;
        margin: 4px 0 0;
        color: #cdbf86;
    }

    #session-members-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 1rem;
    }

    #session-members-list li {
        padding: 6px 0;
        border-bottom: 1px solid rgba(228, 217, 165, 0.15);
    }

    #button-row {
        display: flex;
        justify-content: flex-end;
        flex-shrink: 0;
    }

    #close-button {
        padding: 12px 28px;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        border-radius: 8px;
        background: #e4d9a5;
        color: #1f2333;
        font-weight: bold;
        -webkit-tap-highlight-color: transparent;
    }

    #close-button:active {
        background: #cdbf86;
    }
</style>
<div id="ws-container">
    <button id="ws-button" aria-label="WebSocket Verbindung">
        <edirom-icon name="devices" size="fill" id="status-icon"></edirom-icon>
    </button>
    <div id="session-popover" popover="manual">
        <div id="session-popover-inner">
            <h1 id="session-title">Sitzungsinformationen</h1>
            <div id="connection-news-area"></div>
            <div id="session-content">
                <h2>Code</h2>
                <div id="qr-code-placeholder"></div>
                <p id="session-id"></p>
                <hr />
                <h2>Mitglieder</h2>
                <ul id="session-members-list"></ul>
            </div>
            <div id="button-row">
                <button id="close-button" aria-label="Schließen">Schließen</button>
            </div>
        </div>
    </div>
</div>
`
};

const CONNECTION_STATE_COLORS = {
    disconnected: 'red',
    connected: 'orange',
    session: '#83c702'
};


class EdiromWebSocketConnector extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open', delegatesFocus: true });
        this._mode = 'desktop';
        this._connectionState = 'disconnected';
        this._webSocket = null;
        this._clientId = null;
        this._sessionId = null;
        this._sessionData = null;
    }

    static get observedAttributes() {
        return ['layout-mode', 'ws-url'];
    }

    // -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

    connectedCallback() {
        console.log('EdiromWebSocketConnector connected!');
        this._mode = this._getLayoutMode(this.getAttribute('layout-mode'));
        this._applyTemplate();
        this._setupElements();
        this._setupEventListeners();
        this._connect();
        this.setAttribute('data-handles-back-request', '');
        this.addEventListener('back-request', this._handleBackRequest);
    }

    disconnectedCallback() {
        console.log('EdiromWebSocketConnector disconnected!');
        this.removeEventListener('back-request', this._handleBackRequest);
        if (this._webSocket) {
            this._webSocket.onclose = null; // prevent state updates after removal
            this._webSocket.close();
            this._webSocket = null;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === 'layout-mode') {
            this._mode = this._getLayoutMode(newValue);
            if (this.isConnected) {
                this._applyTemplate();
                this._setupElements();
                this._setupEventListeners();
                this._updateStatusIcon();
            }
        } else if (name === 'ws-url') {
            if (this.isConnected) {
                this._reconnect();
            }
        }
    }

    // -------------------------------------------------------------------------
    // Template & Elements
    // -------------------------------------------------------------------------

    _getLayoutMode = (layoutMode) => layoutMode === 'mobile' ? 'mobile' : 'desktop';

    _applyTemplate = () => {
        const template = document.createElement('template');
        template.innerHTML = templates[this._mode];
        this.shadow.innerHTML = '';
        this.shadow.append(template.content.cloneNode(true));
    }

    _setupElements = () => {
        this._wsButton = this.shadow.querySelector('#ws-button');
        this._statusIcon = this.shadow.querySelector('#status-icon');
        this._sessionPopover = this.shadow.querySelector('#session-popover');
        this._connectionNewsArea = this.shadow.querySelector('#connection-news-area');
        this._sessionIdEl = this.shadow.querySelector('#session-id');
        this._qrCodePlaceholder = this.shadow.querySelector('#qr-code-placeholder');
        this._membersList = this.shadow.querySelector('#session-members-list');
        this._closeButton = this.shadow.querySelector('#close-button');
    }

    _setupEventListeners = () => {
        this._wsButton.addEventListener('click', () => {
            this._sessionPopover.showPopover();
        });
        this._closeButton.addEventListener('click', () => {
            this._sessionPopover.hidePopover();
        });
    }

    _handleBackRequest = (event) => {
        if (this._sessionPopover?.matches(':popover-open')) {
            event.preventDefault();
            this._sessionPopover.hidePopover();
        }
    }

    // -------------------------------------------------------------------------
    // Connection State
    // -------------------------------------------------------------------------

    _setConnectionState = (state) => {
        this._connectionState = state;
        this._updateStatusIcon();
    }

    _updateStatusIcon = () => {
        if (!this._statusIcon) return;
        const color = CONNECTION_STATE_COLORS[this._connectionState] ?? 'red';
        this._statusIcon.setAttribute('color', color);
    }

    // -------------------------------------------------------------------------
    // WebSocket
    // -------------------------------------------------------------------------

    _connect = () => {
        const wsUrl = this.getAttribute('ws-url');
        if (!wsUrl) {
            console.warn('EdiromWebSocketConnector: no ws-url attribute set, skipping connection.');
            return;
        }

        if (this._webSocket) {
            this._webSocket.onclose = null;
            this._webSocket.close();
        }

        this._clientId = null;
        this._sessionId = null;
        this._sessionData = null;

        this._webSocket = new WebSocket(wsUrl);

        this._webSocket.onopen = () => {
            console.log('EdiromWebSocketConnector: connection opened.');
            this._setConnectionState('connected');
            this._webSocket.send(JSON.stringify({ request: 'giveClientId' }));
            this._webSocket.send(JSON.stringify({ request: 'giveSessionId' }));
            this._sendUserAgent();
            this._webSocket.send(JSON.stringify({ request: 'giveSessionData' }));
        };

        this._webSocket.onclose = () => {
            console.log('EdiromWebSocketConnector: connection closed.');
            this._setConnectionState('disconnected');
            this._sessionId = null;
            this._clientId = null;
            this._sessionData = null;
            if (this._membersList) this._membersList.innerHTML = '';
            if (this._qrCodePlaceholder) this._qrCodePlaceholder.innerHTML = '';
            if (this._sessionIdEl) this._sessionIdEl.textContent = '';
        };

        this._webSocket.onmessage = (event) => {
            let dataJson;
            try {
                dataJson = JSON.parse(event.data);
            } catch (e) {
                console.error('EdiromWebSocketConnector: could not parse message.', e);
                return;
            }
            this._handleMessage(dataJson);
        };
    }

    _reconnect = () => {
        this._connect();
    }

    _handleMessage = (dataJson) => {
        if (dataJson.sessionId && this._sessionId === null) {
            this._setSessionId(dataJson.sessionId);
        } else if (dataJson.clientId && this._clientId === null) {
            this._clientId = dataJson.clientId;
        } else if (dataJson.message) {
            this.dispatchEvent(new CustomEvent('received-message', {
                detail: dataJson,
                bubbles: true,
                composed: true
            }));
        } else if (dataJson.response === 'clientConnected') {
            console.log('EdiromWebSocketConnector: client connected.');
            this._sessionData = dataJson.sessionData;
            this._updateMembersList();
            this._showConnectionNews(dataJson.clientData, 'connect');
        } else if (dataJson.response === 'clientDisconnected') {
            console.log('EdiromWebSocketConnector: client disconnected.');
            this._sessionData = dataJson.sessionData;
            this._updateMembersList();
            this._showConnectionNews(dataJson.clientData, 'disconnect');
        } else if (dataJson.sessionData) {
            this._sessionData = dataJson.sessionData;
            this._updateMembersList();
        }
    }

    _sendUserAgent = () => {
        this._webSocket.send(JSON.stringify({ message: 'userAgent', userAgent: navigator.userAgent }));
    }

    // -------------------------------------------------------------------------
    // Session Info
    // -------------------------------------------------------------------------

    _setSessionId = (sessionId) => {
        this._sessionId = sessionId;
        this._setConnectionState('session');
        if (this._sessionIdEl) {
            this._sessionIdEl.textContent = sessionId;
        }
        if (this._qrCodePlaceholder) {
            if (typeof qrcode === 'function') {
                const qr = qrcode(0, 'L');
                qr.addData(sessionId.toString());
                qr.make();
                this._qrCodePlaceholder.innerHTML = qr.createImgTag(6);
            } else {
                this._qrCodePlaceholder.textContent = sessionId;
            }
        }
    }

    _updateMembersList = () => {
        if (!this._sessionData || !this._membersList) return;
        const members = this._sessionData.sessionMembers ?? [];
        this._membersList.innerHTML = '';
        for (const member of members) {
            const li = document.createElement('li');
            const isOwn = member.id === this._clientId;
            const label = `${member.metadata?.deviceType ?? ''} ${member.metadata?.os ?? ''} ${member.metadata?.browser ?? ''}`.trim();
            li.textContent = isOwn ? `Du: ${label}` : label;
            this._membersList.appendChild(li);
        }
    }

    _showConnectionNews = (clientData, type) => {
        if (!this._connectionNewsArea) return;
        const item = document.createElement('div');
        item.classList.add('connection-news-item', type);

        const p = document.createElement('p');
        const deviceLabel = `${clientData?.metadata?.deviceType ?? ''} ${clientData?.metadata?.os ?? ''} ${clientData?.metadata?.browser ?? ''}`.trim();
        p.textContent = type === 'connect'
            ? `Ein neues Gerät "${deviceLabel}" ist Ihrer Sitzung beigetreten!`
            : `Ein Gerät "${deviceLabel}" hat die Sitzung verlassen!`;

        const dismissBtn = document.createElement('button');
        dismissBtn.classList.add('connection-news-dismiss');
        dismissBtn.textContent = 'Ok';
        dismissBtn.addEventListener('click', () => {
            item.remove();
        });

        item.appendChild(p);
        item.appendChild(dismissBtn);
        this._connectionNewsArea.appendChild(item);

        if (!this._sessionPopover.matches(':popover-open')) {
            this._sessionPopover.showPopover();
        }
    }
}

if (!customElements.get('edirom-web-socket-connector')) {
    customElements.define('edirom-web-socket-connector', EdiromWebSocketConnector);
}

