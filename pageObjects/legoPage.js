var legoCheck = []
var legoCommands = {
    //This will wait for an element to be visible (Because lazy)
    wait: function(data){
        this
            .waitForElementVisible(data)
        return this
    },

    //This will click on the home button and wait for the page to load
    home: function(){
        this
            .click('@homeBtn')
            .wait('@searchBar')
        return this
    },

    //This will press explore on the first visit page, and click accept cookies
    skip: function(){
        this
            .wait('@legoExplore')
            .click('@legoExplore')
            .click('@legoCookie')
        return this
    },

    //This will search in the search bar
    search: function(data){
        this
            .wait('@homeBtn')
            .clearValue('@searchBar')
            .setValue('@searchBar', data)
            .click('@searchBtn')
            .wait('@searchRItem')
            .legoAlert()
            .verify.containsText('@searchRslt', data)
        return this
    },

    //This will search with id numbers
    searchID: function(data1,data2){
        var self = this
        this
            .wait('@homeBtn')
            .setValue('@searchBar', [data1, self.api.Keys.ENTER])
            .wait('@itemName')
            .legoAlert()
            .verify.containsText('@itemName', data2)
        return this
    },

    //This will add the current item to the wishlist
    wishAdd: function(){
        this
            .click('@itemWish')
            .pause(500)
            .verify.containsText('@itemWishAdded', 'Added To Wish List')
        return this
    },

    //This will add the current item to the shopping cart
    shopAdd: function(){
        this
            .click('@itemBag')
            .pause(500)
        return this
    },

    //This will go through all the buttons in the side menu
    menuCheck: function(){
        this
            //Clicking the menu button
            .click('@menuBtn')
            .wait('@menuHome')
            .click('@menuHome')
            .legoAlert()
            .verify.containsText('@menuVHome', 'Featured sets')

            //Clicking on the Theme button
            .click('@menuBtn')
            .wait('@menuTheme')
            .click('@menuTheme')
            .legoAlert()
            .verify.containsText('@menuVTheme', 'THEMES')

            //Clicking on the Shop By button
            .click('@menuBack')
            .wait('@menuShop')
            .click('@menuShop')
            .legoAlert()
            .verify.containsText('@menuVShop', 'SHOP BY')

            //Clicking on the Interests button
            .click('@menuBack')
            .wait('@menuInterest')
            .click('@menuInterest')
            .legoAlert()
            .verify.containsText('@menuVInterest', 'INTERESTS')

            //Clicking the Sale & Offers button
            .click('@menuBack')
            .wait('@menuSale')
            .click('@menuSale')
            .legoAlert()
            .verify.containsText('@menuVSale', 'Sale')

            //Clicking the Exclusives button
            .click('@menuBtn')
            .wait('@menuExclu')
            .click('@menuExclu')
            .legoAlert()
            .verify.containsText('@menuVExclu', 'Exclusive')

            //Clicking the Support button
            .click('@menuBtn')
            .wait('@menuSup')
            .click('@menuSup')
            .legoAlert()
            .verify.containsText('@menuVSup', 'SUPPORT')
        return this
    },

    //This will go to an item and add to the wishlist
    itemWishAdd: function(data){
        var self = this
        this
            .wait('@searchBar')
            .setValue('@searchBar', [data, self.api.Keys.ENTER])
            .legoAlert()
            .wait('@searchRItem')
            .click('@searchRItem')
            .legoAlert()
            .legoProDetail()
            .wishAdd()
        return this
    },

    //This will go to an item and add to shopping cart
    itemShopAdd: function(data){
        var self = this
        this
            .wait('@searchBar')
            .setValue('@searchBar', [data, self.api.Keys.ENTER])
            .legoAlert()
            .wait('@searchRItem')
            .click('@searchRItem')
            .legoAlert()
            .legoProDetail()
            .shopAdd()
        return this
    },

    //This will remove a item from the wishlist
    wishlistRmv: function(){
        this
            .wait('@wishList')
            .click('@wishList')
            .wait('@wishBody')
            .legoAlert()
            .click('@wishRmvBtn')
        return this
    },

    //This will add an item to shopping cart from the wishlist
    wishlistToShop: function(){
        this
            .wait('@wishList')
            .click('@wishList')
            .wait('@wishBody')
            .legoAlert()
            .click('@wishBagBtn')
        return this
    },

    //This will check what is in the wishlist
    wishCheck: function(){
        this
            .wait('@wishList')
            .click('@wishList')
            .wait('@wishBody')
            .legoAlert()
            for(let i = 1; i < 5; i++){
                this
                    .api.useXpath()
                    .getText(`(//div[@class="ProductRowstyles__TextWrapper-cbbmmq-11 ecWzVt"])[${i}]`, function(result){
                        console.info("The item ", result.value, " is in the wishlist.")
                    })
            }
        return this
    },

    //This will check what is in the shopping cart
    shopCheck: function(){
        this
            .wait('@shopCart')
            .click('@shopCart')
            .wait('@shopBody')
            .legoAlert()
            for(let i = 1; i < 5; i++){
                this
                    .api.useXpath()
                    .getText(`(//div[@class="ProductRowstyles__TextWrapper-cbbmmq-11 ecWzVt"])[${i}]`, function(result){
                        console.info("The item ", result.value, " is in the shopping cart.")
                    })
            }
        return this
    },

    //This will check all the buttons in themes
    menuThemeCheck: function(){
        for(var i = 1; i < 41; i++){
            if(i == 15) continue;
            if(i == 20) continue;
            if(i == 32) continue;
            if(i == 34) continue;
            this
                .wait('@menuBtn')
                .click('@menuBtn')

                .wait('@menuTheme')
                .click('@menuTheme')

                .api.useXpath()
            this
                .wait(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`)
                .click(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`)

                .api.useCss()
            this
                .legoAlert()
                .wait('@searchRItem')
                .legoAlert()
                .getText('@themeRslt', function(result){
                    // legoCheck.push(result)
                    console.info("This is the title of the page selected through the themes menu:", result.value)
                })
        }
    },

    //This will check the shop by in menu
    menuShopByCheck: function(){
        for(var i = 42; i < 49; i++){
            this
                .wait('@menuBtn')
                .click('@menuBtn')

                .wait('@menuShop')
                .click('@menuShop')

                .api.useXpath()
            this
                .wait(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`)
                .getText(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`, function(result){
                    console.info("Test clicking this button", result.value)
                })
                .click(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`)
                .legoAlert()
        }
    },

    //This will check the interest in menu
    menuInterestCheck: function(){
        for(var i = 78; i < 97; i++){
            this
                .wait('@menuBtn')
                .click('@menuBtn')

                .wait('@menuInterest')
                .click('@menuInterest')

                .api.useXpath()
            this
                .wait(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`)
                .getText(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`, function(result){
                    console.info("Test clicking this button", result.value)
                })
                .click(`(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[${i}]`) 
                .legoAlert()
        }
    },

    //This will get the product info for an item using an array
    legoPC: function(data){
        var self = this
        var productDetail = {}
        this
            .wait('@searchBar')
            .setValue('@searchBar',[data, self.api.Keys.ENTER])
            .wait('@searchRItem2')
            .legoAlert()
            .click('@searchRItem2')
            .wait('@itemPC')
            .legoAlert()
            .getText('@itemName', function(result){
                console.log(result.value)
                productDetail.name = result.value;
            })
            .getText('@itemNum', function(result){
                console.log(result.value)
                productDetail.idnumber = result.value;
            })
            .getText('@itemPC', function(result){
                console.log(result.value)
                productDetail.pieceCount = result.value;
            })
        legoCheck.push(productDetail)
        return this
    },

    //This will get the product info for a item in general
    legoProDetail: function(){
        var productDetail = {}
        this
            .wait('@itemPC')
            .legoAlert()
            .getText('@itemName', function(result){
                console.log(result.value)
                productDetail.name = result.value;
            })
            .getText('@itemNum', function(result){
                console.log(result.value)
                productDetail.idnumber = result.value;
            })
            .getText('@itemPC', function(result){
                console.log(result.value)
                productDetail.pieceCount = result.value;
            })
        legoCheck.push(productDetail)
        return this
    },

    //This will search items through the empty array
    emptyArraySearch: function(){
        for(var x = 0; x < 6; x++){
            this
                .searchID(legoCheck[x].idnumber, legoCheck[x].name)
            return this
        }
    },

    //This will display the piece counts stored in the array
    legoPCReport: function(){
        console.info("These are the piece counts for the items:", "\n")
        console.log(legoCheck)
        console.log(legoCheck.length)
    },

    //This will aceppt the pop up alert
    legoAlert: function(){
        this
            .api.element('@popup', function(result){
                if(result.value != 0){
                    this
                        .dismissAlert()
                }
            })
        return this
    }
}
module.exports = {
    url: 'https://www.lego.com/en-us',
    commands: [legoCommands],
    elements: {
        //This is the first time landing page buttons
        legoExplore: '[data-test="age-gate-grown-up-cta"]',
        legoCookie: {
            selector: '//button[@data-test="cookie-banner-normal-button"]',
            locateStrategy: 'xpath'
        },

        //These are the selectors for the search bar while screen is smaller than 1200px wide
        searchBar: {
            selector: '(//input[@data-test="search-input"])[2]',
            locateStrategy: 'xpath'
        },
        searchBtn: {
            selector: '(//button[@class="Searchstyles__SearchButton-qaapd1-4 dmhqSO"])[2]',
            locateStrategy: 'xpath'
        },

        //Searching While screen wider than 1200px
        searchBdfsdf: {
            selector: '//button[@class="MainBarstyles__OpenButton-sc-1cg7sjw-13 hEgpRZ"]',
            locateStrategy: 'xpath'
        },

        //Search Result
        searchRslt: {
            selector: '//h3[@class="Text__BaseText-aa2o0i-0 iaIgAQ"]',
            locateStrategy: 'xpath'
        },
        searchRItem: {
            selector: '(//li[@data-test="product-item"])[1]',
            locateStrategy: 'xpath'
        },
        searchRItem2: {
            selector: '(//li[@data-test="product-item"])[2]',
            locateStrategy: 'xpath'
        },

        //These are the top bar buttons
        menuBtn: '[data-test="header-mobile-burger-button"]',
        wishList: '[data-test="util-bar-wishlist"]',
        shopCart: '[data-test="util-bar-cart"]',
        homeBtn: '[data-test="lego-logo"]',

        //These are the mid home page buttons
        newBtn: '[data-test="quicklink-link-0"]',
        excluBtn: '[data-test="quicklink-link-1"]',
        seasonBtn: '[data-test="quicklink-link-2"]',
        retBtn: '[data-test="quicklink-link-3"]',
        giftBtn: '[data-test="quicklink-link-4"]',
        vipBtn: '[data-test="quicklink-link-5"]',

        //These are the menu button buttons / menu bar
        menuHome: '[data-testid="home"]',
        menuTheme: '[data-analytics-title="themes"]',
        menuShop: '[data-analytics-title="shop-by"]',
        menuInterest: '[data-analytics-title="interests"]',
        menuSale: {
            selector: '(//li[@class="Liststyles__ListItem-sc-114bngs-1 ksSXqO"])[5]',
            locateStrategy: 'xpath'
        },
        menuExclu: '[data-analytics-title="exclusives"]',
        menuSup: '[data-analytics-title="support"]',
        menuBack: {
            selector: '//button[@class="BurgerMenuButtonstyles__TextButton-jerj9c-2 djGzKW"]',
            locateStrategy: 'xpath'
        },

        //This is the menu theme page result selector
        themeRslt: {
            selector: '(//span[@class="Markup__StyledMarkup-ar1l9g-0 bTYWAd"])[152]',
            locateStrategy: 'xpath'
        },

        //This is the menu shop by result selector
        shopRslt: {
            selector: '(//li[@class="Liststyles__ListItem-sc-114bngs-1 fzheIH"])[42]',
            locateStrategy: 'xpath'
        },

        //These are for verifying menu button transitions
        menuVHome: {
            selector: '//h2[@class="ProductCarouselstyles__Title-sc-159nny3-1 dbJCGZ"]',
            locateStrategy: 'xpath'
        },
        menuVTheme: {
            selector: '(//button[@class="TopBarstyles__TitleButton-sqabgn-2 heqJbe"])[1]',
            locateStrategy: 'xpath'
        },
        menuVShop: {
            selector: '(//button[@class="TopBarstyles__TitleButton-sqabgn-2 heqJbe"])[2]',
            locateStrategy: 'xpath'
        },
        menuVInterest: {
            selector: '(//button[@class="TopBarstyles__TitleButton-sqabgn-2 heqJbe"])[10]',
            locateStrategy: 'xpath'
        },
        menuVSale: {
            selector: '(//div[@class="InPageNavstyles__Content-iyz003-1"])[1]',
            locateStrategy: 'xpath'
        },
        menuVExclu: {
            selector: '//div[@class="InPageNavstyles__Container-iyz003-0 jdjPe"]',
            locateStrategy: 'xpath'
        },
        menuVSup: {
            selector: '(//button[@class="TopBarstyles__TitleButton-sqabgn-2 heqJbe"])[13]',
            locateStrategy: 'xpath'
        },

        //Wishlist page buttons, main page, product name selectors
        wishRmvBtn: {
            selector: '(//button[@data-test="remove-from-wishlist"])[1]',
            locateStrategy: 'xpath'
        },
        wishBagBtn: {
            selector: '(//button[@data-test="add-to-cart-from-wishlist"])[1]',
            locateStrategy: 'xpath'
        },
        wishMyBagBtn: {
            selector: '//a[text()="My Bag"]',
            locateStrategy: 'xpath'
        },
        wishBody: {
            selector: '//div[@class="WishlistPagestyles__MainContainer-v7f64q-2 izBGEy"]',
            locateStrategy: 'xpath'
        },
        wishItem: {
            selector: `(//div[@class="ProductRowstyles__TextWrapper-cbbmmq-11 ecWzVt"])[1]`,
            locateStrategy: 'xpath'
        },

        //Shopping cart buttons, price, zip, tax, and main body
        shopRmvBtn: {
            selector: '(//button[@data-test="remove-from-cart"])[1]',
            locateStrategy: 'xpath'
        },
        shopWishBtn: {
            selector: '(//button[@data-test="move-to-wishlist"])[1]',
            locateStrategy: 'xpath'
        },
        shopPrice: {
            selector: '(//div[@class="ProductRowstyles__ProductPriceContainer-cbbmmq-6"])[1]',
            locateStrategy: 'xpath'
        },
        shopInc: {
            selector: '(//button[@data-test="quantity-increase"])[1]',
            locateStrategy: 'xpath'
        },
        shopDec: {
            selector: '(//button[@data-test="quantity-decrease"])[1]',
            locateStrategy: 'xpath'
        },
        shopBody: {
            selector: '//div[@class="Cartstyles__ContentContainer-sc-7x7mam-2 kMoBmO"]',
            locateStrategy: 'xpath'
        },
        shopZip: {
            selector: '(//input[@class="Inputstyles__InputField-sc-12nwzc4-1 fbDilL"])[1]',
            locateStrategy: 'xpath'
        },
        shopTax: {
            selector: '//div[@class="Pricingstyles__TaxPortion-sc-1jfbpia-2 bKXseF"]',
            locateStrategy: 'xpath'
        },

        //Item page selectors
        itemWish: {
            selector: '(//button[@data-test="remove-from-wishlist"])[1]',
            locateStrategy: 'xpath'
        },
        itemWishAdded: {
            selector: '//div[@data-test="item-added-to-wishlist"]',
            locateStrategy: 'xpath'
        },
        itemBag: {
            selector: '//button[@data-test="add-to-bag"]',
            locateStrategy: 'xpath'
        },
        itemName: {
            selector: '//h1/span[@class="Markup__StyledMarkup-ar1l9g-0 bTYWAd"]',
            locateStrategy: 'xpath'
        },
        itemNum:{
            selector: '//span[@data-test="product-details__product-code"]',
            locateStrategy: 'xpath'
        },
        itemPC: {
            selector: '//span[@data-test="product-details__piece-count"]',
            locateStrategy: 'xpath'
        },

        //Pop up alert selector
        popup: '#IPEinvL104230'
    }
}