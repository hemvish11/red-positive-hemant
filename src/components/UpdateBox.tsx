import React, { FormEvent, useState } from 'react'

interface formDataType {
    name: string,
    phoneNumber: number,
    email: string,
    hobbies: string
}

interface propsDataType {
    initialValues: formDataType,
    initialFormData: formDataType,
    setUpdateBoxOpened: Function,
    handleUpdateChange: Function,
    setInitialValues: Function,
    handleUpdateSave: Function,
    handleDataUpdate: Function

}

const UpdateBox: React.FC<propsDataType> = ({
    initialValues,
    initialFormData,
    setUpdateBoxOpened,
    handleUpdateChange,
    setInitialValues,
    handleUpdateSave,
    handleDataUpdate
}) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        handleUpdateSave();
        setInitialValues(initialFormData);
        setUpdateBoxOpened(false)

        try {
            const response = await fetch(`${siteUrl}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if required
                },
                body: JSON.stringify(initialValues),
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


            <div id="modal" className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-1/2">
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-lg font-semibold">Update data</h2>


                </div>

                <form onSubmit={handleSubmit} className='flex items-center justify-center flex-wrap'>

                    <input className='border-1 m-1 p-2 rounded-lg' type="text" onChange={(e) => handleUpdateChange(e)} value={initialValues.name} name="name" placeholder="Name" />
                    <br />
                    <input className='border-1 m-1 p-2 rounded-lg' type="number" onChange={(e) => handleUpdateChange(e)} value={initialValues.phoneNumber} name="phoneNumber" placeholder="Phone Number" />
                    <br />
                    <input className='border-1 m-1 p-2 rounded-lg' type="email" onChange={(e) => handleUpdateChange(e)} value={initialValues.email} name="email" placeholder="Email" />
                    <br />
                    <input className='border-1 m-1 p-2 rounded-lg' type="text" onChange={(e) => handleUpdateChange(e)} value={initialValues.hobbies} name="hobbies" placeholder="Hobbies" />
                    <br />
                    <button

                        type='submit'

                        className='bg-green-600 text-white py-2 px-6 text-lg rounded-lg'>Update</button>

                </form>


            </div>



        </div>
    )
}

export default UpdateBox