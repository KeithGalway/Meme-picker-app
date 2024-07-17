import { catsData } from './data.js'

// ELEMENT SELECTORS
const emotionRadios = document.getElementById('emotion-radios')             // get emotion radios element - container for radio inputs
const getImageBtn = document.getElementById('get-image-btn')                // get image button - display cat meme in modal
const gifsOnlyOption = document.getElementById('gifs-only-option')          // get gifs only option input element - provides option to display only animated gifs
const memeModalInner = document.getElementById('meme-modal-inner')          // get meme modal inner - container for cat image
const memeModal = document.getElementById('meme-modal')                     // get meme modal - container for entire modal
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')   // get meme modal close button - get close button on modal

// EVENT LISTENERS
emotionRadios.addEventListener('change', highlightCheckedOption)   // check event to highlight radio input check box
getImageBtn.addEventListener('click', renderCat)                   // click event for get image button
memeModalCloseBtn.addEventListener('click', closeModal)            // click event for meme modal close button

// SITE FUNCTIONS

// highlightCheckedOption function runs when radio option gets checked
function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio')   // get radio element - container for list of inputs
    for (let radio of radios) {                               // iterate over each radio element
        radio.classList.remove('highlight')                   // remove 'highlight' class from radio element
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')  // get event target element (input) and add 'highlight' class to parent element (div)
}

// closeModal function closes the modal
function closeModal() {
    memeModal.style.display = 'none'  // change meme modal style to none - closes modal
}

// renderCat function adds img tag to meme modal inner
function renderCat() {
    const catObject = getSingleCatObject()      // get a single matching cat object
    memeModalInner.innerHTML = `
        <img
            class="cat-img" 
            src="./assets/${catObject.image}"
            alt="${catObject.alt}"
        />
    `                                           // modify meme modal inner to display selected cat image
    memeModal.style.display = 'flex'            // display modal by changing the container style to 'flex'
}

// getSingleCatObject function checks if multiple matching cats are found and picks one
function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()                               // get matching cats array
    if (catsArray.length === 1) {                                          // if cats array has one value
        return catsArray[0]                                                // return that array value
    }
    else {                                                                 // if cats array has more than one value
        const randomNumber = Math.floor(Math.random() * catsArray.length)  // generate random number from number of values in matching cats array
        return catsArray[randomNumber]                                     // return one of the array values
    }
}

// getMatchingCatsArray function returns cats array matching selected emotion with and without gifs
function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {                              // if an input of type radio is checked
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value   // extract value of that input (which emotion is selected)
        const isGif = gifsOnlyOption.checked                                                  // boolean value to indicate if 'animated gifs only' option is checked
        const matchingCatsArray = catsData.filter((cat) => {                                  // filter through cats array from data file
            if (isGif) {                                                                      // if isGif is true ('animated gifs only' option is checked)
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif                 // matching cats array includes cats arrays filtered by matching emotions AND where isGif is true
            }
            else {                                                                            // if isGif is not true ('animated gifs only' option is not checked)
                return cat.emotionTags.includes(selectedEmotion)                              // matching cats array includes cats arrays filtered by matching emotions
            }            
        })
        return matchingCatsArray                                                              // return matching cats array
    }   
}

// getEmotionsArray function gets all emotions based on emotion tags in cats data
function getEmotionsArray(cats) {
    const emotionsArray = []                           // declare emotions array 
    for (let cat of cats) {                            // cycle through each cat from cats data
        for (let emotion of cat.emotionTags) {         // cycle through each emotion for each emotion tag
            if (!emotionsArray.includes(emotion)) {    // if emotions array does not include emotion tags
                emotionsArray.push(emotion)            // populate emotions array from emotion tags from cats data
            }
        }
    }
    return emotionsArray                               // return emotions array of emotion tags
}

// renderEmotionsRadions function renders all input options for each emotion
function renderEmotionsRadios(cats) {
    let radioItems = ``                           // declare radio items to hold html inputs
    const emotions = getEmotionsArray(cats)       // get emotions array
    for (let emotion of emotions) {               // cycle through emotions arrays
        radioItems += `
            <div class="radio">
                <label class="radio__label" for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                />
            </div>
        `                                         // add html string for label and input for each emotion in radio items
    }
    emotionRadios.innerHTML = radioItems          // add radio items html inputs in emotion radios element
}

// render all input options for each emotions in cats data
renderEmotionsRadios(catsData)