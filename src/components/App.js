// @flow

import React, { Component } from 'react';
import { Route, Router, browserHistory } from 'react-router';
import '../css/App.css';
import { categories } from '../datas/categories';
import { init as firebaseInit } from '../javascript/firebaseUtils';
import {
  AcrylicAerosol,
  AcrylicCanvas,
  AngleArtPiece,
  Canvas,
  CanvasArtPiece,
  CardboardPainting,
  DestroyedWallArtpiece,
  Digigraphy,
  DigitalTechnique,
  Engraving,
  Furniture,
  FurnituresAccessories,
  LinoEngraving,
  MontagePhoto,
  OilOnCanvas,
  OilPainting,
  Paintings,
  Photography,
  Photomontage,
  Sculpture,
  SculpturePainting,
  SculptureResin,
  Serigraphy,
} from './PagesWrapper';
import About from './about/About';
import Admin from './admin/Admin';
import Callbacks from './admin/callbacks/Callbacks';
import Orders from './admin/orders/Orders';
import Artist from './artists/Artist';
import Artists from './artists/Artists';
import BailArt from './bailArt/BailArt';
import CallbackUser from './callbacks/CallbackUser';
import Categories from './categories/Categories';
import Footer from './common/Footer';
import Header from './common/Header';
import Home from './home/Home';
import News from './home/News';
import Login from './login/Login';
import Cart from './orders/Cart';
import Success from './orders/Success';
import Product from './product/Product';
import SignIn from './signIn/SignIn';

type Props = {};
type State = {};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    firebaseInit();
  }

  render() {
    return (
      <div className="App">
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
          <Route path={'/'} component={Home} />
          <Route path={'/admin'} component={Admin} />
          <Route path={'/commandes'} component={Orders} />
          <Route path={'/connexion'} component={Login} />
          <Route path={'/nouveautes'} component={News} />
          <Route path={'/panier'} component={Cart} />
          <Route path={'/apropos'} component={About} />
          <Route path={'/bailart'} component={BailArt} />
          <Route path={'/success'} component={Success} />
          <Route path={'/demander-rappel'} component={CallbackUser} />
          <Route path={'/rappels'} component={Callbacks} />
          <Route path={'/creercompte'} component={SignIn} />
          <Route path={'/product/:productId'} component={Product} />
          <Route path={'/artistes'} component={Artists} />
          <Route path={'/artist/:artistId'} component={Artist} />
          <Route path={'/categories'} component={Categories} />
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
