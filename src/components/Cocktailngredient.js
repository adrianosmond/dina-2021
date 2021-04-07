import Choice from './Choice';

const CocktailIngredient = ({ value, onSelect, ingredients, idx }) => {
  const usedMeths =
    ingredients.indexOf('meths') < idx && ingredients.indexOf('meths') >= 0;

  const usedRemover =
    ingredients.indexOf('remover') < idx && ingredients.indexOf('remover') >= 0;

  const usedSanitizer =
    ingredients.indexOf('sanitizer') < idx &&
    ingredients.indexOf('sanitizer') >= 0;

  const usedIsopropyl =
    ingredients.indexOf('isopropyl') < idx &&
    ingredients.indexOf('isopropyl') >= 0;

  const usedWiper =
    ingredients.indexOf('wiper') < idx && ingredients.indexOf('wiper') >= 0;

  const usedMouthwash =
    ingredients.indexOf('mouthwash') < idx &&
    ingredients.indexOf('mouthwash') >= 0;

  const options = {
    ...(!usedMeths
      ? {
          meths: {
            short: '30ml methylated sprits',
            description: '30ml of methylated sprits',
          },
        }
      : {}),
    ...(!usedIsopropyl
      ? {
          isopropyl: {
            short: '25ml isopropyl alcohol',
            description: '25ml of isopropyl alcohol',
          },
        }
      : {}),
    ...(!usedWiper
      ? {
          wiper: {
            short: '20ml wiper fluid',
            description: '20ml of windscreen wiper fluid',
          },
        }
      : {}),
    ...(!usedMouthwash
      ? {
          mouthwash: {
            short: '15ml mouthwash',
            description: '15ml of mouthwash',
          },
        }
      : {}),
    ...(!usedRemover
      ? {
          remover: {
            short: '2 drops nail polish remover',
            description: '2 drops of nail polish remover',
          },
        }
      : {}),
    ...(!usedSanitizer
      ? {
          sanitizer: {
            short: '4 squirts hand sanitizer',
            description: '4 squirts of hand sanitizer',
          },
        }
      : {}),
    ...(idx > 0
      ? {
          done: {
            short: 'End the recipe',
            description: 'And that\'s it!"',
          },
        }
      : {}),
  };

  return <Choice options={options} value={value} onChange={onSelect} />;
};

export default CocktailIngredient;
