import { Button } from "@/components/ui/button";


export default function Banner() {
  return (
   <div className="banner">
        <div>
            <h1>50% remise</h1>
            <p>
            Get started with a personalized life insurance plan that 
            meets your needs and protects your loved ones.
            </p>
            <Button>Browse Our Solutions</Button>
        </div>
        <div className="banner-img">
            <img src="/banner.png" alt="" />
        </div>
   </div>
  )
}