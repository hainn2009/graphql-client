import { Container } from "semantic-ui-react";
import VerticalBar from "../components/VerticalBar";

export default function CovidStatus() {
    return (
        <Container textAlign="center" style={{ marginTop: 10 }}>
            {/* <Header as="h1" className="page-title">
                Covid Status
            </Header>
            {loading ? (
                <h1>loading...</h1>
            ) : (
                <div>
                    <CountryStatus status={status} />
                    <hr></hr>
                    <CountryStatus status={countryStatus} />
                    <hr />
                    <VerticalBar />
                </div>
            )} */}
            <VerticalBar />
        </Container>
    );
}
