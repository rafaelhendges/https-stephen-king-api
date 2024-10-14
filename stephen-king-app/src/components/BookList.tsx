import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../service/api';

interface Book {
    id: string;
    title: string;
}

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBooks()
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar livros:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Carregando livros...</p>;

    return (
        <div>
            <h1>Livros de Stephen King</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link to={`/details/${book.id}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
