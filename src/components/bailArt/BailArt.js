// @flow
import Divider from 'material-ui/Divider';
import React from 'react';
import { Image } from 'react-bootstrap';
import '../../css/App.css';
import Footer from '../common/Footer';
import Header from '../common/Header';

type Props = {};

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
  descriptionArea: {
    textAlign: 'justify',
    fontSize: '1.5em',
  },
  divider: {
    marginBottom: '1em',
  },
  artistPhotoArea: {
    display: 'flex',
    justifyContent: 'center',
    height: '40em',
  },
  image: {
    height: '100%',
    width: 'auto',
  },
};

export default (props: Props) => {
  return (
    <div>
      <Header />
      <div className="body">
        <div style={styles.artistPhotoArea}>
          <Image
            src={require('../../assets/bailArt.png')}
            style={styles.image}
          />
        </div>
        <Divider style={styles.divider} />
        <br />
        <div>
          <div className="canvasTitle">Fonctionnement</div>
          <Divider style={styles.divider} />
          <div style={styles.descriptionArea}>
            <h3>
              <strong>LOCATION FINANCIÈRE :</strong>
            </h3>
            <h4>LE LEASING APPLIQUÉ AUX ŒUVRES D’ART</h4>
            <br />
            <p>
              Pour les entreprises et les professions libérales, l’achat d’œuvre
              d’art présente l’inconvénient de ne pas être amortissable, à
              l’inverse, la location financière présente les intérêts financiers
              et fiscaux suivants :
            </p>
            <ul>
              <li>
                Fiscalement, les loyers sont déductibles du résultat imposable
                et diminuent ainsi l’IS (Entreprises) ou l’IRPP (Professions
                libérales)
              </li>
              <li>
                La location permet d’étaler le coût de l’achat tout en réalisant
                des économies d’impôt
              </li>
              <li>
                La location n’altère pas la capacité d’emprunt et allège le haut
                de bilan (hors IFRS)
              </li>
              <li>
                Au terme du contrat de location, les œuvres seront cédées à la
                valeur résiduelle
              </li>
            </ul>
            <br />
            <p>
              <strong>Bail Art</strong> propose donc systématiquement ses offres
              en location ou ponctuellement en crédit bail au client, avec un
              accompagnement sur l’ensemble de la démarche : de la réflexion
              jusqu’à l’installation L’utilisation de ce type de financement
              pour l’acquisition d’œuvres d’art entre dans le cadre de la
              décoration et l’aménagement des bureaux au compte 6068 du plan
              comptable général, au même titre que la location de végétaux, de
              mobilier ou l’achat de tels éléments d’aménagement des espaces
              professionnels. En complément de l’article 238 bis AB du Code
              général des impôts, le leasing favorise l’introduction d’œuvres
              d’art dans les espaces professionnels. Il soutient la création
              artistique et encourage les sociétés à diffuser les valeurs de
              créativité et d’ouverture véhiculées par l’art.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
