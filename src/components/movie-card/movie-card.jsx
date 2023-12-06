export const MovieCard = ({ book, onBookClick }) => {
  return <div
      onClick={() => {
        onBookClick(book);
      }}
    >{book.title}</div>;
};