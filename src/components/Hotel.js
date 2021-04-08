import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const Hotel = ({ state, justEntered = false }) => {
  const [option, updateOption] = useChoice();
  const options = {
    default: {
      short: 'Leave the hotel',
      description:
        'Not wanting to spend any more time even remotely close to the receptionist, you leave the hotel.',
    },
    ...(!state.askedRoom && !state.receptionUnmanned
      ? {
          askRoom: {
            short: 'Ask for a room',
            description: '"Can I get a room?" you ask.',
          },
        }
      : {}),
    ...(!state.askedHotelWater && !state.receptionUnmanned
      ? {
          askHotelWater: {
            short: 'Ask for some water',
            description: '"Do you have any water I can have?" you ask.',
          },
        }
      : {}),
    ...(!state.askedHotelRain
      ? {
          askHotelRain: {
            short: 'Tell her the rain is coming.',
            description:
              '"Have you heard the news?", you exclaim. "The rain is coming again!"',
          },
        }
      : {}),
    ...(state.askedHotelRain && !state.askedLeave
      ? {
          askLeave: {
            short: 'Lie that there are clouds on the horizon.',
            description:
              '"This time it\'s for real! There are even clouds on the horizon this time!", you lie as convincingly as possible.',
          },
        }
      : {}),
    ...(state.gotHotelKey && !state.enteredCloset && !state.receptionUnmanned
      ? {
          enterClosetFailed: {
            short: 'Enter the maintenance closet',
            description:
              "You walk over to the maintenance closet, aware of the receptionist's watching eyes with every step you take.",
          },
        }
      : {}),
    ...(state.gotHotelKey && state.receptionUnmanned
      ? {
          enterCloset: {
            short: 'Enter the maintenance closet',
            description:
              'You seize the moment while the receptionist is gone and head straight for the maintenance closet.',
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
      {justEntered && !state.receptionUnmanned && (
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
        <Street
          state={{
            ...state,
            step: state.step + 1,
          }}
        />
      )}
      {option === 'askRoom' && (
        <>
          <p className="mt-6 sm:mt-8">
            "I don"t mean to cause offence", the receptionist says,
            <br />
            "But do you have any money?"
          </p>
          <p className="mt-6 sm:mt-8">"Not exactly", you reply tentatively.</p>
          <p className="mt-6 sm:mt-8">
            What little effort the receptionist was making to hide her disdain
            evaporates.
            <br />
            "Then I'm afraid the answer is no."
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
      {option === 'askHotelWater' && (
        <>
          <p className="mt-6 sm:mt-8">
            "This is a place of business, not a charity", she replies.
          </p>
          <Hotel
            state={{
              ...state,
              step: state.step + 1,
              askedHotelWater: state.step,
            }}
          />
        </>
      )}
      {option === 'askHotelRain' && (
        <>
          <p className="mt-6 sm:mt-8">
            "I've heard that one before", she replies, unimpressed. "Many times.
            I gave up on the rain a long time ago"
          </p>
          <Hotel
            state={{
              ...state,
              step: state.step + 1,
              askedHotelRain: state.step,
            }}
          />
        </>
      )}
      {option === 'askLeave' && (
        <>
          <p className="mt-6 sm:mt-8">
            "Of course there are. I'm sure Santa is bringing them on his sleigh"
          </p>
          <p className="mt-6 sm:mt-8">
            "I saw them on the horizon just before I came in. In that
            direction.", you point towards the rear of the hotel.
          </p>
          <p className="mt-6 sm:mt-8">
            The receptionist looks at you with distrust.
            <br />
            "All of the hotel rooms are locked and there's nothing valuable out
            here, so don't try anything."
            <br />
            And with that she disappears back through the door where she entered
            from and leaves you alone in the lobby.
          </p>
          <Hotel
            state={{
              ...state,
              step: state.step + 1,
              askedLeave: state.step,
              receptionUnmanned: state.step,
            }}
          />
        </>
      )}
      {option === 'enterClosetFailed' && (
        <>
          <p className="mt-6 sm:mt-8">
            "Where do you think you're going?" she asks.
          </p>
          <p className="mt-6 sm:mt-8">
            Scalded, you return to your original position.
          </p>
          <Hotel
            state={{
              ...state,
              step: state.step + 1,
              enteredCloset: state.step,
            }}
          />
        </>
      )}
      {option === 'enterCloset' && (
        <>
          <p className="mt-6 sm:mt-8">
            You try the key that you found in the door and it fits. You turn the
            key, open the door and find yourself looking at the janitor's
            closet. There are some old rags, an old boiler suit and a mop that
            looks like it hasn't been used in at least 10 years, but there's no
            water to be seen. Just as you're leaving your eye is drawn to a
            shelf with 4 combination locks and an old solar-powered Casio pocket
            calculator.
          </p>
          <p className="mt-6 sm:mt-8">
            Each lock is in its open position and when you turn them over you
            see that each has a label stuck on the back. You make a note of the
            combination and label of each lock:
          </p>
          <p className="mt-6 sm:mt-8 ml-4">
            <span className="font-mono">808</span>: Bob
            <br />
            <span className="font-mono">379</span>: Glen
            <br />
            <span className="font-mono">537</span>: Leslie
            <br />
            <span className="font-mono">345</span>: Sheila
            <br />
          </p>
          <p className="mt-6 sm:mt-8">
            Unsure of how much time you have before the receptionist returns you
            think it best to get out of there as quickly as possible. You return
            to the street.
          </p>
          <Street
            state={{
              ...state,
              step: state.step + 2,
              receptionUnmanned: undefined,
            }}
          />
        </>
      )}
    </>
  );
};
export default Hotel;
