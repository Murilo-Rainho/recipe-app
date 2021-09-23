import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonCategoryDrinks from '../components/ButtonCategoryDrinks';
// import PropTypes from 'prop-types';

function Bebidas() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchApi() {
      const api = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const json = await api.json();
      console.log(json);
      dispatch({ type: 'DRINKS_REQUESTS_SUCCESS', payload: json });
    }
    fetchApi();
  }, [dispatch]);

  const { allDrinks } = useSelector((state) => state.drinks);
  return (
    <div>
      <Header title="Bebidas" mealOrDrink="drink" />
      <main>
        <ButtonCategoryDrinks />
        { (allDrinks.length !== 0) && allDrinks.drinks
          .filter((_, index) => index < Number('12'))
          .map((drink, i) => (<DrinkCard
            id={ i }
            key={ `${i}-${drink.idDrink}` }
            drink={ drink }
          />)) }
      </main>
      <Footer />
    </div>
  );
}

// Bebida.propTypes = {

// }.isRequired;

export default Bebidas;
