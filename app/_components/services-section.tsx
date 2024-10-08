const ServicesSection = () => {
  const data = [
    { number: 1500, label: "فريق العمل" },
    { number: 2500, label: "الفحوصات" },
    { number: 1200, label: "المشتركين" },
    { number: 5200, label: "المشاريع" },
  ];
  return (
    <div className="flex justify-center items-center bg-[#F1F7FD] p-[2rem] mt-8">
      <div className="grid grid-cols-4 gap-4 w-full max-w-6xl text-center">
        {data.map((item, index) => (
          <div key={index} className="p-4 relative">
            <h2 className="text-[30px] lg:text-[80px] font-bold text-yellow opacity-50">
              {index !== data.length - 1 && (
                <div className="absolute w-[2px] h-full bg-black end-px top-0"></div>
              )}
              {item.number}
            </h2>
            <p className="text-sm  lg:text-2xl font-semibold text-gray-600 absolute inset-0 m-auto h-[30px]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
