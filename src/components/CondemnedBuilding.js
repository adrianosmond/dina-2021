import useChoice from 'hooks/useChoice';
import { useMemo, useState } from 'react';
import Choice from './Choice';
import Library from './Library';
import Street from './Street';

const CondemnedBuilding = ({ state }) => {
  const [code, setCode] = useState(903);
  const options = useMemo(
    () => ({
      default: {
        short: 'Leave',
        description: 'TODO: Description',
      },
      ...(code === '817'
        ? {
            enter: {
              short: 'Enter',
              description:
                "'What's the unlocking a padlock if you don't see what lies behind it?', you think to yourself",
            },
          }
        : {}),
    }),
    [code],
  );
  const [option, updateOption] = useChoice();
  return (
    <>
      <p className="mt-6 sm:mt-8">
        You arrive at the condemned building. [TODO: DESCRIPTIVE TEXT]
        <span className="block mt-4">
          <input
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={3}
            min={0}
            max={999}
          />
        </span>
      </p>
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">
            You go back to the street. [TODO: DESCRIPTIVE TEXT]
          </p>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
      {option === 'enter' && (
        <>
          <p className="mt-6 sm:mt-8">
            You slide the lock from the chain and push on the door. Nothing
            happens. You push harder, but still nothing happens. You push with
            all of your bodyweight and the door crashes open
          </p>
          <Library state={{ ...state, step: state.step + 1 }} />
        </>
      )}
    </>
  );
};

export default CondemnedBuilding;
