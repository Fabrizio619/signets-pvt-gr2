import './ListeDossiers.scss';
import Dossier from './Dossier';
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function ListeDossiers({etatUtilisateur}) {
  const [dossiers, setDossiers] = useState([]);
  const [utilisateur] = etatUtilisateur;

  useEffect(
    () => {
      async function chercherDossiers() {
        const tabDossiers = [];
        const reponse = await firestore.collection('utilisateurs').doc(utilisateur.uid).collection('dossiers').get();
        reponse.forEach(
          doss => tabDossiers.push(doss.data())
        );
        setDossiers(tabDossiers);
      }
      chercherDossiers();
    }, []
  );
  

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          dossier =>  <li key={dossier.id}><Dossier nom={dossier.nom} couleur={dossier.couleur} date_modif={dossier.date_modif.toString()} /></li>
        )
      }
    </ul>
  );
}