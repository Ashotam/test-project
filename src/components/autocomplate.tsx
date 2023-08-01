import React, { useState, useEffect } from 'react';
import './CustomAutocomplete.css';
import {CanselIcon} from '../icons/cancel.tsx'
import { DropDownIcon } from '../icons/dropdown.tsx';

type Option = {
  id: string;
  name: string;
};

type Props = {
  options: Option[];
};

const CustomMultiSelectAutocomplete: React.FC<Props> = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [isShowOptions,setisShowOptions] = useState<boolean>(false)

  useEffect(() => {
    const filtered = options.filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [options, searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionToggle = (option: Option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.some((selected) => selected.id === option.id)
        ? prevSelectedOptions.filter((selected) => selected.id !== option.id)
        : [...prevSelectedOptions, option]
    );
  };

  const handleChipRemove = (option: Option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((selected) => selected.id !== option.id)
    );
  };

  return (
    <div className="custom-autocomplete">
      <div className='multi-select'>
          {selectedOptions.map((option) => (
            <div key={option.id} className="chip">
              {option.name}
              <CanselIcon  onClick={() => handleChipRemove(option)}/>
            </div>
          ))}
          <DropDownIcon onClick={()=>{
            setisShowOptions(prevIsShow=>!prevIsShow)
          }}/>
        </div>
        {isShowOptions &&  <div className="options-list">
      <input
      className='search-input'
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
        {filteredOptions.map((option) => (
          <div key={option.id} className='option'>
            <label>{option.name}</label>
            <input
              type="checkbox"
              checked={selectedOptions.some((selected) => selected.id === option.id)}
              onChange={() => handleOptionToggle(option)}
              className='checkbox'
            />
          </div>
        ))}
      </div>
      }
     
    </div>
  );
};

export default CustomMultiSelectAutocomplete;