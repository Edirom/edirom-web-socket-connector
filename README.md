# Edirom Web Socket Connector

Web Component for connecting multiple devices in a shared session via WebSocket. Supports session creation, joining via session ID or QR code, device management, and cross-device messaging.

## Usage

```html
<script defer src="path/to/edirom-web-socket-connector/edirom-web-socket-connector.js" type="module"></script>
```

```html
<edirom-web-socket-connector
  ws-url="wss://example.com/ws"
  session="ABC123"
  invite-url="https://example.com/join/"
>
</edirom-web-socket-connector>
```

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `ws-url` | string | WebSocket server URL. Required for connection. |
| `session` | string | Session ID to auto-join on connect. When set, the component automatically joins the given session and opens the popover. |
| `invite-url` | string | Base URL used to generate invite links and QR codes. Combined with the current session ID. |

## Events

| Event | Detail | Description |
|---|---|---|
| `received-message` | `object` | Fired when a message is received from the WebSocket server. The `detail` property contains the parsed JSON message. |

## Dependencies

- **[`edirom-icon`](https://github.com/Edirom/edirom-core-web-components)** — for all icon rendering.
- [Bowser](https://github.com/lancedikson/bowser) — browser/OS detection (loaded internally from `vendor/bowser-es5.js`).
- [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) — QR code generation (loaded internally from `vendor/qrcode.js`).

Vendor libraries are injected into the host `<head>` automatically by the component — no separate `<script>` tags required.