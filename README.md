# tamper_maslo

> "Mámo, kde je máslo? suchý se to nedá žrát!"
>
> -Kdokoliv

Toto je skript pro přidání šikovných klávesových zkratek do stránek Rohlík.cz a jejich testovacích URL. Obsahuje tyto klávesové zkratky:

## Důvody

Tyto skripty se hodí při manuálním testování kde uživatel provádí spoustu úkonů stále dokola a dokola a dokola. Pokud si ušetřím dvě klinutí na stránku při odhlašování, není to nic velkého. Pokud ale tohle odhlašování dělám 10x denně, zjednodušení a automatizace je na místě.

Původně jsem chtěl udělat celou vlastní chrome extention pro rohlík, tohle bylo ale o moc rychlejší. Na té extention jsem pracoval již 2 dny a daleko jsem se nepohnul. Tohle jsem měl hotové za odpoledne.

## Instalace

1. nejprve je třeba stáhnout do Chrome prohlížeče [Tampermonkey extention](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en).
2. otevřít Tampermonkey (vpravo nahoře s ostatními extentionami) a kliknout na "create a new script". Otevře se editor
3. Vše z editoru vymazat (CTRL+A, DELETE) a vložit kód skriptu ze souboru [tamper-script.js](https://github.com/jozso39/tamper_maslo/blob/master/tamper-script.js)
4. uložit (CTRL+S)
5. přejít na libovolné testovací prostředí rohlíku (nebo na produkci)
6. kliknout kamkoliv na stránku a stisknout `CTRL+ALT+F2`

Pokud se objeví alert s nápovědou ohledně másla, je vyhráno

## Použití

Jak už je v návodu, všechny použitelné zkratky se objeví na stránce po stisknutí `CTRL+ALT+F2`.

**POZOR! je důležité mít focus na stránce!** Aby zkratky fungovaly, je třeba aby systém měl focus na webové stránce. Stačí kliknout kamkoliv na stránku aby jsi focus získal.

### CTRL+ALT+N - nová registrace

Tato zkratka je univerzálnější než ostatní. Pokud jsem přihlášen, upozorní na to uživatele. Pokud jsem na jiné stránce než na registraci nového uživatele, přesune mě tam. Pokud jsem na stránce registrace, vyplní všechny pole a zaškrtne consent checkbox. Radši jsem vynechal kliknutí na submit button, testoval jsem to na prokukci.

### CTRL+ALT+L - login

Tato zkratka přihlásí uživatele pod účtem `happywhatever@email.cz`

### CTRL+ALT+L - logout

Tato zkratka uživatele odhlásí.

### CTRL+ALT+M - máslo

Tato zkratka dostane uživatele na stránku s máslem.
