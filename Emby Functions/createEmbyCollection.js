import fetch from "node-fetch";
import { apikey, url } from "../credentials.js";

var requestOptions = {
  method: "POST",
  redirect: "follow",
};

//TODO:
export const createCollectionOnEmby = async (nameOfCollection, ListOfIdsToAdd) => {
  fetch(url + "Collections?IsLocked=false&Name=" + nameOfCollection + "&Ids=" + ListOfIdsToAdd + "&api_key=" + apikey, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
