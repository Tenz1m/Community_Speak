import { Box, Text, Image } from "@chakra-ui/react";
import { NextPage } from "next";
import PageContentLayout from "../../../components/Layout/PageContent";
import DigitalClock from "@/components/extra/DigitalClock";
import MyComponent from "@/components/map/MyComponent";
import RealtimeLocationTracker from "@/components/map/map";
import MyComponent2 from "@/components/map/MyComponent2";
import Quiz from "@/components/quiz/Quiz";
import CrudTable from "@/components/quiz/Crud";
import CommunityChat from "@/components/quiz/Crud";

const CreateCommmunityPostPage: NextPage = () => {
  const pageStyle = {
    backgroundImage: 'url("https://t3.ftcdn.net/jpg/04/78/35/22/360_F_478352239_ckoEVDJZX54tvAzxpL3F7UOr2qoXx0wV.jpg")', // Replace with the URL of your background image
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={pageStyle}>
      <PageContentLayout maxWidth="1060px">
        <Box color="Red" p="14px 0px" borderBottom="1px solid" borderColor="white">
          {/* ai quize app */}
          <Quiz numberOfQuestions={5} />
          {/* <br /><br /><br /> */}
          {/* <Quiz numberOfQuestions={5} /> */}
        </Box>
        <Box>
          <br /><br /><br />
          {/* <DigitalClock /> */}
          <br />
          <MyComponent2 />
          <br />
          <Image
            style={{ width: "500px", height: "300px" }}
            src="https://quizizz.com/media/resource/gs/quizizz-media/quizzes/eb4c4b97-eb4c-4c39-8e59-56b549adac99"
            alt="bus"
          />
        </Box>
      </PageContentLayout>
    </div>
  );
};

export default CreateCommmunityPostPage;
