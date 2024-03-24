const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const bookService = require("./service/bookService");
const userService = require("./service/userService");
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const Book = require('./model/book')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const initializePassport = require('./config/passport-config')


initializePassport(passport)
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(flash())
app.use(session({
    secret: "danven",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/books', checkAuthenticated, async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    try {
        const books = await bookService.getAllBooks();
        res.render('books', { books, error: null });
    } catch (error) {
        console.error(error);
        res.render('books', { books: [], error: 'An error occurred while fetching books.' });
    }
});

app.get('/image', async (req, res) => {

        res.render('image');

});

app.get('/api/image', async (req, res) => {
    try {
        // Retrieve and send books data as JSON
        const book = await bookService.getAllBooks();
        const img = book[0].image;
        res.json(img);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
});

app.get('/api/books', async (req, res) => {
    try {
        // Retrieve and send books data as JSON
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
});

app.get('/books/:id', checkAuthenticated, async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await bookService.getBookById(bookId);

        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('book-info', {book: book});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/book/add', checkAuthenticated, (req, res) => {
    res.render('book-add', { successMessage: null, errorMessage: null });
});

app.post('/book/create', checkAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { title, price, description, contact_phone, contact_email, category } = req.body;
        const userId = req.user.id;
        const image = req.file.buffer;
        await Book.create({ title, price, description, contact_phone, contact_email, category, image, userId });
        res.render('book-add', { successMessage: 'Book added successfully', errorMessage: null });
    } catch (error) {
        console.error(error);
        res.render('book-add', { successMessage: null, errorMessage: 'An error occurred while adding the book' });
    }
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register', { successMessage: req.flash('success'), errorMessage: req.flash('error') });
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await userService.createUser({
            email: req.body.email,
            password: hashedPassword,
            role: 'user'
        });
        res.redirect('/login');
    } catch (error) {
        console.error("Error registering user:", error);
        req.flash('error', 'An error occurred while registering. Please try again.');
        res.redirect('/register');
    }
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login', { successMessage: req.flash('success'), errorMessage: req.flash('error') });
});

app.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.redirect('/login');
        }
        if (!user) {
            req.flash('error', 'Incorrect email or password. Please try again.');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Login successful. Welcome back!');
            return res.redirect('/books/');
        });
    })(req, res, next);
});

app.get('/logout', checkAuthenticated, (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

//the part of the program for generating the random books
const { generateRandomBookData } = require('./async-check-filling/fill_books');

function createRandomBook() {
    const randomBookData = generateRandomBookData();
    bookService.createBook(randomBookData)
        .then((createdBook) => {
            console.log('Created a random book:', createdBook.title);
        })
        .catch((error) => {
            console.error(error);
        });
}

setInterval(createRandomBook, 4000);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/books/')
    }
    next()
}

sequelize.sync()
    .then(() => {
        console.log('Database and tables synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});


