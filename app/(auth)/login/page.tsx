// import { LoginForm } from "@/components/auth/form"

// interface Props {
//   searchParams: {
//     callbackUrl: string | undefined
//   }
// }


// export default function LoginPage({ searchParams }: Props) {
//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
//       <div className="w-full max-w-sm md:max-w-3xl">
//         <LoginForm searchParams={searchParams} />
//       </div>
//     </div>
//   )
// }
import { LoginForm } from "@/components/auth/form"

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  // ✅ unwrap the promise
  const { callbackUrl } = await searchParams

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm searchParams={{ callbackUrl }} />
      </div>
    </div>
  )
}
