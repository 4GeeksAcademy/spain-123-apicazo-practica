export const initialStore = () => {
  return {
    message: null,
    currentCharacter: {},
    currentPlanet: {},
    currentStarship: {},
    favorites: [],

    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "characters_details":
      return { ...store, currentCharacter: action.payload };

    case "planets_details":
      return { ...store, currentPlanet: action.payload };
    case "starship_details":
      return { ...store, currentStarship: action.payload };

    case "set_hello":
      return { ...store, message: action.payload };

    case "add_task": {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };
    }

    case "add_favorite": {
      const fav = action.payload;
      const favId = fav.uid ?? fav.id;

      const exists = store.favorites.some((f) => (f.uid ?? f.id) === favId);
      if (exists) return store;

      return { ...store, favorites: [...store.favorites, fav] };
    }

    case "remove_favorite": {
      const idToRemove = action.payload;
      return {
        ...store,
        favorites: store.favorites.filter(
          (f) => (f.uid ?? f.id) !== idToRemove,
        ),
      };
    }

    default:
      throw Error("Unknown action.");
  }
}
