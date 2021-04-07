import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import CocktailMaker from './CocktailMaker';
import Heading from './Heading';
import Street from './Street';

const Bar = ({ state, justEntered = false }) => {
  const [option, updateOption] = useChoice();
  const options = {
    default: {
      short: 'Leave the bar',
      description:
        'You feel yourself going dizzy from the stench, so get out before it gives you a headache.',
    },
    ...(!state.askedBarWater
      ? {
          askBarWater: {
            short: 'Ask for a some water',
            description: '"Can I get some water?" you ask.',
          },
        }
      : {}),
    ...(state.askedBarWater && !state.askedJob
      ? {
          askJob: {
            short: 'Ask for a job',
            description: '"Do you have any vacancies?"',
          },
        }
      : {}),
    ...(state.askedJob && !state.askedTrade
      ? {
          askTrade: {
            short: 'Create a cocktail recipe',
            description:
              '"Ok. I\'ve got a recipe for you". You say with what you hope sounds like confidence.',
          },
        }
      : {}),
    ...(state.askedJob && !state.askedDistil && state.gotBook === 'food'
      ? {
          askDistil: {
            short: 'Create a new type of alcohol',
            description:
              '"Do you know how they used to make alcohol?" you ask tentatively.',
          },
        }
      : {}),
  };

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The bar" />
          <p className="mt-2 sm:mt-4">
            As you enter the bar the strong and unmistakable smell of alcohol
            hits you. There are a few tables with stools arranged around them,
            all empty, and a bar on the far side of the room with a solitary
            barman sitting behind it. Behind the bar on shelves, where in times
            long past a every spirit imaginable would've been, are a wide array
            of bottles with industrial grade alcohol. Methylated sprits,
            alcoholic hand gels and even tiny bottles of nail polish removers
            sit together, waiting to give the livers of future clients a hard
            time.
          </p>
        </>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <Street
          state={{ ...state, step: state.step + 1, askedTrade: undefined }}
        />
      )}
      {option === 'askBarWater' && (
        <>
          <p className="mt-6 sm:mt-8">
            "Water is for employees and customers only." He recites in an almost
            robotic tone that tells you that you aren't the first person to come
            begging. "Do you have any money?"
          </p>
          <p className="mt-6 sm:mt-8">
            "Not exactly at this precise moment..." you say with as much charm
            as you can muster.
          </p>
          <p className="mt-6 sm:mt-8">
            "Come back when you do and buy a cocktail and I'd be happy to give
            you some water to go with it."
          </p>
          <Bar
            state={{
              ...state,
              step: state.step + 1,
              askedBarWater: state.step,
            }}
          />
        </>
      )}
      {option === 'askJob' && (
        <>
          <p className="mt-6 sm:mt-8">
            "As you can see", replies the bartender. "I'm not exactly run off my
            feet as it is."
          </p>
          <p className="mt-6 sm:mt-8">
            "Isn't there anything I can do?", you beg.
          </p>
          <p className="mt-6 sm:mt-8">
            "Look I tell you what.", he says. "If you can come up with a
            cocktail recipe that I don't already have on my menu and that I'd
            like to add to my menu I'll give you some water.".
          </p>
          <Bar
            state={{
              ...state,
              step: state.step + 1,
              askedJob: state.step,
            }}
          />
        </>
      )}
      {option === 'askTrade' && (
        <>
          <p className="mt-6 sm:mt-8">
            "Tell me more." he replies sceptically.
          </p>
          <CocktailMaker />
          <Bar
            state={{
              ...state,
              step: state.step + 1,
              askedTrade: state.step,
            }}
          />
        </>
      )}
      {option === 'askDistil' && (
        <>
          <p className="mt-6 sm:mt-8">
            "No but I'm sure it used a lot of water." the barman replies
            dismissively.
          </p>
          <p className="mt-6 sm:mt-8">
            "Sure," you persist, ignoring his tone "But they used to use plants
            too to add to the flavours. They didn't even have to be plants that
            necessarily tasted good on their own either, it was anything to take
            the edge off the taste of the alcohol. Have you considered adding
            new flavours to improve your cocktails?"
          </p>
          <p className="mt-6 sm:mt-8">
            "I don't see a lot of living stuff around here, do you?"
          </p>
          <p className="mt-6 sm:mt-8">
            "You're missing the point. Take gin, for example. They used bark
            from trees in that amongst other things. I don't see why you
            couldn't try with tumbleweed"
          </p>
        </>
      )}
    </>
  );
};
export default Bar;
