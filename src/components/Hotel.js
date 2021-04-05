import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const Hotel = ({ state, justEntered = false }) => {
  const [option, updateOption] = useChoice();
  const options = {
    default: {
      short: 'Leave',
      description: 'You leave. TODO: DESCRIPTION',
    },
    ...(!state.askedRoom && !state.lostHotelKey
      ? {
          askRoom: {
            short: 'Ask for a room',
            description: "'Can I get a room?' You ask.",
          },
        }
      : {}),
    ...(state.gotHotelKey && !state.lostHotelKey
      ? {
          useHotelKey: {
            short: 'Use the hotel key',
            description:
              "'I have the key for room 302. I'm just going up for a sleep', you say with as much confidence as you can muster.",
          },
        }
      : {}),
    ...(!state.gotMetalDetector
      ? {
          enterCloset: {
            short: 'Enter the maintenance closet',
            description: 'You head for the closet. [TODO]',
          },
        }
      : {}),
  };

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The hotel" />
          <p className="mt-2 sm:mt-4">
            You enter the hotel. A maintenance closet is to the left of
            reception. [TODO]
          </p>
        </>
      )}
      {justEntered && !state.lostHotelKey && (
        <p className="mt-6 sm:mt-8">A woman stands behind reception. [TODO]</p>
      )}
      {justEntered && state.lostHotelKey && (
        <p className="mt-6 sm:mt-8">There is nobody in sight. [TODO]</p>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">You leave the hotel. [TODO]</p>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
      {option === 'askRoom' && (
        <>
          <p className="mt-6 sm:mt-8">
            'I don't mean to cause offence', the owner says,
            <br />
            'But do you have any money?' [TODO]
          </p>
          <Hotel
            state={{
              ...state,
              step: state.step + 1,
              askedRoom: state.step,
            }}
          />
        </>
      )}
      {option === 'useHotelKey' && (
        <>
          <p className="mt-6 sm:mt-8">The woman leaves. [TODO]</p>
          <Hotel
            state={{
              ...state,
              step: state.step + 1,
              lostHotelKey: state.step,
            }}
          />
        </>
      )}
      {option === 'enterCloset' && !state.lostHotelKey && (
        <>
          <p className="mt-6 sm:mt-8">The woman stops you. [TODO]</p>
          <Hotel
            state={{
              ...state,
              step: state.step + 1,
            }}
          />
        </>
      )}
      {option === 'enterCloset' && state.lostHotelKey && (
        <>
          <p className="mt-6 sm:mt-8">
            You try the key that you found in the door and it fits. You turn the
            key, open the door and find yourself looking at the janitor's
            closet. There are some old rags, an old boiler suit and a mop that
            looks like it hasn't been used in at least 10 years. What a waste,
            you think to yourself, but just as you're about to something
            glistens off a dark object. You reach for it and find a metal
            detector. You flick the power switch and a couple of LEDs light up.
            This might come in handy, you think to yourself. You grab it, close
            the door behind you and make a swift exit before the receptionist
            returns.
          </p>
          <Street
            state={{
              ...state,
              step: state.step + 2,
              gotMetalDetector: state.step,
            }}
          />
        </>
      )}
    </>
  );
};
export default Hotel;
