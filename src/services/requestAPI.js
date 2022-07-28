const fetchCurrencies = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchCurrencies;
