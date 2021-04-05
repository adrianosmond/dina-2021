import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const Rubble = ({ state, justEntered = false, movement = '' }) => {
  const [option, updateOption] = useChoice();

  const options = {
    default: {
      short: 'Leave',
      description:
        "When you're so thirsty, it doesn't really make sense to spend a lot of time digging around in rocks. You decide that the best course of action would be to head back to the street.",
    },
    left: {
      short: 'Move left in the rubble',
      description: 'You move left a bit in the rubble.',
    },
    right: {
      short: 'Move right in the rubble',
      description: 'You move right a bit in the rubble.',
    },
    up: {
      short: 'Move up in the rubble',
      description: 'You move up a bit in the rubble.',
    },
    down: {
      short: 'Move down in the rubble',
      description: 'You move down a bit in the rubble.',
    },
    ...(!state.gotHotelKey
      ? {
          search: {
            short: 'Search the rubble',
            description:
              "Thinking there might've been valuable things in the buildings before they collapsed, you get down on your hands and knees and start searching the rubble.",
          },
        }
      : {}),
    ...(state.gotMetalDetector && !state.gotRing
      ? {
          searchWithDetector: {
            short: 'Use the metal detector to search the rubble',
            description: 'You search [TODO]',
          },
        }
      : {}),
  };

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The collapsed buildings" />
          <p className="mt-2 sm:mt-4">
            Gingerly you stop over the remnants of what would've been a wall and
            onto a pile of fist sized rocks mixed with pieces of wood - broken
            furniture you suspect, and fabric. You enter the collapsed
            buildings. It's not clear how long ago these buildings collapsed but
            it's clear that it wasn't recently. You suppose that whoever used to
            live in them long gave up on the idea of repair.
          </p>
        </>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
      {option === 'left' && (
        <Rubble
          state={{ ...state, step: state.step + 1 }}
          movement={`${movement}L`}
        />
      )}
      {option === 'right' && (
        <Rubble
          state={{ ...state, step: state.step + 1 }}
          movement={`${movement}R`}
        />
      )}
      {option === 'up' && (
        <Rubble
          state={{ ...state, step: state.step + 1 }}
          movement={`${movement}U`}
        />
      )}
      {option === 'down' && (
        <Rubble
          state={{ ...state, step: state.step + 1 }}
          movement={`${movement}D`}
        />
      )}
      {option === 'search' && movement === '' && (
        <>
          <p className="mt-6 sm:mt-8">
            The search isn't the most effective. For every few stones that you
            clear, new ones roll down to fill the hole you created. Seeing that
            going directly down isn't working you try a wider but shallower
            search. Just as you're about to give up your hand comes into contact
            with something unusual. It's not plastic but it's not fabric either.
            You pull on it and with a rip a piece of it comes free. It appears
            to be a piece of an old raincoat, back from years ago when it still
            used to rain in these parts.
          </p>
          <p className="mt-6 sm:mt-8">
            Excited by your discovery you clear the rubble around the rest of
            the coat and manage to free it from the rocks that were keeping it
            down. It's badly ripped and wouldn't do much good as clothing any
            more, but just before you discard it you notice something sticking
            out of the pocket - a letter. Carefully you take it out, worried
            that the paper will turn to dust in your hands. It reads as follows:
          </p>
          <p className="mt-6 sm:mt-8 ml-4">
            Lover.
            <br />
            Don't stop.
            <br />
            Look for me.
            <br />
            Leave no stone unturned.
            <br />
            Until you find me.
            <br />
            Remember me.
            <br />
          </p>
          <p className="mt-6 sm:mt-8">
            It's a moving poem. You wonder if they did find each other. Based on
            the fact that the letter was in the rubble you don't think the
            chances look too good.
          </p>
          <Rubble
            state={{
              ...state,
              step: state.step + 2,
            }}
          />
        </>
      )}
      {option === 'search' && movement === 'LDLLUR' && (
        <>
          <p className="mt-6 sm:mt-8">
            You dig down into the rubble with your hands and find a small key.
            [TODO]
          </p>
          <Rubble
            state={{
              ...state,
              step: state.step + 2,
            }}
          />
        </>
      )}
      {option === 'search' && movement !== '' && movement !== 'LDLLUR' && (
        <>
          <p className="mt-6 sm:mt-8">
            You dig down into the rubble with your hands but find nothing.
          </p>
          <Rubble
            state={{
              ...state,
              step: state.step + 2,
            }}
          />
        </>
      )}
      {option === 'searchWithDetector' && (
        <>
          <p className="mt-6 sm:mt-8">You find a golden ring. [TODO]</p>
          <Street
            state={{
              ...state,
              step: state.step + 5,
              gotRing: state.step,
            }}
          />
        </>
      )}
    </>
  );
};
export default Rubble;
