import React from 'react';

const FeeStructure = ({data}) => {
    return (
        <section className='w-full bg-black py-12 px-4 max-sm:px-0'>
            <div className="max-w-5xl mx-auto flex flex-col gap-6 !border  !border-gray-500 ">
                <h2 className="text-3xl text-fee pt-4 font-bold text-white uppercase text-center md:text-2xl sm:text-lg">
                    Fee Structure
                </h2>

                <div className='w-full'>
                    {/* Table Header */}
                    <div className="grid text-fee grid-cols-5 bg-[#a88309] text-white text-lg font-semibold text-center max-md:text-sm max-sm:text-[0.5rem]">
                        <span className="py-3 !border !border-gray-500 max-sm:py-1">Package</span>
                        <span className="py-3 !border !border-gray-500 max-sm:py-1">Male</span>
                        <span className="py-3 !border !border-gray-500 max-sm:py-1">Female</span>
                        <span className="py-3 !border !border-gray-500 max-sm:py-1">Couple</span>
                        <span className="py-3 !border !border-gray-500 max-sm:py-1">Kids</span>
                    </div>

                    {/* Table Rows */}
                    <div className="text-center">
                        {
                            data && data.map((fee, index) => (
                                <div key={index} className="grid grid-cols-5 !border !border-gray-500 text-white text-base max-md:text-sm max-sm:text-xs">
                                    <span className="py-3 !border !border-gray-500 bg-[#1e1e1e] max-sm:py-2">{fee.package}</span>
                                    <span className="py-3 !border !border-gray-500 bg-[#2c2c2c] max-sm:py-2">{`₹${fee?.male}`}</span>
                                    <span className="py-3 !border !border-gray-500 bg-[#1e1e1e] max-sm:py-2">{`₹${fee?.female}`}</span>
                                    <span className="py-3 !border !border-gray-500 bg-[#2c2c2c] max-sm:py-2">{`₹${fee?.couple}`}</span>
                                    <span className="py-3 !border !border-gray-500 bg-[#1e1e1e] max-sm:py-2">{`₹${fee?.kids}`}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeeStructure;
