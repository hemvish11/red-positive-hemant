"use client";

import Form from '@/components/Form';
import Table from '@/components/Table';
import UpdateBox from '@/components/UpdateBox';
import { FormEvent, useEffect, useState } from 'react';

interface formDataType {
  uniqueId: string,
  name: string,
  phoneNumber: number,
  email: string,
  hobbies: string
}

export default function Home() {
  // -------------------------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------all states initialization (starts)--------------------------------------------------------

  const [formOpened, setFormOpened] = useState<boolean>(false);
  const [updateBoxOpened, setUpdateBoxOpened] = useState<boolean>(false);

  const [items, setItems] = useState<formDataType[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>(Array(items.length).fill(false));


  const initialFormData = {
    uniqueId: "",
    name: "",
    phoneNumber: 1234567890,
    email: "",
    hobbies: ""
  };

  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [initialValues, setInitialValues] = useState<formDataType>(initialFormData);
  const [toUpdateIdx, setToUpdateIdx] = useState<number>(0);

  // -------------------------------------------------------------all states initialization (ends)--------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------------------------




  // ----------------------------------------------------------opening the form(starts)---------------------------------------------------------------------

  function handleAdd() {
    setFormOpened(!formOpened);
  }
  // ----------------------------------------------------------opening the form(ends)---------------------------------------------------------------------



  // -----------------------------------------------------------form filling (starts)-------------------------------------------------------------

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormData(prevValue => ({ ...prevValue, [name]: value }));
  }
  // -----------------------------------------------------------form filling (ends)-------------------------------------------------------------



  // -----------------------------------------------------------form adding into the table (starts)-------------------------------------------------------------

  function handleSave(newItem: formDataType) {
    setItems((items) => [...items, newItem]);

    const newIsChecked = [...isChecked];
    newIsChecked.push(false);
    setIsChecked(newIsChecked);
  }
  // -----------------------------------------------------------form adding into the table (ends)-------------------------------------------------------------




  // --------------------------------------------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------updating the form information(starts)-------------------------------------------------------------

  //-----------showing the selected rows data for editing (starts)----------------

  const changeInitialValues = (index: number) => {
    setInitialValues(items[index]);
  }

  //-----------showing the selected rows data for editing (ends)----------------



  // -----------changing the already saved data (starts)--------------------------

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInitialValues(prevValue => ({ ...prevValue, [name]: value }));
  }
  // -----------changing the already saved data (ends)--------------------------


  // ---------------save update-------------------

  const handleUpdateSave = () => {
    setItems((prevState) => {
      const newState = [...prevState];

      newState[toUpdateIdx] =
      {
        uniqueId: initialValues.uniqueId,
        name: initialValues.name,
        phoneNumber: initialValues.phoneNumber,
        email: initialValues.email,
        hobbies: initialValues.hobbies
      };
      return newState;
    });
  };
  // ---------------save update-------------------

  // -----------------------------------------------------------updating the form information(ends)-------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------------------------------------------------







  //------------------cheching-unchecking rows (starts)----------------------

  const handleCheckboxChange = (index: number) => {
    setIsChecked((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  //------------------cheching-unchecking rows (ends)------------------------



  //------------------------------------deleting row data from table-------------------------------------------
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const deleteElement = (id: number) => {
    setItems((prevItems) => prevItems.filter((item, index) => index != id));
    setIsChecked((prevCheckedItems) => prevCheckedItems.filter((item, index) => index != id));
  }

  const handleDeleteElement = async (uniqueId: string) => {

    try {
      const response = await fetch(`${siteUrl}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueId })
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log('Data posted successfully:', jsonData);
        // Handle success response if needed
        const updatedResponse = await fetch(`${siteUrl}`);
        const updatedData = await updatedResponse.json();

        // Call the handleDataUpdate function from the parent component

        handleDataUpdate(updatedData);


      } else {
        throw new Error('Failed to post data');
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  //------------------------------------deleting row data from table-------------------------------------------




  // --------------------------------------fetching data from REST API----------------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${siteUrl}`);
        const jsonData = await response.json();
        setItems(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDataUpdate = (newData: formDataType[]) => {
    setItems(newData);
  };



  return (
    <main>

      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-8 text-4xl font-bold'>
          Table
        </h1>

        {/*--------------------------------------------------------------------------------------------------------------------------*/}
        {/* --------------------------------------------------table data starts----------------------------------------------------- */}
        {/*--------------------------------------------------------------------------------------------------------------------------*/}


        <Table
          items={items}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          setUpdateBoxOpened={setUpdateBoxOpened}
          changeInitialValues={changeInitialValues}
          setToUpdateIdx={setToUpdateIdx}
          deleteElement={deleteElement}
          updateBoxOpened={updateBoxOpened}
          handleDeleteElement={handleDeleteElement}
          handleAdd={handleAdd}
        />

        {/*--------------------------------------------------------------------------------------------------------------------------*/}
        {/* --------------------------------------------------table data ends----------------------------------------------- */}
        {/*--------------------------------------------------------------------------------------------------------------------------*/}


      </div>





      {/*--------------------------------------------------------------------------------------------------------------------------*/}
      {/* ------------------------------------------form data starts-------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------------------------------------------------*/}


      {formOpened &&
        <Form
          initialFormData={initialFormData}
          setFormData={setFormData}
          handleSave={handleSave}
          setFormOpened={setFormOpened}
          handleDataUpdate={handleDataUpdate}
        />
      }

      {/*--------------------------------------------------------------------------------------------------------------------------*/}
      {/* ------------------------------------------form data  ends-------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------------------------------------------------*/}






      {/*--------------------------------------------------------------------------------------------------------------------------*/}
      {/* ------------------------------------------update box starts-------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------------------------------------------------*/}


      {updateBoxOpened &&
        <UpdateBox
          initialValues={initialValues}
          initialFormData={initialFormData}
          setUpdateBoxOpened={setUpdateBoxOpened}
          handleUpdateChange={handleUpdateChange}
          setInitialValues={setInitialValues}
          handleUpdateSave={handleUpdateSave}
          handleDataUpdate={handleDataUpdate}
        />
      }

      {/*--------------------------------------------------------------------------------------------------------------------------*/}
      {/* ------------------------------------------update box ends-------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------------------------------------------------*/}


    </main >
  );

}
