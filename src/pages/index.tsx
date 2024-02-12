import Authentication from "@/components/Authentication";
import Dashboard from "./dashboard/index";

function Home() {
  return (
    <Dashboard/>
  )
}

export default Authentication(Home);