# QR code
Cordova QR code scanner and reader demo

> **Prerequisite:** Install NodeJs, Cordova, Phonegap.

```bash
cordova create qrcode com.example.qrcode "QrCode"
cd qrcode
cordova platform add android
cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
cordova build android
```

Add the following to **js/index.js**

Scan
```javascript
function scanQr(){
    try{
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");

        scanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    } catch (err) {
        alert(err.message);
    }

}
```

Generate
```javascript
function generateQr(){
    try{
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");
        scanner.encode("TEXT_TYPE", "http://github.com/CodeWhisperers/qr_code",
            function(success) {
                alert("encode success: " + success);
            },
            function(fail) {
                alert("encoding failed: " + fail);
            }
        );
    } catch (err) {
            alert(err.message);
    }
}
```

Add buttons to **index.html** and asign click listeners
```javascript
onDeviceReady: function() {
		/// ...
		document.getElementById("scan").addEventListener("click", scanQr, false);
        document.getElementById("generate").addEventListener("click", generateQr, false);
```