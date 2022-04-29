import { traktAPIKey } from "../credentials.js";
import { Headers } from "node-fetch";
import fetch from "node-fetch";
var myHeaders = new Headers();
myHeaders.append("trakt-api-version", "2");
myHeaders.append("trakt-api-key", traktAPIKey);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const trendingTraktLists = await fetch("https://api.trakt.tv/lists/trending", requestOptions)
  .then(response => response.json())
  .then(result => {return(result)})
  .catch(error => console.log('error', error));

// const jsonTrending = await trendingTraktLists.json()

let justNamesofLists = []
let justIdsofLists = []
trendingTraktLists.forEach(element => {
    if (element.list.name !== undefined){
        justNamesofLists.push(element.list.name)
    }})

trendingTraktLists.forEach(element => {
    if (element.list.name !== undefined){
        justIdsofLists.push(element.list.ids.trakt)
    }})
// console.log(trendingTraktLists)
// console.log(justNamesofLists)

export const exportedNames = justNamesofLists

export const exportedtraktIdsOfList = justIdsofLists