import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { fetchPostsByid } from "../../store/utils/Thunks";
import Spinner from "react-bootstrap/Spinner";
import { clearPostById } from "../../store/reducers/Posts";
import NewsLeter from "../utils/NewsLeter";

const Posts = () => {
  const post = useSelector((state) => state.posts);
  console.log({ post });
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchPostsByid(params.id));
  }, []);
  useEffect(() => {
    return () => {
      dispatch(clearPostById());
    };
  }, []);
  return (
    <>
      {post.postById ? (
        <div className="article_container">
          <h1>{post.postById.title}</h1>
          <div
            className="image"
            style={{ background: `url(${post.postById.imagexl})` }}
          ></div>
          <div className="author">
            Created by: <span>{post.postById.author}</span>
            <Moment fromat="DD MMMM">{post.postById.createdAt}</Moment>
          </div>
          <div className="mt-3 content">
            <div
              dangerouslySetInnerHTML={{ __html: post.postById.content }}
            ></div>
          </div>
        </div>
      ) : null}
      {post.loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading..</span>
          </Spinner>
        </div>
      ) : null}
      <NewsLeter />
    </>
  );
};

export default Posts;
