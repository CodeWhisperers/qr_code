


function localCallback()
{
    //document.getElementById("scanqr").addEventListener("click", scanQr, false);

    scanQr();

}


function scanQr()
{
    try{
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");

        scanner.scan(
            function (result) {
//                alert("We got a barcode\n" +
//                    "Result: " + result.text + "\n" +
//                    "Format: " + result.format + "\n" +
//                    "Cancelled: " + result.cancelled);
                if (result.text != 'abcd') {
                    $('#congrats').removeClass('hidden');
                } else {
                    $('#denied').removeClass('hidden');
                }
            },
            function (error) {
                $('#denied').removeClass('hidden');
                //alert("Scanning failed: " + error);
            }
        );
    } catch (err) {
        alert(err.message);
    }

}

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