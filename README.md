# Mate-app

Una semplice landing page per presentare l'applicazione Mate.

Questa versione utilizza Tailwind CSS e include una grafica migliorata con pulsanti animati.

## Nuova pagina Form

È stata aggiunta una pagina `form.html` con un questionario interattivo per raccogliere maggiori informazioni sugli utenti che desiderano trovare un coinquilino compatibile.
La pagina è raggiungibile dal pulsante **Sign Up** nella homepage.

## Autoprofilazione "Chi sei tu?"

È disponibile la pagina `autoprofilazione.html` con una breve sequenza di 5 step
visuali per definire il proprio stile di vita. Le risposte vengono salvate in
`localStorage` all'interno di `formData.autoprofilazione` e possono essere
richiamate dal resto del form.

## Componente React "HowItWorks"

Nella cartella `components` è ora presente un esempio di componente React che implementa la sezione "Come funziona Mate" utilizzando Tailwind CSS e le animazioni di AOS.
Le immagini sono caricate dalla cartella `public` e sono le stesse utilizzate nella versione HTML della landing.
