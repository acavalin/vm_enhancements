// ==UserScript==
// @name        VerificaSmart enhancements (unipd)
// @namespace   camelsoft
// @description Miglioramenti alla procedura di Verifica smart working
// @include     https://apps.unipd.it/verificasmart/*
// @include     https://apps.unipd.it/richieste3/index/richiesta/*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARVBMVEX///+bABSbABSbABSbABSbABSbABSbABSbABSbABSbABSbABSbABSbABSbABSbABT+/Pz////36uz//v768/TitbvWl594JUBZAAAAD3RSTlMALf3SVOl3rfH+lPvgwffWvIWXAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+UBDhEHMCOeET4AAABcSURBVBjTlY/JDoAgDEShIIuKI4r+/6cqJSxHfYem89KkrRCMJCVGNAFTS8Y6ZLyaNQt0lu9ij0A8xolXnPgpUkpN+GyuO9eVhe1rZbnd1WzqN4Ejmf6tVLSF0j53qQiy0JEdaAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0xNFQxNjowNzo0OCswMTowME/uB4QAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMTRUMTY6MDc6NDgrMDE6MDA+s784AAAAAElFTkSuQmCC
// @version     1.0.0
// @grant       none
// ==/UserScript==

// NB: queste due direttive non servono perche' ha gia' jQuery e sembra funzionare senza problemi
// require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//jQuery.noConflict();

// converte un input tyep=text in textarea
function to_textarea(selector, rows) {
  var val = $(selector).val().trim(),
      el  = $(selector).get(0).outerHTML.replace('<input', '<textarea rows="'+rows+'"')+'</textarea>';
  $(selector).replaceWith(el);
  // scompatta su piu' righe all'inizio
  $(selector).val(val == '' ? "mail, tel, tickets; " : val.trim().replace(/; /g, "\n"));
  // compatta in una sola riga al submit
  $($(selector).get(0).form).submit(function () {
    $(selector).val( $(selector).val().trim().replace(/\n/g, "; ") );
  });
}//to_textarea

(function ($) { $(function () {
//------------------------------------------------------------------------------
if (window.location.pathname.match(/verificasmart.attivita/)) {
  // fai spazio verticale per non scorrere la pagina
  $('div.jumbotron').css('padding-top', 0);
  $('div.form-group.row').css('margin', 0);
  $('[id="attivitaHelp"]:last').hide();
  $('#form-controller > br').hide();
  $('#note').attr('rows', 1);
  
  to_textarea('#obiettivo', 2);   // Risultato da Conseguire
  to_textarea('#attivita' , 6);   // Attivita Svolta
  
  // popola "Risultato da Conseguire"
  if ($('#obiettivo').val() == '')
    $('#obiettivo').val("Sviluppo nuove funzionalità per i progetti IDRA, integrazione con altri sistemi, manutenzione ed ottimizzazione\nGestione ordinaria dei tickets e generazione di reportistica.");
}// if /verificasmart/attivita

if (window.location.pathname.match(/richieste3.index.richiesta/))
  $('[name^="giorni[]"]').prop('checked', true);
//------------------------------------------------------------------------------
});})(jQuery);
