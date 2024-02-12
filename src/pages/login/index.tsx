import { BaseSyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {

  const [usernameErr, setUserNameErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [isRegister,setIsRegister] = useState<boolean>(false);

  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      router.push('/dashboard');
    }
  }, [])

  const [userDetails, setUserDetails] = useState<{ username: string, password: string }>({
    username: "",
    password: ""
  });


  const handleChange = (e: BaseSyntheticEvent) => {
    setUserNameErr("")
    setPasswordErr("")
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!userDetails.username && !userDetails.password) {
      setUserNameErr("Username is required");
      setPasswordErr("Password is required")
      return false
    } else if (!userDetails.username) {
      setUserNameErr("Username is required")
    } else if (!userDetails.password) {
      setPasswordErr("Password is required")
    }  else {
      if(!isRegister)  {
        localStorage.setItem("loggedIn", JSON.stringify(true));
        router.push("/dashboard")
      } else {
        const detail = JSON.parse(localStorage.getItem("user_detail"))
        if(detail?.username === userDetails.username){
            setUserNameErr("this user already exist")
            return
          }
        localStorage.setItem("user_detail",JSON.stringify(userDetails));
        setUserDetails({username:"",password:""})
        setIsRegister(false)
      }

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-[#194D44]">
      <div className="bg-white p-8 rounded-sm shadow-md w-96">
        <h2 className="text-[#194D44] text-2xl font-bold mb-4 text-center">{isRegister ? "Register" : "Login"}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-[#194D44] font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full p-2 rounded-sm border border-[#194D44] focus:outline-none focus:border-green-800"
              placeholder="Enter your username"
              value={userDetails.username}
              onChange={handleChange}
            />
            <h3 className="text-[#FF0000]">{usernameErr}</h3>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={userDetails.password}
              className="w-full p-2 rounded-sm border border-[#194D44] focus:outline-none focus:border-green-800"
              placeholder="Enter your password"
            />
            <h3 className="text-[#FF0000]">{passwordErr}</h3>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-[#194D44] text-white rounded-sm hover:bg-green-800 focus:outline-none"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Create an account?{' '}
          <button onClick={() => setIsRegister(!isRegister)}className="text-[#194D44] hover:underline font-bold">{isRegister ? "Login here" : "Register here"}</button>
        </div>
       </div>
    </div>
  );
};

export default LoginPage;
