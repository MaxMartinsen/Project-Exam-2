function SkeletonItem() {
  return (
    <>
      <section className="pt-24 antialiased">
        <div className="max-w-screen-xxl px-4 mx-auto 2xl:px-0">
          <div className="w-full animate-pulse">
            <div className="w-full h-[500px] rounded-3xl bg-gray-300"></div>
          </div>
          <div className="flex w-full justify-between my-10">
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div>
              <div className="border-2 border-white flex items-center justify-center bg-gray-200 h-10 w-10 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mt-2"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SkeletonItem;
