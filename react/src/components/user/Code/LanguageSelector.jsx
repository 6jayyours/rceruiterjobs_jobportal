import React from 'react';
import Select from 'react-select';
import { LANGUAGE_VERSIONS } from '../../../constants/Language';

const LanguageSelector = ({ language, onSelect }) => {
    // Convert LANGUAGE_VERSIONS to the format required by react-select
    const options = Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => ({
        value: { language: lang, version: version },
        label: `${lang.charAt(0).toUpperCase() + lang.slice(1)} (${version})`,
    }));

    // Default value for the select component
    const defaultValue = options.find(option => option.value.language === language);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#c0c0c0' : state.isFocused ? '#3e4042' : '#222426',
            color: state.isSelected ? '#fff' : '#fff',
        }),
    };

  return (
    <div className='mb-2'>
            <h2 className='mb-2 text-lg'>Language :</h2>
            <Select
                options={options}
                defaultValue={defaultValue}
                className='w-52 mb-3'
                styles={customStyles}
                onChange={(selectedOption) => onSelect(selectedOption.value)}
            />
        </div>
  )
}

export default LanguageSelector