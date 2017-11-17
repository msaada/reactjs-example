// @flow
import React, { Component } from "react";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import Divider from "material-ui/Divider";

class About extends Component {
  styles() {
    return {
      divider: {
        marginBottom: "1em"
      }
    };
  }

  render = () => {
    return (
      <div>
        <Header />

        <div className="body">
          <h1>A propos</h1>
          <Divider style={this.styles().divider} />

          <p>Cher Docteur,</p>
          <p>
            Nous sommes heureux de vous présenter notre nouveau concept store,
            la MEGA Dental ART GALLERY.
          </p>
          <p>
            Nous avons voulu, à travers cette galerie, participer à la diffusion
            et à la promotion d'oeuvres sélectionnées parmi les meilleurs
            artistes contemporains tels que: Richard Orlinski, Jonone, Combas,
            Nebay, Belmondo, Pasqua, Gambino, Patrick Rubinstein, Arman...
          </p>
          <p>
            L'exposition d'oeuvres d'art dans votre cabinet dentaire vous
            permettra, sans aucun douten de valoriser et de donner un supplément
            d'âme à votre espace de travail. Vous pouvez ainsi créer un nouveau
            lien culturel, à la fois avec vos patients et vos collaborateurs.
          </p>
          <p>
            Vous contribuerez à la diffusion de l'art au plus grand nombre tout
            en embelissant votre environnement et en lui donnant une image
            innovante.
          </p>
          <p>
            Un oeuvre d'art a, bien souvent, cette capacité à faire naître des
            émotions et à réduire le stress.
          </p>
          <p>
            L'équipe MEGA Dental se tient à votre disposition pour vous apporter
            les explications et les conseils que vous souhaiteriez. N'hésitez
            pas à nous contacter.
          </p>
          <p>Bien chaleureusement.</p>
          <p>Joël Drai,</p>
          <p>Président.</p>
        </div>

        <Footer />
      </div>
    );
  };
}

export default About;
