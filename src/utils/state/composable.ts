import { USER_STATE } from 'src/enums/emunsUser';

export const state = (state?: USER_STATE) => {
  switch (state) {
    case USER_STATE.VALIDE:
      return 'Valide';
    case USER_STATE.EN_ATTENTE:
      return 'En attente';
    case USER_STATE.BANNIS:
      return 'Bannis';
  }
};
