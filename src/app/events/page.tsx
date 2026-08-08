import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Events | Fanam Group",
});

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Corporate Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join us at our upcoming exhibitions, seminars, and corporate gatherings.</p>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
            <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
            <p className="text-gray-500">Check back later for schedule updates.</p>
        </div>
      </div>
    </main>
  );
}
