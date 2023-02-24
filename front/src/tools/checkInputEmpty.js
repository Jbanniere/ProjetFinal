// fonction pour vérifier si les inputs sont vides

const checkIsEmpty = (inputs) => {
    
  const errors = {}; // pour stocker les erreurs

  Object.keys(inputs).forEach((key) => { // on vérfie chaque valeur grâce à un forEach
    if (inputs[key].trim() === '') { 
      errors[key] = 'Ce champ est requis'; // la clé de l'input vide est stocké dans errors
    }
  });

  return errors;
}

export { checkIsEmpty }