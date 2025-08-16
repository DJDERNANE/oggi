import { Button } from "@/components/ui/button";
import useIsMobile from "@/lib/isMobile";


export default function Banner() {
  const isMobile = useIsMobile()
  return (
   <div className={`banner ${isMobile ? "banner-mobile": ""}`}>
        <div>
            <h1>50% remise</h1>
            <p>
            Get started with a personalized life insurance plan that 
            meets your needs and protects your loved ones.
            </p>
            <Button>Browse Our Solutions</Button>
        </div>
        <div className={`${isMobile ? 'hidden' : 'banner-img'}`}>
            <img src="/banner.png" alt="" />
        </div>
   </div>
  )
}