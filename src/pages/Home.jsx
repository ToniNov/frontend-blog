import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {fetchPopularPosts, fetchPosts, fetchTags} from "../redux/slices/postsSlices";

export const Home = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);


  // For tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
        setValue(newValue);
  }
  const onClickHandlerPopular = () => {
      dispatch(fetchPopularPosts())
  }
  const onClickHandlerNew = () => {
      dispatch(fetchPosts())
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
      >
        <Tab onClick={onClickHandlerNew} label="New" />
        <Tab onClick={onClickHandlerPopular} label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                        //?  `http://localhost:7654${obj.imageUrl}`
                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Dave Fisher",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "This is a test comment",
              },
              {
                user: {
                  fullName: "Jon Fisher",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
