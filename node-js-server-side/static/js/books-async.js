document.addEventListener("DOMContentLoaded", () => {
    function updateBookList() {
        fetch('/api/books')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const bookContainer = document.getElementById('book-list');
                bookContainer.innerHTML = '';

                data.forEach((book) => {
                    const card = document.createElement('div');
                    card.className = 'card text-white bg-dark my-3 product';

                    const img = document.createElement('img');
                    img.className = 'card-img-top';

                    if (book.image && book.image.type === 'Buffer' && Array.isArray(book.image.data)) {
                        const uint8Array = new Uint8Array(book.image.data);
                        const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
                        img.src = 'data:image/jpeg;base64,' + base64String;
                    } else {
                        console.error('Invalid image data:', book.image);
                    }

                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body book-info-container';

                    const title = document.createElement('h5');
                    title.className = 'card-title text-white';
                    title.textContent = book.title;

                    const price = document.createElement('p');
                    price.className = 'card-text text-white';
                    price.textContent = book.price;

                    const link = document.createElement('a');
                    link.className = 'btn btn-primary';
                    link.href = '/books/' + book.id;
                    link.textContent = 'View Details';

                    cardBody.appendChild(title);
                    cardBody.appendChild(price);
                    cardBody.appendChild(link);

                    card.appendChild(img);
                    card.appendChild(cardBody);

                    bookContainer.appendChild(card);
                });
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    updateBookList();
    setInterval(updateBookList, 6000);
});
