export const school = (school?: number) => {
  switch (school) {
    case 1:
      return 'Université Paul Valéry III Montpellier';
    case 2:
      return 'Universite des sciences Montpellier';

    case 3:
      return 'Université de Medcine Montpellier';

    default:
      return 'Utilisateur non renseigné';
  }
};
