import { Selector } from 'testcafe';

fixture`Display artist`.page`http://localhost:3000`; // specify the start page

const selectArtPiece = () => Selector('#artpiece-0');

//then create a test and place your code there
test('Login to test account', async t => {
  await t
    .setTestSpeed(1)
    .click(Selector('a').withAttribute('href', '/connexion'))
    .click(Selector('#email-field'))
    .pressKey('t e s t @ t e s t . c o m')
    .click(Selector('#password-field'))
    .pressKey('a z e r t y 1 2 3')
    .click(Selector('#login-button'))
    .wait(4000)
    .expect(Selector('#cart-button').innerText)
    .contains('MICKAËL SAADA');
});
