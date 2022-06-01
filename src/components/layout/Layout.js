import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";

export default function Layout(props) {
  const isLogged = props.isLogged;
  const setIsLogged = props.setIsLogged;

  return (
    <div>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} />
      <Main />
      <Footer />
    </div>
  );
}
