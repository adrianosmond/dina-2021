import Heading from 'components/Heading';
import Street from 'components/Street';

const initialState = {
  step: 0,
  padlock: 903,
};

const App = () => (
  <div className="p-4 sm:p-8 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold">The traveller</h1>
    <Heading step={-10} title="The wilderness" />
    <p className="mt-2 sm:mt-4">
      When you left the outpost 10 days ago you had been full of hope.
      Celebrations had started, admittedly based off rumours, that the
      scientists had finally cracked it and that rain would be coming any day
      now. A better world would surely be out there, and the first to react
      would be the first to get access to the best bits of land. With rain you'd
      be able to grow your own crops and have a peaceful life.
    </p>
    <p className="mt-6 sm:mt-8">
      The optimism that you had had then was now beginning to look like it had
      been naivety all along. Your food and water ran out two days ago and even
      though you switched to survival mode - find water at all costs three days
      ago you haven't seen any sign of another human except for dried up
      footprints.
    </p>
    <p className="mt-6 sm:mt-8">
      After days of walking in the scorching sun, following trails that lead to
      dead ends then tracing back and trying again, you finally see what looks
      like a small settlement ahead of you. Your legs, which had felt so heavy
      after ten solid days of walking, have now found a new lease of life and as
      the small group of buildings grows ever closer you can almost taste water
      on your tongue again. As you reach the buildings your dehydration headache
      gets much worse - spurred on by the possibility of finding water. Water
      needs to be your number one priority now. You don't think you'll survive
      much past midday without it...
    </p>
    <Street state={initialState} firstTime={true} />
  </div>
);

export default App;
