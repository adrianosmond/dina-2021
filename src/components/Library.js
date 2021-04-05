import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Street from './Street';

const options = {
  default: {
    short: 'Leave',
    description: 'TODO: Description',
  },
};

const Library = ({ state }) => {
  const [option, updateOption] = useChoice();
  return (
    <>
      <p className="mt-6 sm:mt-8">
        You enter the library. [TODO: DESCRIPTIVE TEXT]
      </p>
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">
            You leave the library. [TODO: DESCRIPTIVE TEXT]
          </p>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
    </>
  );
};
export default Library;
