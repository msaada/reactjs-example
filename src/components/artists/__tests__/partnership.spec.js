// @flow
import { checkPartnership } from '../partnership';

describe('checkPartnership', () => {
  it('should return false when an artist is not in partnership with the gallery', () => {
    //given
    const artistId = '';
    //when
    const isInPartnership = checkPartnership(artistId);
    //then
    expect(isInPartnership).toEqual(false);
  });
  it('should return true when an artist is in partnership with the gallery', () => {
    //given
    const artistId = '-KxQN_PUOfW6imQjEiBl'; //Patrick Chelli
    //when
    const isInPartnership = checkPartnership(artistId);
    //then
    expect(isInPartnership).toEqual(true);
  });
});
