import Axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/axios";

export const getCities = (setCities, setErr, setErrMessage, setLoading) => {
  setLoading(true);
  Axios.get(BASE_URL + "/city", {
    headers: {
      key: API_KEY,
    },
  })
    .then((res) => {
      const results = res.data.rajaongkir.results;
      setLoading(false);
      setCities(results);
    })
    .catch((error) => {
      console.log(error);
      setErr(true);
      setErrMessage(error.message);
      setLoading(false);
    });
};

export const findOrigin = (
  keyword,
  cities,
  setFilteredOrigin,
  setOrigin,
  setInputOrigin,
  filteredOrigin
) => {
  if (keyword === "" || keyword === null || keyword === undefined) {
    setFilteredOrigin([]);
    setOrigin([]);
  }
  setFilteredOrigin(
    cities.filter((item) =>
      item.city_name.toLowerCase().match(keyword.toLowerCase())
    )
  );

  if (filteredOrigin.length === 1) {
    setOrigin(filteredOrigin);
    setInputOrigin(filteredOrigin[0].city_name);
  }
};

export const findDestination = (
  keyword,
  cities,
  setFilteredDestination,
  setDestination,
  setInputDestination,
  filteredDestination
) => {
  if (keyword === "" || keyword === null || keyword === undefined) {
    setFilteredDestination([]);
    setDestination([]);
  } else {
    setFilteredDestination(
      cities.filter((item) =>
        item.city_name.toLowerCase().match(keyword.toLowerCase())
      )
    );

    if (filteredDestination.length === 1) {
      setDestination(filteredDestination);
      setInputDestination(filteredDestination[0].city_name);
    }
  }
};

export const handleSubmit = (origin, destination, gram, navigation) => {
  if (origin === "" || destination === "" || gram === "") {
    return alert(
      "Semua bidang harus diisi! Jika ada saran hasil, harap klik saran hasil pencarian kota!"
    );
  }
  return navigation.navigate("Result", {
    origin,
    destination,
    gram,
  });
};
