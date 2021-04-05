import Choice from './Choice';

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const LockDigit = ({ value, onChange, name }) => {
  const options = {
    ...Object.fromEntries(
      digits.map((d) => [
        `set${d}`,
        {
          short: `Set ${name} to ${d}`,
          description: `You set ${name} to ${d}`,
        },
      ]),
    ),
  };

  return (
    <Choice
      options={options}
      value={`set${value}`}
      onChange={(e) => onChange(parseInt(e.target.value.substring(3), 10))}
    />
  );
};

export default LockDigit;
