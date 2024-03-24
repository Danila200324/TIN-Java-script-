const Book = require('../model/book');
const User = require('../model/user');

const createBook = async (bookData) => {
    try {
        return await Book.create(bookData);
    } catch (error) {
        throw new Error('Error creating the book: ' + error.message);
    }
};

const getAllBooks = async () => {
    return await Book.findAll();
};

const getBookById = async (bookId) => {
    const book = await Book.findByPk(bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    return book;
};

const updateBook = async (bookId, bookData) => {
    try {
        const book = await Book.findByPk(bookId);

        if (!book) {
            return null;
        }
        const updatedAttributes = {};

        for (const key in bookData) {
            if (bookData.hasOwnProperty(key) && book[key] !== undefined) {
                updatedAttributes[key] = bookData[key];
            }
        }

        if (Object.keys(updatedAttributes).length === 0) {
            return book;
        }

        const [count] = await Book.update(updatedAttributes, {
            where: { id: bookId },
        });

        if (count === 0) {
            return null;
        }

        return await Book.findByPk(bookId);
    } catch (error) {
        throw error;
    }
};

const deleteBook = async (bookId) => {
    try {
        const book = await Book.findByPk(bookId);

        if (!book) {
            return null;
        }

        await book.destroy();

        return book;
    } catch (error) {
        throw error;
    }
};

const getBooksByUserId = async (userId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return null;
        }

        return await Book.findAll({
            where: {userId: user.id},
        });
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    getBooksByUserId
};
