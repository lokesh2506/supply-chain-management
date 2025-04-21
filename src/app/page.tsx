export const metadata = {
  title: 'Air Works Supply Chain',
  description: 'Streamlining Aviation Supply Chain with Blockchain',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center">
      <div className="relative">
        <svg className="w-64 h-24 animate-fly" viewBox="0 0 100 50">
          <path d="M10 25 L20 20 L30 25 L20 30 Z" fill="white" />
          <path d="M20 25 L40 20 L50 25 L40 30 Z" fill="gray" />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold animate-pulse">Air Works</h1>
        </div>
      </div>
      <p className="text-white mt-4">Streamlining Aviation Supply Chain with Blockchain</p>
    </div>
  );
}
