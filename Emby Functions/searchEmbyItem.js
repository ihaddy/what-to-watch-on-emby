
import fetch, {Headers} from "node-fetch";
import { apikey,url } from "../credentials.js";


var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const searchItemsOnEmby = async (searchQuery, mediaType) => {
  return await fetch(
    url + "/Items?Recursive=true&IncludeItemTypes=" + mediaType + "&SearchTerm=" + searchQuery + "&api_key=" + apikey,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
    //   console.log('emby ItemSearch',result);
      return result;
    })
    .catch((error) => console.log("error in emby search request", error));
};