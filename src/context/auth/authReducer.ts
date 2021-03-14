const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGIN':
      localStorage.setItem('lifts_token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('lifts_token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default reducer;
