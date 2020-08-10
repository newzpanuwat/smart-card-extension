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
        console.log(response);

        var gender = ''
        if (response.gender == "1"){
          var gender = 'male'
        }else {
          var gender = 'female'
        }

        var fullname_en = response.fullname_en.replace("#", " ");
        var fullname_en = fullname_en.replace("##", " ");

        var fullname_th = response.fullname_th.replace("#", " ");
        var fullname_th = fullname_th.replace("##", " ");

        document.getElementById("cid_1").value = response.cid
        document.getElementById("fullname_en").value = fullname_en
        document.getElementById("fullname_th").value = fullname_th
        document.getElementById("gender").value = gender
        document.getElementById("dob").value = response.birth
        document.getElementById("issuer").value = response.issuer
        document.getElementById("issue_date").value = response.issueDate
        document.getElementById("issue_exp").value = response.issueExp
        document.getElementById("address").value = response.address_th
        // document.getElementsByTagName('img')[1].src = response.photo
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