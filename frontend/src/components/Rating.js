const Rating = (props) => {
  const { rating, numReviews } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? "fa fa-star"
              : rating >= 0.5
              ? "fas fa-star-half"
              : "far fa-star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? "fa fa-star"
              : rating >= 1.5
              ? "fa fa-star-half"
              : "fa fa-star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? "fa fa-star"
              : rating >= 2.5
              ? "fa fa-star-half"
              : "fa fa-star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? "fa fa-star"
              : rating >= 3.5
              ? "fa fa-star-half"
              : "fa fa-star-empty"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? "fa fa-star"
              : rating >= 4.5
              ? "fa fa-star-half"
              : "fa fa-star-empty"
          }
        ></i>
      </span>
      <span> Reviews {numReviews}</span>
    </div>
  );
};
export default Rating;
