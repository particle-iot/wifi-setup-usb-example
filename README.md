# Wi-Fi Setup over USB Example

This example shows how you can configure Wi-Fi credentials on a P2, Photon 2, or Argon, over USB from a browser.

Supported browsers include: Chrome, Edge, and Opera. This is intended for use on computers and Chromebooks. It also works on some Android phones and tablets using USB OTG.

It does not work on Safari, Firefox, or on any iOS device (iPhone or iPad).

## Running the example

### Via Github pages

You can run this example by going to the page: [https://particle-iot.github.io/wifi-setup-usb-example/index.html](https://particle-iot.github.io/wifi-setup-usb-example/index.html)

### Run locally

For security reasons, WebUSB can only be run from a secure host (https) or localhost. It cannot be run from a file:// URL, so you can't just open the index.html file in your browser. The Github pages example above is https. This example includes a small express.js server that allows you to test this code locally.

- Install the dependencies

```
npm install
```

- Run the server in node.js on Windows, Linux, or Mac.

```
npm start
```

- Connect to the local server in Chrome, Edge, or Opera browsers. This must be running on the same computer as the server. 

[http://localhost:5123/](http://localhost:5123/)

## How it works

All of the code runs in-browser using HTML, Javascript, and CSS. The folder docs contains these files.

The browser limitations are mainly because of the need for WebUSB in the browser, which is not present in all browsers or all platforms. 

It uses the [particle-usb](https://github.com/particle-iot/particle-usb) package to handle most of the device interaction. This demo uses the a pre-built WebPack version of the library, but you can install the library from npm and use your own package manager instead if you prefer.

The example code uses jQuery to simplify the user interface implementation, but the actual Wi-Fi setup does not require any framework.

This example cannot be used on node.js. However, it could be adapted because particle-usb works both in browser and in node.js.
