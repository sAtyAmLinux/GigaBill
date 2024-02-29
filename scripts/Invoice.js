var para = new URLSearchParams(window.location.search);

// Function to retrieve and display the selected image
function displaySelectedImage() {
  var selectedImageData = sessionStorage.getItem('selectedImageData');
  if (selectedImageData) {
    var selectedImage = document.getElementById('selectedImage');
    selectedImage.src = selectedImageData;
  }
}

// Function to retrieve and display other invoice details
function displayInvoiceDetails() {
  var MeterId = document.getElementById("MeterId");
  var ConsumerName = document.getElementById("ConsumerName");
  var StreetAddress = document.getElementById("StreetAddress");
  var State = document.getElementById("State");
  var District = document.getElementById("District");
  var PinCode = document.getElementById("PinCode");
  var ContactNumbers = document.getElementById("ContactNumbers");
  var ContactEmail = document.getElementById("ContactEmail");
  var Dates = document.getElementById("Dates");
  var MeterUnit = document.getElementById("MeterUnit");
  var ElectricityProvider = document.getElementById("ElectricityProvider");
  var PaymentId = document.getElementById("PaymentId");
  var TotalUnit = document.getElementById("TotalUnit");
  var UnitRate = document.getElementById("UnitRate");
  var TotalAmountS = document.getElementById("TotalAmountS");
  var TotalAmount = document.getElementById("TotalAmount");
  var PaymentDate = document.getElementById("PaymentDate");

  // Set invoice details using URL parameters
  MeterId.innerHTML = para.get("MeterId");
  ConsumerName.innerHTML = para.get("ConsumerName");
  StreetAddress.innerHTML = para.get("StreetAddress");
  State.innerHTML = para.get("State");
  District.innerHTML = para.get("District");
  PinCode.innerHTML = para.get("PinCode");
  ContactNumbers.innerHTML = para.get("ContactNumbers");
  ContactEmail.innerHTML = para.get("ContactEmail");
  Dates.innerHTML = para.get("Dates");
  MeterUnit.innerHTML = para.get("MeterUnit");
  ElectricityProvider.innerHTML = para.get("ElectricityProvider");
  PaymentId.innerHTML = para.get("paymentId");
  TotalUnit.innerHTML = para.get("MeterUnit");
  PaymentDate.innerHTML = para.get("Dates");
  UnitRate.innerHTML = para.get("costPerUnit");
  TotalAmount.innerHTML = para.get("amount") / 100;
  TotalAmountS.innerHTML = para.get("amount") / 100;
}

// Call functions to display selected image and invoice details
displaySelectedImage();
displayInvoiceDetails();
