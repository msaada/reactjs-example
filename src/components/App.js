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
  FurnituresAccessories
} from "./PagesWrapper";

import { init as firebaseInit } from "../javascript/firebaseUtils";

import { Router, Route, browserHistory } from "react-router";
import { categories } from "../datas/categories";

class App extends Component {
  constructor(props: any) {
    super(props);
    firebaseInit();
  }

  addBaseUrl = (root: string, url: string) => {
    return root + url;
  };

  render() {
    const root: string = "";
    return (
      <div className="App">
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
          <Route path={this.addBaseUrl(root, "/")} component={Home} />
          <Route path={this.addBaseUrl(root, "/admin")} component={Admin} />
          <Route
            path={this.addBaseUrl(root, "/commandes")}
            component={Orders}
          />
          <Route path={this.addBaseUrl(root, "/connexion")} component={Login} />
          <Route path={this.addBaseUrl(root, "/nouveautes")} component={News} />
          <Route path={this.addBaseUrl(root, "/panier")} component={Cart} />
          <Route path={this.addBaseUrl(root, "/apropos")} component={About} />
          <Route path={this.addBaseUrl(root, "/bailart")} component={BailArt} />
          <Route path={this.addBaseUrl(root, "/success")} component={Success} />
          <Route
            path={this.addBaseUrl(root, "/demander-rappel")}
            component={CallbackUser}
          />
          <Route
            path={this.addBaseUrl(root, "/rappels")}
            component={CallbackAdmin}
          />
          <Route
            path={this.addBaseUrl(root, "/creercompte")}
            component={SignIn}
          />
          <Route
            path={this.addBaseUrl(root, "/product/:productId")}
            component={Product}
          />
          <Route
            path={this.addBaseUrl(root, "/artistes")}
            component={Artists}
          />
          <Route
            path={this.addBaseUrl(root, "/artist/:artistId")}
            component={Artist}
          />
          <Route
            path={this.addBaseUrl(root, "/categories")}
            component={Categories}
          />
          <Route
            path={this.addBaseUrl(root, categories.gravure.url)}
            component={Engraving}
          />
          <Route
            path={this.addBaseUrl(root, categories.sculpture.url)}
            component={Sculpture}
          />
          <Route
            path={this.addBaseUrl(root, categories.peinture.url)}
            component={Paintings}
          />
          <Route
            path={this.addBaseUrl(root, categories.meuble.url)}
            component={Furniture}
          />
          <Route
            path={this.addBaseUrl(root, categories.photographie.url)}
            component={Photography}
          />
          <Route
            path={this.addBaseUrl(root, categories.digigraphie.url)}
            component={Digigraphy}
          />
          <Route
            path={this.addBaseUrl(root, categories.acrylique.url)}
            component={AcrylicAerosol}
          />
          <Route
            path={this.addBaseUrl(root, categories.huile_sur_toile.url)}
            component={OilOnCanvas}
          />
          <Route
            path={this.addBaseUrl(root, categories.linogravure.url)}
            component={LinoEngraving}
          />
          <Route
            path={this.addBaseUrl(root, categories.montage_photographique.url)}
            component={MontagePhoto}
          />
          <Route
            path={this.addBaseUrl(root, categories.peinture_carton.url)}
            component={CardboardPainting}
          />
          <Route
            path={this.addBaseUrl(root, categories.peinture_a_l_huile.url)}
            component={OilPainting}
          />
          <Route
            path={this.addBaseUrl(root, categories.photomontage.url)}
            component={Photomontage}
          />
          <Route
            path={this.addBaseUrl(root, categories.sculpture_peinture.url)}
            component={SculpturePainting}
          />
          <Route
            path={this.addBaseUrl(root, categories.sculpture_resine.url)}
            component={SculptureResin}
          />
          <Route
            path={this.addBaseUrl(root, categories.serigraphie.url)}
            component={Serigraphy}
          />
          <Route
            path={this.addBaseUrl(root, categories.tableau_acrylique.url)}
            component={AcrylicCanvas}
          />
          <Route
            path={this.addBaseUrl(root, categories.technique_numerique.url)}
            component={DigitalTechnique}
          />
          <Route
            path={this.addBaseUrl(root, categories.toile.url)}
            component={Canvas}
          />
          <Route
            path={this.addBaseUrl(root, categories.oeuvre_dangle.url)}
            component={AngleArtPiece}
          />
          <Route
            path={this.addBaseUrl(root, categories.oeuvre_sur_toile.url)}
            component={CanvasArtPiece}
          />
          <Route
            path={this.addBaseUrl(root, categories.mobilier_accessoire.url)}
            component={FurnituresAccessories}
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
