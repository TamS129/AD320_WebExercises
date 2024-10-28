/**
 * A webpage for fetching cute pet photos. Puppies or kitties
 * will be populated on the page after the user selects their desired
 * pet type.
 * 
 * Important information to complete this assignment:
 * - Service URL: https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php
 * - Query Parameters (required): ?animal=<value>
 *   - Details: animal is the name of the query parameter you need to assign
 *              a value to. This API recognizes either a value of puppy or kitty.
 * 
 * Example Request (with puppy as the value):
 * https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=puppy
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Adds a query selector so that everytime the user selects an option it will automattically return the selected input. (Kitty or Puppy)
   */
  function init() {

    const animalSelect = document.querySelectorAll("input[name='animal']");

    animalSelect.forEach(option => {

      option.addEventListener("change", () => {

        makeRequest(option.value);

      });
    });
  }

  /**
   * Makes a request to the API database for the pictures. If the fetch doesn't work as expected it returns an error.
   * @param {input} animal 
   */
  function makeRequest(animal) {
    
    const url = `https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=${animal}`;

    fetch(url)
      .then(statusCheck)
      .then(res => res.text()) 
      .then(displayPictures) 
      .catch(handleError);
  }
  
  /**
   * Displays all of the pictures from the API by seperating each of the images and placing them into an array. 
   * This array is then called and correlates with the CSS styling sheet.
   * @param {input} data - Text information of all of the image URL's
   */

  function displayPictures(data) {

    const container = id("pictures");
    container.innerHTML = "";

    const photos = data.trim().split("\n"); 

    photos.forEach(photoUrl => {

      const img = document.createElement("img");
      img.src = photoUrl
      container.appendChild(img);

    });
  }

  /**
   * If an error is made in the fetch request then this function activiates and sends an error message.
   * @param {Error} error 
   */

  function handleError(error) {

    console.error("Uh-oh! We can't find your pet pictures: ", error); 

    const errorText = document.createElement("div");
    errorText.textContent = `Something went wrong: ${error.message}`;
    errorText.classList.add("error");

    id("pictures").appendChild(errorText); 
  }





  /**
   * TODO: Implement any other functions you need
   */

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }


  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
