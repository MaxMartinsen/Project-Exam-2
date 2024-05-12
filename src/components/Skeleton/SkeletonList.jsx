function SkeletonList() {
  return (
    <>
      <section className="max-w-screen-xxl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="hidden md:block md:col-span-3">
            <div className="animate-pulse flex flex-col gap-6">
              <div className="w-full bg-gray-300 h-24 rounded-3xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="animate-pulse flex flex-col gap-6">
              <div className="w-full bg-gray-300 h-24 rounded-3xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SkeletonList;
