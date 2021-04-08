import { useEffect, useState } from 'react';
import CocktailIngredient from './Cocktailngredient';

const cocktailVolumes = {
  meths: 30,
  isopropyl: 25,
  wiper: 20,
  mouthwash: 15,
  remover: 2,
  sanitizer: 10,
  done: 0,
};

const cocktailNames = {
  meths: ['', 'Junkie'],
  isopropyl: ['Medical', 'Medic'],
  wiper: ['Windy', 'Wind'],
  mouthwash: ['Minty', 'Mind'],
  remover: ['Flirty', 'Flirt'],
  sanitizer: ['Sticky'],
  done: 0,
};

const CocktailMaker = () => {
  const [ingredients, setIngredients] = useState(['meths', 'done']);
  const [cocktailName, setCocktailName] = useState('');
  const [cocktailVolume, setCocktailVolume] = useState(30);

  useEffect(() => {
    setCocktailVolume(
      ingredients.map((i) => cocktailVolumes[i]).reduce((a, b) => a + b),
    );
    setCocktailName(
      ingredients
        .filter((i) => i !== 'done')
        .sort((a, b) => cocktailVolumes[a] - cocktailVolumes[b])
        .map((i, idx) => cocktailNames[i][idx < ingredients.length - 2 ? 0 : 1])
        .join(' '),
    );
  }, [ingredients]);

  const updateIngredients = (val, idx) => {
    setIngredients((state) => {
      const newIngredients = [...state];
      newIngredients[idx] = val.target.value;
      newIngredients.length = idx + 1;

      if (idx === newIngredients.length - 1 && val.target.value !== 'done') {
        newIngredients.push('done');
      }
      return newIngredients;
    });
  };

  return (
    <>
      <p className="mt-6 sm:mt-8">"The recipe is:</p>
      {ingredients.map((ingredient, idx) => (
        <p className="mt-4" key={idx}>
          <CocktailIngredient
            value={ingredient}
            onSelect={(value) => updateIngredients(value, idx)}
            ingredients={ingredients}
            idx={idx}
          />
        </p>
      ))}
      {ingredients.length > 4 && (
        <p className="mt-6 sm:mt-8">
          The barman raises his eyebrows. "That sounds lethal. I'm trying to
          help them forget their miserable existences, not kill them."
        </p>
      )}
      {ingredients.length <= 2 && (
        <p className="mt-6 sm:mt-8">
          The barman looks across the bar in disgust. "That's not a cocktail. A
          cocktail needs multiple ingredients."
        </p>
      )}
      {ingredients.length <= 4 &&
        ingredients.length > 2 &&
        cocktailVolume < 30 && (
          <p className="mt-6 sm:mt-8">
            The barman shakes his head. "That's not big enough to be a
            cocktail."
          </p>
        )}
      {ingredients.length <= 4 &&
        ingredients.length > 2 &&
        cocktailVolume >= 30 && (
          <p className="mt-6 sm:mt-8">
            The barman flicks through the menu on his bar. "Found it!", he
            exclaims. "I call that a '{cocktailName}'. The offer still stands if
            you can come up with something I haven't yet thought of."
          </p>
        )}
    </>
  );
};

export default CocktailMaker;
