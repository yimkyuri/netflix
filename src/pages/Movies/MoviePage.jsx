import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Dropdown } from "react-bootstrap";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import './MoviePage.style.css';

const MoviePage = () => {
  // eslint-disable-next-line
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");
  const [filterGenre, setFilterGenre] = useState("장르");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const { data: genreData } = useMovieGenreQuery();
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (data?.results) {
      setSortedData(data.results);
    }
  }, [data]);

  const genreSelect = (id, genre) => {
    setSortedData(data.results.filter((genre) => genre.genre_ids.includes(id)));
    setFilterGenre(genre);
  };

  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Dropdown>
            <Dropdown.Toggle
              className="w-100 mb-2"
              variant="danger"
              id="filter-genre"
            >
              {filterGenre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {genreData?.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => genreSelect(item.id, item.name)}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {sortedData.length === 0 ? (
              <div className="text-white text-center">
                일치하는 정보가 없습니다
              </div>
            ) : (
              sortedData.map((movie, index) => (
                <Col key={index} lg={4} md={6} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            )}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages}
            previousLabel="< previous"
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
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
