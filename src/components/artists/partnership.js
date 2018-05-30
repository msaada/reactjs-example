//@flow

const artistsInPartnership = [
  '-KxQN_PUOfW6imQjEiBl', // Patrick Chelli
  '-KxhHgzfrlX70IJcq9Qh', // Arman (PIERRE FERNANDEZ)
  '-Ky5SoZDuolo93hW4Fgw', // David Zeller
  '-Ky5T5_vdSQwr5wFNRaC', // Daniel Angeli
  '-Ky60Vad9eF8HJgjG-28', // Ginger Brown
  '-Ky86FbGksPkuATZTUKs', // Jean-François Gambino
  '-Ky881l2VpZmCtu2JF-a', // Philippe Pasqua
  '-Ky89SFc3QMElYX7nGTH', // Loic Fenx
  '-Ky89k8bJvm3jFTbgMF2', // Kongo
  '-Ky8A_XCatQzONZNBNdE', // Annouck DUPONT
  '-KyGQShpzdPduBntUuwO', // Atoniucci Volti
  '-KyGQWIv_v_e8NL2JJ4V', // Crash
  '-KyGQutip_YSdhdiGejc', // Thierry Bamas
  '-KyGQpIiepX7oBN6xWgm', // Paul Belmondo
  '-KyGQsOD8hlRbf5D09Cb', // Philippe Pastor
];

type CheckPartnership = (artistId: string) => boolean;
export const checkPartnership: CheckPartnership = artistId => {
  return artistsInPartnership.indexOf(artistId) !== -1;
};
