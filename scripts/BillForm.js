function convertMeterUnitsToINR(meterUnits, costPerUnit) {
  var costInINR = meterUnits * costPerUnit;
  return Math.round(costInINR * 100);
}

var submitBtn = document.getElementById("Pay");

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
  var meterUnits = document.getElementById("MeterUnit").value;
  var costPerUnit = 5;
  var costInPaise = convertMeterUnitsToINR(meterUnits, costPerUnit);

  formData.State = document.getElementById("State").value;
  formData.District = document.getElementById("District").value;
  formData.StreetAddress = document.getElementById("StreetAddress").value;
  formData.PinCode = document.getElementById("PinCode").value;
  formData.ElectricityProvider = document.getElementById(
    "ElectricityProvider"
  ).value;
  formData.MeterId = document.getElementById("MeterId").value;
  formData.MeterUnit = document.getElementById("MeterUnit").value;
  formData.ConsumerName = document.getElementById("ConsumerName").value;

  formData.ContactNumbers = document.getElementById("ContactNumbers").value;
  formData.ContactEmail = document.getElementById("ContactEmail").value;
  var options = {
    key: "rzp_test_m4319KoF1cHuSq",
    amount: costInPaise,
    currency: "INR",
    name: "GigaBill",
    description: "Product description",
    image: "../img/logo.png",
    handler: function (response) {
      window.location = `./invoice.html?State=${formData.State}&District=${
        formData.District
      }&StreetAddress=${formData.StreetAddress}&PinCode=${
        formData.PinCode
      }&ElectricityProvider=${formData.ElectricityProvider}&MeterId=${
        formData.MeterId
      }&ConsumerName=${formData.ConsumerName}&MeterUnit=${
        formData.MeterUnit
      }&Dates=${new Date().toLocaleDateString()}&ContactNumbers=${
        formData.ContactNumbers
      }&ContactEmail=${formData.ContactEmail}&amount=${
        options.amount
      }&paymentId=${response.razorpay_payment_id}&costPerUnit=${costPerUnit}`;
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
  console.log(options.amount);
  var rzp = new Razorpay(options);
  console.log(formData);
  rzp.open();
}
