// @flow

import React, { Component } from "react";
import Home from "./Home";
import Login from "./Login";
import Admin from "./Admin";
import Orders from "./Orders";
import Product from "./Product";
import Artist from "./Artist";
import Artists from "./Artists";
import News from "./News";
import Categories from "./Categories";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
import About from "./About";
import SignIn from "./SignIn";
import BailArt from "./BailArt";
import Success from "./Success";
import CallbackUser from "./CallbackUser";
import CallbackAdmin from "./CallbackAdmin";
import "../css/App.css";

import {
  Paintings,
  Sculpture,
  Engraving,
  Furniture,
  Photography,
  Digigraphy,
  AcrylicAerosol,
  OilOnCanvas,
  LinoEngraving,
  MontagePhoto,
  CardboardPainting,
  OilPainting,
  Photomontage,
  SculpturePainting,
  SculptureResin,
  Serigraphy,
  AcrylicCanvas,
  DigitalTechnique,
  Canvas,
  AngleArtPiece,
  CanvasArtPiece,
  FurnituresAccessories,
  DestroyedWallArtpiece
} from "./PagesWrapper";

import { init as firebaseInit } from "../javascript/firebaseUtils";

import { Router, Route, browserHistory } from "react-router";
import { categories } from "../datas/categories";

class App extends Component {
  constructor(props: any) {
    super(props);
    firebaseInit();
  }

  render() {
    return (
      <div className="App">
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
          <Route path={"/"} component={Home} />
          <Route path={"/admin"} component={Admin} />
          <Route path={"/commandes"} component={Orders} />
          <Route path={"/connexion"} component={Login} />
          <Route path={"/nouveautes"} component={News} />
          <Route path={"/panier"} component={Cart} />
          <Route path={"/apropos"} component={About} />
          <Route path={"/bailart"} component={BailArt} />
          <Route path={"/success"} component={Success} />
          <Route path={"/demander-rappel"} component={CallbackUser} />
          <Route path={"/rappels"} component={CallbackAdmin} />
          <Route path={"/creercompte"} component={SignIn} />
          <Route path={"/product/:productId"} component={Product} />
          <Route path={"/artistes"} component={Artists} />
          <Route path={"/artist/:artistId"} component={Artist} />
          <Route path={"/categories"} component={Categories} />
          <Route path={categories.gravure.url} component={Engraving} />
          <Route path={categories.sculpture.url} component={Sculpture} />
          <Route path={categories.peinture.url} component={Paintings} />
          <Route path={categories.meuble.url} component={Furniture} />
          <Route path={categories.photographie.url} component={Photography} />
          <Route path={categories.digigraphie.url} component={Digigraphy} />
          <Route path={categories.acrylique.url} component={AcrylicAerosol} />
          <Route
            path={categories.huile_sur_toile.url}
            component={OilOnCanvas}
          />
          <Route path={categories.linogravure.url} component={LinoEngraving} />
          <Route
            path={categories.montage_photographique.url}
            component={MontagePhoto}
          />
          <Route
            path={categories.peinture_carton.url}
            component={CardboardPainting}
          />
          <Route
            path={categories.peinture_a_l_huile.url}
            component={OilPainting}
          />
          <Route path={categories.photomontage.url} component={Photomontage} />
          <Route
            path={categories.sculpture_peinture.url}
            component={SculpturePainting}
          />
          <Route
            path={categories.sculpture_resine.url}
            component={SculptureResin}
          />
          <Route path={categories.serigraphie.url} component={Serigraphy} />
          <Route
            path={categories.tableau_acrylique.url}
            component={AcrylicCanvas}
          />
          <Route
            path={categories.technique_numerique.url}
            component={DigitalTechnique}
          />
          <Route path={categories.toile.url} component={Canvas} />
          <Route
            path={categories.oeuvre_dangle.url}
            component={AngleArtPiece}
          />
          <Route
            path={categories.oeuvre_sur_toile.url}
            component={CanvasArtPiece}
          />
          <Route
            path={categories.mobilier_accessoire.url}
            component={FurnituresAccessories}
          />
          <Route
            path={categories.oeuvre_murale_destructuree.url}
            component={DestroyedWallArtpiece}
          />
          <Route path="*" component={NotFound} />
        </Router>
      </div>
    );
  }
}

const NotFound = () => (
  <div>
    <Header /> <h1>This page is not found!</h1> <Footer />
  </div>
);

export default App;
