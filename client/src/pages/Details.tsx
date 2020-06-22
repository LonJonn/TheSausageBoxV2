import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailsPage: React.FC = () => {
  const { slug } = useParams();
  // const [loading, setLoading] = useState(false);
  // const [seasons, setSeasons] = useState({});

  const url = `http://localhost:3000/api/shows/seasons/${slug}`;
  const seasons = [
    {
      meta: {
        first_air_date: "2013-12-02",
        description:
          "Rick and Morty visit a pawn shop in space, encounter various alternate and virtual realities, and meet the devil at his antique shop.",
        title: "Season 1",
        season: "1",
        poster: "/h9RUEsA6BROWcg0QF6ngNPX5FFh.jpg",
      },
      episodes: [
        {
          id_episode: "31374",
          episode: "1",
          season: "1",
          title: "Pilot",
          description:
            "Rick moves in with his daughter's family and establishes himself as a bad influence on his grandson, Morty.",
          still_path: "/oWaKdUeMOlVZem3v9DWsdDGlTuY.jpg",
          air_date: "2013-12-02",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "31357",
          episode: "2",
          season: "1",
          title: "Lawnmower Dog",
          description:
            "Rick and Morty try to incept Morty's math teacher into giving Morty an 'A'.  Meanwhile, Rick gives Jerry a device to train their dog, Snuffles.",
          still_path: "/r3CzGadu9EEunFtuTqmXxMRkX5V.jpg",
          air_date: "2013-12-09",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "31336",
          episode: "3",
          season: "1",
          title: "Anatomy Park",
          description:
            "Christmas day, Rick's friend, Reuben, comes over for his annual medical checkup.  Meanwhile Jerry learns his parents have a new friend.",
          still_path: "/3cp6QrExDBQUFGcOu43NBtaugNY.jpg",
          air_date: "2013-12-16",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "27139",
          episode: "4",
          season: "1",
          title: "M. Night Shaym-Aliens!",
          description:
            "Rick and Morty try to get to the bottom of a mystery in this M. Night Shyamalan style twistaroony of an episode!",
          still_path: "/dAlrn9OIvMuaebSCK3JJVYn8qnu.jpg",
          air_date: "2014-01-13",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "30483",
          episode: "5",
          season: "1",
          title: "Meeseeks and Destroy",
          description:
            "When Morty thinks Rick's adventures are too dangerous, he challenges Rick to let him lead one instead.",
          still_path: "/9nh9ZpxOyCJMD73biS2h3CvHfm2.jpg",
          air_date: "2014-01-20",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "32981",
          episode: "6",
          season: "1",
          title: "Rick Potion #9",
          description:
            "Rick provides Morty with a love potion to get his dream girl, only for the serum to backfire and create a living Cronenberg nightmare.",
          still_path: "/cuNE6h2oSvm1gvxOzFIbswjwAjq.jpg",
          air_date: "2014-01-27",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "30352",
          episode: "7",
          season: "1",
          title: "Raising Gazorpazorp",
          description:
            "Morty convinces Rick to buy him a sexy robot.  Later Rick and Summer spend some quality time together.",
          still_path: "/ctFz5NLR4kRwpXsdC6xvqQI8U1h.jpg",
          air_date: "2014-03-10",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "32500",
          episode: "8",
          season: "1",
          title: "Rixty Minutes",
          description:
            "Rick hacks the cable box, but the family are distracted by another one of his inventions.",
          still_path: "/ytoFeNYrPoIDecWVorXHpC73urr.jpg",
          air_date: "2014-03-17",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "32390",
          episode: "9",
          season: "1",
          title: "Something Ricked This Way Comes",
          description:
            "Rick battles the devil and upsets Summer. Meanwhile, Jerry and Morty hang out.",
          still_path: "/daA9q3U3ibIcm5OGuklySeIsQWV.jpg",
          air_date: "2014-03-24",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "30983",
          episode: "10",
          season: "1",
          title: "Close Rick-Counters of the Rick Kind",
          description:
            "Rick and Morty have a falling out when Rick is approached by some familiar associates.",
          still_path: "/8gOouaPQhfB8cC01sYyFLYgTcRq.jpg",
          air_date: "2014-04-07",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "30977",
          episode: "11",
          season: "1",
          title: "Ricksy Business",
          description:
            "Beth and Jerry go away on a trip, so Rick decides to throw a party.",
          still_path: "/mLJbMSLaB8CZmr07GJGH9TiG4PL.jpg",
          air_date: "2014-04-14",
          is_chromecast_supported: "0",
        },
      ],
    },
    {
      meta: {
        first_air_date: "2015-07-26",
        description:
          "After Rick and Morty decided to unfreeze time, they must deal with alien parasites, alternate Jerrys and a decaying, possibly non-existent dimension.",
        title: "Season 2",
        season: "2",
        poster: "/wuzVQl2Q6Qozt6kYnFDxD5KH9Zw.jpg",
      },
      episodes: [
        {
          id_episode: "23095",
          episode: "1",
          season: "2",
          title: "A Rickle in Time",
          description:
            "Rick, Morty, and Summer get into trouble when time is fractured by a feedback loop of uncertainty that split reality into more than one equally possible impossibilities. Meanwhile, Beth and Jerry go to extreme lengths to save a deer struck by their vehicle.",
          still_path: "/49kPj1L8KkJAnhnqJIftr3fdXHt.jpg",
          air_date: "2015-07-26",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "22933",
          episode: "2",
          season: "2",
          title: "Mortynight Run",
          description:
            "Rick teaches Morty to drive while leaving Jerry at a popular day care made just for him. Morty's conscience has him hunt down an assassin rather than spending the day at an alien arcade.",
          still_path: "/zsrtewu4jJPh4vB5ZDB9oW36tm8.jpg",
          air_date: "2015-08-02",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "22918",
          episode: "3",
          season: "2",
          title: "Auto Erotic Assimilation",
          description:
            "Rick gets emotionally invested when meeting an old friend, while Beth and Jerry have a falling out after making a discovery under the garage.",
          still_path: "/6zOHPMTvduupyEDqL8FnLGt6fxq.jpg",
          air_date: "2015-08-09",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "22803",
          episode: "4",
          season: "2",
          title: "Total Rickall",
          description:
            "Trapped inside the house with an ever-increasing number of parasitic alien shape-shifters capable of altering memories, an uncertain Rick and the Smiths search for a way to determine which of them are real.",
          still_path: "/xVQqoLFSCzFtKp0OkW4PGPc7NtB.jpg",
          air_date: "2015-08-16",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "22749",
          episode: "5",
          season: "2",
          title: "Get Schwifty",
          description:
            "When a massive head descends into Earth's atmosphere, Rick and Morty must save the planet by coming up with a new hit song. Meanwhile, Jerry, Beth, and Summer become part of a new religion.",
          still_path: "/3gqEcSpAaTERNPRThG2N4OlXrw9.jpg",
          air_date: "2015-08-23",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "22677",
          episode: "6",
          season: "2",
          title: "The Ricks Must Be Crazy",
          description:
            "Rick and Morty travel inside the car's battery, where Morty discovers Rick has created a universe containing sentient life solely to produce power for him. Meanwhile, Summer must deal with being locked in the car with Rick's overzealous security system.",
          still_path: "/nK4uwrLAsSTMAi2iK1kzceg51NW.jpg",
          air_date: "2015-08-30",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "22539",
          episode: "7",
          season: "2",
          title: "Big Trouble in Little Sanchez",
          description:
            "Rick joins in on hijinks while Beth and Jerry sort out relationship issues.",
          still_path: "/oWe3wNrsJdItJjCc5NXHmn5Xfcy.jpg",
          air_date: "2015-09-13",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "21461",
          episode: "8",
          season: "2",
          title: "Interdimensional Cable 2: Tempting Fate",
          description: "Jerry gets sick, and Rick sparks up the TV.",
          still_path: "/fm5rzPCXTLr1SlSmylBkNkZhF1P.jpg",
          air_date: "2015-09-20",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "22438",
          episode: "9",
          season: "2",
          title: "Look Who's Purging Now",
          description:
            "Morty makes a mistake and Jerry and Summer work on their father-daughter relationship.",
          still_path: "/uK0bpV9Oc07FfCsPk6BISqKj7bS.jpg",
          air_date: "2015-09-27",
          is_chromecast_supported: "0",
        },
        {
          id_episode: "24708",
          episode: "10",
          season: "2",
          title: "The Wedding Squanchers",
          description: "The whole family makes mistakes.",
          still_path: "/tre38ZRSWjC1Z5f7AbI4TDo8w1t.jpg",
          air_date: "2015-10-04",
          is_chromecast_supported: "0",
        },
      ],
    },
    {
      meta: {
        first_air_date: "2017-04-01",
        description:
          "Rick and Morty travel to Atlantis and take some time to relax, plus Rick turns himself into a pickle and faces off against the president.",
        title: "Season 3",
        season: "3",
        poster: "/lVcwMfbHx4QguLbZT4bink9mcgd.jpg",
      },
      episodes: [
        {
          id_episode: "5179",
          episode: "1",
          season: "3",
          title: "The Rickshank Rickdemption",
          description:
            "The Smith family tries to cope without Rick, which is painful enough on its own without taking into consideration the stifling rules put into place by the Federation. Meanwhile Rick's past is finally revealed as he attempts to get out of his prison",
          still_path: "/xwxRcQRpTpUlWN34mP0SpQCbfvs.jpg",
          air_date: "2017-04-01",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "11019",
          episode: "2",
          season: "3",
          title: "Rickmancing the Stone",
          description:
            "Rick, Morty and Summer travel to a post-apocalyptic dimension and meet some dangerous enemies.",
          still_path: "/2uXVtyVMsQ4ju9Ts4Fhnj5IXFdr.jpg",
          air_date: "2017-07-30",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "10383",
          episode: "3",
          season: "3",
          title: "Pickle Rick",
          description:
            "It's family therapy time in this one broh. Classic stuff. Pickle Rick too.",
          still_path: "/6DEZ0rpzMyBrN9QroA7FTlbgwjL.jpg",
          air_date: "2017-08-06",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "10300",
          episode: "4",
          season: "3",
          title: "Vindicators 3: The Return of Worldender",
          description: "Action and heroes.",
          still_path: "/c1BdCiPvk13xWalDrm2VT4wFEBw.jpg",
          air_date: "2017-08-13",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "10118",
          episode: "5",
          season: "3",
          title: "The Whirly Dirly Conspiracy",
          description:
            "Rick and Jerry goes on an adventure while Beth fails as a mother and Summer has body issues.",
          still_path: "/sGWF8xQH6OtCk6m7WxBG8kztma9.jpg",
          air_date: "2017-08-20",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "10032",
          episode: "6",
          season: "3",
          title: "Rest and Ricklaxation",
          description: "Rick and Morty need a break.",
          still_path: "/kBlUIclFyabFCzaubgot6hUyQii.jpg",
          air_date: "2017-08-27",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "9869",
          episode: "7",
          season: "3",
          title: "The Ricklantis Mixup",
          description:
            "Rick and Morty head to Atlantis. Meanwhile, the Citadel of Ricks undergoes major changes under new leadership.",
          still_path: "/qaQewfpan7KdMLVkAzBQoWPO1fY.jpg",
          air_date: "2017-09-10",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "9787",
          episode: "8",
          season: "3",
          title: "Morty's Mind Blowers",
          description:
            "Morty's memories are restored and we learn the truth in this one broh.",
          still_path: "/htGYT3DrkEqT1ZB7lgLCEyUH2EF.jpg",
          air_date: "2017-09-17",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "9731",
          episode: "9",
          season: "3",
          title: "The ABC's of Beth",
          description:
            "Jerry pulls in some lady in this one broh. Beth revisits her childhood.",
          still_path: "/qGwRWniPFiFsXE1Y13PxP71tnSW.jpg",
          air_date: "2017-09-24",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "9592",
          episode: "10",
          season: "3",
          title: "The Rickchurian Mortydate",
          description:
            "Rick goes toe to toe with the President in this one broh.",
          still_path: "/yFNEt4UN6RKIuWOqIA7uAOmgyBx.jpg",
          air_date: "2017-10-01",
          is_chromecast_supported: "1",
        },
      ],
    },
    {
      meta: {
        first_air_date: "2019-11-10",
        description: "",
        title: "Season 4",
        season: "4",
        poster: "/ylL3eViYKBhtjaqVe4pLMslVBjR.jpg",
      },
      episodes: [
        {
          id_episode: "65211",
          episode: "1",
          season: "4",
          title: "Edge of Tomorty: Rick, Die, Rickpeat",
          description: "",
          still_path: "",
          air_date: "2019-11-10",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "66946",
          episode: "2",
          season: "4",
          title: "The Old Man and the Seat",
          description:
            "Jerry works on an app with an alien despite Rick's warning not to and Morty's objections. Rick tracks down his own manure mystery.",
          still_path: "/3QrhXUMAtmNvtlJy3XLDWvr2Xk7.jpg",
          air_date: "2019-11-17",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "68779",
          episode: "3",
          season: "4",
          title: "One Crew Over the Crewcoo's Morty",
          description: "",
          still_path: "/ksqikiFg2Urv6SxZH1GPTWeU9un.jpg",
          air_date: "2019-11-24",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "71449",
          episode: "4",
          season: "4",
          title: "Claw and Hoarder: Special Ricktim's Morty",
          description: "",
          still_path: "",
          air_date: "2019-12-08",
          is_chromecast_supported: "1",
        },
        {
          id_episode: "72766",
          episode: "5",
          season: "4",
          title: "Rattlestar Ricklactica",
          description:
            "Lots of things in space broh. Snakes and sharp stuff. Watch this broh.",
          still_path: "/po6Uuzz17eFcGFgiB2f6n7v0chL.jpg",
          air_date: "2019-12-15",
          is_chromecast_supported: "1",
        },
      ],
    },
  ];
  // useEffect(() => {
  //   axios.get(url).then((res) => {
  //     setSeasons(res.data);
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <React.Fragment>
      <h1>Details</h1>
      {/* {loading && <h3>Loading</h3>} */}
      {seasons.map((season) => (
        <div key={season.meta.season}>
          <h1>{season.meta.title}</h1>
          {season.episodes.map((episode) => (
            <div key={episode.id_episode}>
              <p>{episode.id_episode}</p>
              <p>{episode.title}</p>
              <p>{episode.episode}</p>
              <p>{episode.description}</p>
            </div>
          ))}
          <br />
          <br />
        </div>
      ))}
    </React.Fragment>
  );
};

export default DetailsPage;
