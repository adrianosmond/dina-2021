import Street from './Street';

const Story = () => {
  const state = ['street'];

  return (
    <>
      {state.map((id, idx) => {
        if (id === 'street') {
          return <Street key={idx} />;
        }
        return <></>;
      })}
    </>
  );
};

export default Story;
