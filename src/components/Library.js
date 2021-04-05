import useChoice from 'hooks/useChoice';
import Choice from './Choice';
import Heading from './Heading';
import Street from './Street';

const options = {
  default: {
    short: 'Leave',
    description: 'You Leave. TODO: Description',
  },
  book: {
    short: 'Grab a book',
    description: 'You grab a book. TODO: Description',
  },
};

const Library = ({ state }) => {
  const [option, updateOption] = useChoice();
  return (
    <>
      <Heading step={state.step} title="The library" />
      <p className="mt-2 sm:mt-4">
        You enter the library. [TODO]. Something something, about to collapse.
      </p>
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <>
          <p className="mt-6 sm:mt-8">You leave the library. [TODO]</p>
          <Street state={{ ...state, step: state.step + 1 }} />
        </>
      )}
      {option === ' book' && (
        <>
          <p className="mt-6 sm:mt-8">
            You grab the closest book and get out just before the building falls
            down. [TODO]
          </p>
          <Street
            state={{
              ...state,
              step: state.step + 1,
              gotBook: state.step,
            }}
          />
        </>
      )}
    </>
  );
};
export default Library;
