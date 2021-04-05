import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const Hotel = ({ state, justEntered = false }) => {
  const [option, updateOption] = useChoice();
  const options = {
    default: {
      short: 'Leave',
      description: 'You leave. [TODO]',
    },
    ...(!state.askedRoom
      ? {
          askRoom: {
            short: 'Ask for a room',
            description: '"Can I get a room?" You ask.',
          },
        }
      : {}),
    ...(!state.gotHotelKey
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
            A bell rings as you open the door. Your first impression of the
            hotel is that it looks like it looks a bit worse for wear, though
            you suppose the hotel could say the same about you. The paint on the
            walls is cracking in the corners and there are darker squares that
            show where paintings used to hang. A strange smell hangs in the air.
            The entrance hall isn't too big. There's a small, empty reception
            desk with a door behind leading to what you presume is the staff
            area. To the left of the desk is a door with a sign saying
            "Maintenance" on it. To the right is a staircase leading up to the
            rooms.
          </p>
        </>
      )}
      {justEntered && (
        <p className="mt-6 sm:mt-8">
          Having heard the bell, a woman comes out of the door behind the
          reception desk. She looks you up and down with what you suspect are
          judgemental eyes.
          <br />
          "Can I help you?", she asks in quite a snobbish tone.
        </p>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
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
            }}
          />
        </>
      )}
    </>
  );
};
export default Hotel;
