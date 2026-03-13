# LOGBOG

Brug denne logbog til at holde styr på dine commits.

Udfyld hver dag. Det er vigtigt at du overholder denne logbog - du kan risikere at dumpe, hvis du ikke bruger den.  
Skriv tidspunkt for dit commit ud for hver dag, både morgen og aften.  
Husk, at du ikke må arbejde på din opgave mellem kl. 16:00 og kl. 8:00.

## Dag 1

  
Eftermiddag - (15.30)

I dag har jeg bygget projektet i React med Vite som build-tool. Jeg startede med at implementere splash page'n med baggrundsbillede, "Believe Yourself" overskrift i gul (#F1C40E), "Train like a pro" undertekst med dekorativ linje, og en "Start training" knap med afrundet design og fade-in animation. Gradient overlay blev tilføjet med mix-blend-mode multiply effekt.

Design systemet blev sat op med #F1C40E som primær farve, Poppins font fra Google Fonts, og alle sider fik 410px bredde. Jeg oprettede CSS-variabler for konsistente farver gennem hele appen.

Splash page'n fik korrekt layout med baggrundsbillede (Rectangle 1655.png), tekst positioneret i bunden til venstre, og knap centreret nederst med 98px margin. Alle komponenter bruger Poppins font, afrundede knapper med 100px border-radius, og den gule farve til tekst og knapper
## Dag 2

Morgen - (10.30)  
Jeg har arbejdet på HomePage. Jeg tilføjede welcome.jpg som baggrundsbillede på hero-sektionen. Jeg oprettede en services/api.js fil som forbinder til backend API på port 4000 - den henter nyheder og anmeldelser, og håndterer nyhedsbrev og kontaktformular.

Jeg kopierede billeder fra API-mappen til public-mappen (juice.jpg, bootcamp.jpg, thirtydaychallenge.jpg, qrcode.jpg) så nyhedsartiklerne viser billeder. welcome - center.png blev sat som baggrund på anmeldelser-sektionen.

Jeg lavede en burger-menu der åbner et navigationsmenu med links til Home, Classes, Trainers, Contact us og Log in.


Eftermiddag - (15.30)

Jeg lavede ClassesPage som viser alle klasser fra API'et. Den store klasse øverst er "Lower Abs Workout" og de andre klasser vises som et vandret scroll-slider nedenunder.

Jeg lavede ClassDetailPage som viser et billede af klassen, titel, dag og tid, beskrivelse, trænerens billede og navn, og en SIGN UP knap.

Jeg tilføjede getClasses, getClass og getAsset funktioner i api.js. 

## Dag 3

Eftermiddag - (15.25)
Tilføjet login og signup sider. Brugeren kan oprette sig og logge ind med brugernavn og adgangskode. Token gemmes i localStorage efter login.
 
 NavMenu komponent lavet som en delt burger menu der bruges på alle sider.


Lavet søgeside hvor brugeren kan søge efter hold og trænere. Viser resultater filtreret på navn, beskrivelse, dag og træner.
## Dag 4

Morgen - (tidspunkt)  
Eftermiddag - (15.00)

Lavet profilside. Tilføjet login/logout i navigationsmenu og brugerens navn vises i hero-sektionen når man er logget ind.
## Dag 5

Morgen - (tidspunkt)
Eftermiddag - (15.30)

Færdiggjort tilmeldingsfunktionaliteten på klassesiden. SIGN UP-knappen tilmelder nu brugeren til et hold og skifter til LEAVE hvis brugeren allerede er tilmeldt. Knappen er skjult hvis brugeren ikke er logget ind.

Rettet en fejl i API'et hvor addUser ikke blev awaited,

Lavet admin-visning på profilsiden: når en bruger er logget ind som admin.


