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
        background: transparent;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        overflow: hidden;
        transform-origin: var(--popover-origin-x, 50%) var(--popover-origin-y, 50%);
        transition: transform 0.75s cubic-bezier(0.22, 1.15, 0.36, 1), opacity 0.15s ease-out;
    }

    @starting-style {
        #session-popover:popover-open {
            transform: scale(0.04);
        }
        #session-popover:popover-open::backdrop {
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
        }
    }

    #session-popover.closing {
        transform: scale(0.04);
        opacity: 0;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.8, 0.3), opacity 0.2s ease-in 0.2s;
    }

    #session-popover.closing::backdrop {
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);
        transition: backdrop-filter 0.2s ease-in;
    }

    #session-popover::backdrop {
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        transition: backdrop-filter 0.75s ease;
    }

    #session-popover-inner {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0;
        box-sizing: border-box;
        gap: 0;
    }

    #session-popover-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        height: 50px;
        box-sizing: border-box;
        background-color: var(--secondary-color);
        color: var(--primary-color);
        font-size: 1rem;
        font-weight: 600;
        flex-shrink: 0;
    }

    #session-popover-header .status-icon {
        width: 1.4rem;
        height: 1.4rem;
        flex-shrink: 0;
    }

    #connection-news-area {
        flex-shrink: 0;
        background-color: var(--tertiary-color);
        padding: 0 20px;
        box-sizing: border-box;
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
        scrollbar-gutter: stable;
        color: var(--primary-color);
        background-color: var(--tertiary-color);
        padding: 16px 20px;
        box-sizing: border-box;
    }

    #session-content h2 {
        font-size: 1rem;
        margin: 12px 0 6px;
        color: var(--primary-color);
    }

    #session-content hr {
        border: none;
        border-top: 1px solid rgba(35, 42, 68, 0.2);
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
        color: var(--primary-color);
    }

    #session-members-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 1rem;
    }

    #session-members-list li {
        padding: 4px 0;
        border-bottom: 1px solid rgba(35, 42, 68, 0.15);
    }

    #bottom-row {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 14px;
        flex-shrink: 0;
        height: 60px;
        box-sizing: border-box;
        background: transparent;
        padding: 0 20px;
    }

    #close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        padding: 0;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        background: #ef6a6a;
        color: var(--primary-color);
        flex-shrink: 0;
    }

    /* ---- Page System ---- */

    #session-content h1 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 8px;
        color: var(--primary-color);
    }

    .device-name-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        font-size: 0.95rem;
        color: var(--primary-color);
    }

    .device-name-label {
        flex-shrink: 0;
        white-space: nowrap;
    }

    .device-name-text {
        flex: 0 1 auto;
        min-width: 0;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 4px 8px;
        border: 1px solid transparent;
        border-radius: 6px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .device-name-input {
        flex: 0 1 auto;
        min-width: 5ch;
        font-size: 0.95rem;
        font-weight: 600;
        padding: 4px 8px;
        border: 1px solid color-mix(in oklch, var(--secondary-color) 70%, transparent);
        border-radius: 6px;
        background: transparent;
        color: var(--primary-color);
        font-family: inherit;
        box-sizing: border-box;
        field-sizing: content;
    }

    .device-name-row .icon-button {
        width: 20px;
        height: 20px;
    }

    .icon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        border-radius: 6px;
        background: transparent;
        cursor: pointer;
        flex-shrink: 0;
    }

    .icon-button edirom-icon {
        width: 100%;
        height: 100%;
    }

    .action-buttons-row {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .action-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 35%;
        padding: 20px 12px;
        border: none;
        border-radius: 12px;
        background: var(--secondary-color);
        color: var(--primary-color);
        cursor: pointer;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 500;
        text-align: center;
        line-height: 1.3;
        -webkit-user-select: none;
        user-select: none;
    }

    .action-button:hover {
        background: color-mix(in oklch, var(--secondary-color) 85%, black);
    }

    .action-button edirom-icon {
        width: 3rem;
        height: 3rem;
        display: block;
    }

    .intro-text {
        font-size: 0.85rem;
        color: var(--primary-color);
        opacity: 0.7;
        text-align: center;
        margin: 0;
        line-height: 1.5;
    }

    .add-device-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 14px 20px;
        margin-top: 16px;
        border: none;
        border-radius: 10px;
        background: var(--secondary-color);
        color: var(--primary-color);
        cursor: pointer;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 600;
        box-sizing: border-box;
        -webkit-user-select: none;
        user-select: none;
    }

    .add-device-button:hover {
        background: color-mix(in oklch, var(--secondary-color) 85%, black);
    }

    .add-device-button edirom-icon {
        width: 1.4rem;
        height: 1.4rem;
        flex-shrink: 0;
    }

    .session-id-display {
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;
        word-break: break-all;
        color: var(--primary-color);
        margin: 0 0 16px;
    }

    .qr-code-container {
        text-align: center;
        margin-bottom: 16px;
    }

    .qr-code-container img {
        max-width: 180px;
    }

    .invite-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 8px;
        background: var(--secondary-color);
        color: var(--primary-color);
    }

    .invite-url-text {
        flex: 1;
        font-size: 0.85rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
    }

    .join-input-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
    }

    .join-input-label {
        font-size: 0.95rem;
        color: var(--primary-color);
        margin: 0;
    }

    .join-input {
        font-size: 1.5rem;
        font-weight: 600;
        text-align: center;
        letter-spacing: 0.3em;
        padding: 12px;
        border: 2px solid var(--secondary-color);
        border-radius: 10px;
        background: transparent;
        color: var(--primary-color);
        font-family: monospace;
        width: 100%;
        box-sizing: border-box;
        text-transform: uppercase;
    }

    .join-input:focus {
        outline: none;
        border-color: color-mix(in oklch, var(--secondary-color) 70%, white);
    }

    .separator-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 20px 0;
        color: var(--primary-color);
        opacity: 0.6;
    }

    .separator-line {
        flex: 1;
        height: 1px;
        background: currentColor;
    }

    .separator-text {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.05em;
    }

    .qr-scanner-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 140px;
        border: 2px dashed var(--secondary-color);
        border-radius: 10px;
        color: var(--primary-color);
        opacity: 0.5;
        font-size: 0.9rem;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    }

    #back-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        padding: 0;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        background: var(--secondary-color);
        color: var(--primary-color);
        flex-shrink: 0;
    }

    #back-button:hover {
        background: color-mix(in oklch, var(--secondary-color) 85%, black);
    }

    #back-button.hidden {
        display: none;
    }

    #close-button edirom-icon,
    #back-button edirom-icon {
        width: 1.4rem;
        height: 1.4rem;
    }
</style>
<div id="ws-container">
    <button id="ws-button" aria-label="WebSocket Verbindung">
        <edirom-icon name="devices" size="fill" class="status-icon"></edirom-icon>
    </button>
    <div id="session-popover" popover="manual">
        <div id="session-popover-inner">
            <div id="session-popover-header">
                <edirom-icon name="devices" size="fill" class="status-icon"></edirom-icon>
                <span>Vernetzte Arbeitsumgebung</span>
            </div>
            <div id="connection-news-area"></div>
            <div id="session-content"></div>
            <div id="bottom-row">
                <button id="back-button" class="hidden" aria-label="Zurück">
                    <edirom-icon name="arrow_back" size="fill"></edirom-icon>
                </button>
                <button id="close-button" aria-label="Schließen">
                    <edirom-icon name="close" size="fill"></edirom-icon>
                </button>
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
        background: transparent;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        overflow: hidden;
        transform-origin: var(--popover-origin-x, 50%) var(--popover-origin-y, 50%);
        transition: transform 0.75s cubic-bezier(0.22, 1.15, 0.36, 1), opacity 0.15s ease-out;
    }

    @starting-style {
        #session-popover:popover-open {
            transform: scale(0.04);
        }
        #session-popover:popover-open::backdrop {
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
        }
    }

    #session-popover.closing {
        transform: scale(0.04);
        opacity: 0.5;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.8, 0.3), opacity 0.2s ease-in 0.2s;
    }

    #session-popover.closing::backdrop {
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);
        transition: backdrop-filter 0.2s ease-in;
    }

    #session-popover::backdrop {
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        transition: backdrop-filter 0.75s ease;
    }

    #session-popover-inner {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0;
        box-sizing: border-box;
        gap: 0;
    }

    #session-popover-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        height: 50px;
        box-sizing: border-box;
        background-color: var(--secondary-color);
        color: var(--primary-color);
        font-size: 1rem;
        font-weight: 600;
        flex-shrink: 0;
    }

    #session-popover-header .status-icon {
        width: 1.4rem;
        height: 1.4rem;
        flex-shrink: 0;
    }

    #connection-news-area {
        flex-shrink: 0;
        background-color: var(--tertiary-color);
        padding: 0 20px;
        box-sizing: border-box;
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
        scrollbar-gutter: stable;
        color: var(--primary-color);
        background-color: var(--tertiary-color);
        padding: 16px 20px;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
    }

    #session-content h2 {
        font-size: 1rem;
        margin: 12px 0 6px;
    }

    #session-content hr {
        border: none;
        border-top: 1px solid rgba(35, 42, 68, 0.2);
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
    }

    #session-members-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 1rem;
    }

    #session-members-list li {
        padding: 6px 0;
        border-bottom: 1px solid rgba(35, 42, 68, 0.15);
    }

    #bottom-row {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 14px;
        flex-shrink: 0;
        height: 60px;
        box-sizing: border-box;
        background: transparent;
        padding: 0 20px;
    }

    #close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        padding: 0;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        background: #ef6a6a;
        color: var(--primary-color);
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
    }

    /* ---- Page System ---- */

    #session-content h1 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 8px;
    }

    .device-name-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        font-size: 0.95rem;
        color: var(--primary-color);
    }

    .device-name-label {
        flex-shrink: 0;
        white-space: nowrap;
    }

    .device-name-text {
        flex: 0 1 auto;
        min-width: 0;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 6px 10px;
        border: 1px solid transparent;
        border-radius: 6px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .device-name-input {
        flex: 0 1 auto;
        min-width: 5ch;
        font-size: 0.95rem;
        font-weight: 600;
        padding: 6px 10px;
        border: 1px solid color-mix(in oklch, var(--secondary-color) 70%, transparent);
        border-radius: 6px;
        background: transparent;
        color: var(--primary-color);
        font-family: inherit;
        box-sizing: border-box;
        field-sizing: content;
    }

    .device-name-row .icon-button {
        width: 20px;
        height: 20px;
    }

    .icon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        border-radius: 6px;
        background: transparent;
        cursor: pointer;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
    }

    .icon-button:active {
        background: rgba(0, 0, 0, 0.1);
    }

    .icon-button edirom-icon {
        width: 100%;
        height: 100%;
    }

    .action-buttons-row {
        display: flex;
        gap: 12px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .action-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 35%;
        padding: 18px 10px;
        border: none;
        border-radius: 12px;
        background: var(--secondary-color);
        color: var(--primary-color);
        cursor: pointer;
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 500;
        text-align: center;
        line-height: 1.3;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        user-select: none;
    }

    .action-button:active {
        background: color-mix(in oklch, var(--secondary-color) 85%, black);
    }

    .action-button edirom-icon {
        width: 3rem;
        height: 3rem;
        display: block;
    }

    .intro-text {
        font-size: 0.85rem;
        color: var(--primary-color);
        opacity: 0.7;
        text-align: center;
        margin: 0;
        line-height: 1.5;
    }

    .add-device-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 14px 20px;
        margin-top: 16px;
        border: none;
        border-radius: 10px;
        background: var(--secondary-color);
        color: var(--primary-color);
        cursor: pointer;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 600;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        user-select: none;
    }

    .add-device-button:active {
        background: color-mix(in oklch, var(--secondary-color) 85%, black);
    }

    .add-device-button edirom-icon {
        width: 1.4rem;
        height: 1.4rem;
        flex-shrink: 0;
    }

    .session-id-display {
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;
        word-break: break-all;
        margin: 0 0 16px;
    }

    .qr-code-container {
        text-align: center;
        margin-bottom: 16px;
    }

    .qr-code-container img {
        max-width: min(220px, 60vw);
    }

    .invite-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 8px;
        background: var(--secondary-color);
        color: var(--primary-color);
    }

    .invite-url-text {
        flex: 1;
        font-size: 0.85rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
    }

    .join-input-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
    }

    .join-input-label {
        font-size: 0.95rem;
        color: var(--primary-color);
        margin: 0;
    }

    .join-input {
        font-size: 1.5rem;
        font-weight: 600;
        text-align: center;
        letter-spacing: 0.3em;
        padding: 12px;
        border: 2px solid var(--secondary-color);
        border-radius: 10px;
        background: transparent;
        color: var(--primary-color);
        font-family: monospace;
        width: 100%;
        box-sizing: border-box;
        text-transform: uppercase;
    }

    .join-input:focus {
        outline: none;
        border-color: color-mix(in oklch, var(--secondary-color) 70%, white);
    }

    .separator-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 20px 0;
        color: var(--primary-color);
        opacity: 0.6;
    }

    .separator-line {
        flex: 1;
        height: 1px;
        background: currentColor;
    }

    .separator-text {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.05em;
    }

    .qr-scanner-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 140px;
        border: 2px dashed var(--secondary-color);
        border-radius: 10px;
        color: var(--primary-color);
        opacity: 0.5;
        font-size: 0.9rem;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    }

    #back-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        padding: 0;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        background: var(--secondary-color);
        color: var(--primary-color);
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
    }

    #back-button:active {
        background: color-mix(in oklch, var(--secondary-color) 85%, black);
    }

    #back-button.hidden {
        display: none;
    }

    #close-button edirom-icon,
    #back-button edirom-icon {
        width: 1.4rem;
        height: 1.4rem;
    }
</style>
<div id="ws-container">
    <button id="ws-button" aria-label="WebSocket Verbindung">
        <edirom-icon name="devices" size="fill" class="status-icon"></edirom-icon>
    </button>
    <div id="session-popover" popover="manual">
        <div id="session-popover-inner">
            <div id="session-popover-header">
                <edirom-icon name="devices" size="fill" class="status-icon"></edirom-icon>
                <span>Vernetzte Arbeitsumgebung</span>
            </div>
            <div id="connection-news-area"></div>
            <div id="session-content"></div>
            <div id="bottom-row">
                <button id="back-button" class="hidden" aria-label="Zurück">
                    <edirom-icon name="arrow_back" size="fill"></edirom-icon>
                </button>
                <button id="close-button" aria-label="Schließen">
                    <edirom-icon name="close" size="fill"></edirom-icon>
                </button>
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
        this.deviceName = "";
        this._currentPageName = null;
        this._pageHistory = [];
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
        // this._connect();
        this.setAttribute('data-handles-back-request', '');
        this.addEventListener('back-request', this._handleBackRequest);
        this.initDeviceName();
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
                if (this._currentPageName) {
                    const savedHistory = [...this._pageHistory];
                    this._switchPage(this._currentPageName, { pushHistory: false });
                    this._pageHistory = savedHistory;
                    this._updateBackButton();
                }
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
        this._statusIcons = this.shadow.querySelectorAll('.status-icon');
        this._sessionPopover = this.shadow.querySelector('#session-popover');
        this._connectionNewsArea = this.shadow.querySelector('#connection-news-area');
        this._sessionContent = this.shadow.querySelector('#session-content');
        this._backButton = this.shadow.querySelector('#back-button');
        this._closeButton = this.shadow.querySelector('#close-button');
    }

    _setupEventListeners = () => {
        this._wsButton.addEventListener('click', () => {
            this._openPopover();
        });
        this._backButton.addEventListener('click', () => {
            this._navigateBack();
        });
        this._closeButton.addEventListener('click', () => {
            this._closePopover();
        });
    }

    _handleBackRequest = (event) => {
        if (!this._sessionPopover?.matches(':popover-open')) return;
        event.preventDefault();
        if (this._pageHistory.length > 0) {
            this._navigateBack();
        } else {
            this._closePopover();
        }
    }

    _openPopover = () => {
        const btnRect = this._wsButton.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        const popoverLeft = window.innerWidth * 0.025;
        const popoverTop = window.innerHeight * 0.025;
        this._sessionPopover.style.setProperty('--popover-origin-x', `${btnCenterX - popoverLeft}px`);
        this._sessionPopover.style.setProperty('--popover-origin-y', `${btnCenterY - popoverTop}px`);
        if (this._currentPageName === null) {
            const startPage = this._connectionState === 'session' ? 'sessionInformation' : 'initialPage';
            this._switchPage(startPage, { pushHistory: false });
        }
        this._sessionPopover.showPopover();
    }

    _closePopover = () => {
        this._sessionPopover.classList.add('closing');
        const handler = (event) => {
            if (event.propertyName === 'transform') {
                this._sessionPopover.removeEventListener('transitionend', handler);
                this._sessionPopover.classList.remove('closing');
                this._sessionPopover.hidePopover();
            }
        };
        this._sessionPopover.addEventListener('transitionend', handler);
    }

    // -------------------------------------------------------------------------
    // Connection State
    // -------------------------------------------------------------------------

    _setConnectionState = (state) => {
        this._connectionState = state;
        this._updateStatusIcon();
    }

    _updateStatusIcon = () => {
        if (!this._statusIcons || this._statusIcons.length === 0) return;
        const color = CONNECTION_STATE_COLORS[this._connectionState] ?? 'red';
        for (const icon of this._statusIcons) {
            icon.setAttribute('color', color);
        }
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
            this._pageHistory = [];
            this._currentPageName = null;
            if (this._sessionPopover?.matches(':popover-open')) {
                this._switchPage('initialPage', { pushHistory: false });
            }
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
        if (this._currentPageName === 'invitePage') {
            const sessionIdEl = this._sessionContent?.querySelector('#session-id');
            if (sessionIdEl) sessionIdEl.textContent = sessionId;
            const qrPlaceholder = this._sessionContent?.querySelector('#qr-code-placeholder');
            if (qrPlaceholder) this._renderQrCode(qrPlaceholder);
        }
    }

    _updateMembersList = () => {
        if (!this._sessionData) return;
        const membersList = this._sessionContent?.querySelector('#session-members-list');
        if (membersList) {
            this._renderMembersIntoList(membersList);
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
            this._openPopover();
        }
    }

    // -------------------------------------------------------------------------
    // Page System
    // -------------------------------------------------------------------------

    _switchPage = (pageName, { pushHistory = true } = {}) => {
        if (pushHistory && this._currentPageName !== null) {
            this._pageHistory.push(this._currentPageName);
        }
        this._currentPageName = pageName;
        if (!this._sessionContent) return;
        this._sessionContent.innerHTML = '';
        let pageEl;
        switch (pageName) {
            case 'initialPage': pageEl = this._buildInitialPage(); break;
            case 'sessionInformation': pageEl = this._buildSessionInformationPage(); break;
            case 'invitePage': pageEl = this._buildInvitePage(); break;
            case 'joinPage': pageEl = this._buildJoinPage(); break;
            default:
                console.warn(`EdiromWebSocketConnector: unknown page "${pageName}"`);
                return;
        }
        this._sessionContent.appendChild(pageEl);
        this._updateBackButton();
    }

    _navigateBack = () => {
        if (this._pageHistory.length === 0) return;
        const prevPage = this._pageHistory.pop();
        this._switchPage(prevPage, { pushHistory: false });
    }

    _updateBackButton = () => {
        if (!this._backButton) return;
        if (this._pageHistory.length > 0) {
            this._backButton.classList.remove('hidden');
        } else {
            this._backButton.classList.add('hidden');
        }
    }

    // -------------------------------------------------------------------------
    // Page Builders
    // -------------------------------------------------------------------------

    _buildInitialPage = () => {
        const page = document.createElement('div');
        page.className = 'page-initial';

        // Device name row
        const deviceNameRow = document.createElement('div');
        deviceNameRow.className = 'device-name-row';

        const label = document.createElement('span');
        label.className = 'device-name-label';
        label.textContent = 'Gerätename:';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'device-name-text';
        nameSpan.textContent = this.deviceName || '';

        const editButton = document.createElement('button');
        editButton.className = 'icon-button';
        editButton.setAttribute('aria-label', 'Gerätename bearbeiten');
        const editIcon = document.createElement('edirom-icon');
        editIcon.setAttribute('name', 'edit');
        editIcon.setAttribute('size', 'fill');
        editButton.appendChild(editIcon);

        const startEditing = () => {
            if (deviceNameRow.contains(document.activeElement) && document.activeElement.tagName === 'INPUT') return;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'device-name-input';
            input.value = this.deviceName || '';
            input.minLength = 1;
            input.maxLength = 64;

            const save = () => {
                console.log('Saving device name:', input.value);
                const newName = input.value.trim()
                this.deviceName = newName;
                this.onDeviceNameChange();
                nameSpan.textContent = newName;
                if (input.parentNode === deviceNameRow) {
                    deviceNameRow.replaceChild(nameSpan, input);
                }
                editButton.style.visibility = '';
            };

            input.addEventListener('blur', save);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
                if (e.key === 'Escape') {
                    if (input.parentNode === deviceNameRow) {
                        deviceNameRow.replaceChild(nameSpan, input);
                    }
                    editButton.style.visibility = '';
                }
            });

            deviceNameRow.replaceChild(input, nameSpan);
            editButton.style.visibility = 'hidden';
            input.focus();
            input.select();
        };

        nameSpan.addEventListener('click', startEditing);
        editButton.addEventListener('click', startEditing);

        deviceNameRow.appendChild(label);
        deviceNameRow.appendChild(nameSpan);
        deviceNameRow.appendChild(editButton);
        page.appendChild(deviceNameRow);

        // Action buttons row
        const actionRow = document.createElement('div');
        actionRow.className = 'action-buttons-row';

        const newSessionBtn = document.createElement('button');
        newSessionBtn.className = 'action-button';
        const newSessionIcon = document.createElement('edirom-icon');
        newSessionIcon.setAttribute('name', 'add_box');
        newSessionIcon.setAttribute('size', 'fill');
        const newSessionLabel = document.createElement('span');
        newSessionLabel.textContent = 'Sitzung erstellen';
        newSessionBtn.appendChild(newSessionIcon);
        newSessionBtn.appendChild(newSessionLabel);
        newSessionBtn.addEventListener('click', () => this._switchPage('invitePage'));

        const joinSessionBtn = document.createElement('button');
        joinSessionBtn.className = 'action-button';
        const joinSessionIcon = document.createElement('edirom-icon');
        joinSessionIcon.setAttribute('name', 'login');
        joinSessionIcon.setAttribute('size', 'fill');
        const joinSessionLabel = document.createElement('span');
        joinSessionLabel.textContent = 'Sitzung beitreten';
        joinSessionBtn.appendChild(joinSessionIcon);
        joinSessionBtn.appendChild(joinSessionLabel);
        joinSessionBtn.addEventListener('click', () => this._switchPage('joinPage'));

        actionRow.appendChild(newSessionBtn);
        actionRow.appendChild(joinSessionBtn);
        page.appendChild(actionRow);

        // Intro text
        const introText = document.createElement('p');
        introText.className = 'intro-text';
        introText.textContent = 'In der Vernetzten Arbeitsumgebung können Sie die digitale Edition auf mehreren Geräten gleichzeitig nutzen.';
        page.appendChild(introText);

        return page;
    }

    _buildSessionInformationPage = () => {
        const page = document.createElement('div');
        page.className = 'page-session-information';

        const h1 = document.createElement('h1');
        h1.textContent = 'Sitzungsinformationen';
        page.appendChild(h1);

        const h2 = document.createElement('h2');
        h2.textContent = 'Geräte';
        page.appendChild(h2);

        const membersList = document.createElement('ul');
        membersList.id = 'session-members-list';
        this._renderMembersIntoList(membersList);
        page.appendChild(membersList);

        const addDeviceBtn = document.createElement('button');
        addDeviceBtn.className = 'add-device-button';
        const addDeviceIcon = document.createElement('edirom-icon');
        addDeviceIcon.setAttribute('name', 'add_to_queue');
        addDeviceIcon.setAttribute('size', 'fill');
        const addDeviceLabel = document.createElement('span');
        addDeviceLabel.textContent = 'Neues Gerät hinzufügen';
        addDeviceBtn.appendChild(addDeviceIcon);
        addDeviceBtn.appendChild(addDeviceLabel);
        addDeviceBtn.addEventListener('click', () => this._switchPage('invitePage'));
        page.appendChild(addDeviceBtn);

        return page;
    }

    _buildInvitePage = () => {
        const page = document.createElement('div');
        page.className = 'page-invite';

        // Session ID
        const sessionIdEl = document.createElement('p');
        sessionIdEl.className = 'session-id-display';
        sessionIdEl.id = 'session-id';
        sessionIdEl.textContent = this._sessionId ?? '—';
        page.appendChild(sessionIdEl);

        // QR code
        const qrContainer = document.createElement('div');
        qrContainer.className = 'qr-code-container';
        qrContainer.id = 'qr-code-placeholder';
        this._renderQrCode(qrContainer);
        page.appendChild(qrContainer);

        // Invite URL row
        const dummyUrl = 'https://edirom.example.com/session/join';
        const inviteRow = document.createElement('div');
        inviteRow.className = 'invite-row';

        const urlText = document.createElement('p');
        urlText.className = 'invite-url-text';
        urlText.textContent = dummyUrl;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'icon-button';
        copyBtn.setAttribute('aria-label', 'URL kopieren');
        const copyIcon = document.createElement('edirom-icon');
        copyIcon.setAttribute('name', 'content_copy');
        copyIcon.setAttribute('size', 'fill');
        copyBtn.appendChild(copyIcon);
        copyBtn.addEventListener('click', () => {
            navigator.clipboard?.writeText(dummyUrl).catch(err => {
                console.warn('EdiromWebSocketConnector: clipboard write failed.', err);
            });
        });

        inviteRow.appendChild(urlText);
        inviteRow.appendChild(copyBtn);
        page.appendChild(inviteRow);

        return page;
    }

    _buildJoinPage = () => {
        const page = document.createElement('div');
        page.className = 'page-join';

        // Session ID input row
        const inputRow = document.createElement('div');
        inputRow.className = 'join-input-row';

        const inputLabel = document.createElement('p');
        inputLabel.className = 'join-input-label';
        inputLabel.textContent = 'Session-ID eingeben:';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'join-input';
        input.maxLength = 6;
        input.placeholder = '······';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'characters');
        input.setAttribute('spellcheck', 'false');

        inputRow.appendChild(inputLabel);
        inputRow.appendChild(input);
        page.appendChild(inputRow);

        // Separator row
        const separatorRow = document.createElement('div');
        separatorRow.className = 'separator-row';
        const lineLeft = document.createElement('div');
        lineLeft.className = 'separator-line';
        const separatorText = document.createElement('span');
        separatorText.className = 'separator-text';
        separatorText.textContent = 'ODER';
        const lineRight = document.createElement('div');
        lineRight.className = 'separator-line';
        separatorRow.appendChild(lineLeft);
        separatorRow.appendChild(separatorText);
        separatorRow.appendChild(lineRight);
        page.appendChild(separatorRow);

        // QR scanner placeholder
        const scannerPlaceholder = document.createElement('div');
        scannerPlaceholder.className = 'qr-scanner-placeholder';
        scannerPlaceholder.textContent = 'QR-Code scannen';
        page.appendChild(scannerPlaceholder);

        return page;
    }

    // -------------------------------------------------------------------------
    // Page Helpers
    // -------------------------------------------------------------------------

    _renderMembersIntoList = (ulElement) => {
        ulElement.innerHTML = '';
        if (!this._sessionData) return;
        const members = this._sessionData.sessionMembers ?? [];
        for (const member of members) {
            const li = document.createElement('li');
            const isOwn = member.id === this._clientId;
            const label = `${member.metadata?.deviceType ?? ''} ${member.metadata?.os ?? ''} ${member.metadata?.browser ?? ''}`.trim();
            li.textContent = isOwn ? `Du: ${label}` : label;
            ulElement.appendChild(li);
        }
    }

    _renderQrCode = (containerEl) => {
        if (!this._sessionId) return;
        if (typeof qrcode === 'function') {
            const qr = qrcode(0, 'L');
            qr.addData(this._sessionId.toString());
            qr.make();
            containerEl.innerHTML = qr.createImgTag(6);
        } else {
            containerEl.textContent = this._sessionId;
        }
    }

    getPlatform = () => {
        const browser = Bowser.getParser(navigator.userAgent);

        // Fix for iPadOS 13+ which lies about being a Mac
        const isIPad = /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
        if (isIPad) return 'tablet';

        return browser.getPlatformType(); // "desktop", "mobile", "tablet"
    }

    getOSName = () => {
        const browser = Bowser.getParser(navigator.userAgent);
        // Fix for iPadOS 13+ which lies about being a Mac
        const isIPad = /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
        if (isIPad) return 'iPadOS';
        return browser.getOSName();
    }

    generateDeviceName = () => {
        const platform = this.getPlatform();
        const osName = this.getOSName();
        const vendor = browser.getVendor();

        let deviceType;
        if (platform === 'mobile') {
            deviceType = 'Smartphone';
        } else if (platform === 'tablet') {
            deviceType = 'Tablet';
        } else {
            deviceType = 'Computer';
        }

        let deviceName = `${vendor} ${osName} ${deviceType}`.trim();

        if (!deviceName) {
            deviceName = 'Unknown Device';
        }

        return deviceName;
    }

    initDeviceName = () => {
        console.log('EdiromWebSocketConnector: initializing device name...');
        let deviceName = "";
        deviceName = localStorage.getItem('workspace-device-name');
        if (!deviceName) {
            deviceName = this.generateDeviceName();
        }
        this.deviceName = deviceName;
        console.log('EdiromWebSocketConnector: initialized device name as', this.deviceName);
        this.onDeviceNameChange();
    }

    onDeviceNameChange = () => {
        // if (this._webSocket && this._webSocket.readyState === WebSocket.OPEN) {
        //     this._webSocket.send(JSON.stringify({
        //         message: 'updateDeviceName',
        //         deviceName: this.deviceName
        //     }));
        // }

        localStorage.setItem('workspace-device-name', this.deviceName);
    }
}

if (!customElements.get('edirom-web-socket-connector')) {
    customElements.define('edirom-web-socket-connector', EdiromWebSocketConnector);
}

