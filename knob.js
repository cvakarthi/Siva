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

var ondevfound = function(devices)
{
  if(devices.length > 0)
  {
    console.log("Device found:"+devices);
    console.log("Device found:"+devices.handle);
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

    usb.findDevices( DEVICE_INFO,function(devices)
{
  if(devices.length > 0)
  {
    console.log("Device found:"+devices);
    console.log("Device found:"+devices.handle);
  }
  else
  {
    console.log("Device Not found:");
  }
});
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

    console.log("Permission granted by application");
    usb.findDevice(1256, 26742, {"onEvent": onUsbEvent}, onDeviceFound);
    
    console.log("ON device found function triggered");
    
  }
  else 
  {
    console.log('USB permission failed');
  }
}
);

