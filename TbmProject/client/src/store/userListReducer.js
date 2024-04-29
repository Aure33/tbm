const initialState = [];

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LIST':
      return action.payload;
    default:
      return state;
  }
};

export const setUserList = (userList) => ({
    type: 'SET_USER_LIST',
    payload: userList,
  });

export default userListReducer;