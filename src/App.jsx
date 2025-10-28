import Body from '../components/Body.jsx';
import LeftNavBar from '../components/LeftNavBar.jsx';

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-3xs bg-zinc-900 text-white">
          <LeftNavBar />
        </div>

        <div className="flex-1">
          <Body />
        </div>
      </div>
    </>
  );
}

export default App;
