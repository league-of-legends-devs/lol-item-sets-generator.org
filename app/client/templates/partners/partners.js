/*****************************************************************************/
/* Partners: Event Handlers */
/*****************************************************************************/
Template.Partners.events({
});

/*****************************************************************************/
/* Partners: Helpers */
/*****************************************************************************/
Template.Partners.helpers({
  'partners': function() {
    return [
      {
        link: 'https://blazingboost.com/en/services/wow/rank1?tap_a=3667-39d420&tap_s=11169-a1c01c',
        img: 'https://static.tapfiliate.com/55b9f7a5c6245.jpeg?a=3667-39d420&s=11169-a1c01c',
        alt: 'Blazing Boost - Get started !',
        description: 'Get Workd of Warcraft, League of Legends <b>boosts</b>, <b>accounts</b> and more !',
        big_description: 'Easy, efficient, cheap ... and safe !'
      }, {
        link: 'https://www.g2a.com/r/itemsets',
        img: 'img/affil_g2a.jpg',
        alt: 'G2A',
        description: 'Buy <b>very very cheap games</b>. That\'s it. They\'re goddamn cheap. You should go for it. I buy my games here.',
        big_description: '<h3>Use the <code>GOSU</code> code for a discount on every game !</h3>'
      }
    ];
  }
});

/*****************************************************************************/
/* Partners: Lifecycle Hooks */
/*****************************************************************************/
Template.Partners.onCreated(function () {
});

Template.Partners.onRendered(function () {
});

Template.Partners.onDestroyed(function () {
});
