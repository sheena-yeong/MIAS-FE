import TopNavBar from './TopNavBar.jsx';

function Greeting() {
  return (
    <>
      <div>
        <TopNavBar />
        <div className="bg-blue-100 h-screen">
          <h3 className="p-5 text-2xl ml-5">Welcome to the Support Portal</h3>

          <div className="bg-white mx-5 p-3 h-screen shadow-3xl/30 rounded-xl">
            <h3 className="p-3 text-xl">What would you like to do today?</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-3">
                <button className="rounded-xl bg-zinc-100 text-zinc-900 font-medium px-5 py-2.5 shadow-sm border border-zinc-300 hover:bg-zinc-200 active:bg-zinc-300 transition duration-150">
                  Create New Asset
                </button>

                <button className="rounded-xl bg-zinc-100 text-zinc-900 font-medium px-5 py-2.5 shadow-sm border border-zinc-300 hover:bg-zinc-200 active:bg-zinc-300 transition duration-150">
                  View All Assets
                </button>

                <button className="rounded-xl bg-zinc-100 text-zinc-900 font-medium px-5 py-2.5 shadow-sm border border-zinc-300 hover:bg-zinc-200 active:bg-zinc-300 transition duration-150">
                  Manage Associate's Assets
                </button>

                <button className="rounded-xl bg-zinc-100 text-zinc-900 font-medium px-5 py-2.5 shadow-sm border border-zinc-300 hover:bg-zinc-200 active:bg-zinc-300 transition duration-150">
                  Manage User's Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Greeting;
