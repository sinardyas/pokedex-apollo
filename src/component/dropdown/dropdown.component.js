import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


import './dropdown.component.scss';
import { filterAction } from '../../shared/redux';
import { dropdownValue } from '../../shared/contants';


export function Dropdown() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const onFilterSelect = (e) => {
        const { value } = e.target;
        dispatch(filterAction.doFilter(value));
        setIsOpen(false);
    }

    return (
        <div className="dropdown-container">
            <button className="dropdown-button" onClick={(e) => setIsOpen(prev => !prev)}>
                Category
            </button>
            {
                isOpen && (<div className="dropdown-list">
                    <div className="dropdown-scroll-list">
                        {dropdownValue.map((item, i) => (<input key={i} type="button" className="dropdown-list-item" onClick={onFilterSelect} value={item} />))}
                    </div>
                </div>)
            }
        </div>
    )
}