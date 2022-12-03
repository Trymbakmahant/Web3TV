import Card from "../card/card";
import Sidebar from "../sidebar/Sidebar";

 const Logo = "/logo512.png";
 const objects= [
    {
      id: "1",
      name: "Jsonis",
      description:
        "The InterPlanetary File System (IPFS) is a protocol, hypermedia and file sharing peer-to-peer network",
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F3%2F34%2FCars_2006.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCars_(film)&tbnid=lwBg-owBejYAzM&vet=12ahUKEwiK0LGxhNn7AhWKk9gFHYJsDOkQMygHegUIARDtAQ..i&docid=eZItEn5mnMS3IM&w=259&h=383&q=cars&ved=2ahUKEwiK0LGxhNn7AhWKk9gFHYJsDOkQMygHegUIARDtAQ",
      videoUrl: "https://www.youtube.com/watch?v=tA8CW9wFY28",
    },
    {
      id: "2",
      name: "Jis",
      description: "The  hypermedia and file sharing peer-to-peer network",
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F3%2F34%2FCars_2006.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCars_(film)&tbnid=lwBg-owBejYAzM&vet=12ahUKEwiK0LGxhNn7AhWKk9gFHYJsDOkQMygHegUIARDtAQ..i&docid=eZItEn5mnMS3IM&w=259&h=383&q=cars&ved=2ahUKEwiK0LGxhNn7AhWKk9gFHYJsDOkQMygHegUIARDtAQ",
      videoUrl: "https://www.youtube.com/watch?v=tA8CW9wFY28",
    },
    {
      id: "3",
      name: "Json",
      description:
        "The  File System (IPFS) is a protocol, hypermedia and file sharing peer-to-peer network",
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F3%2F34%2FCars_2006.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCars_(film)&tbnid=lwBg-owBejYAzM&vet=12ahUKEwiK0LGxhNn7AhWKk9gFHYJsDOkQMygHegUIARDtAQ..i&docid=eZItEn5mnMS3IM&w=259&h=383&q=cars&ved=2ahUKEwiK0LGxhNn7AhWKk9gFHYJsDOkQMygHegUIARDtAQ",
      videoUrl: "https://www.youtube.com/watch?v=tA8CW9wFY28",
    },
  ];

function Home() {
  return (
    <div>
      <Sidebar />
      <div style = {{display: "inline-block", marginLeft: "7%"}}>
      {objects.map(Jsonis => {
        return <Card
          key={Jsonis.id}
          name={Jsonis.name}
          description={Jsonis.description}
          thumbnail={Logo}
          id={Jsonis.id}
        />
      })
      }
      </div>
    </div>
  );
}

export default Home;
