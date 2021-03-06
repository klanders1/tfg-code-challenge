import React, {
  FC,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import { getComments } from 'store/comments.slice';
import { getPost } from 'store/posts.slice';
import {
  Row,
  Col,
  Typography,
  Spin,
} from 'antd';
import { RootState } from 'store/store';
import CommentCard from './CommentCard';

const {
  Text,
  Paragraph,
} = Typography;

const PostDetail: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postDetail, loading } = useSelector((state: RootState) => state.posts);
  const { commentList } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getComments(postDetail.id));
  }, [dispatch, id, postDetail.id]);

  return (
    loading ? (
      <Row justify="center">
        <Spin />
      </Row>
    )
      : (
        <>
          <Row>
            <Col md={4}>
              <Text strong>Title:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{postDetail.title}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Text strong>Conteeeeeent:</Text>
            </Col>
            <Col md={18}>
              <Paragraph>{postDetail.body}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Text strong>Comments:</Text>
          </Row>
          {commentList.map((comment) => (
            <CommentCard
              key={comment.id}
              name={comment.name}
              email={comment.email}
              body={comment.body}
            />
          ))}
        </>)
  );
};

export default PostDetail;
