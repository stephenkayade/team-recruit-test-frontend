import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useReactToPrint } from 'react-to-print'
import { AiOutlineWifi } from 'react-icons/ai'
import { RiNewspaperFill } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'
import { BsFillPatchCheckFill, BsFillGrid3X3GapFill, BsFillSimFill, BsApple, BsFillCreditCardFill, BsPencilFill } from 'react-icons/bs'
import Cleave from 'cleave.js/react';

import Dot from './Dot'

const UserModal = ({ data, closeModal }: Partial<any>) => {

  const [activeExpIndex, setActiveExpIndex] = useState<number>(0)
  const [step, setStep] = useState<number>(0)
  const [keyPress, setKeyPress] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [focus, setFocus] = useState({
    card: false,
    cvv: false,
    password: false
  })
  const [cardDetails, setCardDetails] = useState({
    expiry: ['00', '00'],
    card: '0000'

  })

  const inputRef = useRef<HTMLInputElement>(null)
  let userRef = useRef<any>('')

  const [accountDetails, setAccountDetails] = useState(data);

  const extraCardText = accountDetails.card.split('-')

  const getLastNum = () => {
    const result = extraCardText
    if (extraCardText.length === 4) {
      return `${result[3].trim()}`
    } else {
      return '0000'
    }
  }


  const changeNum = ({ target }: any, index: number): void => {
    const { value } = target
    const newNum: string[] = [...accountDetails.expiry]
    newNum[index] = value.substring(value.length - 2)
    setAccountDetails({ ...data, expiry: newNum })
  }

  const handleKeyPress = (e: any): void => {

    if (e.charCode === 13) {
      setKeyPress(true)
    } else {
      setKeyPress(false)
    }
  }

  const action = (e: any, type: string) => {
    e.preventDefault()

    setCardDetails({ ...cardDetails, expiry: [...accountDetails.expiry], card: getLastNum() })

    if (type === 'close') {
      closeModal()
    }
    if (type === 'pay') {
      setSuccess(true)
    }
  }

  const handlePrint = useReactToPrint({
    content: () => userRef.current,
    documentTitle: 'Transation Details',
    pageStyle: 'print'
  })

  const printButton = <button onClick={handlePrint} className=" animate-bounce">
    <RiNewspaperFill className="text-gray-400 text-2xl rotate-180" />
  </button>




  useEffect(() => {
    setStep(0)
  }, [])


  const checkCard = () => {

    let flag: string = ''
    const cardCheck = accountDetails.card

    if (cardCheck.substring(0, 2).includes('34')) {
      flag = '../../../images/icons/american-express.svg'
    }

    else if (cardCheck.substring(0, 1).includes('4')) {
      flag = '../../../images/icons/visa.svg'
    }

    else if (cardCheck.substring(0, 3).includes('300')) {
      flag = '../../../images/icons/diners-club-international.svg'
    }

    else if (cardCheck.substring(0, 2).includes('35')) {
      flag = '../../../images/icons/jcb.svg'
    }

    else if (cardCheck.substring(0, 4).includes('6011')) {
      flag = '../../../images/icons/discover-network.svg'
    }

    else if (cardCheck.substring(0, 2).includes('51')) {
      flag = '../../../images/icons/mastercard.svg'
    }
    else {
      flag = '../../../images/icons/mastercard.svg'
    }


    return flag
  }

  const portal: any = document.querySelector('.modal-container')


  return ReactDOM.createPortal(
    <div>
      <div ref={userRef} className="fixed inset-0 opacity-80" style={{ background: `url(../../../images/windows-11.jpg)` }}></div>

      {
        success === true &&

        <div className="md:hidden fixed block z-30 bg-white inset-0">

          <div className="md:hidden fixed block w-full z-20 inset-x-0 inset-y-10 pt-8">

            <div className='w-11/12  h-60 mx-auto inset-x-3 rounded-lg mb-3'>

              <div className="flex h-full flex-col justify-between px-5 pt-8 pb-5  border-2 border-gray rounded-2xl	">

                <div className="flex justify-between">
                  <BsFillSimFill className='text-3xl' />
                  <AiOutlineWifi className='text-3xl' />
                </div>

                <div>

                  <div className='leading-6'>
                    <p className="text-gray-700 text-xs font-bold">{data.name}</p>
                    <div className="flex items-center">
                      <Dot />
                      <p className="pl-2 font-bold">{accountDetails.card ? getLastNum() : '0000'}</p>

                    </div>
                  </div>



                  <div className="flex items-center justify-between mt-4">

                    <p className="text-gray-700 text-xs">  {cardDetails.expiry ? `${cardDetails.expiry[0]} / ${cardDetails.expiry[1]}` : '00 / 00'}</p>
                    <div>
                      <img src={checkCard()} width={30} height={20} alt="" />
                      <p className="text-gray-700" style={{ fontSize: '0.40rem' }}>mastercard</p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="w-11/12 h-fit mx-auto">

              <div className=' bg-gray-50  border-2 border-gray flex flex-col px-8 justify-end h-full rounded-xl py-7'>

                <div className='flex justify-between items-center w-full leading-9 mb-2'>

                  <p className="text-gray-500 font-semibold text-sm">Company</p>

                  <div className="flex items-center">
                    <div className="w-4 h-4 flex justify-center items-center bg-gray-900 rounded-full">
                      <BsApple className='text-white' style={{ fontSize: '8px' }} />
                    </div>
                    <span className='text-stone-900 text-sm font-semibold pl-2'>{data.company}</span>

                  </div>

                </div>

                <div className='flex justify-between items-center w-full leading-9 mb-2'>
                  <p className="text-gray-500 font-semibold text-sm">Order Number</p>
                  <p className="text-stone-900 text-sm font-semibold">{data.orderNumber}</p>
                </div>

                <div className='flex justify-between items-center w-full leading-9 mb-2'>
                  <p className="text-gray-500 font-semibold text-sm">Product</p>
                  <p className="text-stone-900 text-sm font-semibold">{data.product}</p>
                </div>

                <div className='flex justify-between items-center w-full leading-9'>
                  <p className="text-gray-500 font-semibold text-sm">VAT (20%) </p>
                  <p className="text-stone-900 text-sm font-semibold">${data.vat}</p>
                </div>

                <div className="border-dashed border-2 border-gray-200 my-6"></div>


                <div className="flex items-center justify-between">

                  <div className='leading-5'>
                    <p className="text-gray-500 text-sm">You have to Pay</p>
                    <p className="">
                      <span className='text-cyan-900 text-lg font-bold'> ${data.payment}.</span>
                      <span className='text-cyan-900 text-xs font-bold'>99</span>
                      <span className='text-gray-700 text-xs font-bold'> USD </span>
                    </p>
                  </div>

                  {printButton}

                </div>

                <div className='pt-4'>

                  <button onClick={(e) => action(e, 'close')} className='py-4 w-full bg-blue-color rounded-lg mt-2 font-bold text-white'>Close</button>
                </div>
              </div>


            </div>

          </div>
        </div>

      }

      <div className="fixed bg-white md:inset-x-10 xl:inset-x-96 lg:inset-20 sm:inset-x-0 md:inset-y-20 xl:inset-y-20 lg:inset-y-20 inset-y-0">

        <div className="absolute top-0 right-0 bg-gray-50 px-3 py-2 cursor-pointer">
          <IoMdClose onClick={(e) => action(e, 'close')} className='text-xl text-gray-600' />
        </div>


        <div className=" md:p-10 p-5 h-screen md:h-fit md:mt-8 mt-6">

          {/* form */}
          <form ref={userRef} className="md:w-full" onSubmit={(e) => e.preventDefault()}>

            {
              step === 0 &&

              <div className="md:flex justify-between block 	">


                <div className="md:w-9/12  flex-col flex">

                  <div className="flex justify-between mb-3">

                    <div className="flex items-center">

                      <div className="p-2.5 bg-blue-color rounded-full w-fit flex justify-center items-center">
                        <BsFillCreditCardFill className='text-lg text-slate-100 origin-bottom -rotate-12 left-0.5	' />

                      </div>
                      <span>
                        <span className='pl-3 font-bold'>AceCoin</span>
                        <span className='text-gray-500'>Pay</span>
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-primary-color text-white text-lg rounded py-1 px-2">
                        0
                      </div>
                      <div className="mx-0.5"></div>
                      <div className="bg-primary-color text-white text-lg rounded py-1 px-2">
                        1
                      </div>
                      <div className=" text-cyan-900 font-bold mx-1">
                        :
                      </div>
                      <div className="bg-primary-color text-white text-lg rounded py-1 px-2">
                        1
                      </div>
                      <div className="mx-0.5"></div>
                      <div className="bg-primary-color text-white text-lg rounded py-1 px-2">
                        9
                      </div>
                    </div>

                  </div>
                  <div>

                    <div className="flex items-center justify-between mt-5 mb-5">

                      <div className='leading-9'>
                        <p className="text-cyan-900 font-bold text-sm">Card Number</p>
                        <p className="text-slate-500 text-xs">Enter the 16-digit card number on the card</p>
                      </div>

                      <div onClick={() => setKeyPress(false)} className="flex items-center cursor-pointer">
                        <BsPencilFill className={`text-blue-color text-sm`} />
                        <span className="text-blue-color text-xs pl-1 font-bold">Edit</span>
                      </div>

                    </div>
                    <div className={`flex w-full items-center border border-slate-300 rounded-lg py-3 px-4 pe-5 ${keyPress === true ? 'bg-light-color' : focus.card === true ? 'border border-sky-600' : ''}`}>
                      <img src={`${checkCard()}`} width={28} alt="" />
                      <Cleave
                        placeholder="2222  -  3333  -  4444  -  5555"
                        options={{
                          blocks: [4, 4, 4, 4],
                          delimiter: "  -  ",
                          numericOnly: true
                        }}
                        value={data.card}
                        onChange={(e) => { setAccountDetails({ ...data, card: e.target.value }) }}
                        onMouseEnter={() => setFocus({ ...focus, card: true })}
                        onMouseLeave={() => setFocus({ ...focus, card: false })}
                        onKeyPress={(e) => handleKeyPress(e)}

                        disabled={keyPress}
                        className={`form-field appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 ps-5 leading-tight focus:outline-none  text-[17px] ${keyPress === true ? 'text-slate-400' : ''}`}

                      />

                      <BsFillPatchCheckFill className={`text-gray-500 text-lg ${accountDetails.card.length > 30 ? ' text-sky-500' : ''}`} />

                    </div>
                  </div>
                  <div className=''>

                    <div className="flex w-full items-center justify-between mt-7">

                      <div className='leading-9'>
                        <p className="text-cyan-900 font-bold text-sm">CVV Number</p>
                        <p className="text-slate-500 text-xs">Enter the 3 or 4-digit number on the card</p>
                      </div>

                      <div className={`flex w-72 ml-auto justify-center items-center border border-slate-300 rounded py-2 px-4 pe-5 ${focus.cvv === true ? 'border border-sky-600' : ''}`}>

                        <Cleave
                          placeholder="CVV"
                          options={{
                            blocks: [3],
                            numericOnly: true
                          }}
                          onChange={(e) => setAccountDetails({ ...data, cvv: e.target.value })}
                          onMouseEnter={() => setFocus({ ...focus, cvv: true })}
                          onMouseLeave={() => setFocus({ ...focus, cvv: false })}
                          className="form-field appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-3 px-5 leading-tight focus:outline-none  text-[17px]"

                        />


                        <BsFillGrid3X3GapFill className='text-slate-400 text-2xl' />

                      </div>
                    </div>
                  </div>

                  <div className=''>

                    <div className="flex w-full items-center justify-between mt-7">

                      <div className='leading-9'>
                        <p className="text-cyan-900 font-bold text-sm">Expiry Date</p>
                        <p className="text-slate-500 text-xs">Enter the expiration date of the card</p>
                      </div>

                      <div className="flex w-72 items-center">

                        {
                          Array(2).fill(0).map((_, index) =>
                            <React.Fragment key={index}>
                              <input
                                ref={index === activeExpIndex ? inputRef : null}
                                className="appearance-none bg-white border border-slate-300 w-full text-gray-700 py-5 px-5 leading-tight focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-lg text-[17px] text-center"
                                type="number"
                                placeholder=""
                                aria-label="Full name"
                                value={accountDetails.expiry[index]}
                                // onChange={(e) => setAccountDetails({ ...accountDetails, month: e.target.value })}
                                onChange={(e) => changeNum(e, index)}

                              />
                              {
                                index === accountDetails.expiry.length - 1 ? null : (
                                  <div className="mx-2 text-cyan-900 font-bold">/</div>
                                )
                              }
                            </React.Fragment>
                          )
                        }
                      </div>
                    </div>
                  </div>

                  <div className=''>

                    <div className="flex w-full items-center justify-between mt-7 mb-7">

                      <div className='leading-9'>
                        <p className="text-cyan-900 font-bold">Password</p>
                        <p className="text-slate-500 text-xs">Enter your dynamic password</p>
                      </div>

                      <div className={`flex w-72 ml-auto justify-center items-center border border-slate-300 rounded-lg py-2 px-4 pe-5 ${focus.password === true ? 'border border-sky-600' : ''}`}>
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-3 px-5 leading-tight focus:outline-none text-sm"
                          type="password"
                          placeholder="*******"
                          aria-label=""
                          onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                          onMouseEnter={() => setFocus({ ...focus, password: true })}
                          onMouseLeave={() => setFocus({ ...focus, password: false })}
                        />
                        <BsFillGrid3X3GapFill className='text-slate-400 text-2xl' />

                      </div>
                    </div>
                  </div>
                  <button onClick={(e) => action(e, 'pay')} className='py-5 w-full bg-blue-color rounded-lg mt-3 font-bold text-white text-[18px]'>Pay Now</button>
                </div>

                <div className="md:px-5 sm:px-0"></div>

                {/* card details */}
                <div className=" hidden md:w-80 md:w-100 md:relative md:ml-auto md:flex md:flex-col md:justify-between">

                  <div className="w-14 mx-auto bg-blue-color py-3 shadow px-5 drop-shadow-4xl rounded-sm"></div>



                  <div className="w-11/12 h-full mt-12 mx-auto">

                    <div className=' bg-slate-100  flex flex-col px-8 justify-end h-full rounded-xl pb-7'>

                      <div className='flex justify-between items-center w-full leading-9 mb-2'>

                        <p className="text-gray-400 font-semibold text-xs">Company</p>

                        <div className="flex items-center">
                          <div className="w-4 h-4 flex justify-center items-center bg-gray-900 rounded-full">
                            <BsApple className='text-white' style={{ fontSize: '8px' }} />
                          </div>
                          <span className='text-stone-900 text-sm font-semibold pl-2'>{data.company}</span>

                        </div>

                      </div>

                      <div className='flex justify-between items-center w-full leading-9 mb-2'>
                        <p className="text-gray-400 font-semibold text-xs">Order Number</p>
                        <p className="text-stone-900 text-sm font-semibold">{data.orderNumber}</p>
                      </div>

                      <div className='flex justify-between items-center w-full leading-9 mb-2'>
                        <p className="text-gray-400 font-semibold text-xs">Product</p>
                        <p className="text-stone-900 text-sm font-semibold">{data.product}</p>
                      </div>

                      <div className='flex justify-between items-center w-full leading-9'>
                        <p className="text-gray-400 font-semibold text-xs">VAT (20%) </p>
                        <p className="text-stone-900 text-sm font-semibold">${data.vat}</p>
                      </div>

                      <div className="border-dashed border-2 border-gray-200 my-6"></div>


                      <div className="flex items-center justify-between">

                        <div className='leading-5'>
                          <p className="text-slate-500 text-xs">You have to Pay</p>
                          <p className="">
                            <span className='text-cyan-900 text-lg font-bold'> ${data.payment}.</span>
                            <span className='text-cyan-900 text-xs font-bold'>99</span>
                            <span className='text-gray-700 text-xs font-bold'> USD </span>
                          </p>
                        </div>

                        {printButton}

                      </div>


                    </div>


                  </div>

                  <div className="absolute bg-white rounded-full w-8 h-8" style={{ left: '-7px', bottom: '80px' }}></div>
                  <div className="absolute bg-white rounded-full w-8 h-8" style={{ right: '-7px', bottom: '80px' }}></div>

                  <div className='absolute w-8/12 h-64 mx-auto inset-x-3 rounded-lg' style={{ top: '5px' }}>

                    <div className="flex h-full flex-col justify-between px-5 pt-8 pb-5 backdrop-blur-sm bg-white/90 drop-shadow-2xl border border-gray rounded-2xl	" style={{ background: `linear-gradient(106deg, rgba(255,255,255,0.95)0.51%, rgba(255,255,255,0.95)100%), url(../../../images/spiral.png)no-repeat center/contain` }}>

                      <div className="flex justify-between">
                        <BsFillSimFill className='text-3xl text-gray-400' />
                        <AiOutlineWifi className='text-3xl text-gray-600' />
                      </div>

                      <div>

                        <div className='leading-6'>
                          <p className="text-gray-700 text-xs font-bold">{data.name}</p>
                          <div className="flex items-center">
                            <Dot />
                            <p className="pl-2 font-bold">{cardDetails.card}</p>

                          </div>
                        </div>



                        <div className="flex items-center justify-between mt-4">

                          <p className="text-gray-700 text-xs">{`${cardDetails.expiry[0]} / ${cardDetails.expiry[1]}`}</p>
                          <div>
                            <img src={checkCard()} width={30} height={20} alt="" />
                            <p className="text-gray-700" style={{ fontSize: '0.40rem' }}>mastercard</p>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            }

          </form>

        </div>

      </div >
    </div>,
    portal
  )
}

export default UserModal