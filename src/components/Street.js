import useChoice from 'hooks/useChoice';
import Bar from './Bar';
import Choice from './Choice';
import CondemnedBuilding from './CondemnedBuilding';
import GameOver from './GameOver';
import Heading from './Heading';
import Hotel from './Hotel';
import Rubble from './Rubble';
import Store from './Store';

const MAX_TIME = 55;

const Street = ({ state, firstTime = false }) => {
  const [option, updateOption] = useChoice();
  const options = {
    default: {
      short: 'Do nothing',
      description:
        'Crippled by indecision you stand, frozen, yet baking in the sun.',
    },
    rubble: {
      short: 'Explore the collapsed buildings',
      description:
        'Intrigued by what might lie in the ruins of the old buildings, you head towards the pile of rubble.',
    },
    ...(!state?.gotLibrary
      ? {
          condemned: {
            short: 'Go to the boarded building',
            description:
              "Never one to listen to the warnings of others, you head for the building that's boarded up.",
          },
        }
      : {}),
    ...(state.gotLibrary && !state.lostLibrary
      ? {
          condemned: {
            short: 'Go to the library',
            description:
              'Too curious to see what lies inside, you head for the library.',
          },
        }
      : {}),
    bar: {
      short: 'Go to the bar',
      description:
        'Unable to take the thirst any more you head straight for the bar.',
    },
    hotel: {
      short: 'Go to the hotel',
      description:
        'Hoping that the hotel might be able to give you some shelter from the endless sun, you stagger up to the door and enter.',
    },
    store: {
      short: 'Go to the store',
      description:
        'Thinking that the store might have some water and hoping that you might be able to convince the owner to give you some given how empty your wallet is, you head for the store.',
    },
  };

  return (
    <>
      <Heading step={state.step} title="The street" />
      {state.step >= MAX_TIME ? (
        <>
          <p className="mt-2 sm:mt-4">
            As you arrive back on the street, the heat of the midday sun really
            hits you. Your feel despondent that you haven't managed to find
            water so you sit down. Your legs feel much better with the weight
            off them but now your neck wants the same respite. You lie down and
            close your eyes. The long, endless sleep isn't far away now. You
            finally relax and give in to it.
          </p>
          <GameOver />
        </>
      ) : (
        <>
          {firstTime ? (
            <p className="mt-2 sm:mt-4">
              The settlement is made up of a single street. On your left, most
              of the buildings have collapsed through decades of neglect. One is
              still standing in the middle of the row, but it's boarded up and
              covered in warning notices. On your right there appears to be a
              bar, a hotel and a general store.
            </p>
          ) : (
            <p className="mt-2 sm:mt-4">
              The street remains empty. You'd have to be mad to be out here so
              close to midday.
            </p>
          )}
          <p className="mt-6 sm:mt-8">
            <Choice options={options} value={option} onChange={updateOption} />
          </p>
          {option === 'default' && (
            <>
              <Heading
                step={Math.max(state.step, MAX_TIME)}
                title="The street"
              />
              <p className="mt-2 sm:mt-4">
                After some time the heat of the sun becomes too much for you.
                You give in to its warm embrace and lie down. Closing your eyes
                seems like the best thing to do now. You sleep for the last
                time. One long, never-ending dream.
              </p>
              <GameOver />
            </>
          )}
          {option === 'rubble' && (
            <Rubble
              state={{ ...state, step: state.step + 1 }}
              justEntered={true}
            />
          )}
          {option === 'hotel' && (
            <Hotel
              state={{ ...state, step: state.step + 1 }}
              justEntered={true}
            />
          )}
          {option === 'store' && (
            <Store
              state={{ ...state, step: state.step + 1 }}
              justEntered={true}
            />
          )}
          {option === 'condemned' && (
            <CondemnedBuilding state={{ ...state, step: state.step + 1 }} />
          )}
          {option === 'bar' && (
            <Bar
              state={{ ...state, step: state.step + 1 }}
              justEntered={true}
            />
          )}
        </>
      )}
    </>
  );
};
export default Street;

/*  */
