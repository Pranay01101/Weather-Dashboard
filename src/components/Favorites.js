import React from "react";

const Favorites = ({ favorites, onCitySelect, onRemoveFavorite }) => {
  return (
    <div className="favorites">
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <span onClick={() => onCitySelect(fav.name)}>{fav.name}</span>
            <button onClick={() => onRemoveFavorite(fav.id)}>
              <i className="fas fa-trash"></i> Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
