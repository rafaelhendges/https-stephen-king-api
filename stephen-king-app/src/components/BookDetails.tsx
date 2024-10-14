import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookDetails } from '../service/api';

interface BookDetails {
    title: string;
    synopsis: string;
    year: string;
    genre: string;
}

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getBookDetails(id)
                .then(response => {
                    setBookDetails(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erro ao buscar detalhes do livro:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Carregando detalhes...</p>;
    if (!bookDetails) return <p>Detalhes não encontrados.</p>;

    return (
        <div>
            <h1>{bookDetails.title}</h1>
            <p><strong>Sinopse:</strong> {bookDetails.synopsis}</p>
            <p><strong>Ano de Publicação:</strong> {bookDetails.year}</p>
            <p><strong>Gênero:</strong> {bookDetails.genre}</p>
        </div>
    );
};

export default BookDetails;
