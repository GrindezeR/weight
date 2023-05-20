'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';

type Weight = {
  id: number;
  weight: string;
  date: Date;
  updated_at: Date;
};

const Row = ({
  id,
  weight,
  date,
  updateData,
}: Weight & { updateData: (id: number, weight: number) => void }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue1, setInputValue1] = useState(weight);
  const formattedDate = new Date(date).toLocaleDateString('ru-RU');

  return (
    <>
      <tr className='border border-black' key={id}>
        {editMode ? (
          <input
            className='border border-black'
            type='number'
            value={inputValue1}
            onChange={e => setInputValue1(e.currentTarget.value)}
          />
        ) : (
          <td className='border border-black'>{weight}</td>
        )}
        <td className='border border-black'>{formattedDate}</td>
        <td>
          {editMode ? (
            <button
              onClick={() => {
                setEditMode(false);
                updateData(id, Number(inputValue1));
              }}>
              SAVE
            </button>
          ) : (
            <button onClick={() => setEditMode(true)}>EDIT</button>
          )}
        </td>
      </tr>
    </>
  );
};

export default function Home() {
  const [data, setData] = useState<Weight[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getWeight();
  }, []);

  const getWeight = async () => {
    const res = await fetch('/api/hello');
    const data = await res.json();
    console.log(data);
    setData(data);
  };

  const sendWeight = async () => {
    const res = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weight: Number(inputValue) }),
    });
    setInputValue('');
    getWeight();
    const result = await res.json();
    console.log(result);
  };

  const updateWeight = async (id: number, weight: number) => {
    const res = await fetch('/api/hello', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, weight }),
    });
    getWeight();
  };

  if (!data[0]) return null;

  return (
    <main>
      <h1>HOME</h1>
      <input
        className='ml-10 border border-black'
        type='number'
        value={inputValue}
        onChange={e => setInputValue(e.currentTarget.value)}
      />
      <button
        className='border border-black py-2 px-4 rounded-3xl'
        onClick={sendWeight}>
        SEND WEIGHT
      </button>
      {data[0] && (
        <table className='border-collapse w-1/2 text-center border border-black'>
          <tbody>
            <tr className='border border-black'>
              <th className='border border-black'>Вес, кг</th>
              <th className='border border-black'>Дата</th>
            </tr>
            {data.map(item => (
              <Row key={item.id} {...item} updateData={updateWeight} />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
