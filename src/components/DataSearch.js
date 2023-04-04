import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import "./DataSearch.css"
import * as XLSX from 'xlsx';
const fs = window.require('fs');

const DataSearch = ({ contract }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataValues, setDataValues] = useState();
  const [searchData, setSearchData] = useState();
  const [mssgModal, setMssgModal] = useState(false)
  const [phoneNumber, setPhoneNUmber] = useState("")
  const [wid, setWid] = useState("")
  const [wText, setWText] = useState("")

  useEffect(async () => {
    await fs.readFile(process.env.REACT_APP_INPUTFILE, 'utf8', async function (err, data) {
      const data_values = await JSON.parse(data)
      setDataValues(data_values.companyData)
      var temp = [];
      data_values.companyData.forEach((key, index) => {
        temp.push([key, index])
      })
      setSearchData(temp)
    })
  }, [])
  const navigate = useNavigate();
  const SearchData = async (e) => {
    if (e.target.value == "") setSearchData(dataValues)
    var searchKey = e.target.value
    var temp = []
    dataValues.forEach((key, index) => {
      for (const subKey in key) {
        if (String(key[subKey]).toLowerCase().includes(searchKey.toLowerCase())) {
          temp.push([key, index])
          break

        }
      }
    });
    setSearchData(temp)
  }
  function ExportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(dataValues);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  }
  const changeWText = (e) => {
    try {
      console.log(dataValues[parseInt(e.target.value) - 1].company_name)

      setWText("Company Name : " + dataValues[parseInt(e.target.value) - 1].company_name + "\n"
        + "Product Name : " + dataValues[parseInt(e.target.value) - 1].product_name + "\n"
        + "Size : " + dataValues[parseInt(e.target.value) - 1].box_size + "\n"
        + "Other Information : " + dataValues[parseInt(e.target.value) - 1].remarks + "\n"
        + "Quantity : " + dataValues[parseInt(e.target.value) - 1].quantity + "\n"
        + "Grand Total : " + dataValues[parseInt(e.target.value) - 1].grand_total + "\n"
        + "Rate Per Piece : " + dataValues[parseInt(e.target.value) - 1].rate_per_piece
      )
    }
    catch (e) {
      setWText("Please re-enter the proper number")
    }
  }


  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        fs.writeFile(process.env.REACT_APP_INPUTFILE, JSON.stringify({ companyData: json }, null, 2), (err) => {
          setIsLoading(true)
          setTimeout(() => {
            setIsLoading(false);
            window.location.reload()
          }, 1500);
          // navigate("/data_search")
        })
        console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  return (
    <div className='pt-8 pb-20 w-screen flex h-screen'>
      {!isLoading ? (
        <div className='w-screen  tracking-wide rounded-3xl mt-20 '>
          <div className='flex'>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative w-8/12 mb-4">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input onChange={(e) => { SearchData(e) }} type="search" id="default-search" class="block text-white text-xl bg-inherit w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
              {/* <button type="submit" class="text-white text-xl absolute right-2.5 bottom-2.5 bg-zinc-500 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  ">Search</button> */}

            </div>
            <div class="pl-4">
              <button class="text-white text-xl  bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 mr-2">
                <label className="cursor-pointer" htmlFor="upload">ImportFromExcel</label>
                <input
                  className='hidden '
                  type="file"
                  name="upload"
                  id="upload"
                  onChange={readUploadFile}
                />
                {/* <span class="relative">ImportToExcel</span> */}
              </button>
              <button onClick={() => ExportToExcel()} class="text-white text-xl  bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 mr-2">

                <span class="relative">ExportToExcel</span>
              </button>
              {/* <a href="https://wa.me/919825328865?text=hello" target="_blank" rel="noopener noreferrer"> */}
              <button onClick={(e) => setMssgModal(true)} class="text-white text-xl  bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 mr-2">

                <span class="relative">Whatsapp</span>
              </button>
            </div>
          </div>
          {/* overflow-x-auto */}
          <div class="relative table_body w-screen  shadow-md sm:rounded-lg">
            <table class="w-screen text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-lg  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Sr no.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Company Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Grand Total
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Rate per piece
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Box Size
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>

                </tr>
              </thead>
              <tbody class="bg-inherit table_body" >
                {!searchData ? "" :
                  searchData.map(function (data, index) {
                    return (



                      <tr onClick={() => { navigate("/rate_calculator", { state: data }) }} class=" border-b border-opacity-5 bg-inherit  hover:bg-zinc-900 cursor-pointer">
                        <td class="text-lg text-white px-6 py-4">
                          {data[0].srno + 1}
                        </td>
                        <td class="text-lg text-white px-6 py-4">
                          {data[0].company_name}
                        </td>
                        <td class="text-lg text-white px-6 py-4">
                          {data[0].product_name}
                        </td>
                        <th scope="row" class="text-lg text-white px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {data[0].grand_total}
                        </th>
                        <td class="text-lg text-white px-6 py-4">
                          {data[0].rate_per_piece}
                        </td>
                        <td class="text-lg text-white px-6 py-4">
                          {data[0].box_size}
                        </td>
                        <td class="text-lg text-white px-6 py-4">
                          {data[0].date}
                        </td>

                      </tr>

                    )
                  })
                }
              </tbody>
            </table>

          </div>

          {/* </a> */}





          <div class={`absolute flex justify-center items-center z-50 ${mssgModal ? "block" : 'hidden'} p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
            <div class="relative  w-full h-full max-w-md md:h-auto">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" onClick={(e) => { setMssgModal(false) }} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 ">
                  <div className='mb-4'>
                    <div>
                      <label for="w_num" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Whatsapp Number</label>
                      <input onChange={(e) => setPhoneNUmber(e.target.value)} val={phoneNumber} type="text" name="w_num" id="w_num" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div id="dropdownHover" class="w-100 z-10 mt-4 mb-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-100 dark:bg-gray-700">
                      <label for="w_num" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sr No</label>
                      <input onChange={(e) => { setWid(e.target.value); changeWText(e) }} val={wid} type="text" name="w_num" id="w_num" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                      <label for="w-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please verify the text</label>
                      <textarea value={wText} class="bg-gray-50 h-44 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >

                      </textarea>
                    </div>
                  </div>
                  <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    <a href={`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(wText)}`} target="_blank" rel="noopener noreferrer">

                      <span class="relative">Whatsapp</span>
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>

      ) : (
        <Loading value='IMPORTING YOUR DATA' />
      )}
    </div>
  )
}

export default DataSearch