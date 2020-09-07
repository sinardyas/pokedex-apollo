import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './dropdown.component.scss';
import { filterAction } from '../../shared/redux';


export function Dropdown() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const listType = [
        'Normal', 'Fire', 'Fighting',
        'Water', 'Flying', 'Grass',
        'Posion', 'Electric', 'Ground',
        'Psychic', 'Rock', 'Ice',
        'Bug', 'Dragon', 'Ghost',
        'Dark', 'Steel', 'Fairy'
    ];

    const onFilterSelect = (e) => {
        const { value } = e.target;
        dispatch(filterAction.doFilter(value));
    }

    return (
        <div className="dropdown-container">
            <button className="dropdown-button" onClick={(e) => setIsOpen(prev => !prev)}>
                Category
            </button>
            {
                isOpen && (<div className="dropdown-list">
                    <div className="dropdown-scroll-list">
                        {listType.map((item, i) => (<input key={i} type="button" className="dropdown-list-item" onClick={onFilterSelect} value={item} />))}
                    </div>
                </div>)
            }
        </div>
    )
}