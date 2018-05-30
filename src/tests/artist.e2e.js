// @flow
import { Selector } from 'testcafe';

fixture`Display artist`.page`http://localhost:3000`; // specify the start page

//then create a test and place your code there
test('Display artist', async t => {
  await t
    .wait(6000)
    .click('#artpiece-0')
    .debug()
    .expect(Selector('#canvasTitle').innerText)
    .eql('Kong résine rouge')
    .click('#artpiece-2')
    .debug();

  // Use the assertion to check if the actual header text is equal to the expected one
  // .expect(Selector('#article-header').innerText)
});
