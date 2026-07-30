export default function ProjectsLoading() {
  return (
    <div className="animate-pulse flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded p-6 h-40 bg-gray-50 flex flex-col justify-between">
            <div>
               <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
               <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
               <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
