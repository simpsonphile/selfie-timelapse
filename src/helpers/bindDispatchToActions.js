const bindDispatchToActions = (actions, dispatch, getState) =>
  Object.fromEntries(
    Object.entries(actions).map(([name, func]) => [
      name,
      func({ dispatch, getState }),
    ])
  );

export default bindDispatchToActions;
