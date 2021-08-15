import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Container, Header } from 'semantic-ui-react';
import CountryStatus from '../components/CountryStatus';

const COVID_STATUS_QUERY = gql`
    query ($country: String!) {
        getWorldStatus {
            country
            totalCases
            totalDeaths
            totalRecovered
            newCases
            newDeaths
            newRecovered
        }

        getStatusByCountry(country: $country) {
            country
            totalCases
            totalDeaths
            totalRecovered
            newCases
            newDeaths
            newRecovered
        }
    }
`;

export default function CovidStatus() {
    // const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    //     variables: { postId },
    // });
    const country = 'Vietnam';
    const {
        loading,
        data: {
            getWorldStatus: status,
            getStatusByCountry: countryStatus,
        } = {},
    } = useQuery(COVID_STATUS_QUERY, { variables: { country } });

    return (
        <Container textAlign="center">
            <Header as="h1" className="page-title">
                Covid Status
            </Header>
            {loading ? (
                <h1>loading...</h1>
            ) : (
                <div>
                    <CountryStatus status={status} />
                    <hr></hr>
                    <CountryStatus status={countryStatus} />
                </div>
            )}
        </Container>
    );
}
