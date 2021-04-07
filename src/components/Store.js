import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const Store = ({ state, justEntered }) => {
  const [option, updateOption] = useChoice();
  const options = {
    default: {
      short: 'Leave the store',
      description:
        "You don't see anything that you need and don't have anything to say to the man, so you decide to leave.",
    },
    ...(!state.askedStoreWater
      ? {
          askStoreWater: {
            short: 'Ask for a some water',
            description: '"Can I get some water?" you ask.',
          },
        }
      : {}),
    ...(!state.askedStoreRain
      ? {
          askStoreRain: {
            short: 'Tell him that the rain is coming',
            description:
              '"Have you heard the news?", you exclaim. "The rain is coming again!"',
          },
        }
      : {}),
    ...(!state.askedRubble
      ? {
          askRubble: {
            short: 'Ask about the collapsed buildings',
            description:
              '"What\'s the story behind the collapsed buildings?" you enquire.',
          },
        }
      : {}),
    ...(state.gotPhoto && !state.gotHotelKey
      ? {
          showPhoto: {
            short: 'Show photo',
            description:
              'You take the photo you found in the rubble out from your pocket and show it to the man.',
          },
        }
      : {}),
  };

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The general store" />
          <p className="mt-2 sm:mt-4">
            You enter the store. An old man sits behind a counter, looking
            longingly out of the window, across the street towards the rubble.
            The store's shelves are mostly empty and what little he does have on
            display looks, much like the man himself, like it has seen better
            days.
          </p>
        </>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <Street state={{ ...state, step: state.step + 1 }} />
      )}
      {option === 'askStoreWater' && (
        <>
          <p className="mt-6 sm:mt-8">
            "The days since I had any water are long gone" replies the old man.
            "Or anything of much use, come to think of it." he adds, forlornly.
            "The hotel and the bar have limited water supplies. They'd be your
            best bet, but we get a lot of people coming here and begging and
            I've not heard of anyone being successful yet."
          </p>
          <Store
            state={{
              ...state,
              step: state.step + 1,
              askedStoreWater: state.step,
            }}
          />
        </>
      )}
      {option === 'askStoreRain' && (
        <>
          <p className="mt-6 sm:mt-8">
            "I hope you're right", he says and then pauses. "But I haven't had
            much luck with hope for a long time."
          </p>
          <Store
            state={{
              ...state,
              step: state.step + 1,
              askedStoreRain: state.step,
            }}
          />
        </>
      )}
      {option === 'showPhoto' && (
        <>
          <p className="mt-6 sm:mt-8">
            "That's Sheila!" he exclaims. "Where did you find that?"
          </p>
          <p className="mt-4">
            "I thought I'd search the rubble of the old houses", you reply.
            "Would you like it?"
          </p>
          <p className="mt-4">
            "That'd be wonderful." He says, and then reaches around in some
            drawers under the counter. "Here," he adds. "take this", and hands
            you a key. "It's for the janitor's closet in the hotel. Years ago
            they used to keep water in there. I can't promise they do any more
            but it's worth a shot."
          </p>
          <Store
            state={{
              ...state,
              step: state.step + 1,
              askedStoreWater: state.step,
              gotHotelKey: state.step,
            }}
          />
        </>
      )}
      {option === 'askRubble' && (
        <>
          <p className="mt-6 sm:mt-8">
            "They belonged to my friends." starts the old man. "Once we found
            this place, and found that there was a small supply of water a few
            of us built houses as a statement of intent. To show the world that
            we weren't going anywhere. We also built a library, and would trade
            water for books with people who were passing through. We thought
            that this would pass - that the rain would come again and after that
            happened people would be glad that the knowledge hadn't been lost. I
            guess someone, somewhere was smiling on our plans because that's the
            only one of the buildings that's still standing. Though I don't
            think it'll be there for much longer."
          </p>

          <p className="mt-6 sm:mt-8">
            "Eventually they all left. The water here started to dry up and none
            of them were as stubborn as I was. I locked up all their houses to
            protect them from scavengers in the hope that they might come back
            some day. They never did. Then without maintenance time turned them
            to rubble. I should've done more to stop it from happening, but now
            all I have is this note that Sheila slipped under my door on the
            night that she left."
          </p>

          <p className="mt-6 sm:mt-8">
            The man reaches under the counter and carefully picks up an
            envelope. He pulls out and unfolded a piece of paper that now looks
            so tattered that you assume that it's been taken out and read
            thousands of times. It reads:
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

          <Store
            state={{
              ...state,
              step: state.step + 3,
              askedRubble: state.step,
            }}
          />
        </>
      )}
    </>
  );
};
export default Store;
