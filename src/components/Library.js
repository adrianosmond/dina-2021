import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import GameOver from './GameOver';
import Heading from './Heading';
import Street from './Street';

const Library = ({
  state,
  justEntered = false,
  section,
  collapseTimer = 0,
}) => {
  const [option, updateOption] = useChoice();

  const options = {
    default: {
      short: 'Get out',
      description: 'Not one to push your luck, you head back to the entrance.',
    },
    ...(section !== 'art'
      ? {
          art: {
            short: 'Go to the art section',
            description:
              "It's been a long time since you've seen beautiful things, so you're drawn to the art section.",
          },
        }
      : {}),
    ...(section !== 'fiction'
      ? {
          fiction: {
            short: 'Go to the fiction section',
            description:
              'The thought of being lost in fiction rather than being faced with this reality is very tempting. You walk carefully towards the fiction section.',
          },
        }
      : {}),
    ...(section !== 'food'
      ? {
          food: {
            short: 'Go to the food and drink section',
            description:
              "You've thought of little else for so long. Would going to the food and drink section be an act of masochism, you wonder. Nevertheless you wander over. For a moment you almost imagine your nostrils filling with the smell of cooked food instead of the old library.",
          },
        }
      : {}),
    ...(section !== 'history'
      ? {
          history: {
            short: 'Go to the history section',
            description:
              '"Those who cannot remember the past are doomed to repeat it.", you think as you arrive in the history section.',
          },
        }
      : {}),
    ...(section !== 'science'
      ? {
          science: {
            short: 'Go to the science section',
            description:
              "Many people you met on the road have told you that science was man's greatest achievement and our only hope of making it rain again. Maybe there would be some clues hidden in this library. You walk over to the science section with a sense of expectation.",
          },
        }
      : {}),
    ...(section !== state.gotBook
      ? {
          book: {
            short: 'Pick up a book',
            description:
              'Uneasy about the how little time you have before the building collapses, you grab the closest book.',
          },
        }
      : {}),
  };

  if (collapseTimer > 3) {
    return (
      <>
        <p className="mt-6 sm:mt-8">
          Suddenly there's an almighty cracking followed by a split second of
          silence and then the loudest sound you've ever heard. The building
          collapses in on itself so suddenly that you don't stand a chance. The
          silver lining is that you get swallowed by the rubble so quickly that
          it's a painless end.
        </p>
        <GameOver />
      </>
    );
  }

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The library" />
          <p className="mt-2 sm:mt-4">
            You step over the threshold. The continuing creaking sounds, which
            you're fairly sure weren't happening before you forced the door
            open, make you begin to wonder whether it would've been possible to
            enter less violently. You stand inside for a minute or so while your
            eyes adjust to the black. Some signs marking the different sections
            of the library gradually appear from the darkness:
          </p>
          <p className="mt-6 sm:mt-8">
            Art
            <br />
            Fiction
            <br />
            Food and Drink
            <br />
            History
            <br />
            Science
          </p>
        </>
      )}
      {collapseTimer === 1 && (
        <p className="mt-6 sm:mt-8">
          Now that you've stopped, you notice occasional cracking sounds coming
          from the rafters. The sound of small cracks forming as wood is being
          put under stress. It hasn't given in to the pressure yet but it won't
          be long.
        </p>
      )}
      {collapseTimer === 2 && (
        <p className="mt-6 sm:mt-8">
          A series of regular low thuds from down below in the foundations join
          the cracks above, which are increasing in frequency. You begin to
          suspect that no book was worth this amount of risk.
        </p>
      )}
      {collapseTimer === 3 && (
        <p className="mt-6 sm:mt-8">
          An almighty whine comes from the back of the library. This can't be
          good, you think to yourself.
        </p>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">
            You step back out on to the street when suddenly there's an almighty
            cracking sound followed by a split second of silence and then the
            loudest sound you've ever heard. The building collapses in on itself
            but your reflexes are just fast enough to dive in the opposite
            direction. A rock strikes you in the back of the head and the dust
            from the collapse covers you from head to toe.
          </p>
          {state.gotBook && (
            <>
              <p className="mt-6 sm:mt-8">
                After lying there for a minute wondering if you're alright, you
                decide the best course of action is to see for yourself. The
                rock will have left you with a nasty bruise, but luckily it
                didn't draw blood. You can move your arms and legs without pain
                too, so all in all you got off lightly. You stand up
                tentatively, dust yourself down and decide to take a look at the
                book you managed to save.
              </p>
              <p className="mt-6 sm:mt-8">
                {state.gotBook === 'art' && (
                  <>
                    "Abstract Art: A Global History" must've been quite a pretty
                    book once. This copy is now quite tattered, but on flicking
                    through the pages you feel moved by the life that people
                    used to have. They didn't realise what a luxury it was to
                    spend time creating.
                  </>
                )}
                {state.gotBook === 'fiction' && (
                  <>
                    You read the blurb of "The Catcher in the Rye", which
                    apparently has alienation as one of its main themes. "That's
                    quite appropriate", you think to yourself.
                  </>
                )}
                {state.gotBook === 'food' && (
                  <>
                    You hold a copy of "The Drunken Botanist" in your hands. It
                    has the subtitle "The plants that create the worlds greatest
                    drinks" and on flicking through the pages it seems like it'd
                    be a decent guide to getting the world boozing again when
                    things get back to normal.
                  </>
                )}
                {state.gotBook === 'history' && (
                  <>
                    "Genghis Khan and the Making of the Modern World" wouldn't
                    necessarily have been your initial choice for the only book
                    to have saved from an entire library, but it's done now.
                    '"Reads like the Iliad... Part travelogue, part epic
                    narrative." - Washington Post' it says on the back.
                    Hopefully that means you'll be able to kill some time with
                    it.
                  </>
                )}
                {state.gotBook === 'science' && (
                  <>
                    Of all the books you could've taken, you happened to pick
                    one in a foreign language. "Une Breve Histoire du Temps du
                    Big Bang au Trous Noirs" may've been interesting or useful
                    in English - you'll never know, because this is
                    unintelligible.
                  </>
                )}
              </p>
            </>
          )}
          <Street
            state={{ ...state, step: state.step + 2, lostLibrary: state.step }}
          />
        </>
      )}
      {option === 'art' && (
        <>
          <p className="mt-6 sm:mt-8">
            The art section is underwhelming. You suppose that it isn't
            surprising that not many people decided to take books about art with
            them when they left their homes.
          </p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="art"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'fiction' && (
        <>
          <p className="mt-6 sm:mt-8">
            The fiction section seems quite well stocked, though the books
            themselves look well loved, to put it politely.
          </p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="fiction"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'food' && (
        <>
          <p className="mt-6 sm:mt-8">
            The food and drink section isn't quite what you expected. Rather
            than lots of pictures of the delicious looking things that people
            used to eat in the past there seem to be a lot more books about the
            technical side of food and drink production.
          </p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="food"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'history' && (
        <>
          <p className="mt-6 sm:mt-8">
            You immediately wish you hadn't thought about that proverb, because
            there's only one book here and it's about Genghis Khan. Either we're
            doomed because we've lost all of our knowledge, or we're doomed
            because Genghis Khan is the only example we have to learn from.
          </p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="history"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'science' && (
        <>
          <p className="mt-6 sm:mt-8">
            As you run your eyes up and down the shelves, the science section
            looks intimidating. There isn't a lot of popular science on offer
            here. It seems to be more on the academic side of things - books
            that people took with them in the hope that they'd be useful when
            the rain starts again.
          </p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="science"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'book' && (
        <Library
          state={{ ...state, step: state.step + 1, gotBook: section }}
          section={section}
          collapseTimer={collapseTimer + 1}
        />
      )}
    </>
  );
};
export default Library;
