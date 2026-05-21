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

    #session-popover-header edirom-icon {
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
        font-size: 4rem;
        font-family: monospace;
        font-weight: 600;
        color: var(--primary-color);
        letter-spacing: 4px;
    }

    .members-table {
        display: flex;
        flex-direction: column;
        margin: 0 0 4px;
    }

    .member-row {
        display: grid;
        grid-template-columns: 20px 1fr auto;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
        border-bottom: 1px solid rgba(35, 42, 68, 0.1);
    }

    .member-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
    }

    .member-icon edirom-icon {
        width: 100%;
        height: 100%;
    }

    .member-name {
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
    }

    .member-name-input {
        width: 100%;
        min-width: 0;
        padding: 0;
        margin: 0;
        height: 1lh;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid var(--secondary-color);
        background: transparent;
        color: inherit;
        font-size: inherit;
        line-height: inherit;
        font-family: inherit;
        outline: none;
    }

    .member-actions {
        display: flex;
        gap: 10px;
        flex-shrink: 0;
    }

    .member-actions .icon-button {
        width: 18px;
        height: 18px;
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
        background: #0000002b;
        color: var(--primary-color);
        flex-shrink: 0;
    }

    /* ---- Page System ---- */

    .page-session-information {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .session-info-footer {
        margin-top: auto;
        padding-top: 40px;
    }

    #session-content h1 {
        font-size: 1.25rem;
        font-weight: 600;
        text-align: center;
        margin: 0 0 20px;
        color: var(--primary-color);
    }

    .device-name-row {
        display: flex;
        align-items: center;
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

    .dissolve-session-button {
        margin-top: 10px;
        background: #ed121261;
        color: #fff;
    }

    .dissolve-session-button:hover {
        background: color-mix(in oklch, #ed121261 85%, black);
    }

    .invite-type-container {
        padding-top: 20px;
        padding-bottom: 20px;
    }


    .qr-code-container {
        text-align: center;
        margin-bottom: 16px;
    }

    .qr-code-container img {
        max-width: 180px;
    }

    .url-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 8px;
        background: var(--secondary-color);
        color: var(--primary-color);
    }

    .url-row .icon-button {
        width: 1.2rem;
        height: 1.2rem;
    }

    .url-text {
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

    .join-error {
        color: #e05353;
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0 0 8px;
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
        <edirom-icon name="devices" size="fill"></edirom-icon>
    </button>
    <div id="session-popover" popover="manual">
        <div id="session-popover-inner">
            <div id="session-popover-header">
                <edirom-icon name="devices" size="fill"></edirom-icon>
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

    #session-popover-header edirom-icon {
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
        font-size: 4rem;
        font-family: monospace;
        font-weight: 600;
        color: var(--primary-color);
        letter-spacing: 4px;
    }

    .members-table {
        display: flex;
        flex-direction: column;
        margin: 0 0 4px;
    }

    .member-row {
        display: grid;
        grid-template-columns: 20px 1fr auto;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
        border-bottom: 1px solid rgba(35, 42, 68, 0.1);
    }

    .member-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
    }

    .member-icon edirom-icon {
        width: 100%;
        height: 100%;
    }

    .member-name {
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
    }

    .member-name-input {
        width: 100%;
        min-width: 0;
        padding: 0;
        margin: 0;
        height: 1lh;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid var(--secondary-color);
        background: transparent;
        color: inherit;
        font-size: inherit;
        line-height: inherit;
        font-family: inherit;
        outline: none;
    }

    .member-actions {
        display: flex;
        gap: 2px;
        flex-shrink: 0;
    }

    .member-actions .icon-button {
        width: 18px;
        height: 18px;
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
        background: #0000002b;
        color: var(--primary-color);
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
    }

    /* ---- Page System ---- */

    .page-session-information {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .session-info-footer {
        margin-top: auto;
        padding-top: 40px;
    }

    #session-content h1 {
        font-size: 1.25rem;
        font-weight: 600;
        text-align: center;
        margin: 0 0 20px;
    }

    .device-name-row {
        display: flex;
        align-items: center;
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

    .dissolve-session-button {
        margin-top: 10px;
        background: #ed121261;
        color: #fff;
    }

    .dissolve-session-button:active {
        background: color-mix(in oklch, #ed121261 85%, black);
    }

    .invite-type-container {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .invite-type-label {
        text-align: center;
        font-size: 0.88rem;
        font-color: var(--primary-color);
        }

    .qr-code-container {
        text-align: center;
        margin-bottom: 16px;
    }

    .qr-code-container img {
        max-width: min(220px, 60vw);
    }

    .url-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 8px;
        background: var(--secondary-color);
        color: var(--primary-color);
    }

    .url-row .icon-button {
        width: 1.2rem;
        height: 1.2rem;
    }

    .url-text {
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

    .join-error {
        color: #e05353;
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0 0 8px;
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
        <edirom-icon name="devices" size="fill"></edirom-icon>
    </button>
    <div id="session-popover" popover="manual">
        <div id="session-popover-inner">
            <div id="session-popover-header">
                <edirom-icon name="devices" size="fill"></edirom-icon>
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
    failed: 'red',
    connected: '#ed9418',
    disconnected: 'var(--secondary-color)',
    session: '#83c702',
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
        this._joinError = null;
        this.deviceName = "";
        this._currentPageName = null;
        this._pageHistory = [];
        this.wsUrl = null;
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
        this._setConnectionState('disconnected');
        // this._connect();
        this.setAttribute('data-handles-back-request', '');
        this.addEventListener('back-request', this._handleBackRequest);
        this.browser = bowser.getParser(window.navigator.userAgent);
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
            this.wsUrl = newValue;
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
        this._statusIcon = this._wsButton.querySelector('edirom-icon');
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
        if (["disconnected", "connected", "failed", "session"].includes(state)) {
            this._connectionState = state;
            this._updateStatusIcon();
        }
    }

    _updateStatusIcon = () => {
        if (!this._statusIcon) return;
        const color = CONNECTION_STATE_COLORS[this._connectionState] ?? 'grey';
        this._statusIcon.setAttribute('color', color);
    }

    // -------------------------------------------------------------------------
    // WebSocket
    // -------------------------------------------------------------------------

    _buildInitialConnection = (sessionId = null) => {
        if (!this.wsUrl) {
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

        const clientName = encodeURIComponent(this.deviceName);
        const deviceType = encodeURIComponent(this.getDeviceType());
        const base = `${this.wsUrl}?clientName=${clientName}&deviceType=${deviceType}`;
        const url = sessionId ? `${base}&sessionId=${sessionId}` : base;
        this._webSocket = new WebSocket(url);

        this._webSocket.onopen = () => {
            console.log('EdiromWebSocketConnector: connection opened.');
            this._setConnectionState('connected');
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
                const page = this._joinError ? 'joinPage' : 'initialPage';
                this._switchPage(page, { pushHistory: false });
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

        this._webSocket.onerror = (error) => {
            console.error('EdiromWebSocketConnector: connection error.', error);
            this._setConnectionState('failed');
        };
    }

    _createNewSession = () => {
        this._buildInitialConnection();
    }

    _joinSession = (sessionId) => {
        this._buildInitialConnection(sessionId.trim().toUpperCase());
    }

    _sendRemoveClient = (clientId) => {
        if (this._webSocket?.readyState === WebSocket.OPEN) {
            this._webSocket.send(JSON.stringify({ message: 'removeClient', clientId }));
        }
    }

    _sendUpdateClientName = (name) => {
        if (this._webSocket?.readyState === WebSocket.OPEN) {
            this._webSocket.send(JSON.stringify({ message: 'updateClientName', clientName: name }));
        }
    }

    _sendDissolveSession = () => {
        if (this._webSocket?.readyState === WebSocket.OPEN) {
            this._webSocket.send(JSON.stringify({ message: 'dissolveSession' }));
        }
    }


    _handleMessage = (dataJson) => {
        console.log('EdiromWebSocketConnector: received message', dataJson);
        if (dataJson.response === 'sessionJoined') {
            this._clientId = dataJson.clientId;
            this._sessionId = dataJson.sessionId;
            this._sessionData = dataJson.sessionData;
            this._setConnectionState('session');
            this._switchPage('sessionInformation', { pushHistory: false });
        } else if (dataJson.response === 'error' && dataJson.reason === 'sessionNotFound') {
            this._showJoinError('Sitzung nicht gefunden.');
        } else if (dataJson.sessionId && this._sessionId === null) {
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
        } else if (dataJson.response === 'sessionDataUpdated') {
            this._sessionData = dataJson.sessionData;
            this._updateMembersList();
        } else if (dataJson.sessionData) {
            this._sessionData = dataJson.sessionData;
            this._updateMembersList();
        }
    }

    // -------------------------------------------------------------------------
    // Session Info
    // -------------------------------------------------------------------------

    _setSessionId = (sessionId) => {
        this._sessionId = sessionId;
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
        const deviceLabel = clientData?.metadata?.name ?? 'Unbekanntes Gerät';
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

    _showJoinError = (msg) => {
        this._joinError = msg;
        const errorEl = this._sessionContent?.querySelector('.join-error');
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.hidden = false;
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
        newSessionBtn.addEventListener('click', () => {
            this._createNewSession();
        });

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
        introText.textContent = 'Mit der vernetzten Arbeitsumgebung können Sie die digitale Edition auf mehreren Geräten gleichzeitig nutzen.';
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

        const membersList = document.createElement('div');
        membersList.id = 'session-members-list';
        membersList.className = 'members-table';
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

        const dissolveSessionBtn = document.createElement('button');
        dissolveSessionBtn.className = 'add-device-button dissolve-session-button';
        const dissolveIcon = document.createElement('edirom-icon');
        dissolveIcon.setAttribute('name', 'destruction');
        dissolveIcon.setAttribute('size', 'fill');
        const dissolveLabel = document.createElement('span');
        dissolveLabel.textContent = 'Sitzung auflösen';
        dissolveSessionBtn.appendChild(dissolveIcon);
        dissolveSessionBtn.appendChild(dissolveLabel);
        dissolveSessionBtn.addEventListener('click', () => {
            const shouldDissolve = window.confirm('Möchten Sie diese Sitzung wirklich auflösen?');
            if (shouldDissolve) {
                this._sendDissolveSession();
            }
        });

        const footer = document.createElement('div');
        footer.className = 'session-info-footer';
        footer.appendChild(dissolveSessionBtn);
        page.appendChild(footer);

        return page;
    }

    _buildInvitePage = () => {
        const page = document.createElement('div');
        page.className = 'page-invite';

        // Session ID
        const sessionIdContainer = document.createElement('div');
        sessionIdContainer.className = 'invite-type-container';
        let inviteTypeLabel = document.createElement('div');
        inviteTypeLabel.className = 'invite-type-label';
        inviteTypeLabel.textContent = 'Sitzungs-ID';
        sessionIdContainer.appendChild(inviteTypeLabel);
        const sessionIdEl = document.createElement('div');
        sessionIdEl.id = 'session-id';
        sessionIdEl.textContent = this._sessionId ?? '—';
        sessionIdContainer.appendChild(sessionIdEl);
        page.appendChild(sessionIdContainer);

        // QR code
        const qrContainer = document.createElement('div');
        qrContainer.className = 'invite-type-container';
        inviteTypeLabel = document.createElement('div');
        inviteTypeLabel.className = 'invite-type-label';
        inviteTypeLabel.textContent = 'QR-Code';
        qrContainer.appendChild(inviteTypeLabel);
        const qrPlaceholder = document.createElement('div');
        qrPlaceholder.id = 'qr-code-placeholder';
        this._renderQrCode(qrPlaceholder)
        qrContainer.appendChild(qrPlaceholder);
        page.appendChild(qrContainer);

        // Invite URL row
        const urlContainer = document.createElement('div');
        urlContainer.className = 'invite-type-container';
        inviteTypeLabel = document.createElement('div');
        inviteTypeLabel.className = 'invite-type-label';
        inviteTypeLabel.textContent = 'URL';
        urlContainer.appendChild(inviteTypeLabel);
        const dummyUrl = 'https://edirom.example.com/session/join';
        const urlRow = document.createElement('div');
        urlRow.className = 'url-row';

        const urlText = document.createElement('p');
        urlText.className = 'url-text';
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

        urlRow.appendChild(urlText);
        urlRow.appendChild(copyBtn);
        urlContainer.appendChild(urlRow);
        page.appendChild(urlContainer);

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
        inputLabel.textContent = 'Sitzungs-ID eingeben:';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'join-input';
        input.maxLength = 6;
        input.placeholder = '······';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'characters');
        input.setAttribute('spellcheck', 'false');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim().length === 6) {
                this._joinSession(input.value);
            }
        });

        inputRow.appendChild(inputLabel);
        inputRow.appendChild(input);
        page.appendChild(inputRow);

        // Error message
        const errorEl = document.createElement('p');
        errorEl.className = 'join-error';
        if (this._joinError) {
            errorEl.textContent = this._joinError;
            this._joinError = null;
        } else {
            errorEl.hidden = true;
        }
        page.appendChild(errorEl);

        // Join button
        const joinBtn = document.createElement('button');
        joinBtn.className = 'add-device-button';
        joinBtn.textContent = 'Beitreten';
        joinBtn.addEventListener('click', () => {
            if (input.value.trim().length === 6) {
                this._joinSession(input.value);
            }
        });
        page.appendChild(joinBtn);

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

    _renderMembersIntoList = (container) => {
        container.innerHTML = '';
        if (!this._sessionData) return;
        const members = [...(this._sessionData.sessionMembers ?? [])];
        members.sort((a, b) => (a.id === this._clientId ? -1 : b.id === this._clientId ? 1 : 0));

        for (const member of members) {
            const isOwn = member.id === this._clientId;
            const row = document.createElement('div');
            row.className = 'member-row';

            // Col 1: device icon
            const iconCol = document.createElement('div');
            iconCol.className = 'member-icon';
            const deviceIcon = document.createElement('edirom-icon');
            const dt = member.metadata?.deviceType ?? '';
            const iconName = dt === 'tablet' ? 'tablet_mac' : dt === 'mobile' ? 'smartphone' : dt === 'desktop' ? 'laptop_mac' : dt === 'tv' ? 'tv_gen' : 'mobile_question';
            deviceIcon.setAttribute('name', iconName);
            deviceIcon.setAttribute('size', 'fill');
            iconCol.appendChild(deviceIcon);
            row.appendChild(iconCol);

            // Col 2: client name
            const nameCol = document.createElement('div');
            nameCol.className = 'member-name';
            const nameSpan = document.createElement('span');
            nameSpan.textContent = member.metadata?.name ?? '—';
            nameCol.appendChild(nameSpan);
            row.appendChild(nameCol);

            // Col 3: action buttons
            const actionsCol = document.createElement('div');
            actionsCol.className = 'member-actions';

            if (isOwn) {
                const editBtn = document.createElement('button');
                editBtn.className = 'icon-button';
                editBtn.setAttribute('aria-label', 'Namen bearbeiten');
                const editIcon = document.createElement('edirom-icon');
                editIcon.setAttribute('name', 'edit');
                editIcon.setAttribute('size', 'fill');
                editBtn.appendChild(editIcon);
                editBtn.addEventListener('click', () => {
                    if (nameCol.querySelector('input')) return;
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'member-name-input';
                    input.value = member.metadata?.name ?? '';
                    input.maxLength = 64;
                    const save = () => {
                        const newName = input.value.trim() || member.metadata?.name || '—';
                        this.deviceName = newName;
                        this.onDeviceNameChange();
                        this._sendUpdateClientName(newName);
                        if (member.metadata) member.metadata.name = newName;
                        nameSpan.textContent = newName;
                        if (input.parentNode === nameCol) nameCol.replaceChild(nameSpan, input);
                    };
                    input.addEventListener('blur', save);
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
                        if (e.key === 'Escape') {
                            if (input.parentNode === nameCol) nameCol.replaceChild(nameSpan, input);
                        }
                    });
                    nameCol.replaceChild(input, nameSpan);
                    input.focus();
                    input.select();
                });
                actionsCol.appendChild(editBtn);
            }

            const removeBtn = document.createElement('button');
            removeBtn.className = 'icon-button';
            removeBtn.setAttribute('aria-label', 'Gerät entfernen');
            const removeIcon = document.createElement('edirom-icon');
            removeIcon.setAttribute('name', 'close');
            removeIcon.setAttribute('size', 'fill');
            removeBtn.appendChild(removeIcon);
            removeBtn.addEventListener('click', () => {
                const deviceName = member.metadata?.name || 'Unbekanntes Gerät';
                const shouldRemove = window.confirm(`Möchten Sie das Gerät "${deviceName}" wirklich entfernen?`);
                if (shouldRemove) {
                    this._sendRemoveClient(member.id);
                }
            });
            actionsCol.appendChild(removeBtn);

            row.appendChild(actionsCol);
            container.appendChild(row);
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

    getDeviceType = () => {
        // Fix for iPadOS 13+ which lies about being a Mac
        const isIPad = /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
        if (isIPad) return 'tablet';

        return this.browser.getPlatformType(); // "desktop", "mobile", "tablet"
    }

    getOSName = () => {
        // Fix for iPadOS 13+ which lies about being a Mac
        const isIPad = /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
        if (isIPad) return 'iPadOS';
        return this.browser.getOSName();
    }

    getVendor = () => {
        let vendor = this.browser.getPlatform().vendor || '';
        return vendor;
    }

    generateDeviceName = () => {
        const deviceType = this.getDeviceType();
        const osName = this.getOSName();
        const vendor = this.getVendor();

        let deviceTypeLabel = '';
        if (deviceType === 'mobile') {
            deviceTypeLabel = 'Smartphone';
        } else if (deviceType === 'tablet') {
            deviceTypeLabel = 'Tablet';
        } else {
            deviceTypeLabel = 'Computer';
        }

        let deviceName = `${vendor} ${osName} ${deviceTypeLabel}`.trim();

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

