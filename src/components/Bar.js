import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const options = {
  default: {
    short: 'Leave',
    description:
      "You don't like the look of the locals, and would rather take your chances outside.",
  },
};

const Bar = ({ state }) => {
  const [option, updateOption] = useChoice();
  return (
    <>
      <Heading step={state.step} title="The bar" />
      <p className="mt-2 sm:mt-4">You enter the bar. [TODO]</p>
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">You leave the bar. [TODO]</p>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
    </>
  );
};
export default Bar;
