import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import MovieList from "./components/MovieList/MovieList";
import MovieFilters from "./components/MovieFilters/MovieFilters";
import MovieSort from "./components/MovieSort/MovieSort";
import './MoviePage.style.css';

const MoviePage = () => {
  // eslint-disable-next-line
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filterGenre, setFilterGenre] = useState(["장르별 검색", "0"]);
  const [filterSort, setFilterSort] = useState(["정렬기준", "0"]);
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });


  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container className="py-4 my-4">
      <Row>
        <Col lg={12} xs={12} className="mt-4">
          <MovieFilters
            className="my-2 me-2 d-inline-block"
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
          />
          <MovieSort
            className="d-inline-block"
            filterSort={filterSort}
            setFilterSort={setFilterSort}
          />
        </Col>
        <MovieList
          data={data}
          page={page}
          setPage={setPage}
          filterGenre={filterGenre}
          filterSort={filterSort}
        />
      </Row>
    </Container>
  );
};

export default MoviePage;
