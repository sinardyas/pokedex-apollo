import React, { useState, useEffect } from 'react';

import { useQuery, gql } from '@apollo/react-hooks';
import { Waypoint } from "react-waypoint";
// import gql from "graphql-tag";

import './pokemon-list.component.scss';

const GET_POKEMON_INFO = gql`
   query Pokemon($first: Int!) {
        pokemons(first: $first) {
            id
            name,
            image
        }
    }
`;

export function PokemonList() {
    const [pageSize, setPageSize] = useState(15);
    const [isBottom, setIsBottom] = useState(false);
    const [temp, setTemp] = useState(false);
    
    const { data, fetchMore } = useQuery(
        GET_POKEMON_INFO,
        { variables: { first: 15 }}
    );

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onScroll = () => {
        const scrollTop = (document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        const scrollHeight = (document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
          if (scrollTop + window.innerHeight >= scrollHeight) {
              console.log('herehrhehr')
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

    const onClick = () => {
        console.log(temp);
        setTemp(true);
    }

    return (
        <>
            <div className="container">
                {
                    data && data.pokemons && data.pokemons.map(pokemon => (
                        <React.Fragment key={pokemon.id}>
                            <div className="item" onClick={onClick}>
                                <img src={pokemon.image} className="item-img" alt=""/>
                                <div className="item-name">
                                    {pokemon.name}
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
                {
                    isBottom && (pageSize <= 150) && (
                        <Waypoint onEnter={onFetchMoreData} />
                    )
                }
            </div>
            <div className="container">
                <p>Loading...</p>
            </div>
        </>
    )
}
