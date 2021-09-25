import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

function IngredientList({ eatableDetail, setEnableButton }) {
  const dispatch = useDispatch();
  const ingredients = [];
  const [count, setCount] = useState(0);

  if (eatableDetail && eatableDetail.length !== 0) {
    for (let i = 1; i <= Number('15'); i += 1) {
      if (eatableDetail[0][`strIngredient${i}`]) {
        const ing = `${eatableDetail[0][`strIngredient${i}`]}`;
        const mes = `${eatableDetail[0][`strMeasure${i}`]}`;
        ingredients.push(`${ing} ${(mes === 'null') ? '' : mes}`);
      } else break;
    }
  }

  if (ingredients.length === count) {
    setEnableButton(false);
    // comparador que habilita o botão
  }

  useEffect(() => {
    dispatch({ type: 'CURRENT_INGREDIENTS', payload: ingredients });
  }, [dispatch]);

  return (
    <ul>
      { ingredients.map((ingredient, i) => (
        <li
          key={ `${i}-${ingredient}` }
          data-testid="ingredient-step"
        >
          <input
            type="checkbox"
            id={ i }
            name={ i }
            onChange={ ({ target }) => {
              // logica para saber a quantidade de inputs checkados 
              if (target.checked) {
                setCount((prev) => prev + 1);
              } else {
                setCount((prev) => prev - 1);
              }
            } }
          />
          <label htmlFor={ i }>{ ingredient }</label>
        </li>
      )) }
    </ul>
  );
}

IngredientList.propTypes = {
  eatableDetail: PropTypes.array,
}.isRequired;

export default IngredientList;