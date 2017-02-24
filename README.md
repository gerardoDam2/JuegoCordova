# Juego de la bola en Cordova

>La partida empieza con 3 vidas, cada vez que la bola llega al borde inferior se pierde una vida, Al perder las 3 vidas
sale un mensaje "Game Over" indicando que has perdido la partida.

- La aplicación al pasar a segundo plano guarda el estado actual de las vidas.
```sh
document.addEventListener('resume', onResume , false);
function onResume(){
   x = canvas.width / 2;
   y = 20;
   lifes=window.localStorage.getItem("lifes")
}
```

- Al reanudarse la aplicación se reinicia la posición de la bola y se establecen las vidas guardadas en el localStorage.
```sh
document.addEventListener("pause", onAppClose, false);
function onAppClose(){
  window.localStorage.setItem("lifes",lifes);
}
```