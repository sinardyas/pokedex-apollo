import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {withRouter} from 'react-router-dom';


import './pokemon-detail.component.scss';
import { PokemonCard } from '../../component';
import { GET_POKEMON_DETAIL } from '../../shared/model';

export const PokemonDetail = withRouter((props) => {
    const { data, loading } = useQuery(
        GET_POKEMON_DETAIL,
        { variables: { id: props.match.params.id }, notifyOnNetworkStatusChange: true }
        );

    const mapDataToList = (dataItems) => {
        return (
            <ul>
                {dataItems.map((item, i) => (
                    item && item.type ? 
                        (<li key={i}>{item.name} ({item.type})</li>) :
                        (<li key={i}>{item}</li>)))}
            </ul>
        );
    }

    const mapDataToCard = (dataItems) => (dataItems.map((item, id) => (<PokemonCard key={id} data={item}/>)));

    if (loading) return (<div className="container loading"><p>Loading...</p></div>)

    return (
        <>
            {data && (
                <div className="pokemon-detail">
                    <div className="item-name">
                        {data.pokemon.name}
                    </div>
                    <div className="container">
                        <div className="sub-container">
                            <div className="item-detail">
                                <img src={data.pokemon.image} className="item-img" alt=""/>
                            </div>
                            {data.pokemon.evolutions && (
                                <div className="item-detail no-border">
                                    <div className="item-detail-container">
                                        <div className="item-detail-title">Evolutions</div>
                                        <div className="item-detail-value">
                                            {mapDataToCard(data.pokemon.evolutions)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="sub-container">
                            <div className="item-detail no-border">
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Weight range</div>
                                    <div className="item-detail-value">{data.pokemon.weight.minimum} - {data.pokemon.weight.maximum}</div>
                                </div>
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Height range</div>
                                    <div className="item-detail-value">{data.pokemon.height.minimum} - {data.pokemon.height.maximum}</div>
                                </div>
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Classification</div>
                                    <div className="item-detail-value">{data.pokemon.classification}</div>
                                </div>
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Types</div>
                                    <div className="item-detail-value">{data.pokemon.types.toString()}</div>
                                </div>
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Fast attacks</div>
                                    <div className="item-detail-value">{mapDataToList(data.pokemon.attacks.fast)}</div>
                                </div>
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Special attacks</div>
                                    <div className="item-detail-value">{mapDataToList(data.pokemon.attacks.special)}</div>
                                </div>
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Resistances</div>
                                    <div className="item-detail-value">{mapDataToList(data.pokemon.resistant)}</div>
                                </div>
                                <div className="item-detail-container">
                                    <div className="item-detail-title">Weaknesses</div>
                                    <div className="item-detail-value">{mapDataToList(data.pokemon.weaknesses)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});