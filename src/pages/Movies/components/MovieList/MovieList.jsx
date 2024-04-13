import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const MovieList = ({ data, page, setPage, filterGenre, filterSort }) => {
  
  const sortData = [...(data?.results || [])].sort((a, b) => {
    const sortOrder = filterSort[1] === "1" ? -1 : 1;
    return (a.vote_average - b.vote_average) * sortOrder;
  });
  
  const filterData = sortData.filter((val) => {
    return filterGenre[1] === "0" || val.genre_ids.includes(Number(filterGenre[1]));
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <Col lg={12}>
      <Row>
        {filterData.length === 0 ? (
          <div className="py-4 mt-4 text-center">
            해당 조건에 맞는 목록이 없습니다
          </div>
        ) : (
          filterData.map((movie) => (
            <Col key={movie.id} lg={3} xs={6} className="mt-4 mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
      <Row>
        <div className="my-4 d-flex justify-content-center">
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={data && data.total_pages}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </div>
      </Row>
    </Col>
  );
};

export default MovieList;
