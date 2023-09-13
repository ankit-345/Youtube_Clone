import React, { useContext, useEffect } from 'react';
import { myContext } from '../Context/useContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const {searchText, setSearchText} = useContext(myContext);
  // const navigate = useNavigate();
  
  const handleChange = (e) =>{
    setSearchText(e.target.value);
  }
  
  // useEffect(() =>{
  //   if(searchText){
  //     navigate(`/results/${searchText}`) ;
  //   }
  // }, [searchText])

  return (
    <>
        <input type='text' placeholder="Search" value={searchText} onChange={handleChange} className='border-0 border-none w-[80%] md:w-[88%] h-9 bg-transparent focus:outline-none px-6 pb-1'/>
    </>
  )
}

export default Search