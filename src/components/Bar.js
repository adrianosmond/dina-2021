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
    ...(!state.askedBarRain
      ? {
          askBarRain: {
            short: 'Tell him the rain is coming',
            description:
              '"Have you heard the news?", you exclaim. "The rain is coming again!"',
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
    ...(state.askedJob && state.gotBook === 'food'
      ? {
          showBook: {
            short: 'Show the barman your book',
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
      {option === 'askBarRain' && (
        <>
          <p className="mt-6 sm:mt-8">
            "Someone came in here and told me that a week ago...", replies the
            bartender. "And yet it's still dry."
          </p>
          <Bar
            state={{
              ...state,
              step: state.step + 1,
              askedBarRain: state.step,
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
      {option === 'showBook' && (
        <>
          <p className="mt-6 sm:mt-8">
            "No. Do you?" the barman replies, seemingly unimpressed.
          </p>
          <p className="mt-6 sm:mt-8">
            "I have a whole book about it here.", you say as you place 'The
            Drunken Botanist' down on the bar. "Soon - any day now - the rain is
            going to start again, and then you'll be able to grow plants and
            make your own spirits. The real kind, not just repurposed old
            medical and cleaning supplies. I'll trade you this book - with all
            its potential - for some water. That's got to be better than a new
            cocktail recipe. What do you say?"
          </p>
          <p className="mt-6 sm:mt-8">
            The barman pauses for a moment and looks you up and down.
            <br />
            "Ok, it's a deal." he says, finally.
          </p>
          <Heading step={state.step + 10} title="The street" />
          <p className="mt-6 sm:mt-8">
            Back out on the street you have an enormous sense of relief. You
            have enough water to last you for the next week. You can get back on
            the trail. You close your eyes, tilt your head back and inhale
            deeply. At the exact moment that you exhale there's a distant
            rumble. Shocked, you open your eyes and look past the bar, the hotel
            and the store in the direction of the horizon.
          </p>
          <p className="mt-6 sm:mt-8">Black clouds.</p>
          <p className="mt-8 sm:mt-16 text-center">~~~ The End ~~~</p>
        </>
      )}
    </>
  );
};
export default Bar;
