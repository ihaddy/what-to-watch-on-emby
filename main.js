import fetch, { Headers, Request, Response } from "node-fetch";

import { exportedNames, exportedtraktIdsOfList } from "./Trakt Functions/getLists.js";
import { askQuestion } from "./Helper Functions/userInput.js";
import { getItems } from "./Trakt Functions/getItemsFromTraktList.js";
import { searchItemsOnEmby } from "./Emby Functions/searchEmbyItem.js";
import { createCollectionOnEmby } from "./Emby Functions/createEmbyCollection.js";

// console.log(exportedNames)

let selectionToPickFrom = "";
let placeholderString = "";
exportedNames.forEach((element, index) => {
  // let commaPrunedEl = element.replace(',', '')

  placeholderString = "\n" + index + ": " + element;
  // console.log('place holder string ',placeholderString)
  selectionToPickFrom = selectionToPickFrom + placeholderString;
  if (index === exportedNames.length - 1) {
    selectionToPickFrom = selectionToPickFrom + "\n";
  }
});
const question = "Please type the number of the list you'd like to add to emby as a collection: " + selectionToPickFrom;

const userAnswer = await askQuestion(question);

if (userAnswer <= exportedNames.length - 1) {
  let arrayOfShowsFromTraktList = [];
  let arrayofMoviesFromTraktList = [];
  console.log("You Have Selected " + userAnswer + ", which is: " + exportedNames[userAnswer]);
  const itemsfromCollection = await getItems(exportedtraktIdsOfList[userAnswer]);
  itemsfromCollection.forEach((element) => {
    if (element.type === "show") {
      arrayOfShowsFromTraktList.push(element.show.title);
    } else if (element.type === "movie") {
      arrayofMoviesFromTraktList.push(element.movie.title);
    }
  });
  // console.log('names of movies from Trakt:', arrayofMoviesFromTraktList)
  // console.log('names of shows from Trakt:', arrayOfShowsFromTraktList)
  let resultsFromEmbyMovieSearch = [];
  let resultsFromEmbyShowsSearch = [];

  if (arrayOfShowsFromTraktList.length !== 0) {
    for (const element of arrayOfShowsFromTraktList) {
      let result = await searchItemsOnEmby(element, "Series");
      resultsFromEmbyShowsSearch.push(result);
    }
  }
  if (arrayofMoviesFromTraktList.length !== 0) {
    for (const element of arrayofMoviesFromTraktList) {
      let result = await searchItemsOnEmby(element, "Movie");
      resultsFromEmbyMovieSearch.push(result);
    }
  }
  // arrayOfShowsFromTraktList.forEach( (element, index) => {
  //     let result =  searchItemsOnEmby(element, 'Series' )
  //     resultsFromEmbyShowsSearch.push(result)
  //     // console.log(result)
  //     // console.log(resultsFromEmbyShowsSearch[index])
  // })
  // arrayofMoviesFromTraktList.forEach( (element, index) => {
  //     let result = searchItemsOnEmby(element, 'Movie' )
  //     resultsFromEmbyMovieSearch.push(result)
  //     // console.log(result)
  //     // console.log(resultsFromEmbyShowsSearch[index])
  // })

  // console.log('Logging all emby SHOWS search results',resultsFromEmbyShowsSearch)
  // console.log('Logging all emby MOVIES search results',resultsFromEmbyMovieSearch)

  // resultsFromEmbyMovieSearch.forEach(element => {
  //     if(element.TotalRecordCount !== 0){

  //     }
  // });

  let arrayofMovieIDs = [];
  let arrayofShowsIDs = [];

  if (arrayofMoviesFromTraktList.length !== 0) {
    resultsFromEmbyMovieSearch.forEach((element) => {
      try {
        // console.log('logging element unfiltered',element);
        if (element.TotalRecordCount != 0) {
          try {
            if (element.Items[0].Id) {
              arrayofMovieIDs.push(element.Items[0].Id);
              //   console.log('logging filtered element',element.Items[0].Id)
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
    let stringOfMovieIdsToAdd = "";

  arrayofMovieIDs.forEach((element) => {
    if (stringOfMovieIdsToAdd === "") {
      stringOfMovieIdsToAdd = element;
    } else {
      stringOfMovieIdsToAdd = stringOfMovieIdsToAdd + "," + element;
    }
  });



  
  const moviesPlaylistName = exportedNames[userAnswer] + " Movies";
  createCollectionOnEmby(moviesPlaylistName, stringOfMovieIdsToAdd);
  }
  if (arrayOfShowsFromTraktList.length !== 0) {
    resultsFromEmbyShowsSearch.forEach((element) => {
      try {
        // console.log('logging element unfiltered',element);
        if (element.TotalRecordCount != 0) {
          try {
            if (element.Items[0].Id) {
              arrayofShowsIDs.push(element.Items[0].Id);
              //   console.log('logging filtered element',element.Items[0].Id)
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    let stringOfShowsIdsToAdd = "";

    arrayofShowsIDs.forEach((element) => {
      if (stringOfShowsIdsToAdd === "") {
        stringOfShowsIdsToAdd = element;
      } else {
        stringOfShowsIdsToAdd = stringOfShowsIdsToAdd + "," + element;
      }
    });
    const showPlaylistName = exportedNames[userAnswer] + " TV Shows";
    createCollectionOnEmby(showPlaylistName, stringOfShowsIdsToAdd);
  }

  console.log("logging array of Movie IDs", arrayofMovieIDs);
  console.log("logging array of Show IDs", arrayofShowsIDs);
  //TODO:measure length of arrays, max url you can submit is 2050 something, the URL + IDs cant exceed that
  // const lengthOfMovieIdArray = arrayofMovieIDs.map(a => a.length).reduce((a, b) => a + b);
  // const lengthOfShowsIdArray = arrayofMovieIDs.map(a => a.length).reduce((a, b) => a + b);
  // const totalCharacterLengthofBothArrays = lengthOfMovieIdArray + lengthOfShowsIdArray

  
  // console.log(stringOfIdsToAdd)
} else {
  console.log("Your Answer of " + userAnswer + " is not a valid choice.");
}
