var legoP = {}
var legoTheme = require('../assets/legoThemes')
var legoRandom = require('../assets/legoRandom')
//var legoCheck = require('../assets/legoCheck')

module.exports = {

    //This runs before every test
    beforeEach: browser => {
        legoP = browser.page.legoPage()
        legoP.navigate()
    },

    //This runs after the final test
    after: browser => {
        browser.end()
    },

    //This test navigates to the website past the intro page, and 
    //accepts the cookies banner at the bottom of the page.
    'Age Gate and Cookie Accept': browser => {
        legoP
            .skip()
    },

    //This test will go through all the buttons in the side menu
    'Checking the menu buttons': browser => {
        legoP
            .menuCheck()
    },

    //This test will check all the buttons in the theme portion of the menu
    'Checking the theme menu section': browser => {
        legoP
            .menuThemeCheck()
    },

    //This test will check all the buttons in the shop by portion of the menu
    'Checking the shop by menu section': browser => {
        legoP
            .menuShopByCheck()
    },

    //This test will check all the buttons in the interests portion of the mneu
    'Checking the interests menu section': browser => {
        legoP
            .menuInterestCheck()
    },

    //This test is searching all the themes in an array that is predefined
    'Searching a theme': browser => {
        legoTheme.forEach(theme => {
            legoP
                .search(theme)
        })
    },

    //This test will go to a item and grab its piece count
    'Piece count grab': browser => {
        legoTheme.forEach(data => {
            legoP
                .legoPC(data)
        })
    },

    //This test will add to wishlist
    'Adding an item to the Wishlist': browser => {
        legoTheme.forEach(theme => {
            legoP
                .itemWishAdd(theme)
        })
            
    },

     //This test will go to the wishlist and print the name of items in the list
     'Wishlist item check': browser => {
        legoP
            .wishCheck()
    },

    //This test adds items to the shopping cart
    'Adding items to shopping cart': browser => {
        legoRandom.forEach(random => {
            legoP
                .itemShopAdd(random)
        })
    },
    
    //This test checks the items in the shopping cart
    'Checking shopping cart': browser => {
        legoP
            .shopCheck()
    },

    //This test removes an item from the wishlist
    'Removing wishlist item': browser => {
        for(var i = 0; i < 2; i++){
            legoP
                .wishlistRmv()
        }
    },

    //This test adds an item from the wishlist to the shopping cart
    'Add to cart from wishlist': browser => {
        for(var i = 0; i < 2; i++){
            legoP
                .wishlistToShop()
        }
    },

    //Searching items through their id number
    'Product number search': browser => {
        legoP
            .emptyArraySearch()
    },

    //Showing all items saved to array
    'Product details': browser => {
        legoP
            .legoPCReport()
    },
}