import logo from './logo.svg';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import RootLayout from './Components/RootLayout';
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import SideBar from './Components/SideBar';
import Users from './Components/Users';

function App() {
  const browserRouter=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/login",
          element:<Login />
        },{
          path:"/users",
          element:<Users/>
        }]
    }])
  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
