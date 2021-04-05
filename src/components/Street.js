import useChoice from 'hooks/useChoice';
import Bar from './Bar';
import Choice from './Choice';
import CondemnedBuilding from './CondemnedBuilding';

const options = {
  default: {
    short: 'Do nothing',
    description: 'Crippled by indecision you stand frozen.',
  },
  bar: {
    short: 'Go to bar',
    description:
      'Unable to take the thirst any more you head straight for the bar.',
  },
  condemned: {
    short: 'Go to condemned building',
    description:
      'Never one to listen listen to the warnings of others, you head for the condemned building.',
  },
};

const Street = ({ state }) => {
  const [option, updateOption] = useChoice();
  return (
    <>
      <p className="mt-6 sm:mt-8">
        The settlement is made up of a single street. On your left, most of the
        buildings have collapsed through decades of neglect. One is still
        standing in the middle of the row, but it's boarded up and has a large
        condemned sign. On your right there appears to be a bar, a hotel and a
        general store.
      </p>
      <p className="mt-6 sm:mt-8">
        <Choice options={options} value={option} onChange={updateOption} />
      </p>
      {option === 'default' && (
        <p className="mt-6 sm:mt-8">
          After some time the heat of the sun takes you in its warm embrace. You
          welcome it and lie down. Closing your eyes seems like the best thing
          to do.
        </p>
      )}
      {option === 'bar' && <Bar state={{ ...state, step: state.step + 1 }} />}
      {option === 'condemned' && (
        <CondemnedBuilding state={{ ...state, step: state.step + 1 }} />
      )}
    </>
  );
};
export default Street;

/*  */
