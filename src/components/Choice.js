const Choice = ({ options, value = 'default', onChange }) => (
  <span className="relative inline border-b-2 border-black">
    <span>{options[value].description}</span>
    <select
      className="absolute opacity-0 inset-0 w-full"
      value={value}
      onChange={onChange}
    >
      {Object.entries(options).map(([key, { short: text }]) => (
        <option value={key} key={key}>
          {text}
        </option>
      ))}
    </select>
  </span>
);

export default Choice;
