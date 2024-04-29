const initialState = {
  name: '',
  uid: '',
  photoProfil: '',
  favoris: [],
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.payload;
    case 'LOGOUT_USER':
      return null;
    case 'SET_FAVORIS':
      return {
        ...state,
        favoris: action.payload,
      };
    default:
      return state;
  }
};

export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});

export const setFavoris = (favoris) => ({
  type: 'SET_FAVORIS',
  payload: favoris,
});

export default currentUserReducer;
