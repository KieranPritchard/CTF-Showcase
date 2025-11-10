import RecentWriteUp from "./RecentWriteUp";

function Recents() {
    return (
        <div className="min-h-screen w-full flex flex-col px-4 sm:px-8 py-10">
            {/* Header at the top */}
            <h2 className="text-4xl text-center font-bold mb-10">Recent Projects</h2>

            {/* Centered grid */}
            <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-8 w-full max-w-6xl">
                    <div>
                        <RecentWriteUp />
                    </div>
                    <div>
                        <RecentWriteUp />
                    </div>
                    <div>
                        <RecentWriteUp />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recents;
