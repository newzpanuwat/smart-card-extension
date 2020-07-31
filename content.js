chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("called from the extension");
  var data = request.data || {};
  console.log(data);

    const filters = [
      { vendorId: 0x096e }
    ];
    navigator.usb.requestDevice({ filters: filters })
    .then(usbDevice => {
      console.log("Product name: " + usbDevice.productName);
      console.log("manufacturerName: " + usbDevice.manufacturerName);
    })
    .catch(e => {
      console.log("There is no device. " + e);
    });
});