function onRomSelected(event) {
    var files = event.target.files;
    if (!files.length) {
        return;
    }
    var reader = new FileReader();

    reader.onloadend = function () {
        var buffer = reader.result;
        var view = new DataView(buffer);

        for (var i=0; i<buffer.byteLength; i++) {
            console.log(view.getUint8(i));
        }
    };

    console.log('reading');
    reader.readAsArrayBuffer(files[0]);
}

var fileInput = document.getElementById('rom_file');
fileInput.addEventListener('change', onRomSelected);
