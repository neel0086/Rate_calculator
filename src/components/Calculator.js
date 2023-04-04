import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import Loading from './Loading';
import DropArrow from '../assets/droparrow.png'
import JsonFile from "../components/Navbar"
const fs = window.require('fs');
const path = window.require('path');

const Calculator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [size_l, setSize_l] = useState(0);
    const [size_b, setSize_b] = useState(0);
    const [kg, setKg] = useState(0);
    const [gsm, setGsm] = useState(0);
    const [sheet_in_gross, setSheet_in_gross] = useState(0);
    const [textConfirmation, setTextConfirmation] = useState(1555000);
    const [rate_kg, setRate_kg] = useState(0);
    const [gross_rate, setGross_rate] = useState(0);
    const [gross, setGross] = useState(0);
    const [rate_per_sheet, setRate_per_sheet] = useState(0);

    const [quantity, setQuantity] = useState(0)

    const [qty, setQty] = useState(0);
    const [ups, setUps] = useState(0);
    const [board, setBoard] = useState(0);
    const [rate, setRate] = useState(0);

    const [qty1, setQty1] = useState(0);
    const [ups1, setUps1] = useState(0);
    const [board1, setBoard1] = useState(0);
    const [rate1, setRate1] = useState(0);

    const [qty2, setQty2] = useState(0);
    const [ups2, setUps2] = useState(0);
    const [board2, setBoard2] = useState(0);
    const [rate2, setRate2] = useState(0);

    const [board_amt, setBoard_amt] = useState(0);
    const [printing, setPrinting] = useState(0);
    const [total1, setTotal1] = useState(0);
    const [profit, setProfit] = useState(0);
    const [total2, setTotal2] = useState(0);
    const [varnish, setVarnish] = useState(0);
    const [ink, setInk] = useState(0);
    const [pasting, setPasting] = useState(0);
    const [punching, setPunching] = useState(0);
    const [plate, setPlate] = useState(0);
    const [binding, setBinding] = useState(0);
    const [grand_total, setGrand_total] = useState(0);
    const [rate_per_piece, setRate_per_piece] = useState(0);
    const [company_name, setCompany_name] = useState("")
    const [product_name, setProduct_name] = useState("")
    const [remarks, setRemarks] = useState("")
    const [box_size, setBox_size] = useState("")
    const [saveDate, setSaveDate] = useState("")
    const [dataValues, setDataValues] = useState(0)

    const [lamDrop, setLamDrop] = useState(false)
    const [lamSize1, setLamSize1] = useState(0)
    const [lamSize2, setLamSize2] = useState(0)
    const [lamNum, setLamNum] = useState(0)
    const [lamQty, setLamQty] = useState(0)

    const [pDrop, setPDrop] = useState(false)
    const [pNum1, setPNum1] = useState(0)
    const [pNum2, setPNum2] = useState(0)
    const [pNum3, setPNum3] = useState(0)

    const [pasteDrop, setPasteDrop] = useState(false)
    const [pasteNum1, setPasteNum1] = useState(0)
    const [pasteNum2, setPasteNum2] = useState(0)

    const [bindDrop, setBindDrop] = useState(false)
    const [bindNum1, setBindNum1] = useState(0)
    const [bindNum2, setBindNum2] = useState(0)

    const [punchDrop, setPunchDrop] = useState(false)
    const [punchNum1, setPunchNum1] = useState(0)
    const [punchNum2, setPunchNum2] = useState(0)

    const [companyDrop, setCompanyDrop] = useState(false)
    const [company_suggestion, setCompany_suggestion] = useState([])
    const [inpIndex, setInpIndex] = useState(-1)

    const [multiColor, setMultiColor] = useState(false)


    const navigate = useNavigate();

    const changeValues = async (val, key) => {

        var x = ((("size_l" == key ? val : size_l) * ("size_b" == key ? val : size_b) * ("gsm" == key ? val : gsm) * ("sheet_in_gross" == key ? val : sheet_in_gross)) / 1555000)
        setKg(x.toFixed(2))

        var x1 = (x * ("rate_kg" == key ? val : rate_kg))
        setGross_rate(x1.toFixed(4))

        if (key == "sheet_in_gross") {
            setGross(val)
        }

        var x2 = (x1 / ("gross" == key ? val : gross))
        setRate_per_sheet(x2.toFixed(4))

        var x3 = (("qty" == key ? val : qty) / ("ups" == key ? val : ups))
        x3 = ("ups" == key ? val : ups) != 0 ? x3 : 0
        setBoard(x3)

        var x4 = (("qty1" == key ? val : qty1) / ("ups1" == key ? val : ups1))
        x4 = ("ups1" == key ? val : ups1) != 0 ? x4 : 0
        setBoard1(x4)

        var x5 = (("qty2" == key ? val : qty2) / ("ups2" == key ? val : ups2))
        x5 = ("ups2" == key ? val : ups2) != 0 ? x5 : 0
        setBoard2(x5)

        var x6 = x3 * ("rate" == key ? val : rate) + x4 * ("rate1" == key ? val : rate1) + x5 * ("rate2" == key ? val : rate2)
        setBoard_amt(x6)

        // console.log(printing,board_amt,key,val)
        var x7 = x6 + ("printing" == key ? val : printing) + ("ink" == key ? val : ink) + ("pasting" == key ? val : pasting) + ("punching" == key ? val : punching)
        setTotal1(x7)

        var x8 = (x7 * ("profit" == key ? val : profit)) / (100) + x7
        setTotal2(x8)

        var x9 = x8 + ("varnish" == key ? val : varnish) + ("plate" == key ? val : plate) + ("binding" == key ? val : binding)
        setGrand_total(x9.toFixed(4))

        var x10 = x9 / ("quantity" == key ? val : quantity)
        setRate_per_piece(x10.toFixed(4))

    }

    const saveToJson = async () => {
        var dateObj = new Date();
        var options = { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'numeric', year: 'numeric' };
        var newdate = dateObj.toLocaleString('en-US', options);

        setSaveDate(newdate)
        const jsonValues = {
            company_name: company_name,
            product_name: product_name,
            size_l: size_l,
            size_b: size_b,
            gsm: gsm,
            sheet_in_gross: sheet_in_gross,
            textConfirmation: textConfirmation,
            kg: kg,
            rate_kg: rate_kg,
            gross_rate: gross_rate,
            gross: gross,
            rate_per_sheet: rate_per_sheet,
            qty: qty,
            ups: ups,
            board: board,
            rate: rate,

            quantity: quantity,

            qty1: qty1,
            ups1: ups1,
            board1: board1,
            rate1: rate1,

            qty2: qty2,
            ups2: ups2,
            board2: board2,
            rate2: rate2,

            board_amt: board_amt,
            printing: printing,
            total1: total1,
            profit: profit,
            total2: total2,
            varnish: varnish,
            ink: ink,
            pasting: pasting,
            punching: punching,
            plate: plate,
            binding: binding,
            grand_total: grand_total,
            rate_per_piece: rate_per_piece,
            remarks: remarks,
            box_size: box_size,
            date: newdate,
            srno: "0"
        }

        await fs.readFile(process.env.REACT_APP_INPUTFILE, 'utf8', async function (err, data) {
            const data_values = await JSON.parse(data)
            // setDataValues(data_values)
            console.log("Hello")
            jsonValues.srno = data_values.companyData.length
            await data_values.companyData.push(jsonValues)
            fs.writeFile(process.env.REACT_APP_INPUTFILE, JSON.stringify(data_values, null, 2), (err) => {
                setIsLoading(true)
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/data_search")
                }, 1500);
                // navigate("/data_search")
            })

        })


    }


    const location = useLocation();
    const dataObj = location.state;
    var data, index;
    if (dataObj) {
        data = dataObj[0]
        index = dataObj[1]
    }
    useEffect(() => {


        if (!data) return 0;
        setCompany_name(data.company_name)
        setProduct_name(data.product_name)
        setSize_l(data.size_l)
        setSize_b(data.size_b)
        setGsm(data.gsm)
        setSheet_in_gross(data.sheet_in_gross)
        setTextConfirmation(data.textConfirmation)
        setKg(data.kg)
        setRate_kg(data.rate_kg)
        setGross_rate(data.gross_rate)
        setGross(data.gross)
        setRate_per_sheet(data.rate_per_sheet)
        setQty(data.qty)
        setUps(data.ups)
        setBoard(data.board)
        setRate(data.rate)

        setQuantity(data.quantity)

        setQty1(data.qty1)
        setUps1(data.ups1)
        setBoard1(data.board1)
        setRate1(data.rate1)

        setQty2(data.qty2)
        setUps2(data.ups2)
        setBoard2(data.board2)
        setRate2(data.rate2)

        setBoard_amt(data.board_amt)
        setPrinting(data.printing)
        setTotal1(data.total1)
        setProfit(data.profit)
        setTotal2(data.total2)
        setVarnish(data.varnish)
        setInk(data.ink)
        setPasting(data.pasting)
        setPunching(data.punching)
        setPlate(data.plate)
        setBinding(data.binding)
        setGrand_total(data.grand_total)
        setRate_per_piece(data.rate_per_piece)
        setBox_size(data.box_size)
        setRemarks(data.remarks)
        setSaveDate(data.date)

    }, [])

    const updateToJson = async () => {
        var dateObj = new Date();
        var options = { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'numeric', year: 'numeric' };
        var newdate = dateObj.toLocaleString('en-US', options);

        // setSaveDate(newdate)
        const jsonValues = {
            company_name: company_name,
            product_name: product_name,
            size_l: size_l,
            size_b: size_b,
            gsm: gsm,
            sheet_in_gross: sheet_in_gross,
            textConfirmation: textConfirmation,
            kg: kg,
            rate_kg: rate_kg,
            gross_rate: gross_rate,
            gross: gross,
            rate_per_sheet: rate_per_sheet,

            quantity: quantity,

            qty: qty,
            ups: ups,
            board: board,
            rate: rate,

            qty1: qty1,
            ups1: ups1,
            board1: board1,
            rate1: rate1,

            qty2: qty2,
            ups2: ups2,
            board2: board2,
            rate2: rate2,

            board_amt: board_amt,
            printing: printing,
            total1: total1,
            profit: profit,
            total2: total2,
            varnish: varnish,
            ink: ink,
            pasting: pasting,
            punching: punching,
            plate: plate,
            binding: binding,
            grand_total: grand_total,
            rate_per_piece: rate_per_piece,
            box_size: box_size,
            remarks: remarks,
            date: newdate,
            srno: "0"
        }
        await fs.readFile(process.env.REACT_APP_INPUTFILE, 'utf8', async function (err, data) {
            const data_values = await JSON.parse(data)
            data_values.companyData[index] = jsonValues
            data_values.companyData[index].srno = index
            fs.writeFile(process.env.REACT_APP_INPUTFILE, JSON.stringify(data_values, null, 2), (err) => {
                setIsLoading(true)
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/data_search")
                }, 1500);

            })
            console.log(data_values)

        })
    }
    const updateLamnination = (val, key) => {
        const l0 = ("lamSize1" == key ? val : lamSize1),
            l1 = ("lamSize2" == key ? val : lamSize2),
            l2 = ("lamNum" == key ? val : lamNum),
            l3 = ("lamQty" == key ? val : lamQty)
        if (l0 != 0 && l1 != 0 && l2 != 0 && l3 != 0) {
            setVarnish((l0 * l1 * l2 * l3) / 100)
            changeValues((l0 * l1 * l2 * l3) / 100, "varnish")
        }
        else {
            setVarnish(0)
        }
    }

    const updatePrinting = (val, key) => {
        const p0 = ("pNum1" == key ? val : pNum1),
            p1 = ("pNum2" == key ? val : pNum2),
            p2 = ("pNum3" == key ? val : pNum3)
        if (p0 != 0 && p1 != 0 && p2 != 0) {
            setPrinting(p0 * p1 * p2)
            changeValues(p0 * p1 * p2, "printing")
        }
        else {
            setPrinting(0)
        }
    }

    const updateMultiPrinting = (val, key) => {
        const p0 = ("pNum1" == key ? val : pNum1),
            p1 = ("pNum2" == key ? val : pNum2),
            p2 = ("pNum3" == key ? val : pNum3)
        if (p0 != 0 && p1 != 0 && p2 != 0) {
            setPrinting(p0 + ((p2 - 1000) / 1000) * p1)
            changeValues(p0 + ((p2 - 1000) / 1000) * p1, "printing")
        }
        else {
            setPrinting(0)
        }

    }

    const updatePunching = (val, key) => {
        const p0 = ("punchNum1" == key ? val : punchNum1),
            p1 = ("punchNum2" == key ? val : punchNum2)
        if (p0 != 0 && p1 != 0) {
            setPunching(p0 * p1)
            changeValues(p0 * p1, "punching")
        }
        else {
            setPunching(0)
        }
    }

    const updatePasting = (val, key) => {
        const p0 = ("pasteNum1" == key ? val : pasteNum1),
            p1 = ("pasteNum2" == key ? val : pasteNum2)
        if (p0 != 0 && p1 != 0) {
            setPasting(p0 * p1 / 1000)
            changeValues(p0 * p1 / 1000, "pasting")
        }
        else {
            setPasting(0)
        }
    }

    const updateBinding = (val, key) => {
        const b0 = ("bindNum1" == key ? val : bindNum1),
            b1 = ("bindNum2" == key ? val : bindNum2)
        if (b0 != 0 && b1 != 0) {
            setBinding(b0 * b1)
            changeValues(b0 * b1, "binding")
        }
        else {
            setBinding(0)
        }
    }


    const doMaths = (e) => {
        if (isNaN(e.target.value)) {
            console.log(e.target.value)
            return e.target.value

        }
        else {
            return parseFloat(e.target.value.trim())
        }
    }

    const suggestions = useRef(true);
    useEffect(async () => {
        if (suggestions.current) {
            await fs.readFile(process.env.REACT_APP_INPUTFILE, 'utf8', async function (err, data) {
                const data_values = await JSON.parse(data)
                let temp = []
                data_values.companyData.forEach((key, index) => {
                    temp.push(key.company_name)
                })
                setCompany_suggestion(temp)
                setDataValues(temp)
                console.log(temp)
            })
            suggestions.current = false
        }
    }, [])


    const SearchData = async (e) => {
        if (e.target.value == "") setCompany_suggestion(dataValues)
        var searchKey = e.target.value
        var temp = [e.target.value]
        dataValues.forEach((key, index) => {
            if (String(key).toLowerCase().includes(searchKey.toLowerCase())) {
                temp.push(key)
            }
        });
        setCompany_suggestion(temp)
        console.log(temp)
    }

    const checkClick = () => {
        // if(!e.target.closest('#menu'))
    }
    const handleKey = (e) => {
        if (e.keyCode == 40) {
            setInpIndex((inpIndex + 1) % company_suggestion.length)
            setCompany_name(company_suggestion[(inpIndex + 1) % company_suggestion.length])
        }
        else if (e.keyCode == 38) {
            if (inpIndex == 0) {
                var cIndex = company_suggestion.length - 1
                setInpIndex(cIndex)
                setCompany_name(company_suggestion[cIndex])
            }
            else {
                setInpIndex((inpIndex - 1) % company_suggestion.length)
                setCompany_name(company_suggestion[(inpIndex - 1) % company_suggestion.length])
            }
        }
        else if (e.keyCode == 13) {
            setCompanyDrop(false)
        }
    }
    return (
        <div onClick={(e) => checkClick()} className='h-screen w-screen  overflow-x-hidden  pb-40 mt-5 bg-gradient-to-tr from-neutral-700 via-neutral-700 to-neutral-700'>
            {!isLoading ? (
                <div >
                    <section class="w-100 mx-4 p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
                        <div class="flex flex-cols justify-around w-100 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 ">
                            <div className='relative'>
                                <label class="text-white text-lg dark:text-gray-200" for="company_name">COMPANY NAME</label>
                                <input onKeyDown={(e) => handleKey(e)} onChange={(e) => { setInpIndex(0); setCompany_name(e.target.value); SearchData(e); setCompanyDrop(e.target.value ? true : false) }} value={company_name} id="company_name" type="text" class="block text-xl  w-11/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <div class={`z-10 bg-white ${companyDrop ? "block" : "hidden"}  focus:block absolute z-50 divide-y divide-gray-100 rounded-lg shadow w-11/12 dark:bg-gray-700`}>
                                    {/* ${pDrop ? "block" : "hidden"} */}
                                    <ul class="h-auto max-h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                        {
                                            !company_suggestion ? "" :
                                                company_suggestion.map(function (data, index) {
                                                    return (
                                                        index != 0 &&
                                                        <li key={index} className={`flex ${inpIndex == index ? "bg-gray-100" : ""} items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>
                                                            {data}
                                                        </li>

                                                    )
                                                })
                                        }


                                    </ul>
                                </div>
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="product_name">PRODUCT NAME</label>
                                <input onChange={(e) => setProduct_name(e.target.value)} value={product_name} id="product_name" type="text" class="block text-xl  w-10/12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="box_size">SIZE</label>
                                <input onChange={(e) => setBox_size(e.target.value)} value={box_size} id="box_size" type="text" class="block text-xl w-6/12  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="remarks">REMARKS</label>
                                <input onChange={(e) => setRemarks(e.target.value)} value={remarks} id="remarks" type="text" class="block text-xl w-11/12  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                        </div>
                    </section>

                    <section class="w-100 mx-4 p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 ">
                        <h1 class="text-xl text-yellow-300 text-lg capitalize border-2 w-max p-2 border-dashed">PAPER CALCULATION</h1>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 mt-4 ">
                            <div>
                                <label class="text-white text-lg  dark:text-gray-200" for="size_l">SIZE_L</label>
                                <input onChange={(e) => { setSize_l(doMaths(e)); changeValues(parseFloat(e.target.value), "size_l") }} value={size_l} id="size_l" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="size_b">SIZE_B</label>
                                <input onChange={(e) => { setSize_b(doMaths(e)); changeValues(parseFloat(e.target.value), "size_b") }} value={size_b} id="size_b" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="gsm">GSM</label>
                                <input onChange={(e) => { setGsm(doMaths(e)); changeValues(parseFloat(e.target.value), "gsm") }} value={gsm} id="gsm" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="sheet_in_gross">SHEET IN GROSS</label>
                                <input onChange={(e) => { setSheet_in_gross(doMaths(e)); changeValues(parseFloat(e.target.value), "sheet_in_gross") }} value={sheet_in_gross} id="sheet_in_gross" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="textConfirmation">TOTAL</label>
                                <input value={textConfirmation} id="textConfirmation" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="kg">KG</label>
                                <input value={kg} id="kg" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="rate_kg">RATE(KG)</label>
                                <input onChange={(e) => { setRate_kg(doMaths(e)); changeValues(parseFloat(e.target.value), "rate_kg") }} value={rate_kg} id="rate_kg" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="gross_rate">GROSS RATE</label>
                                <input value={gross_rate} id="gross_rate" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="gross">GROSS</label>
                                <input onChange={(e) => { setGross(doMaths(e)); changeValues(parseFloat(e.target.value), "gross") }} value={gross} id="gross" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="rate_per_sheet">RATE PER SHEET</label>
                                <input value={rate_per_sheet} id="rate_per_sheet" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <button onClick={(e) => { setRate(rate_per_sheet); changeValues(parseFloat(rate_per_sheet), "rate") }} class="bg-white text-black active:bg-pink-600  text-sm mt-1 hover:bg-zinc-500 px-4 font-bold rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    1
                                </button>
                                <button onClick={(e) => { setRate1(rate_per_sheet); changeValues(parseFloat(rate_per_sheet), "rate1") }} class="bg-white text-black active:bg-pink-600 text-sm mt-1 hover:bg-zinc-500 px-4 font-bold rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    2
                                </button>
                                <button onClick={(e) => { setRate2(rate_per_sheet); changeValues(parseFloat(rate_per_sheet), "rate2") }} class="bg-white text-black active:bg-pink-600 text-sm mt-1 hover:bg-zinc-500 px-4 font-bold rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    3
                                </button>
                            </div>
                        </div>
                        <h1 class="text-xl mt-16 text-yellow-300 font-bold text-lg capitalize border-2 w-max p-2 border-dashed">PRODUCT CALCULATION</h1>
                        <div class="grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8  ">
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="quantity">QUANTITY</label>
                                <input onChange={(e) => { setQuantity(doMaths(e)); changeValues(parseFloat(e.target.value), "quantity") }} value={quantity} id="quantity" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                        </div>
                        <div class="grid xl:w-9/12 lg:w-9/12 md:w-100 sm:w-100 mt-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8  ">
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="qty">QTY</label>
                                <input onChange={(e) => { setQty(doMaths(e)); changeValues(parseFloat(e.target.value), "qty") }} value={qty} id="qty" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="ups">UPS</label>
                                <input onChange={(e) => { setUps(doMaths(e)); changeValues(parseFloat(e.target.value), "ups") }} value={ups} id="ups" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="board">BOARD</label>
                                <input value={board} id="board" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="rate">RATE</label>
                                <input onChange={(e) => { setRate(doMaths(e)); changeValues(parseFloat(e.target.value), "rate") }} value={rate} id="rate" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />

                            </div>

                            {/* 1st1 */}
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="qty1">QTY1</label>
                                <input onChange={(e) => { setQty1(doMaths(e)); changeValues(parseFloat(e.target.value), "qty1") }} value={qty1} id="qty1" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="ups1">UPS1</label>
                                <input onChange={(e) => { setUps1(doMaths(e)); changeValues(parseFloat(e.target.value), "ups1") }} value={ups1} id="ups1" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="board1">BOARD1</label>
                                <input value={board1} id="board1" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="rate1">RATE1</label>
                                <input onChange={(e) => { setRate1(doMaths(e)); changeValues(parseFloat(e.target.value), "rate1") }} value={rate1} id="rate1" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            {/* 2ND */}
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="qty2">QTY2</label>
                                <input onChange={(e) => { setQty2(doMaths(e)); changeValues(parseFloat(e.target.value), "qty2") }} value={qty2} id="qty2" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="ups2">UPS2</label>
                                <input onChange={(e) => { setUps2(doMaths(e)); changeValues(parseFloat(e.target.value), "ups2") }} value={ups2} id="ups2" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="board2">BOARD2</label>
                                <input value={board2} id="board2" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="rate2">RATE2</label>
                                <input onChange={(e) => { setRate2(doMaths(e)); changeValues(parseFloat(e.target.value), "rate2") }} value={rate2} id="rate2" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="board_amt">BOARD AMOUNT</label>
                                <input value={board_amt} id="board_amt" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>


                            <div className='relative'>
                                <label class="text-white text-lg dark:text-gray-200" for="printing">PRINTING</label>
                                <input onChange={(e) => { setPrinting(doMaths(e)); changeValues(parseFloat(e.target.value), "printing") }} value={printing} id="printing" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <img src={DropArrow} onClick={(e) => setPDrop(!pDrop)} style={{ position: "absolute", top: '2.9rem', left: '8rem' }} className='border-2 border-solid rounded-lg p-1 bg-gray-200 cursor-pointer' />
                                <div class={`z-10 bg-white ${pDrop ? "block" : "hidden"} absolute z-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                                    <div className="m-2 flex flex-row justify-around">
                                        <span className='cursor-pointer' onClick={() => { setMultiColor(false); setPNum1(0); setPNum2(0); setPNum3(0) }}>Single</span>
                                        <span className='cursor-pointer' onClick={() => { setMultiColor(true); setPNum1(0); setPNum2(0); setPNum3(0) }}>Multi</span>
                                    </div>
                                    <div className={`${multiColor ? "hidden" : "block"}`}>
                                        <div className="m-2">
                                            <span>Pulling</span>
                                            <input text="number" className="block w-36 px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPNum1(doMaths(e)); updatePrinting(e.target.value, 'pNum1') }} value={pNum1} />
                                        </div>
                                        <div className="m-2">
                                            <span>Color</span>
                                            <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPNum2(doMaths(e)); updatePrinting(parseFloat(e.target.value), 'pNum2') }} value={pNum2} />
                                        </div>

                                        <div className="m-2">
                                            <span>Quantity</span>
                                            <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPNum3(doMaths(e)); updatePrinting(parseFloat(e.target.value), 'pNum3') }} value={pNum3} />
                                        </div>
                                    </div>

                                    <div className={`${!multiColor ? "hidden" : "block"}`}>
                                        <div className="m-2">
                                            <span>Rate1</span>
                                            <input text="number" className="block w-36 px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPNum1(doMaths(e)); updateMultiPrinting(parseFloat(e.target.value), 'pNum1') }} value={pNum1} />
                                        </div>
                                        <div className="m-2">
                                            <span>Rate2</span>
                                            <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPNum2(doMaths(e)); updateMultiPrinting(parseFloat(e.target.value), 'pNum2') }} value={pNum2} />
                                        </div>

                                        <div className="m-2">
                                            <span>Quantity</span>
                                            <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPNum3(doMaths(e)); updateMultiPrinting(parseFloat(e.target.value), 'pNum3') }} value={pNum3} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="ink">INK</label>
                                <input onChange={(e) => { setInk(doMaths(e)); changeValues(parseFloat(e.target.value), "ink") }} value={ink} id="ink" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='relative'>
                                <label class="text-white text-lg dark:text-gray-200" for="pasting">PASTING</label>
                                <input onChange={(e) => { setPasting(doMaths(e)); changeValues(parseFloat(e.target.value), "pasting") }} value={pasting} id="pasting" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <img src={DropArrow} onClick={(e) => setPasteDrop(!pasteDrop)} style={{ position: "absolute", top: '2.9rem', left: '8rem' }} className='border-2 border-solid rounded-lg p-1 bg-gray-200 cursor-pointer' />
                                <div class={`z-10 bg-white ${pasteDrop ? "block" : "hidden"} absolute z-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>

                                    <div className="m-2">
                                        <span>Rate</span>
                                        <input text="number" className="block w-36 px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPasteNum1(doMaths(e)); updatePasting(parseFloat(e.target.value), 'pasteNum1') }} value={pasteNum1} />
                                    </div>
                                    <div className="m-2">
                                        <span>Quantity</span>
                                        <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPasteNum2(doMaths(e)); updatePasting(parseFloat(e.target.value), 'pasteNum2') }} value={pasteNum2} />
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <label class="text-white text-lg dark:text-gray-200" for="punching">PUNCHING</label>
                                <input onChange={(e) => { setPunching(doMaths(e)); changeValues(parseFloat(e.target.value), "punching") }} value={punching} id="punching" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <img src={DropArrow} onClick={(e) => setPunchDrop(!punchDrop)} style={{ position: "absolute", top: '2.9rem', left: '8rem' }} className='border-2 border-solid rounded-lg p-1 bg-gray-200 cursor-pointer' />
                                <div class={`z-10 bg-white ${punchDrop ? "block" : "hidden"} absolute z-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>

                                    <div className="m-2">
                                        <span>Rate</span>
                                        <input text="number" className="block w-36 px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPunchNum1(doMaths(e)); updatePunching(parseFloat(e.target.value), 'punchNum1') }} value={punchNum1} />
                                    </div>
                                    <div className="m-2">
                                        <span>Quantity</span>
                                        <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setPunchNum2(doMaths(e)); updatePunching(parseFloat(e.target.value), 'punchNum2') }} value={punchNum2} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="total1">TOTAL</label>
                                <input value={total1} id="total1" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="profit">PROFIT</label>
                                <input onChange={(e) => { setProfit(doMaths(e)); changeValues(parseFloat(e.target.value), "profit") }} value={profit} id="profit" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="total2">TOTAL</label>
                                <input value={total2} id="total2" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='relative'>
                                <label class="text-white text-lg dark:text-gray-200" for="varnish">LAMINATION</label>
                                <input onChange={(e) => { setVarnish(doMaths(e)); changeValues(parseFloat(e.target.value), "varnish") }} value={varnish} id="varnish" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <img src={DropArrow} onClick={(e) => setLamDrop(!lamDrop)} style={{ position: "absolute", top: '2.9rem', left: '8rem' }} className='border-2 border-solid rounded-lg p-1 bg-gray-200 cursor-pointer' />
                                <div class={`z-10 bg-white ${lamDrop ? "block" : "hidden"} absolute z-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>

                                    <div className="m-2">
                                        <span>Size1</span>
                                        <input text="number" className="block w-36 px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setLamSize1(doMaths(e)); updateLamnination(parseFloat(e.target.value), 'lamSize1') }} val={lamSize1} />
                                    </div>
                                    <div className="m-2">
                                        <span>Size2</span>
                                        <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setLamSize2(doMaths(e)); updateLamnination(parseFloat(e.target.value), 'lamSize2') }} val={lamSize2} />
                                    </div>

                                    <div className="m-2">
                                        <span>Rate</span>
                                        <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setLamNum(doMaths(e)); updateLamnination(parseFloat(e.target.value), 'lamNum') }} val={lamNum} />
                                    </div>
                                    <div className="m-2">
                                        <span>Quantity</span>
                                        <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setLamQty(doMaths(e)); updateLamnination(parseFloat(e.target.value), 'lamQty') }} val={lamQty} />
                                    </div>

                                </div>
                            </div>

                            <div>
                                <label class="text-white text-lg dark:text-gray-200" for="plate">PLATE</label>
                                <input onChange={(e) => { setPlate(doMaths(e)); changeValues(parseFloat(e.target.value), "plate") }} value={plate} id="plate" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div className='relative'>
                                <label class="text-white text-lg dark:text-gray-200" for="binding">BINDING</label>
                                <input onChange={(e) => { setBinding(doMaths(e)); changeValues(parseFloat(e.target.value), "binding") }} value={binding} id="binding" type="number" class="block text-xl  w-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                <img src={DropArrow} onClick={(e) => setBindDrop(!bindDrop)} style={{ position: "absolute", top: '2.9rem', left: '8rem' }} className='border-2 border-solid rounded-lg p-1 bg-gray-200 cursor-pointer' />
                                <div class={`z-10 bg-white ${bindDrop ? "block" : "hidden"} absolute z-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>

                                    <div className="m-2">
                                        <span>Rate</span>
                                        <input text="number" className="block w-36 px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setBindNum1(doMaths(e)); updateBinding(parseFloat(e.target.value), 'bindNum1') }} value={bindNum1} />
                                    </div>
                                    <div className="m-2">
                                        <span>Quantity</span>
                                        <input text="number" className="block w-36  px-1 py-2 border-blue-500 border-2 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) => { setBindNum2(doMaths(e)); updateBinding(parseFloat(e.target.value), 'bindNum2') }} value={bindNum2} />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>
                    <section className='w-1/2 mx-4 p-6 mx-auto flex flex-cols justify-around rounded-md shadow-md dark:bg-gray-800 mt-2'>
                        <div>
                            <label class="text-white text-lg dark:text-gray-200" for="grand_total">GRAND TOTAL</label>
                            <input value={grand_total} id="grand_total" type="number" class="block text-2xl  w-44 px-2 py-2 mt-2 font-bold text-red-800 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label class="text-white text-lg dark:text-gray-200" for="rate_per_piece">RATE(piece)</label>
                            <input value={rate_per_piece} id="rate_per_piece" type="number" class="block text-2xl  w-40 px-4 py-2 mt-2 font-bold text-red-800 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                    </section>

                    <div class="flex justify-center mt-6">
                        {
                            data &&
                            <button onClick={() => updateToJson()} class="px-6 w-44 py-2 leading-5 text-white text-lg transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Update</button>

                        }
                        {
                            !data &&
                            <button onClick={() => saveToJson()} class="px-6 py-2 w-44 leading-5 text-white text-lg transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                        }
                    </div>

                </div>
            ) : (
                <Loading value='ADDING YOUR DATA...' />
            )
            }
        </div >
    )
}

export default Calculator;