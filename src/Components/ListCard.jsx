// components/ListCard.js
import React from 'react';

function ListCard({ title, items }) {
    return (
        <div className="list-card">
            <div >
                <ul className='flex flex-wrap gap-[10px] items-center justify-around'>
                    {items.map((item, index) => (
                        <li key={index} className='form  text-white p-5 w-[30%] h-auto'>
                            <h3 className='font-bold'>Title: {item.title}</h3>
                            <p className='font-thin mt-[15px]'>Body: {item.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListCard;
