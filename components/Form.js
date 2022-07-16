import { useState } from 'react';
import useApp from '@/hooks/useApp';

const Form = () => {
  const [protect, setProtect] = useState(false);
  const { addDownloads, addPassword } = useApp();

  return (
    <div className="w-full">
      <div className="mt-10">
        <label className="text-gray-800">Delete after:</label>
        <select
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 rounded-lg leading-none focus:outline-none focus:border-gray-500"
          onChange={e => addDownloads(e.target.value)}
        >
          <option disabled>-- Select --</option>
          <option value="1">1 download</option>
          <option value="3">3 downloads</option>
          <option value="5">5 downloads</option>
          <option value="10">10 downloads</option>
        </select>
      </div>

      <div className="mt-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="protect"
            onChange={() => setProtect(!protect)}
          />
          <label htmlFor="protect" className="text-gray-800 mr-2">Protect with password</label>
        </div>

        {protect &&
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 rounded-lg leading-none focus:outline-none focus:border-gray-500"
            onChange={e => addPassword(e.target.value)}
          />
        }
      </div>
    </div>
  );
};

export default Form;