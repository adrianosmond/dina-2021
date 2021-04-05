import Street from 'components/Street';

const initialState = {
  step: 0,
};

const App = () => (
  <div className="p-4 sm:p-8 max-w-2xl mx-auto">
    <p>
      After days of walking in the scorching sun, following trails that lead to
      dead ends then tracing back and trying again, you finally see what looks
      like a small settlement ahead of you. Your legs, which had felt so heavy
      after ten solid days of walking, have now found a new lease of life and as
      the small group of buildings grows ever closer you can almost taste water
      on your tongue again. As you reach the buildings your dehydration headache
      gets much worse - spurred on by the possibility of finding water. Water
      needs to be your number one priority now.
    </p>
    <Street state={initialState} />
  </div>
);

export default App;
