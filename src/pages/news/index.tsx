import NewsComponent from "@/components/news/news";
import { NextPage } from "next";

const chat: NextPage = () => {
  const pageStyle = {
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20210814/pngtree-blue-purple-simple-gradient-background-image_760572.jpg")', // Replace with the path to your image
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={pageStyle}>
      <NewsComponent />
     </div>
  );
};

export default chat;
