import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restrictied" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
  description:string;
  name:string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
  description:string;
  name:string;
}

interface CommunityState {
  [key: string]:
    | CommunitySnippet[]
    | { [key: string]: Community }
    | Community
    | boolean
    | undefined;
  mySnippets: CommunitySnippet[];
  initSnippetsFetched: boolean;
  visitedCommunities: {
    [key: string]: Community;
  };
  currentCommunity: Community;
}

export const defaultCommunity: Community = {
  id: "",
  creatorId: "",
  numberOfMembers: 0,
  privacyType: "public",
  description: "",
  name:""
};

export const defaultCommunityState: CommunityState = {
  mySnippets: [],
  initSnippetsFetched: false,
  visitedCommunities: {},
  currentCommunity: defaultCommunity,
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
