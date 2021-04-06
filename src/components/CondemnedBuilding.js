import { useState } from 'react';
import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import CombinationLock from './CombinationLock';
import Heading from './Heading';
import Library from './Library';
import Street from './Street';

const CondemnedBuilding = ({ state }) => {
  const [code, setCode] = useState(state.padlock);
  const options = {
    default: {
      short: 'Leave the building',
      description: 'Unsure of what to do next, you return to the street.',
    },
    ...(code === 817
      ? {
          enter: {
            short: 'Enter the library',
            description:
              '"What\'s the point of unlocking a padlock if you don\'t see what lies behind it?", you think to yourself.',
          },
        }
      : {}),
  };
  const [option, updateOption] = useChoice();
  return (
    <>
      <Heading step={state.step} title="The boarded building" />
      <p className="mt-2 sm:mt-4">
        The building looks even worse from close up. The warnings if anything
        aren't strong enough. You think about removing the boards and going in
        but then you notice a large combination lock that's doing an effective
        job of keeping trespassers out. You fiddle shake the lock and pull on
        the mechanism which, as you suspected it would, confirms that it's
        indeed locked. On the rear side of the lock there's a label with the
        word "Library" on it.
        <span className="block mt-4">
          <CombinationLock
            value={code}
            onChange={(newCode) => setCode(newCode)}
          />
        </span>
      </p>
      {code === 817 ? (
        <p className="mt-6 sm:mt-8">
          As you finish setting the third digit, you think you feel move in the
          lock and your heart skips a beat. You pull at the top of the lock and
          sure enough it opens.
        </p>
      ) : (
        <p className="mt-6 sm:mt-8">
          You pull expectantly on the lock mechanism, but it stays shut.
        </p>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <Street state={{ ...state, step: state.step + 1, padlock: code }} />
        </>
      )}
      {option === 'enter' && (
        <>
          <p className="mt-6 sm:mt-8">
            You slide the lock from the chain, remove the boards behind and push
            on the door. Nothing happens. You push harder, but still nothing
            happens. You push with all of your bodyweight and the door crashes
            open, revealing a dark void in front of you.
          </p>
          <Library
            state={{
              ...state,
              step: state.step + 1,
              gotLibrary: state.step,
            }}
            justEntered={true}
          />
        </>
      )}
    </>
  );
};

export default CondemnedBuilding;
