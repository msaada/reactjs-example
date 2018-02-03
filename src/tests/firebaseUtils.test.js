// @flow

import {
  addArtPieceToFirebase,
  initTestApp
} from "../javascript/firebaseUtils";

import type { ArtPieceType } from "../types/types";

function anArtpiece() {
  return {
    id: "",
    galeryId: "AZERTYUI",
    artistId: "",
    reference: "AZERTYU",
    name: "Test",
    typeOfArtPieces: "",
    description: "AZERTYU",
    buyPriceTaxFree: 12,
    buyPriceTaxIncluded: 13.5,
    sellPriceTaxFree: 12,
    sellPriceTaxIncluded: 250,
    catalogPage: 12,
    dimensions: "12x12x12",
    weight: 100,
    year: "2018",
    quantity: 12,
    featured: false,
    reserved: false,
    imagesLinks: []
  };
}

describe("Artpiece", function() {
  it("should return null after adding artpiece to database", async function() {
    initTestApp();

    // Given
    const artpiece: ArtPieceType = anArtpiece();
    const response = await addArtPieceToFirebase(artpiece);
    expect(response).toEqual(null);
  });
});
