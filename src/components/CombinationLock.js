import LockDigit from './LockDigit';

const CombinationLock = ({ value, onChange }) => {
  const num3 = value % 10;
  const num2 = ((value - num3) / 10) % 10;
  const num1 = ((value - 10 * num2 - num3) / 100) % 10;

  return (
    <>
      <LockDigit
        value={num1}
        name="the first digit"
        onChange={(newValue) => onChange(100 * newValue + 10 * num2 + num3)}
      />
      <span className="block mt-2">
        <LockDigit
          value={num2}
          name="the second digit"
          onChange={(newValue) => onChange(100 * num1 + 10 * newValue + num3)}
        />
      </span>
      <span className="block mt-2">
        <LockDigit
          value={num3}
          name="the final digit"
          onChange={(newValue) => onChange(100 * num1 + 10 * num2 + newValue)}
        />
      </span>
    </>
  );
};

export default CombinationLock;
