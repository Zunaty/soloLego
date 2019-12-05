var legoP = {}
var legoTheme = require('../assets/legoThemes')
module.exports = {
    beforeEach: browser => {
        legoP = browser.page.legoPage()
        legoP.navigate()
    },
    after: browser => {
        browser.end()
    },
    'Age Gate and Cookie Accept': browser => {
        legoP
            .skip()
    },

    //This test is searching all the themes in an array that is predefined
    'Searching a theme': browser => {
        legoTheme.forEach(theme => {
            legoP
                .search(theme)
        })
    },

    //This test will go through all the buttons in the side menu
    'Checking the menu buttons': browser => {
        legoP
            .menuCheck()
    },

    //This test will add to wishlist
    'Adding an item to the Wishlist': browser => {
        legoTheme.forEach(theme => {
            legoP
                .itemWishAdd(theme)
        })
            
    },

}