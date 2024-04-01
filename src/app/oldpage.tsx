"use client";

import { useState } from 'react'

interface formDataType {
  name: string,
  phoneNumber: number,
  email: string,
  hobbies: string
}

export default function Home() {
  const [formOpened, setFormOpened] = useState<boolean>(false);
  const [updateBoxOpened, setUpdateBoxOpened] = useState<boolean>(false);

  const [items, setItems] = useState<formDataType[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>(Array(items.length).fill(false));


  console.log(isChecked);


  const initialFormData = {
    name: "",
    phoneNumber: 1234567890,
    email: "",
    hobbies: ""
  };

  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [initialValues, setInitialValues] = useState<formDataType>(initialFormData);
  const [toUpdateIdx, setToUpdateIdx] = useState<number>(0);



  function handleClick() {
    setFormOpened(!formOpened);
  }

  function handleSave(newItem: formDataType) {
    setItems((items) => [...items, newItem]);
    const newIsChecked = [...isChecked];
    newIsChecked.push(false);
    setIsChecked(newIsChecked);

  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormData(prevValue => ({ ...prevValue, [name]: value }));
  }

  // highlight checkone
  const handleCheckboxChange = (index: number) => {
    setIsChecked((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };


  // delete one

  const deleteElement = (id: number) => {
    setItems((prevItems) => prevItems.filter((item, index) => index != id));
    setIsChecked((prevCheckedItems) => prevCheckedItems.filter((item, index) => index != id));
  }

  // update
  const changeInitialValues = (index: number) => {
    setInitialValues(items[index]);
  }
  function handleUpdateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setInitialValues(prevValue => ({ ...prevValue, [name]: value }));
  }
  const handleUpdateSave = () => {
    setItems((prevState) => {
      const newState = [...prevState];

      newState[toUpdateIdx] =
      {
        name: initialValues.name,
        phoneNumber: initialValues.phoneNumber,
        email: initialValues.email,
        hobbies: initialValues.hobbies
      };
      return newState;
    });
  };



  return (
    <main>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-8'>
          Table
        </h1>


        <table className='border-2 rounded-lg shadow-lg m-5 p-5 max-w-[90%]'>

          <thead >

            <tr>
              <th className='border-2 p-5'>Select</th>
              <th className='border-2 p-5'>ID</th>
              <th className='border-2 p-5'>Name</th>
              <th className='border-2 p-5'>Phone Number</th>
              <th className='border-2 p-5'>Email</th>
              <th className='border-2 p-5'>Hobbies</th>
              <th className='border-2 p-5'>Update/Delete</th>
            </tr>

          </thead>


          <tbody>
            {/*  The peer variant allows you to style an element based on the state of a sibling element */}
            {items.map((item, index) =>
              <tr className={`border-2 rounded-lg m-5 p-5 ${isChecked[index] ? "bg-green-200" : ""}`}
                key={index}>
                <td className='border-2 p-5'>
                  <label htmlFor={`checkbox-${index}`} className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className='form-checkbox h-5 w-5 rounded' />
                  </label>
                </td>
                <td className='border-2 p-5 whitespace-pre-wrap break-words max-w-36'>{index + 1}</td>
                <td className='border-2 p-5 whitespace-pre-wrap break-words  max-w-36'>Name: {item.name}</td>
                <td className='border-2 p-5 whitespace-pre-wrap break-words  max-w-36 '>Phone Number : {item.phoneNumber}</td>
                <td className='border-2 p-5 whitespace-pre-wrap break-words  max-w-96'>Email: {item.email}</td>
                <td className='border-2 p-5 whitespace-pre-wrap break-words  max-w-36'>Hobbies: {item.hobbies}</td>
                <td className='border-2 p-5 whitespace-pre-wrap break-words  max-w-36'>
                  <label htmlFor="update-delete-buttons" className='flex flex-col justify-center items-center '>
                    <button
                      onClick={() => {
                        setUpdateBoxOpened(!updateBoxOpened)
                        changeInitialValues(index)
                        setToUpdateIdx(index)
                      }}
                      className='bg-green-600 text-white py-2 px-6 text-lg rounded-lg m-2'>Update</button>
                    <button
                      onClick={() => deleteElement(index)}
                      className='bg-red-600 text-white py-2 px-6 text-lg rounded-lg'>Delete </button>
                  </label>

                </td>

              </tr>
            )}

          </tbody>
        </table>
        {/* ----------------------------------add item -------------------------------------------*/}
        <div className='flex gap-3'>

          <button onClick={handleClick} className='bg-blue-600 text-white py-2 px-6 text-lg rounded-lg'>Add New Data </button>
          <button onClick={handleClick} className='bg-purple-600 text-white py-2 px-6 text-lg rounded-lg'>Send </button>
        </div>


      </div>

      {formOpened &&
        <div id="modal-bg" className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">


          <div id="modal" className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold">Dialog Box</h2>


            </div>


            <p>Form</p>
            <p>Your name is {formData.name}</p>


            <form action="" className='flex items-center justify-center flex-wrap'>

              <input className='border-1 m-1 p-2 rounded-lg' type="text" onChange={handleChange} name="name" placeholder="Name" />
              <br />
              <input className='border-1 m-1 p-2 rounded-lg' type="number" onChange={handleChange} name="phoneNumber" placeholder="Phone Number" />
              <br />
              <input className='border-1 m-1 p-2 rounded-lg' type="email" onChange={handleChange} name="email" placeholder="Email" />
              <br />
              <input className='border-1 m-1 p-2 rounded-lg' type="text" onChange={handleChange} name="hobbies" placeholder="Hobbies" />
              <br />
              <button onClick={() => {
                handleSave(formData);
                setFormData(initialFormData);
                setFormOpened(false);
              }
              } className='bg-green-600 text-white py-2 px-6 text-lg rounded-lg'>Save</button>

            </form>


          </div>



        </div>

      }

      {updateBoxOpened &&
        <div id="modal-bg" className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">


          <div id="modal" className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold">Dialog Box</h2>


            </div>


            <p>Form</p>

            <form action="" className='flex items-center justify-center flex-wrap'>

              <input className='border-1 m-1 p-2 rounded-lg' type="text" onChange={handleUpdateChange} value={initialValues.name} name="name" placeholder="Name" />
              <br />
              <input className='border-1 m-1 p-2 rounded-lg' type="number" onChange={handleUpdateChange} value={initialValues.phoneNumber} name="phoneNumber" placeholder="Phone Number" />
              <br />
              <input className='border-1 m-1 p-2 rounded-lg' type="email" onChange={handleUpdateChange} value={initialValues.email} name="email" placeholder="Email" />
              <br />
              <input className='border-1 m-1 p-2 rounded-lg' type="text" onChange={handleUpdateChange} value={initialValues.hobbies} name="hobbies" placeholder="Hobbies" />
              <br />
              <button onClick={() => {
                handleUpdateSave();

                setInitialValues(initialFormData);
                setUpdateBoxOpened(false)
              }
              } className='bg-green-600 text-white py-2 px-6 text-lg rounded-lg'>Update</button>

            </form>


          </div>



        </div>
      }

    </main >
  );

}
