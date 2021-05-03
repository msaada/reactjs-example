import Divider from '@material-ui/core/Divider';
import React from 'react';
import '../../css/App.css';
import Footer from '../common/Footer';
import Header from '../common/Header';

const styles = {
  divider: {
    marginBottom: '1em',
  },
  CEOletter: {
    maxWidth: '50rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};
export default (props) => {
  return (
    <div>
      <Header />
      <div className="body">
        <div>
          <h1>A propos</h1>
          <Divider style={styles.divider} />
          <div style={styles.CEOletter}>
            <p>Cher Docteur,</p>
            <p>
              Nous sommes heureux de vous présenter notre nouveau concept store,
              la MEGA Dental ART GALLERY.
            </p>
            <p>
              Nous avons voulu, à travers cette galerie, participer à la
              diffusion et à la promotion d'oeuvres sélectionnées parmi les
              meilleurs artistes contemporains tels que: Richard Orlinski,
              Jonone, Combas, Nebay, Belmondo, Pasqua, Gambino, Patrick
              Rubinstein, Arman...
            </p>
            <p>
              L'exposition d'oeuvres d'art dans votre cabinet dentaire vous
              permettra, sans aucun douten de valoriser et de donner un
              supplément d'âme à votre espace de travail. Vous pouvez ainsi
              créer un nouveau lien culturel, à la fois avec vos patients et vos
              collaborateurs.
            </p>
            <p>
              Vous contribuerez à la diffusion de l'art au plus grand nombre
              tout en embelissant votre environnement et en lui donnant une
              image innovante.
            </p>
            <p>
              Un oeuvre d'art a, bien souvent, cette capacité à faire naître des
              émotions et à réduire le stress.
            </p>
            <p>
              L'équipe MEGA Dental se tient à votre disposition pour vous
              apporter les explications et les conseils que vous souhaiteriez.
              N'hésitez pas à nous contacter.
            </p>
            <p>Bien chaleureusement.</p>
            <p>Joël Drai,</p>
            <p>Président.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
