export const MovieView = ({ book, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={book.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{book.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{book.director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};