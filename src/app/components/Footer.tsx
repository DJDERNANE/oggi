import Banner from "./Banner";

export default function Footer() {
  type FooterLink =
  | { MainPages: string[] }
  | { Contacts: string[] };

const footerlink: FooterLink[] = [
  { MainPages: ["Home Page", "Services", "Testimonials"] },
   {
      MainPages: ["Home Page", "Services", "Testimonials"]
    },
  { Contacts: ["Email", "test@oggi.com", "phone", "0666666666"] }
];
  

  return (
    <div className="footer-container">
      <div className="container">
        <Banner />

        <footer className="flex md:flex-row flex-col gap-4 justify-between">
          <div className="w-[300px]">
            <img src="/logo.svg" alt="logo" />
            <p className="my-4">
              Providing reliable and personalized life
              insurance solutions.
            </p>
           
          </div>

          {/* Loop through each category */}
          {footerlink.map((section, index) => {
  const title = Object.keys(section)[0] as keyof FooterLink;
  const links = section[title]! as string[];

  return (
    <div key={index}>
      <p className="title">{title}</p>
      {links.map((link, idx) => (
        <p key={idx}>{link}</p>
      ))}
    </div>
  );
})}
        </footer>
      </div>
    </div>
  );
}
