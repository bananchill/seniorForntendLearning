import * as yup from 'yup';

// Список допустимых жанров (при необходимости обновите его)
const allowedGenres = ['fiction', 'non-fiction', 'fantasy', 'biography'];

// Схема валидации книги
const bookSchema = yup.object().shape({
    name: yup.().required(),
    author: yup.string().required(),
    pagesCount: yup.number().integer().positive().optional(),
    link: yup.string()
        .url()
        .optional()
        .test(
            'not-empty',
            'Link не может быть пустой строкой',
            value => value !== ''
        ),
    genre: yup.string().oneOf(allowedGenres).optional(),
});

// Функция, которая возвращает невалидные книги
export default function getInvalidBooks(books) {
    return books.filter(book => !bookSchema.isValidSync(book));
}