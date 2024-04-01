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
    <div>

      <table className='border-2 border-black rounded-lg shadow-lg m-5 p-5 max-w-[90%]'>

        <thead >

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
            <tr className={`border-2 border-black rounded-lg m-5 p-5 ${isChecked[index] ? "bg-green-200" : ""}`}
              key={index}>
              <td className='border-2 border-black p-5'>
                <label htmlFor={`checkbox-${index}`} className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isChecked[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className='form-checkbox h-5 w-5 rounded' />
                </label>
              </td>
              <td className='border-2 border-black p-5 whitespace-pre-wrap break-words max-w-36'>{index + 1}</td>
              <td className='border-2 border-black p-5 whitespace-pre-wrap break-words  max-w-36'>{item.name}</td>
              <td className='border-2 border-black p-5 whitespace-pre-wrap break-words  max-w-36 '>{item.phoneNumber}</td>
              <td className='border-2 border-black p-5 whitespace-pre-wrap break-words  max-w-96'>{item.email}</td>
              <td className='border-2 border-black p-5 whitespace-pre-wrap break-words  max-w-36'>{item.hobbies}</td>
              <td className='border-2 border-black p-5 whitespace-pre-wrap break-words  max-w-36'>
                <label htmlFor="update-delete-buttons" className='flex flex-col justify-center items-center '>
                  <button
                    onClick={() => {
                      setUpdateBoxOpened(!updateBoxOpened)
                      changeInitialValues(index)
                      setToUpdateIdx(index)
                    }}
                    className='bg-green-600 text-white py-2 px-6 text-lg rounded-lg m-2'>Update</button>
                  <button
                    onClick={() => {
                      deleteElement(index)
                      handleDeleteElement(item.uniqueId)
                    }}
                    className='bg-red-600 text-white py-2 px-6 text-lg rounded-lg'>Delete </button>
                </label>

              </td>

            </tr>
          )}

        </tbody>
      </table>
      <div className='flex gap-3 items-center justify-center'>

        <button onClick={() => handleAdd()} className='bg-blue-600 text-white py-2 px-6 text-lg rounded-lg'>Add New Data </button>
        {hasSelectedRows && (
          <a href={getMailtoLink()} target="_blank" rel="noopener noreferrer"
            className='bg-purple-600 text-white py-2 px-6 text-lg rounded-lg'
          >
            Send
          </a>
        )}

      </div>

    </div>
  )
}

export default Table