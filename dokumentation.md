# Titel
Fadi, WU13

Valgfri opgave B – Opret bruger

Nye brugere kan oprette en konto via signup-siden. Brugeren skal indtaste brugernavn og adgangskode to gange. Hvis adgangskoderne ikke matcher, vises en fejlbesked. Når oprettelsen er gennemført, sendes brugeren videre til login-siden.

# Begrundelse for valg af React

Til dette projekt har jeg valgt at bruge React som frontend-bibliotek. React er velegnet til dette projekt fordi applikationen består af mange sider og komponenter, der deler den samme logik og det samme udseende – for eksempel burger-menuen, som bruges på alle sider. Med React kan jeg lave denne som én genbrugelig komponent i stedet for at gentage koden flere steder.

React bruger et komponentbaseret setup, som gør koden overskuelig og nem at vedligeholde. Hver side er sin egen komponent med eget ansvar, og data hentes fra API'et direkte i den komponent, der har brug for det.

Derudover håndterer React automatisk opdatering af brugergrænsefladen, når data ændrer sig – for eksempel når en bruger tilmelder sig et hold og knappen skifter fra "SIGN UP" til "LEAVE" uden at siden genindlæses.

Jeg har brugt Vite som build-tool, da det giver en hurtig udviklingsoplevelse med øjeblikkelig hot reload.