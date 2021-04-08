import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const Rubble = ({ state, justEntered = false, movement = '' }) => {
  const [option, updateOption] = useChoice();

  const options = {
    default: {
      short: 'Leave the collapsed buildings',
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
  };

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The collapsed buildings" />
          <p className="mt-2 sm:mt-4">
            Gingerly you stop over the remnants of what would've been a wall and
            onto a pile of fist sized rocks mixed with pieces of wood - broken
            furniture you suspect, and fabric. It's not obvious how long ago
            these buildings collapsed but it's clear that it wasn't recently.
            You suppose that whoever used to live in them long gave up on the
            idea of repair.
          </p>
        </>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <Street state={{ ...state, step: state.step + 1 }} />
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
      {option === 'search' && movement === 'LDLLUR' && (
        <>
          <p className="mt-6 sm:mt-8">
            The search isn't the most effective. For every few stones that you
            clear, new ones roll down to fill the hole you created. Seeing that
            digging directly down isn't working, you try a wider but shallower
            search. Just as you're about to give up your hand comes into contact
            with something that sharp and you recoil. Blood drips from your
            finger.
          </p>
          <p className="mt-6 sm:mt-8">
            Carefully you excavate further, closer to the sharp object and
            notice that it's a shard of glass. As you move more rocks out of the
            way you find more glass and then you spot what looks like the corner
            of a piece of paper. After another 30 seconds you've freed it and
            you bring it up to the light for inspection. It's an old photo of a
            woman.
          </p>
          <Rubble
            state={{
              ...state,
              step: state.step + 2,
              gotPhoto: true,
            }}
          />
        </>
      )}
      {option === 'search' && movement !== 'LDLLUR' && (
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
    </>
  );
};
export default Rubble;
