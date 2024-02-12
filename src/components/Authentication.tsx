import { useRouter } from 'next/router';
import { useEffect} from "react"


 function Authentication (Component:React.FC){
   const Authentication = () => { 
      const router = useRouter();
      useEffect(() => {

         if(localStorage.getItem("loggedIn") !== "true"){
            router.push('/login');
         }
      },[])
      return <Component/>

    }
   return Authentication
}

export default Authentication