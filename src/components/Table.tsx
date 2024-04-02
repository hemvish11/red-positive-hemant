import React, { useState, useEffect } from 'react';

interface formDataType {
  uniqueId: string,
  name: string,
  phoneNumber: number,
  email: string,
  hobbies: string
}

interface propsDataType {
  items: formDataType[],
  isChecked: boolean[],
  handleCheckboxChange: Function,
  setUpdateBoxOpened: Function,
  changeInitialValues: Function,
  setToUpdateIdx: Function,
  deleteElement: Function,
  updateBoxOpened: boolean,
  handleDeleteElement: Function,
  handleAdd: Function
}

const Table: React.FC<propsDataType> = ({
  items = [],
  isChecked,
  handleCheckboxChange,
  setUpdateBoxOpened,
  changeInitialValues,
  setToUpdateIdx,
  deleteElement,
  updateBoxOpened,
  handleDeleteElement,
  handleAdd
}) => {

  const hasSelectedRows = isChecked.some(checked => checked);

  const getMailtoLink = () => {
    const selectedRows = items.filter((_, index) => isChecked[index]);

    const plainTextBody = selectedRows
      .map(
        (row, index) =>
          `${index + 1}. Name: ${row.name}, Phone Number: ${row.phoneNumber}, Email: ${row.email}, Hobbies: ${row.hobbies}`
      )
      .join('\n');


    const encodedBody = encodeURIComponent(plainTextBody);
    const mailtoLink = `mailto:info@redpositive.in?subject=Users Info&body=${encodedBody}`;

    return mailtoLink;
  };


  return (
    <div className='flex flex-col justify-center items-center'>
    {/* <div> */}

      <table className='border-2 lg:border-black rounded-lg shadow-lg m-5 p-5 w-[90%] lg:max-w-[90%]'>

        <thead className='bg-slate-300'>

          <tr >
            <th className='border-2 border-black p-5'>Select</th>
            <th className='border-2 border-black p-5'>ID</th>
            <th className='border-2 border-black p-5'>Name</th>
            <th className='border-2 border-black p-5'>Phone Number</th>
            <th className='border-2 border-black p-5'>Email</th>
            <th className='border-2 border-black p-5'>Hobbies</th>
            <th className='border-2 border-black p-5'>Update/Delete</th>
          </tr>

        </thead>


        <tbody >

          {items.map((item, index) =>
            <tr className={`border-2 border-[#777] lg:border-black rounded lg:rounded-lg m-5 lg:p-5 ${isChecked[index] ? "bg-green-200" : ""}`}
              key={index}>
              <td className='lg:border-2 border-[#777] lg:border-black p-5'>
                <label htmlFor={`checkbox-${index}`} className="flex items-center justify-between lg:justify-center">
                  <p className='lg:hidden'>Select :</p>
                  <input
                    type="checkbox"
                    checked={isChecked[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className='form-checkbox h-5 w-5 rounded' />
                </label>
              </td>
              <td className='lg:border-2 lg:border-black p-5 whitespace-pre-wrap break-words lg:max-w-36'>

                <div className='flex '>
                  <p className='lg:hidden w-1/2 lg:w-0'>ID : </p>
                  <p className='w-1/2 lg:w-full lg:text-base'>{index + 1}</p>
                </div>

              </td>
              <td className='lg:border-2 lg:border-black p-5 whitespace-pre-wrap break-words lg:max-w-36'>

                <div className='flex '>
                  <p className='lg:hidden w-1/2 lg:w-0'>Name : </p>
                  <p className='w-1/2 lg:w-full'>{item.name}</p>
                </div>

              </td>
              <td className='lg:border-2 lg:border-black p-5 whitespace-pre-wrap break-words lg:max-w-36'>

                <div className='flex '>
                  <p className='lg:hidden w-1/2 lg:w-0'>Phone No. : </p>
                  <p className='w-1/2 lg:w-full'>{item.phoneNumber}</p>
                </div>

              </td>
              <td className='lg:border-2 lg:border-black p-5 whitespace-pre-wrap break-words lg:max-w-96'>

                <div className='flex '>
                  <p className='lg:hidden w-1/2 lg:w-0'>Email : </p>
                  <p className='w-1/2 lg:w-full'>{item.email}</p>
                </div>

              </td>
              <td className='lg:border-2 border-[#777] lg:border-black p-5 whitespace-pre-wrap break-words lg:max-w-36'>

                <div className='flex '>
                  <p className='lg:hidden w-1/2 lg:w-0'>Hobbies : </p>
                  <p className='w-1/2 lg:w-full'>{item.hobbies}</p>
                </div>

              </td>

              <td className='lg:border-2 border-[#777] lg:border-black p-5 whitespace-pre-wrap break-words  lg:max-w-36'>
                <label htmlFor="update-delete-buttons" className='flex lg:flex-col justify-center items-center gap-2'>
                  <button
                    onClick={() => {
                      setUpdateBoxOpened(!updateBoxOpened)
                      changeInitialValues(index)
                      setToUpdateIdx(index)
                    }}
                    className='bg-green-600 hover:bg-green-700 text-white py-2 px-6 text-lg rounded-lg'>Update</button>
                  <button
                    onClick={() => {
                      deleteElement(index)
                      handleDeleteElement(item.uniqueId)
                    }}
                    className='bg-red-600 hover:bg-red-700 text-white py-2 px-6 text-lg rounded-lg'>Delete</button>
                </label>

              </td>

            </tr>
          )}

        </tbody>
      </table>
      <div className='flex gap-3 items-center justify-center pb-5'>

        <button onClick={() => handleAdd()} className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 text-lg rounded-lg'>Add New Data </button>
        {hasSelectedRows && (
          <a href={getMailtoLink()} target="_blank" rel="noopener noreferrer"
            className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 text-lg rounded-lg'
          >
            Send
          </a>
        )}

      </div>

    </div>
  )
}

export default Table