const makeTime = (step) => {
  let min = 11 + step;
  let hour = 11;
  while (min > 60) {
    min -= 60;
    hour += 1;
  }
  return `${hour}:${min.toString().padStart(2, '0')}`;
};

const Heading = ({ step, title }) => (
  <h2 className="text-xl font-bold mt-8 sm:mt-12">
    {makeTime(step)}, {title}
  </h2>
);

export default Heading;
