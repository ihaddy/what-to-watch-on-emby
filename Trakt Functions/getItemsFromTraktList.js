import { traktAPIKey } from "../credentials.js";
import fetch, { Headers } from "node-fetch";
// import fetch from "node-fetch";


var myHeaders = new Headers();
myHeaders.append("trakt-api-version", "2");
myHeaders.append("trakt-api-key", traktAPIKey);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


//optional parameter to filter list for just one type, i.e. just to grab movies or tvshows from
let listType = ''

export const getItems = async (listId) => {
  return await fetch("https://api.trakt.tv/lists/" + listId + "/items/" + listType, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};
