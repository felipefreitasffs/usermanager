import { Typography } from "@material-tailwind/react";

export function Home() {
  return (
    <div className="mx-auto h-[calc(100vh-5rem)] w-full px-5 py-5 flex justify-center items-center">
      <Typography variant="h1" color="blue-gray" textGradient placeholder={undefined}>
        Bem vindo
      </Typography>
    </div>
  )
}