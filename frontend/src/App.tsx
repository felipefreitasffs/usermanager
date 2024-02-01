import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Context/AuthProvider'
import { ThemeProvider } from "@material-tailwind/react";
import router from './router'
import './index.css'
import customTheme from './theme/customTheme';
import { SidebarWithBurgerMenu } from "./components/sidebar";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider value={customTheme}>
        <SidebarWithBurgerMenu />
        <div className="mx-auto h-[calc(100vh-4rem)] w-full px-5 py-5">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
