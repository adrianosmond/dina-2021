import useChoice from 'hooks/useChoice';
import Choice from './Choice';
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
      <p className="mt-6 sm:mt-8">
        You enter the bar. [TODO: DESCRIPTIVE TEXT]
      </p>
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">
            You leave the bar. [TODO: DESCRIPTIVE TEXT]
          </p>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
    </>
  );
};
export default Bar;
