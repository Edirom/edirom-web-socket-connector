# edirom-web-socket-connector

## Dependencies
- https://github.com/kazuhikoarase/qrcode-generator
- [Bowser](https://github.com/lancedikson/bowser) — browser/OS detection library (ES5 build bundled in `vendor/bowser-es5.js`)

## Usage

Add the following scripts to the `<head>` of the hosting application. Bowser must be loaded **before** the web socket connector so that `bowser` is available when the custom element connects:

```html
<!-- Bowser must come before edirom-web-socket-connector -->
<script defer src="path/to/edirom-web-socket-connector/vendor/bowser-es5.js"></script>
<script defer src="path/to/edirom-web-socket-connector/edirom-web-socket-connector.js" type="module"></script>
```