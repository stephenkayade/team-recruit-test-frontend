import { useState } from 'react'
import UserModal from './UserModal'
import { BsApple } from 'react-icons/bs'




const UserShow = ({ users }: any) => {

    let [showModal, setShowModal] = useState<boolean>(false)
    const [data, setData] = useState<any>({})

    const renderedUsers = users.map((user: any) => {

        const handleClick = (userData: any) => {
            setData(userData)
            setShowModal(!showModal)
        }

        return (

            <div key={user.orderNumber} className='bg-white flex flex-col px-8 justify-end rounded-xl py-7 md:mb-0 mb-4'>

                <div className='flex justify-between items-center w-full leading-9 pb-5'>

                    <p className="text-gray-400 font-semibold text-xs">Name</p>

                    <div className="flex items-center">
                        <div className="w-4 h-4 flex justify-center items-center bg-gray-900 rounded-full">
                            <BsApple className='text-white' style={{ fontSize: '8px' }} />
                        </div>
                        <span className='text-stone-900 text-sm font-bold pl-2'>{user.name}</span>

                    </div>

                </div>
                <div className='flex justify-between items-center w-full leading-9 mb-2'>

                    <p className="text-gray-400 font-semibold text-xs">Company</p>

                    <div className="flex items-center">
                        <div className="w-4 h-4 flex justify-center items-center bg-gray-900 rounded-full">
                            <BsApple className='text-white' style={{ fontSize: '8px' }} />
                        </div>
                        <span className='text-stone-900 text-sm font-semibold pl-2'>{user.company}</span>

                    </div>

                </div>

                <div className='flex justify-between items-center w-full leading-9 mb-2'>
                    <p className="text-gray-400 font-semibold text-xs">Order Number</p>
                    <p className="text-stone-900 text-sm font-semibold">{user.orderNumber}</p>
                </div>

                <div className='flex justify-between items-center w-full leading-9 mb-2'>
                    <p className="text-gray-400 font-semibold text-xs">Product</p>
                    <p className="text-stone-900 text-sm font-semibold">{user.product}</p>
                </div>

                <div className='flex justify-between items-center w-full leading-9'>
                    <p className="text-gray-400 font-semibold text-xs">VAT (20%) </p>
                    <p className="text-stone-900 text-sm font-semibold">${user.vat}</p>
                </div>

                <div className="border-dashed border-2 border-gray-200 my-6"></div>


                <div className="flex items-center justify-between">

                    <div className='leading-5'>
                        <p className="text-slate-500 text-xs">You have to Pay</p>
                        <p className="">
                            <span className='text-cyan-900 text-lg font-bold'> ${user.payment}.</span>
                            <span className='text-cyan-900 text-xs font-bold'>99</span>
                            <span className='text-gray-700 text-xs font-bold'> USD </span>
                        </p>
                    </div>

                </div>


                <div className='pt-4'>

                    <button onClick={() => handleClick(user)} className='py-2 w-full bg-blue-color rounded-lg mt-2 font-bold text-white'>Edit</button>
                </div>
                {showModal && <UserModal closeModal={handleClick} data={data}></UserModal>}
            </div>
        )
    })

    return (
        <>
            <div className="md:grid md:grid-cols-5 place-content-center block gap-9 p-9 users">

                {renderedUsers}
            </div>

        </>
    )
}

export default UserShow