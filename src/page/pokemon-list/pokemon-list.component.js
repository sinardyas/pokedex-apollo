import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Waypoint } from "react-waypoint";
import { useSelector } from 'react-redux';


import './pokemon-list.component.scss';
import { PokemonCard } from '../../component'
import { GET_POKEMON_LIST } from '../../shared/model';

export function PokemonList(props) {
    const filterType = useSelector(state => state.filter.filterType);
    const [pageSize, setPageSize] = useState(15);
    const [isBottom, setIsBottom] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    
    const { data, loading, fetchMore } = useQuery(
        GET_POKEMON_LIST,
        { variables: { first: 15 }, notifyOnNetworkStatusChange: true }
    );

    useEffect(() => {
        console.log('temp')
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (data && data.pokemons.length > 0) {
            if (filterType) {
                const filteredData = data.pokemons && data.pokemons.filter(item => item.types.includes(filterType));
                setPokemons(filteredData);
            } else {
                setPokemons(data.pokemons);
            }
        }
    }, [filterType, data]);

    const onScroll = () => {
        const scrollTop = (document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        const scrollHeight = (document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
          if (scrollTop + window.innerHeight >= scrollHeight) {
              setIsBottom(true);
          }
    }

    const onFetchMoreData = () => {
        const newPageSize = pageSize + 15;
        setPageSize(newPageSize);
        setIsBottom(false);

        fetchMore({
            variables: {
                first: newPageSize
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                    pokemons: [...fetchMoreResult.pokemons]
                }
            }
        });
    }

    return (
        <>
            <div className="container">
                {pokemons && pokemons.map((pokemon, i) => (
                    <PokemonCard data={pokemon} key={i}/>
                ))}
                {isBottom && (pageSize <= 150) && (
                    <Waypoint onEnter={onFetchMoreData} />
                )}
            </div>
            {loading && (
                <div className="container">
                    <p>Loading....</p>
                </div>
            )}
        </>
    )
}
