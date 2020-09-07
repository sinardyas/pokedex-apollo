import React from 'react';
import {Link} from 'react-router-dom'

import './pokemon-card.component.scss';

export function PokemonCard({ data }) {
    return (
        <React.Fragment key={data.id}>
            <Link to={`/p/${data.id}`} className="card">
                <img src={data.image} className="card-img" alt=""/>
                <div className="card-name">
                    {data.name}
                </div>
            </Link>
        </React.Fragment>
    );
}