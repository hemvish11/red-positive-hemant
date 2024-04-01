import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

interface formDataType {
    uniqueId: string,
    name: string,
    phoneNumber: number,
    email: string,
    hobbies: string
}

interface propsDataType {
    initialFormData: formDataType,
    setFormData: Function,
    handleSave: Function,
    setFormOpened: Function,
    handleDataUpdate: Function
}

const Form: React.FC<propsDataType> = ({
    initialFormData,
    setFormData,
    handleSave,
    setFormOpened,
    handleDataUpdate
}) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const [data, setData] = useState<formDataType>(initialFormData);

    function handleChange2(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setData(prevValue => ({ ...prevValue, [name]: value }));
    }

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        const uniqueId = Date.now().toString();
        const updatedData = { ...data, uniqueId }

        setFormOpened(false);
        handleSave(data);
        setFormData(initialFormData);

        try {
            const response = await fetch(`${siteUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if required
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const jsonData = await response.json();
                console.log('Data posted successfully:', jsonData);
                // Handle success response if needed
                const updatedResponse = await fetch(`${siteUrl}`);
                const updatedData = await updatedResponse.json();

                // Call the handleDataUpdate function from the parent component

                handleDataUpdate(updatedData);

                // Optionally, you can also redirect to the root route
                // router.push('/');
            } else {
                throw new Error('Failed to post data');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div id="modal-bg" className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">


            <div id="modal" className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <div className="flex justify-center items-center mb-4">

                    <h2 className="text-lg font-semibold">Form</h2>


                </div>




                <form onSubmit={handleSubmit} className='flex items-center justify-center flex-wrap'>
                    {/* <input type="text" name='uniqueId' hidden/> */}

                    <input required className='border-1 m-1 p-2 rounded-lg' type="text" onChange={handleChange2} value={data.name} name="name" placeholder="Name" />
                    <br />
                    <input required pattern="[1-9]{1}[0-9]{9}" className='border-1 m-1 p-2 rounded-lg' type="tel" onChange={handleChange2} value={data.phoneNumber} name="phoneNumber" placeholder="Phone Number" />
                    <br />
                    <input required className='border-1 m-1 p-2 rounded-lg' type="email" onChange={handleChange2} value={data.email} name="email" placeholder="Email" />
                    <br />
                    <input required className='border-1 m-1 p-2 rounded-lg' type="text" onChange={handleChange2} value={data.hobbies} name="hobbies" placeholder="Hobbies" />
                    <br />
                    {/* we should never use onCLick on the submit button */}
                    <button type="submit" className='bg-green-600 hover:bg-green-700 text-white py-2 px-6 text-lg rounded-lg'>Save</button>

                </form>


            </div>



        </div>
    )
}

export default Form