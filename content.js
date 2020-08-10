chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("called from the extension");
  var data = request.data || {};
  console.log(data);

    const filters = [
      { vendorId: 0x096e }
    ];
    navigator.usb.requestDevice({ filters: filters })
    .then(usbDevice => {
      var callback = function (response) {
        // console.log(response);

        console.log(response);

        document.getElementById("cid_1").value = response.cid
        document.getElementById("fullname_en").value = response.fullname_en
        document.getElementById("fullname_th").value = response.fullname_th
        document.getElementById("gender").value = response.gender
        document.getElementById("dob").value = response.dob
        document.getElementById("issuer").value = response.issuer
        document.getElementById("issue_date").value = response.issueDate
        document.getElementById("issue_exp").value = response.issueExp
        document.getElementById("address").value = response.addressTH
      };
      var handle_error = function (obj, error_text_status) {
        console.log(error_text_status + " " + obj);
      };

      var cardPayload = {};

      cardPayload.productName = usbDevice.productName
      cardPayload.manufacturerName = usbDevice.manufacturerName

      console.log(cardPayload);

      console.log("Product name: " + usbDevice.productName);
      console.log("manufacturerName: " + usbDevice.manufacturerName);

      $.ajax({
        url: 'http://localhost:8080/smartcard',
        type: 'GET',
        success: callback,
        data: JSON.stringify(cardPayload),
        contentType: 'application/json',
        error: handle_error
      });

    })
    .catch(e => {
      console.log("There is no device. " + e);
    });
});

// var loginPayload = {};
// loginPayload.username = document.getElementById('username').value;
// loginPayload.password = document.getElementById('password').value;
// console.log(loginPayload);

// var callback = function (response) {
//   console.log(response);
// };
// var handle_error = function (obj, error_text_status) {
//   console.log(error_text_status + " " + obj);
// };

// $.ajax({
//   url: 'https://127.0.0.1:8443/hello',
//   type: 'POST',
//   success: callback,
//   data: JSON.stringify(loginPayload),
//   contentType: 'application/json',
//   error: handle_error
// });