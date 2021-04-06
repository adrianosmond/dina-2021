import useChoice from 'hooks/useChoice';
import Choice from './Choice';
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
              'The thought of reading getting lost in fiction rather than being faced with this reality is very tempting. You walk carefully towards the fiction section.',
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
    ...(section
      ? {
          book: {
            short: 'Grab a book',
            description: 'You grab a book. [TODO]',
          },
        }
      : {}),
  };

  if (collapseTimer > 3) {
    return <p className="mt-6 sm:mt-8">It collapses. Game over [TODO]</p>;
  }

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The library" />
          <p className="mt-2 sm:mt-4">
            You step over the threshold. The continuing creaking sounds which
            you're fairly sure weren't happening before you forced the door open
            make you begin to wonder whether it would've been possible to enter
            less violently. You stand inside for a minute or so while your eyes
            adjust to the black. Some signs marking the different sections of
            the library gradually appear from the darkness:
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
        <p className="mt-6 sm:mt-8">Some creaking [TODO]</p>
      )}
      {collapseTimer === 2 && (
        <p className="mt-6 sm:mt-8">More creaking [TODO]</p>
      )}
      {collapseTimer === 3 && (
        <p className="mt-6 sm:mt-8">Heavy creaking [TODO]</p>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          {!state.gotBook ? (
            <p className="mt-6 sm:mt-8">You leave the library. [TODO]</p>
          ) : (
            <>
              <p className="mt-6 sm:mt-8">
                You leave the library and get a chance to look at the book.
                [TODO]
              </p>
              <p className="mt-6 sm:mt-8">
                {state.gotBook === 'art' && <>[TODO] art book</>}
                {state.gotBook === 'fiction' && <>[TODO] fiction book</>}
                {state.gotBook === 'food' && <>[TODO] food and drink book</>}
                {state.gotBook === 'history' && <>[TODO] history book</>}
                {state.gotBook === 'science' && <>[TODO] science book</>}
              </p>
            </>
          )}
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
      {option === 'art' && (
        <>
          <p className="mt-6 sm:mt-8">The art section. [TODO]</p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="art"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'fiction' && (
        <>
          <p className="mt-6 sm:mt-8">The fiction section. [TODO]</p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="fiction"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'food' && (
        <>
          <p className="mt-6 sm:mt-8">The food section. [TODO]</p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="food"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'history' && (
        <>
          <p className="mt-6 sm:mt-8">The history section. [TODO]</p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="history"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'science' && (
        <>
          <p className="mt-6 sm:mt-8">The science section. [TODO]</p>
          <Library
            state={{ ...state, step: state.step + 1 }}
            section="science"
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
      {option === 'book' && (
        <>
          {!state.gotBook && (
            <p className="mt-6 sm:mt-8">You grab the closest book [TODO]</p>
          )}
          {state.gotBook && (
            <p className="mt-6 sm:mt-8">You grab a second book [TODO]</p>
          )}
          <Library
            state={{ ...state, step: state.step + 1, gotBook: section }}
            section={section}
            collapseTimer={collapseTimer + 1}
          />
        </>
      )}
    </>
  );
};
export default Library;
