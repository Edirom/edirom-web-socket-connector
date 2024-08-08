console.log("WebSocket Webcomponent loaded");

fetch("resources/webcomponents/webSocket/webSocketElement.html")
    .then(stream => stream.text())
    .then(text => define(text));

// Libraries
let qrCodeJsElement = document.createElement("script");
qrCodeJsElement.setAttribute("defer", "defer");
qrCodeJsElement.setAttribute("src", "resources/webcomponents/webSocket/qrcode.js")
document.querySelector("head").appendChild(qrCodeJsElement);


function define(html) {
    class webSocketElement extends HTMLElement {
        constructor() {
            super();
            let me = this;
            this.shadow = this.attachShadow({ mode: "open" });
            this.shadow.innerHTML = html;
            this.webSocket;
            this.webSocketContainer = this.shadow.querySelector("#web-socket-container");
            this.sessionIdSpan = this.shadow.querySelector("#session-id");
            this.connectionNewsPopover = this.shadow.querySelector("#connection-news-popover");
            this.sessionId = null;
            this.sessionMembersNumberP = this.shadow.querySelector("#session-members-number");
            this.infoPopover = this.shadow.querySelector("#info-popover");

            // Elements

            // Event listeners



            this.webSocketContainer.addEventListener("click", (event) => {
                console.log("WebSocket Webcomponent clicked!");
                this.infoPopover.togglePopover();
            });
        }

        static get observedAttributes() {
            return [];
        }

        connectedCallback() {
            this.webSocket = new WebSocket("http://localhost:3000/1234");
            this.webSocket.onopen = (event) => {
                console.log("Connection opened!");
                this.webSocketContainer.classList.remove("disconnected");
                this.webSocketContainer.classList.add("connected");

                this.webSocket.send(JSON.stringify({ "request": "giveSessionId" }));
            };
            this.webSocket.onclose = (event) => {
                console.log("Connection closed!");
                this.webSocketContainer.classList.remove("connected");
                this.webSocketContainer.classList.add("disconnected");
                this.sessionMembersNumberP.textContent = "0";
            };
            this.webSocket.onmessage = (event) => {
                console.log("Received data!");
                console.log(event.data);
                const dataJson = JSON.parse(event.data);
                if (dataJson.sessionId && this.sessionId === null) {
                    this.setSessionId(dataJson.sessionId);
                    this.sessionMembersNumberP.textContent = "1";
                }
                else if (dataJson.message) { // TODO: Implmement better filtering of the different types of messages
                    console.log("Received message!");
                    const receivedMessage = new CustomEvent('received-message', {
                        detail: dataJson,
                        bubbles: true
                    });
                    this.dispatchEvent(receivedMessage);
                }
                else if (dataJson.response === "sessionConnected") {
                    this.handleNewDeviceConnection(dataJson);
                }

            };
        }

        disconnectedCallback() {
            console.log("WebSocket Webcomponent disconnected!");
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log(name, oldValue, newValue);
            if (oldValue === newValue) return;

        }

        setSessionId = (sessionId) => {
            this.sessionId = sessionId;
            this.sessionIdSpan.textContent = sessionId;
            var qr = qrcode(0, "L");
            qr.addData(sessionId.toString());
            qr.make();
            this.shadow.querySelector('#qr-code-placeholder').innerHTML = qr.createImgTag(6);
        }

        handleNewDeviceConnection = (data) => {
            console.log("New device connected!");
            let newDiv = document.createElement("div");
            newDiv.classList.add("connection-news-div");
            newDiv.classList.add("connect");
            let newP = document.createElement("p");
            newP.textContent = `Ein neues Gerät "${data.deviceInfo}" ist Ihrer Sitzung beigetreten!`;
            let newButton = document.createElement("button");
            newButton.classList.add("connection-news-btn");
            newButton.textContent = "Ok";
            newButton.addEventListener("click", (event) => {
                newDiv.remove();
                if (this.shadow.querySelectorAll(".connection-news-div").length === 0) {
                    this.connectionNewsPopover.hidePopover();
                }
            });
            newDiv.appendChild(newP);
            newDiv.appendChild(newButton);
            this.connectionNewsPopover.appendChild(newDiv);
            this.connectionNewsPopover.showPopover();

            this.sessionMembersNumberP.textContent = data.numberOfSessionMembers;
        }



    }

    customElements.define("edirom-web-socket", webSocketElement);
}
