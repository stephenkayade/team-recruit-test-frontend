import React from 'react'
import { IUserDetails } from '../components/helpers/types'
import UserShow from './UserShow'

const UsersList = () => {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const randomOrderNumber = (length: number, chars: string) => {
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    const data: IUserDetails[] = [
        { name: 'Timilehin Ilori', card: '', expiry: new Array(2).fill('00') , cvv: '', company: 'Apple', orderNumber: randomOrderNumber(12, alphabet), product: 'Macbook Air 2022', vat: 100, payment: 300 },
        { name: 'Timilehin Agata', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Samsung', orderNumber: randomOrderNumber(12, alphabet), product: 'Samsung S20', vat: 100, payment: 500 },
        { name: 'Timilehin Alapa', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Infinix', orderNumber: randomOrderNumber(12, alphabet), product: 'Infinix Note in 9', vat: 100, payment: 440 },
        { name: 'Timilehin Ogo', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Samsung', orderNumber: randomOrderNumber(12, alphabet), product: 'Samsung S9', vat: 100, payment: 240 },
        { name: 'Timilehin Adewuyi', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Nokia', orderNumber: randomOrderNumber(12, alphabet), product: 'Nokia Lumia', vat: 100, payment: 125 },
        { name: 'Timilehin Francis', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Apple', orderNumber: randomOrderNumber(12, alphabet), product: 'Macbook Pro 2020', vat: 100, payment: 400 },
        { name: 'Timilehin Francis', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Apple', orderNumber: randomOrderNumber(12, alphabet), product: 'Macbook Pro 2020', vat: 100, payment: 400 },
        { name: 'Timilehin Francis', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Apple', orderNumber: randomOrderNumber(12, alphabet), product: 'Macbook Pro 2020', vat: 100, payment: 400 },
        { name: 'Timilehin Francis', card: '', expiry: new Array(2).fill('00'), cvv: '', company: 'Apple', orderNumber: randomOrderNumber(12, alphabet), product: 'Macbook Pro 2020', vat: 100, payment: 400 },
    ]

    return (
        <div className="user bg-sky-100 md:h-screen">

            <UserShow users={data} />
        </div>
    )
}

export default UsersList