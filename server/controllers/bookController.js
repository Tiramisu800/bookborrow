require('../models/database');
const Book = require('../models/Book');



/*
* GET /
* Homepage
*/
exports.homepage = async(req,res)=>{

    try {
        const limitNumber = 5;
        const latest = await Book.find({}).sort({_id:-1}).limit(limitNumber);

        const book = {latest};
        res.render('index', {title:'Book Borrowing - Home', book});
    }catch (error){
        res.status(500).send({message:error.message || "Error Occurred"})
    }

}

/**
 * GET /book/:id
 * Book
 */
exports.exploreBook = async(req, res) => {
    try {
        let bookId = req.params.id;
        const book = await Book.findById(bookId);
        res.render('book', { title: 'Book Borrowing - Book', book } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/**
 * POST /search
 * Book
 */
exports.searchBook = async(req,res)=>{
    //searchTerm

    try{
        let searchTerm = req.body.searchTerm;
        let book = await Book.find({$text: {$search: searchTerm, $diacriticSensitive:true }});
        res.render('search',{title:'Book Borrowing - Search', book});
    }catch (e) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }
}


/**
 * GET /explore-latest
 * Explplore Latest
 */
exports.exploreMore = async(req, res) => {
    try {
        const book = await Book.find({});
        res.render('explore-more-books', { title: 'Book Borrowing - More Books', book } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred" });
    }
}



/**
 * GET /explore-random
 * Explore Random as JSON
 */
exports.exploreRandom = async(req, res) => {
    try {
        let count = await Book.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let book = await Book.findOne().skip(random).exec();
        res.render('explore-random', { title: 'Book Borrowing - Explore Random', book } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}


/**
 * GET /submit-book
 * Submit Book
 */
exports.submitBook = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-book', { title: 'Book Borrowing - Submit Book', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-book
 * Submit Book
 */
exports.submitBookOnPost = async(req, res) => {
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No Files where uploaded.')
        } else{
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
            })
        }


        const newBook = new Book({
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            review: req.body.review,
            owner_name: req.body.oname,
            owner_telegram: req.body.telegram,
            owner_email: req.body.email,
            "borrows.borrow_status": req.body.email,
            image: newImageName
        });

        await newBook.save();


        req.flash('infoSubmit','Book has been added.')
        res.redirect('/submit-book');
    }catch (error) {
        res.json(error);
        // req.flash('infoError',error)
        // res.redirect('/submit-book');
    }

}


/*
async function insertDymmyBooksData(){
    try{
        await Book.insertMany({
            "name":"Little Prince",
            "author":"Kakoito Francuz",
            "description":"Liitle boy take care his planet and many philosophic thouths:)",
            "review":" ",
            "owner.owner_name":"Adilet",
            "owner.owner_telegram":"@notmeet",
            "owner.owner_email":"123@gmail.com",
            "borrows.borrow_status":"Borrowed",
            "borrows.borrower.borrower_name": "Katya",
            "borrows.borrower.borrower_telegram": "@meowmeow",
            "borrows.borrower.borrower_email": "qwer@gmail.com"
        })
    } catch (error) {
        console.log(error)
    }
}

insertDymmyBooksData();
*/