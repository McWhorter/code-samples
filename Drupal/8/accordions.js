import Drupal from 'Drupal';
import Tablist from 'aria-tablist';
import uid from './uid';

(() => {
  Drupal.behaviors.delightfulAccordions = {
    attach: (context) => {
      const accordions = context.querySelectorAll('.accordions');
      accordions.forEach((accordion) => {
        accordion.querySelectorAll('.accordion__heading').forEach((heading) => {
          const uniqueID = uid(8, 'accordion');
          heading.id = uniqueID;
          heading.nextElementSibling.setAttribute('aria-labelledby', uniqueID);
        });

        if (!accordion.DelightfulAccordions) {
          accordion.DelightfulAccordions = new Tablist(accordion);
        }
      });
    },
  };
})();
