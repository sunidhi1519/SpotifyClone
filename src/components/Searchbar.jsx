import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
const navigate = useNavigate();
const [SearchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${SearchTerm}`);
  }

  <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-100 focus-within:text-gray-600" action="">
    <label htmlFor="search-field" className="sr-only">
      Search all songs
    </label>
    <div className="flex flex-row justify-start items-center">
      <FiSearch className="w-6 h-6 ml-5"/>
      <input
        autoComplete="off"
        name="search-field"
        id="search-field"
        placeholder="Search"
        value={SearchTerm}
        onChange={(e) => { setSearchTerm(e.target.value)}}
        className="flex-1 bg-transparent  border-none outline-none placeholder-gray-200 text-lg text-white p-4"
      />
    </div>
  </form>
}

export default Searchbar;
