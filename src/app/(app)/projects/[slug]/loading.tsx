export default function KanbanLoading() {
  return (
    <div className="animate-pulse h-full flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="flex gap-4 h-full overflow-hidden">
        {[1, 2, 3].map((col) => (
          <div key={col} className="w-80 flex-shrink-0 bg-gray-100/50 rounded-lg p-4 flex flex-col gap-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            {[1, 2].map((card) => (
              <div key={card} className="bg-white p-4 rounded shadow-sm border h-24 flex flex-col justify-between">
                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                 <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                 <div className="flex justify-between mt-auto pt-2">
                   <div className="h-4 bg-gray-200 rounded w-12"></div>
                   <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                 </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
