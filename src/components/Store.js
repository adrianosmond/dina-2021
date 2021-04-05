import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const Store = ({ state, justEntered }) => {
  const [option, updateOption] = useChoice();
  const options = {
    default: {
      short: 'Leave',
      description: "You don't see anything that you need, so decide to leave.",
    },
  };

  return (
    <>
      {justEntered && (
        <>
          <Heading step={state.step} title="The general store" />
          <p className="mt-2 sm:mt-4">You enter the store. [TODO]</p>
        </>
      )}
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">You leave the store. [TODO]</p>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
    </>
  );
};
export default Store;
