import MyButton from "./MyButton";

function Footer()
{
return (

    <footer className="  my-4 px-2 py-5 w-full flex items-center justify-between bg-neutral-900 text-amber-50" >
      <h1 className ="text-xl font-bold"> Great Learning</h1>
      <p className=" font-light underline">Made with great efforts 😊</p>
      <MyButton title="Contact Us" />
</footer>
);


}
export default Footer;