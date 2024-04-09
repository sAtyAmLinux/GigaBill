function convertMeterUnitsToINR(meterUnits, costPerUnit) {
  var costInINR = meterUnits * costPerUnit;
  return Math.round(costInINR * 100); // Convert to paise
}

function selectImage() {
  var fileInput = document.getElementById("fileInput");
  if (fileInput.files.length > 0) {
    var selectedImage = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var imageData = event.target.result;
      console.log(imageData);
      sessionStorage.setItem("selectedImageData", imageData);
    };
    reader.readAsDataURL(selectedImage);
  }
}

var formData = {
  State: "",
  District: "",
  StreetAddress: "",
  PinCode: "",
  ElectricityProvider: "",
  MeterId: "",
  ConsumerName: "",
  MeterUnit: "",
  ContactNumbers: "",
  ContactEmail: "",
};

function FormSubmit(event) {
  event.preventDefault();

  var meterId = document.getElementById("MeterId").value;

  const objectMeter = localStorage.getItem(meterId);

  if (JSON.parse(objectMeter)?.paid) {
    return alert(`Payment has already been made for this MeterId. You can make the payment again next month.`);
  }

  var meterUnits = document.getElementById("MeterUnit").value;

  
  var costPerUnit = 5;
  var costInPaise = convertMeterUnitsToINR(meterUnits, costPerUnit);

  formData.State = document.getElementById("State").value;
  formData.District = document.getElementById("District").value;
  formData.StreetAddress = document.getElementById("StreetAddress").value;
  formData.PinCode = document.getElementById("PinCode").value;
  formData.ElectricityProvider = document.getElementById("ElectricityProvider").value;
  formData.MeterId = document.getElementById("MeterId").value;
  formData.MeterUnit = document.getElementById("MeterUnit").value;
  formData.ConsumerName = document.getElementById("ConsumerName").value;
  formData.ContactNumbers = document.getElementById("ContactNumbers").value;
  formData.ContactEmail = document.getElementById("ContactEmail").value;

  // var razorpay_order_id = sessionStorage.getItem("razorpay_order_id");
  // if (razorpay_order_id) {
  //   alert("You've already made a payment. Only one-time payment is allowed.");
  //   return;
  // }
  var options = {
    key: "rzp_test_m4319KoF1cHuSq",
    amount: costInPaise,
    currency: "INR",
    name: "GigaBill",
    description: "Product description",
    image: "../img/logo.png",
    handler: function (response) {
      // sessionStorage.setItem("razorpay_order_id", response.razorpay_order_id);
      localStorage.setItem(meterId,JSON.stringify({
        paid:true,
        time:new Date().getTime()
      }));
      
      window.location = `./invoice.html?State=${formData.State}&District=${formData.District}&StreetAddress=${formData.StreetAddress}&PinCode=${formData.PinCode}&ElectricityProvider=${formData.ElectricityProvider}&MeterId=${formData.MeterId}&ConsumerName=${formData.ConsumerName}&MeterUnit=${formData.MeterUnit}&Dates=${new Date().toLocaleDateString()}&ContactNumbers=${formData.ContactNumbers}&ContactEmail=${formData.ContactEmail}&amount=${options.amount}&paymentId=${response.razorpay_payment_id}&costPerUnit=${costPerUnit}`;
    },
    prefill: {
      name: formData.ConsumerName,
      email: formData.ContactEmail,
      contact: formData.ContactNumbers,
    },
    theme: {
      color: "#1194ed",
    },
  };

  selectImage();
  var rzp = new Razorpay(options);
  rzp.open();
}
