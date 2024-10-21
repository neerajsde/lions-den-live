import React, { useEffect, useState } from 'react'
import SmSpinner from '../../loader/SmSpinner';
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import toast from 'react-hot-toast';

const UpdateFeeStructure = ({ data }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState([]);
    const [sucess, setSucess] = useState([]);

    useEffect(() => { 
        if (data && data.feeStructure) {
            const updatedFormData = data.feeStructure.map((feeData) => ({
                id:feeData._id,
                package: feeData.package,
                male: feeData.male,
                female: feeData.female,
                couple: feeData.couple,
                kids: feeData.kids
            }));
            setFormData(updatedFormData);
            // error message error
            const updatedError = data.feeStructure.map((er) => (''));
            setError(updatedError);
            // sucess message error
            const updatedSucess = data.feeStructure.map((er) => (''));
            setSucess(updatedSucess);

            const updatedLoading = data.feeStructure.map((er) => (false));
            setIsLoading(updatedLoading);
        }
    }, [data]);

    const inputHandler = (event, index) => {
        const { name, value } = event.target;
        setFormData((prevState) => {
            const updatedFormData = [...prevState];
            updatedFormData[index] = {
                ...updatedFormData[index],
                [name]: value
            };
            return updatedFormData;
        });
    };

    const upadateFeeStructureHandler = async (index) => {
        try{
            setIsLoading((prevState) => {
                const currState = [...prevState];
                currState[index] = true;
                return currState;
            })

            const formXdata = new FormData();
            formXdata.append("id", formData[index].id);
            formXdata.append("package", formData[index].package);
            formXdata.append("male", formData[index].male);
            formXdata.append("female", formData[index].female);
            formXdata.append("couple", formData[index].couple);
            formXdata.append("kids", formData[index].kids);

            const url = `${baseUrl}/update/branch/feestructure`;
            const response = await fetch(url, {
                method:'PUT',
                body: formXdata
            });
            const data = await response.json();
            if(data.success){
                setSucess((prevState) => {
                    const currState = [...prevState];
                    currState[index] = data.message;
                    return currState;
                });
                setError((prevState) => {
                    const currState = [...prevState];
                    currState[index] = '';
                    return currState;
                });
            }
            else{
                setError((prevState) => {
                    const currState = [...prevState];
                    currState[index] = data.message;
                    return currState;
                });
                setSucess((prevState) => {
                    const currState = [...prevState];
                    currState[index] = '';
                    return currState;
                });
            }
        } catch(err){
            toast.error('something went wrong');
            setError((prevState) => {
                const currState = [...prevState];
                currState[index] = err.message;
                return currState;
            });
        } finally{
            setIsLoading((prevState) => {
                const currState = [...prevState];
                currState[index] = false;
                return currState;
            })
        }
    }

    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='text-green-600 uppercase font-bold text-2xl'>Update Fee Structure</div>
            <div className='w-full flex flex-col gap-4'>
                {data && data.feeStructure.map((item, index) => (
                    <div key={index} className='w-full flex flex-col gap-2 items-center'>
                        <h2 className='w-full text-center text-lg font-bold text-orange-600 border-b border-gray-500'>{item.package}</h2>
                        <div className='w-full flex justify-between gap-2'>
                            <label className='w-full flex flex-col items-center'>
                                <span className='text-base font-semibold text-gray-500'>Male</span>
                                <input
                                    type='text'
                                    placeholder='enter male fee'
                                    name='male'
                                    value={formData[index]?.male || ''}
                                    onChange={(e) => inputHandler(e, index)}
                                    className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                                />
                            </label>

                            <label className='w-full flex flex-col items-center'>
                                <span className='text-base font-semibold text-gray-500'>Female</span>
                                <input
                                    type='text'
                                    placeholder='enter female fee'
                                    name='female'
                                    value={formData[index]?.female || ''}
                                    onChange={(e) => inputHandler(e, index)}
                                    className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                                />
                            </label>

                            <label className='w-full flex flex-col items-center'>
                                <span className='text-base font-semibold text-gray-500'>Couple</span>
                                <input
                                    type='text'
                                    placeholder='enter couple fee'
                                    name='couple'
                                    value={formData[index]?.couple || ''}
                                    onChange={(e) => inputHandler(e, index)}
                                    className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                                />
                            </label>

                            <label className='w-full flex flex-col items-center'>
                                <span className='text-base font-semibold text-gray-500'>Kids</span>
                                <input
                                    type='text'
                                    placeholder='enter kids fee'
                                    name='kids'
                                    value={formData[index]?.kids || ''}
                                    onChange={(e) => inputHandler(e, index)}
                                    className='w-full flex text-lg py-2 px-3 bg-black text-gray-200 font-semibold placeholder:text-gray-600 !border rounded-sm !border-[#333] outline-none focus:!border-yellow-500'
                                />
                            </label>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <div>
                                {
                                    error[index] !== '' && (
                                    <div className='py-1 px-2 !border !border-red-500 text-red-500 bg-transparent text-base font-medium flex items-center gap-2'><MdError className='text-xl text-yellow-600'/>{error[index]}</div>
                                    )
                                }

                                {
                                    sucess[index] !== '' && (
                                    <div className='py-1 px-2 !border !border-green-500 text-green-500 bg-transparent text-base font-medium flex items-center gap-2'><MdVerified className='text-xl text-green-600'/>{sucess[index]}</div>
                                    )
                                }
                            </div>
                            <button onClick={() => upadateFeeStructureHandler(index)} className='px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md flex items-center justify-center gap-2'>{isLoading[index] && (<SmSpinner/>)} Update</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpdateFeeStructure;
