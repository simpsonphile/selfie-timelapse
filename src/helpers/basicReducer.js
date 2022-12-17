export const basicReducer = (state, action) => {
  const setRegExp = /set:(?<field>[A-Za-z]+)/;
  if (action.type.match(setRegExp)) {
    const {
      groups: { field },
    } = /set:(?<field>[A-Za-z]+)/.exec(action.type);
    return { ...state, [field]: action.payload };
  }

  return state;
};
