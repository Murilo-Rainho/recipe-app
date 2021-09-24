import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function ShareAndFavoriteButtons({ id, type, area = '', category, name,
  image, alcoholicOrNot = '' }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { favoriteRecipes } = useSelector((state) => state.user);
  const [copiedText, setCopiedText] = useState(false);

  const favoriteOrNot = favoriteRecipes.find(({ id: identify }) => identify === id);
  const dispatchFavorite = () => {
    const obj = { id, type, area, category, name, image, alcoholicOrNot };
    if (!favoriteOrNot) {
      dispatch({ type: 'FAVORITE', payload: obj });
    } else {
      const removeFavorite = favoriteRecipes
        .filter(({ id: identify }) => identify !== id);
      dispatch({ type: 'REMOVE_FAVORITE', payload: removeFavorite });
    }
  };

  return (
    <>
      { (copiedText) && (<h3>Link copiado!</h3>) }
      <button
        onClick={ () => {
          copy(`http://localhost:3000${pathname}`);
          setCopiedText(true);
        } }
        type="button"
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Botão de Compartilhar"
        />
      </button>
      <button
        onClick={ dispatchFavorite }
        type="button"
      >
        <img
          data-testid="favorite-btn"
          src={ (!favoriteOrNot) ? whiteHeartIcon : blackHeartIcon }
          alt="Favorite heart icon"
        />
      </button>
    </>
  );
}

ShareAndFavoriteButtons.propTypes = {
  id: PropTypes.string,
  area: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
}.isRequired;

export default ShareAndFavoriteButtons;
