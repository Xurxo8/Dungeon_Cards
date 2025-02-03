$('document').ready(function(){
  // ========== MOVEMENTO DO PERSONAXE ==========

  // Posicion inicial do personaxe
  let columnaInicio = 2;
  let columnaFin = 3;
  let filaInicio = 2; 
  let filaFin = 3;

  // Lista codigo teclas javascript -> https://www.freecodecamp.org/espanol/news/lista-de-codigos-de-teclas-en-javascript/
  // window.addEventListener("keydown", evento => {
    switch (evento.key) {
      case "ArrowUp":
        if((filaInicio > 1) && (filaFin > 2)){// Deter o personaxe ao chegar ao límite superior
          $('#xogador').css({
            "grid-row" : `${--filaInicio}/${--filaFin}`,
            "grid-column" : `${columnaInicio}/${columnaFin}`
          });
        }
        break;
    
      case "ArrowDown":
        if((filaInicio < 3) && (filaFin < 4)){// Deter o personaxe ao chegar ao límite inferior
          $('#xogador').css({
            "grid-row" : `${++filaInicio}/${++filaFin}`,          
            "grid-column" : `${columnaInicio}/${columnaFin}`
          });
        }
        break;
    
      case "ArrowLeft":
        if((columnaInicio > 1) && (columnaFin > 2)){// Deter o personaxe ao chegar ao límite esquerdo
          $('#xogador').css({
            "grid-row" : `${filaInicio}/${filaFin}`,          
            "grid-column" : `${--columnaInicio}/${--columnaFin}`
          });
        }
        break;
    
      case "ArrowRight":
        if((columnaInicio < 3) && (columnaFin < 4)){// Deter o personaxe ao chegar ao límite dereito
          $('#xogador').css({
            "grid-row" : `${filaInicio}/${filaFin}`,          
            "grid-column" : `${++columnaInicio}/${++columnaFin}`
          });
        }
        break;
    
      default:
        alert("Para mover o personaxe usa as frechas do teclado")
        break;
    }
  // });
});


