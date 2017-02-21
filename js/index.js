

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
      initApp();
    }
};

app.initialize();


function initApp(){
  acelerometro = navigator.accelerometer.watchAcceleration(onAcelerometroCall, failure, {frequency: 100});
}


function onAcelerometroCall(acelerometroValue){
  alert(acelerometroValue.x);
}

function failure (){
  alert("fail");
}
