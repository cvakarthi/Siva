var POWERMATE_VENDOR_ID = 1256;//1917;//0x077d;
var POWERMATE_PRODUCT_ID = 26742;//1040; //0x0410;
var DEVICE_INFO = {"vendorId": POWERMATE_VENDOR_ID, "productId": POWERMATE_PRODUCT_ID};

var powerMateDevice;
var usb = chrome.usb;
var knob = document.getElementById('knob');
var requestButton = document.getElementById("requestPermission");

var amount = 0;

var transfer = {
  direction: 'in',
  endpoint: 1,
  length: 6
};

var onEvent=function(usbEvent) 
{
    if (usbEvent.resultCode)
    {
      console.log("Error: " + usbEvent.error);
      return;
    }

    var buffer = new Int8Array(usbEvent.data);
    amount += buffer[1] * 4;

    knob.style.webkitTransform = 'rotate(' + amount + 'deg)';

    usb.interruptTransfer( powerMateDevice, transfer, onEvent );
};

var ondevfound = function(device)
{
  console.log("call back function called");
  this.device = device;
  console.log("Device length is:" +device.length);
  if(device.length > 0)
  {
    console.log("Device found:"+device);
    console.log("Device found:"+device.handle);
  }
  else
  {
    console.log("Device Not found:");
  }
}

var gotPermission = function(result) 
{
    requestButton.style.display = 'none';
    knob.style.display = 'block';
    console.log('App was granted the "usbDevices" permission.');
chrome.usb.findDevices(DEVICE_INFO, function callBack(e){JSON.stringify(e);});
console.log("Device length is:" +e.length);

    if(e.length)
    {
      console.log("Device handle is:" +device.handle);
    }
    else 
    {
      console.log("Device not found");
    }
    
    //usb.findDevices( DEVICE_INFO,ondevfound);
    //usb.findDevices( DEVICE_INFO,function(devices)
//{
  //console.log("USB device found: calling call back function");
  //if(devices.length > 0)
  //{
    //document.body.background = "chrome-logo.svg";
    //console.log("Device found:"+devices);
    //console.log("Device found:"+devices.handle);
  //}
  //else
  //{
  //  document.body.background = "chrome-logo.svg";
    //console.log("Device Not found:");
  //}
//});
  //usb.findDevices( DEVICE_INFO,  function(devices)
    //  {
      //  if (!devices || !devices.length) 
        //{
          //console.log('device not found');
          //console.log('Device length:' + devices.length);
          //console.log('Device handle:' + devices.handle);
          //console.log('Device vendorid:' + devices.vendorid);
          //console.log('Device productid:' + devices.productid);
          //return;
        //}
        //console.log('Device length:' + devices.length);
        //console.log('Device handle:' + devices.handle);
        //console.log('Device vendorid:' + devices.vendorid);
        //console.log('Device productid:' + devices.productid);
        //console.log('Found device: ' + devices[0].handle);
        //powerMateDevice = devices[0];
        //usb.interruptTransfer(powerMateDevice, transfer, onEvent);
     //}
    //);
}
var onUsbEvent = function(event) {
     console.log("Got some message from the USB device!");
};
        
var permissionObj = {permissions: [{'usbDevices': [DEVICE_INFO] }]};

requestButton.addEventListener('click', function()
{ 
  chrome.permissions.request( permissionObj, function(result)
  {
    if (result) 
    {
      gotPermission();
    } 
    else 
    {
      console.log('App was not granted the "usbDevices" permission.');
      console.log(chrome.runtime.lastError);
    }
  }
);
});

    
    
    var onDeviceFound = function(device) {
  //_this.device=device;
  if (device) {
     console.log("Device found: "+device.handle);
  } else {
     console.log("Device could not be found");
  }
};

var onUsbEvent = function(event) {
     console.log("Got some message from the USB device!");
};

chrome.permissions.contains( permissionObj, function(result) 
{
  if (result)
  {

gotPermission();
    
  }
  else 
  {
    console.log('USB permission failed');
  }
}
);

