export default function CountryStatus({ status }) {
    return (
        <div>
            <p>Country: {status.country}</p>
            <p>Total Cases: {status.totalCases}</p>
            <p>Total Deaths: {status.totalDeaths}</p>
            <p>Total Recovered: {status.totalRecovered}</p>
            <p>New Cases: {status.newCases}</p>
            <p>New Deaths: {status.newDeaths}</p>
            <p>New Recovered: {status.newRecovered}</p>
        </div>
    );
}
