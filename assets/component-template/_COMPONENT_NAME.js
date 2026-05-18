// COMPONENT_NAME source JavaScript.
//
// Authored in this file with a leading underscore. Laravel Mix compiles it
// to COMPONENT_NAME.js (no underscore). Drupal's SDC system loads the
// compiled file automatically when the component is rendered.
//
// Wrap behaviors in Drupal.behaviors so they re-attach after AJAX updates.

((Drupal, once) => {
  Drupal.behaviors.COMPONENT_NAME = {
    attach(context) {
      once('COMPONENT_NAME', '.component-COMPONENT_NAME', context).forEach((el) => {
        // Your behavior here.
      });
    },
  };
})(Drupal, once);
