import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsAPIResponse = Array<{
  id: string
  name: string
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsAPIResponse = await response.json()
      //biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(result)
      return result
    },
  })
  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      <div className="flex flex-col">
        {data?.map((room) => {
          return (
            <Link key={room.id} to={`/room/${room.id}`}>
              {room.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
