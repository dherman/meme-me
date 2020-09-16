// Polyfill for Blob.prototype.arrayBuffer
if (!Blob.prototype.arrayBuffer) {
  Blob.prototype.arrayBuffer = function() {
    let onFulfill, onReject;

    let p = new Promise((f, r) => {
      onFulfill = f;
      onReject = r;
    });

    let reader = new FileReader();

    reader.addEventListener('loadend', () => {
      onFulfill(reader.result);
    });

    reader.addEventListener('error', (e) => {
      onReject(e);
    });

    reader.readAsArrayBuffer(this);

    return p;
  };
}

if (!HTMLImageElement.prototype.arrayBuffer) {
  HTMLImageElement.prototype.arrayBuffer = function(mimeType = 'image/png', quality) {
    if (mimeType === 'image/jpeg' && quality == null) {
      quality = 0.92;
    } else if (mimeType === 'image/webp' && quality == null) {
      quality = 0.8;
    }

    let onFulfill, onReject;

    let p = new Promise((f, r) => { onFulfill = f; onReject = r; });

    let canvas = document.createElement('canvas');
    let cx = canvas.getContext('2d');
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    cx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);
    canvas.toBlob(blob => { blob.arrayBuffer().then(onFulfill); }, mimeType, quality);

    return p;
  };
}

if (!window.timeout) {
  console.log("creating timeout polyfill");
  window.timeout = n => {
    let fulfill;
    let p = new Promise(f => { fulfill = f });
    window.setTimeout(fulfill, n);
    return p;
  }
}
