import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import { Post, PostVote } from "../atoms/postsAtom";
import CreatePostLink from "../components/Community/CreatePostLink";
import Recommendations from "../components/Community/Recommendations";
import PageContentLayout from "../components/Layout/PageContent";
import PostLoader from "../components/Post/Loader";
import PostItem from "../components/Post/PostItem";
import { auth, firestore } from "../firebase/clientApp";
import usePosts from "../hooks/usePosts";
import DigitalClock from "@/components/extra/DigitalClock";
import Calender from "@/components/extra/Calander";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
    loading,
    setLoading,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);


  // loged in user Home Feed
  const getUserHomePosts = async () => {
    setLoading(true);
    try {
      const feedPosts: Post[] = [];

      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );

        // Shuffling the order of community indices
        const shuffledCommunityIndices = myCommunityIds
          .map((_, index) => index)
          .sort(() => Math.random() - 0.5);

        const usedIndices: number[] = [];

        let postPromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];

        // Fetching posts from the first 3 shuffled communities
        for (let i = 0; i < 12 && i < shuffledCommunityIndices.length; i++) {
          let index: number;

          do {
            // Get a random index that hasn't been used yet
            index = shuffledCommunityIndices[i];
          } while (usedIndices.includes(index));

          usedIndices.push(index);

          postPromises.push(
            getDocs(
              query(
                collection(firestore, "posts"),
                where("communityId", "==", myCommunityIds[index]),
                limit(1),
              )
            )
          );
        }

        const queryResults = await Promise.all(postPromises);

        queryResults.forEach((result) => {
          const posts = result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Post[];
          feedPosts.push(...posts);
        });



        // Do Random post After
        const postQuery = query(
          collection(firestore, "posts"),
          orderBy("voteStatus", "desc"),
          limit(25)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        feedPosts.push(...posts);
      }

      // This part might be not used |>
      // } than use this



      // User has not joined any communities yet
      else {
        console.log("USER HAS NO COMMUNITIES - GETTING GENERAL POSTS");

        const postQuery = query(
          collection(firestore, "posts"),
          orderBy("voteStatus", "desc"),
          limit(25)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        feedPosts.push(...posts);
      }

      console.log("HERE ARE FEED POSTS", feedPosts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: feedPosts,
      }));

      // if not in any, get 5 communities ordered by number of members
      // for each one, get 2 posts ordered by voteStatus and set these to postState posts
    } catch (error: any) {
      console.log("getUserHomePosts error", error.message);
    }
    setLoading(false);
  };


  // Without Login User
  const getNoUserHomePosts = async () => {
    console.log("GETTING NO USER FEED");
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(25)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("NO USER FEED", posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("getNoUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    const postIds = postStateValue.posts.map((post) => post.id);
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where("postId", "in", postIds)
    );
    const unsubscribe = onSnapshot(postVotesQuery, (querySnapshot) => {
      const postVotes = querySnapshot.docs.map((postVote) => ({
        id: postVote.id,
        ...postVote.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    /**
     * initSnippetsFetched ensures that user snippets have been retrieved;
     * the value is set to true when snippets are first retrieved inside
     * of getSnippets in useCommunityData
     */
    if (!communityStateValue.initSnippetsFetched) return;

    if (user) {
      getUserHomePosts();
    }
  }, [user, communityStateValue.initSnippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) {
      getNoUserHomePosts();
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (!user?.uid || !postStateValue.posts.length) return;
    getUserPostVotes();

    // Clear postVotes on dismount
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [postStateValue.posts, user?.uid]);

  return (
    <PageContentLayout>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post: Post, index) => (
              <PostItem
                key={post.id}
                post={post}
                postIdx={index}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={3} position="sticky" top="10px">
        <Recommendations />
        <DigitalClock />
        <Calender />
        {/* <Weather/> */}
        {/* <Quize /> */}
        {/* <Bus /> */}
        {/* <PersonalHome /> */}
      </Stack>
    </PageContentLayout>
  );
};

export default Home;
