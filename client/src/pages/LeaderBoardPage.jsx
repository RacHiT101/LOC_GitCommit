import Page from "../containers/Page.jsx";
import { Box, Typography, Grid } from "@mui/material";
import TopLeaderCard from "../components/leaderboard/TopLeaderCard.jsx";
import RankBar from "../components/leaderboard/RankBar.jsx";
import { useFetch } from "../hooks/useFetch.js";

const LeaderBoardPage = () => {
  const { data, isLoading } = useFetch("users");
  console.log(data);
  const dataModified = isLoading
    ? []
    : data.sort((a, b) => b.coins - a.coins);
  const dataArray = dataModified.map((item, index) => {
    return {
      ...item,
      ranking: index + 1,
      hours: Math.floor(item?.experience / 240),
      profile: `/src/assets/profiles/${item.profile}`,
    };
  });

  const podiumArray = dataArray.slice(0, 3);
  const rankingArray = dataArray.slice(3);
  const heightPercent = ["10%", "30%", "5%", "8%", "47%"];
  // console.log(dataModified);
  // console.log(dataArray);
  // console.log(podiumArray);
  return (
    <Page title={"Leaderboard"}>
      <Box
        margin={3}
        marginLeft={6}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          marginLeft={1.7}
          sx={{
            textAlign: "flex-start",
            fontSize: "2.5rem",
            color: "white",
            flexGrow: "0.6",
          }}
        >
          Top Learners
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"space-between"}
          
          sx={{
            width: "100%",
            height: heightPercent[1],
          }}
        >
          {podiumArray?.map(({ profile, username, ranking, hours, coins }, index) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
              
              sx={{
                width: "100%",
                height: "100%",
              }}
              key={index}
            >
              <TopLeaderCard
                profileImage={profile}
                name={username}
                ranking={ranking}
                coins={coins}
                hours={hours}
              />
            </Box>
          ))}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          
          sx={{
            width: "100%",
            height: heightPercent[2],
          }}
        >
          <Typography
            marginLeft={2}
            sx={{
              textAlign: "flex-start",
              fontSize: "1.3rem",
              color: "white",
              flexGrow: "0.6",
            }}
          >
            All Users
          </Typography>
        </Box>
        <Box
          display={"flex"}
          marginLeft={1.7}
          paddingBottom={1}
          flexDirection={"row"}
          
          sx={{
            width: "92%",
            height: heightPercent[3],
          }}
        >
          <RankBar
            profileImage={""}
            rankValue={"RANK"}
            name={"NAME"}
            xpValue={"XP"}
            assetValue={"COINS"}
            hours={"HOURS"}
            podiumArray={podiumArray}
          />
        </Box>
        <Box
          marginLeft={1.7}
          sx={{ width: "92%", height: heightPercent[4], overflowY: "auto" }}
        >
          <Grid
            container
            rowSpacing={1}
            sx={{
              width: "100%",
              height: "100%",
              margin: 0,
              overflow: "hidden",
            }}
          >
            {rankingArray
              .slice(0, 5)
              .map(
                (
                  { ranking, profile, username, hours, experience, coins },
                  index
                ) => (
                  <Grid key={index} item xs={12}>
                    <RankBar
                      profileImage={profile}
                      name={username}
                      hours={hours}
                      assetValue={coins}
                      xpValue={experience}
                      rankValue={ranking}
                    />
                  </Grid>
                )
              )}
          </Grid>
        </Box>
      </Box>
    </Page>
  );
};

export default LeaderBoardPage;
