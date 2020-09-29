import Axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/axios";

export const cekJne = async (
  setLoadingJne,
  setJne,
  origin,
  destination,
  gram
) => {
  setLoadingJne(true);
  try {
    await Axios.post(
      BASE_URL + "/cost",
      {
        origin: origin.city_id,
        destination: destination.city_id,
        weight: gram,
        courier: "jne",
      },
      { headers: { key: API_KEY } }
    ).then((res) => {
      setLoadingJne(false);
      setJne(res.data.rajaongkir.results[0].costs);
    });
  } catch (error) {
    setLoadingJne(false);
    alert(error.message);
    console.log(error);
  }
};

export const cekPos = async (
  setLoadingPos,
  setPos,
  origin,
  destination,
  gram
) => {
  setLoadingPos(true);
  try {
    await Axios.post(
      BASE_URL + "/cost",
      {
        origin: origin.city_id,
        destination: destination.city_id,
        weight: gram,
        courier: "pos",
      },
      { headers: { key: API_KEY } }
    ).then((res) => {
      setLoadingPos(false);
      setPos(res.data.rajaongkir.results[0].costs);
    });
  } catch (error) {
    setLoadingPos(false);
    alert(error.message);
    console.log(error);
  }
};

export const cekTiki = async (
  setLoadingTiki,
  setTiki,
  origin,
  destination,
  gram
) => {
  setLoadingTiki(true);
  try {
    await Axios.post(
      BASE_URL + "/cost",
      {
        origin: origin.city_id,
        destination: destination.city_id,
        weight: gram,
        courier: "tiki",
      },
      { headers: { key: API_KEY } }
    ).then((res) => {
      setLoadingTiki(false);
      setTiki(res.data.rajaongkir.results[0].costs);
    });
  } catch (error) {
    setLoadingTiki(false);
    alert(error.message);
    console.log(error);
  }
};
