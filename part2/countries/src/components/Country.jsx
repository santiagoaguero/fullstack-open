
const Country = ({ country, handleClick }) => (
    <div>
        <p>{country.name.common }
        <button onClick={() => handleClick(country.name.common)}>
            Show
        </button>
    </p>
    </div>
  );
export default Country;