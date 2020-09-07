import { gql } from '@apollo/react-hooks';

export const GET_POKEMON_DETAIL = gql`
   query Pokemon($id: String!) {
        pokemon(id: $id) {
            id,
            number,
            name,
            weight {
                maximum,
                minimum
            },
            height {
                maximum,
                minimum
            },
            attacks {
                fast {
                    name,
                    type
                },
                special {
                    name,
                    type
                }
            },
            classification,
            types,
            resistant,
            weaknesses,
            fleeRate,
            maxCP,
            maxHP,
            image,
            evolutions {
                id,
                name,
                image
            }
        }
    }
`;

export const GET_POKEMON_LIST = gql`
   query Pokemon($first: Int!) {
        pokemons(first: $first) {
            id
            name,
            image,
            types
        }
    }
`;